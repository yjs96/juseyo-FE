// import React from "react";
import styled from 'styled-components';

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
import { useState } from 'react';

export default function MyPage() {
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');

  const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(e.target.value);
  };

  const userName = '임준수';
  const userId = 1;

  const kakaoSend = {
    userName: userName,
    userId: userId,
    type: 'child',
  };

  const newStr: string = JSON.stringify(kakaoSend);
  const encodedInfo = btoa(encodeURIComponent(newStr));
  // decodeURIComponent(atob(인코딩된문자열))로 가입링크 받기

  const shareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${userName}님이 초대했어요💸`,
        description: `작은 미션으로 시작하는 우리 아이 경제교육`,
        imageUrl: 'https://ifh.cc/g/pz0v8Z.png',
        imageWidth: 200,
        imageHeight: 100,
        link: {
          mobileWebUrl: `http://localhost:5173/signup/${encodedInfo}`,
          webUrl: `http://localhost:5173/signup/${encodedInfo}`,
        },
      },
    });
  };

  return (
    <>
      <NavBar />
      <Header title="마이페이지" iconSrc="/icons/notification.svg" alt="알림" />
      <MainFrame $headbar $navbar $padded $bgGray>
        <ProfileFrame>
          <ImageFrame>
            <img src="/images/card-news.jpg" alt="" />
          </ImageFrame>
          <UserInfo>
            <div>문효만</div>
            <span>Lv1. 똑똑한 첫걸음</span>
          </UserInfo>
          <ButtonFrame>
            <Dialog>
              <DialogTrigger asChild>
                <MenuButton>
                  <i className="fa-solid fa-won-sign"></i>
                  <span>출금</span>
                </MenuButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>출금신청</DialogTitle>
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
                    <Button className="w-full">확인</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <MenuButton>
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
            <div>적립 용돈</div>
            <div>12,000원</div>
          </Menu>
          <Menu>
            <div>완료한 미션</div>
            <div>20개</div>
          </Menu>
          <Menu>
            <div>계좌 번호</div>
            <div>429502-01-316389</div>
          </Menu>
        </MenuFrame>
        <MenuFrame>
          <MenuDesc>계정</MenuDesc>
          <Menu onClick={() => shareKakao()}>
            <div>연동하기</div>
          </Menu>
          <Menu>
            <div>부모님 아이디</div>
            <div>문준일</div>
          </Menu>
          <Menu>
            <div className="text-[var(--red)]">로그아웃</div>
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
