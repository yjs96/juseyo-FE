// import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import toast from 'react-hot-toast';

import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserInfo } from '@/api/userInfo';
import { userInfoState } from '@/store/userInfo';
import { completeMissionState } from '@/store/mission';
import { getCompleteMission } from '@/api/mission';

import Header from '@/components/Header';
import MainFrame from '@/components/MainFrame';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import axiosInstance from '@/api/instance';

interface MypageInfoType {
  name: string;
  totalPoint: number;
  successCount: number;
  level: string;
}

export default function MyPage() {
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [isParent, setIsParent] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [mypageInfo, setMyPageInfo] = useState<MypageInfoType>();
  const [completeMission, setCompleteMission] =
    useRecoilState(completeMissionState);
  const childParentInfo = useRecoilValue(userInfoState);

  const navigate = useNavigate();

  const kakaoSend = {
    userName: userInfo.name,
    parentId: userInfo.id,
  };

  const newStr: string = JSON.stringify(kakaoSend);
  const encodedInfo = btoa(encodeURIComponent(newStr));
  // decodeURIComponent(atob(인코딩된문자열))로 가입링크 받기
  // console.log(encodedInfo);
  // console.log(newStr);

  const shareKakao = () => {
    if (childParentInfo.childNameList[0].name === '') {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `${userInfo.name}님이 초대했어요💸`,
          description: `작은 미션으로 시작하는 우리 아이 경제교육`,
          imageUrl: 'https://ifh.cc/g/G9nx17.png',
          imageWidth: 200,
          imageHeight: 100,
          link: {
            mobileWebUrl: `${
              import.meta.env.VITE_FRONT_BASE
            }/signup/${encodedInfo}`,
            webUrl: `${import.meta.env.VITE_FRONT_BASE}/signup/${encodedInfo}`,
          },
        },
      });
    }
  };

  const shareAchievements = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${isParent ? '자녀' : ''} ${userInfo.name}님의 미션 현황!💸`,
        description: `${
          completeMission.length
        }개의 미션을 성공하고\n용돈 ${completeMission
          .reduce((sum, mission) => sum + mission.point, 0)
          .toLocaleString()}원을 모았어요👏\n주세요로 용돈 모아보러 갈까요?`,
        imageUrl: 'https://ifh.cc/g/G9nx17.png',
        imageWidth: 200,
        imageHeight: 100,
        link: {
          mobileWebUrl: `${import.meta.env.VITE_FRONT_BASE}/`,
          webUrl: `${import.meta.env.VITE_FRONT_BASE}/`,
        },
      },
    });
  };

  const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(e.target.value);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleWitdrawOrCharge = async () => {
    if (isParent) {
      try {
        const res = await axiosInstance.get(
          `/mypage/point/charge/${withdrawAmount}`
        );
        toast.success('주세요 지갑에 충전했어요');
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axiosInstance.get(
          `/mypage/point/withdraw/${withdrawAmount}`
        );
        toast.success('용돈을 계좌로 옮겼어요');
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
  };

  const getProfile = async () => {
    const res = await axiosInstance.get('/mypage/profile');
    const data = res.data;
    setMyPageInfo(data);
    // console.log(data);
  };

  const fetchUserInfo = async () => {
    const res = await getUserInfo();
    if (res.type === 'parent') setIsParent(true);
    setUserInfo(res);
    // console.log(res);
  };

  const fetchCompleteMission = async () => {
    if (isParent) {
      try {
        const res = await getCompleteMission();
        // console.log(res.data);
        setCompleteMission(res.data);
      } catch (error) {
        throw new Error(`fetchCompleteMission Error: ${error}`);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchCompleteMission();
    getProfile();
  }, []);

  return (
    <>
      <NavBar />
      <Header title="마이페이지" iconSrc="/icons/notification.svg" alt="알림" />
      <MainFrame $headbar $navbar $padded $bgGray>
        <ProfileFrame>
          <ImageFrame>
            {isParent ? (
              <img src="/images/profile-image-parent.jpg" alt="parent" />
            ) : (
              <img src="/images/profile-image.jpg" alt="child" />
            )}
          </ImageFrame>
          <UserInfo>
            <div>{userInfo.name}</div>
            <span>{isParent ? '부모 계정' : '자녀 계정'}</span>
          </UserInfo>
          <ButtonFrame>
            <Dialog>
              <DialogTrigger asChild>
                {isParent ? (
                  <MenuButton>
                    <i className="fa-solid fa-won-sign"></i>
                    <span>충전</span>
                  </MenuButton>
                ) : (
                  <MenuButton>
                    <i className="fa-solid fa-won-sign"></i>
                    <span>출금</span>
                  </MenuButton>
                )}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isParent ? '충전요청' : '출금요청'}
                  </DialogTitle>
                  <DialogDescription>금액을 입력해주세요</DialogDescription>
                </DialogHeader>
                <Input
                  type="number"
                  value={withdrawAmount}
                  onChange={handleWithdrawChange}
                  placeholder="금액"
                />
                <DialogFooter>
                  <DialogClose className="flex flex-col gap-2">
                    <Button className="w-full" variant={'destructive'}>
                      취소
                    </Button>
                    <Button
                      onClick={() => handleWitdrawOrCharge()}
                      className="w-full"
                    >
                      확인
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <MenuButton onClick={() => shareAchievements()}>
              <i className="fa-regular fa-share-from-square"></i>
              <span>공유</span>
            </MenuButton>
            <MenuButton
              onClick={() =>
                (window.location.href = 'http://pf.kakao.com/_RDrxdn/chat')
              }
            >
              <i className="fa-solid fa-headset"></i>
              <span>고객센터</span>
            </MenuButton>
          </ButtonFrame>
        </ProfileFrame>
        <MenuFrame>
          <MenuDesc>정보</MenuDesc>
          <Menu>
            <div>{isParent ? '계좌 잔액' : '이번달 용돈'}</div>
            <div>{mypageInfo?.totalPoint.toLocaleString()}원</div>
          </Menu>
          {!isParent && (
            <>
              <Menu>
                <div>누적 용돈</div>
                <div>
                  {completeMission
                    .reduce((sum, mission) => sum + mission.point, 0)
                    .toLocaleString()}
                  원
                </div>
              </Menu>
              <Menu>
                <div>완료한 미션</div>
                <div>{completeMission.length}개</div>
              </Menu>
            </>
          )}
          <Menu>
            <div>계좌 번호</div>
            <div>{userInfo.accountNum}</div>
          </Menu>
        </MenuFrame>
        <MenuFrame>
          <MenuDesc>계정</MenuDesc>

          {isParent && (
            <Menu onClick={() => shareKakao()}>
              <div>
                {childParentInfo.childNameList[0].name !== '' ? (
                  <DarkGray>자녀 초대됨</DarkGray>
                ) : (
                  '자녀 초대하기'
                )}
              </div>
            </Menu>
          )}
          <Menu>
            <div>{isParent ? '자녀' : '부모님'} 이름</div>
            <div>
              {isParent && childParentInfo.childNameList[0].name !== ''
                ? childParentInfo.childNameList[0].name
                : childParentInfo.parentName}
            </div>
          </Menu>
          <Menu>
            <div className="text-[var(--red)]" onClick={() => handleLogout()}>
              로그아웃
            </div>
          </Menu>
        </MenuFrame>
      </MainFrame>
    </>
  );
}

const ProfileFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const ImageFrame = styled.div`
  width: 100px;
  height: 100px;
  background-color: var(--gray);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.12);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.2);
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  div {
    font-size: 24px;
    font-weight: 600;
  }

  span {
    font-size: 12px;
    color: var(--dark-gray);
  }
`;

const ButtonFrame = styled.div`
  width: 100%;
  padding: 20px 0;
  background-color: var(--destructive);
  border-radius: 12px;
  display: flex;
  align-items: center;

  :last-child {
    border-right: none;
  }
`;

const MenuButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 6px;
  color: var(--white);
  font-size: 14px;
  border-right: 1px solid var(--white);
  margin-top: 2px;

  i {
    font-size: 18px;
  }
  span {
    margin-bottom: -2px;
  }
`;

const MenuFrame = styled.div`
  width: 100%;
  border-radius: 12px;
  background-color: var(--white);
  font-size: 16px;
  font-weight: 500;
  padding-top: 16px;
  margin-bottom: 20px;

  :last-child {
    border-bottom: none;
  }
`;

const MenuDesc = styled.div`
  color: var(--dark-gray);
  font-size: 12px;
  margin-left: 16px;
`;

const Menu = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid var(--border);
`;

const DarkGray = styled.div`
  color: var(--dark-gray);
`;
