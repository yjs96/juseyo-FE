import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isUserParentState, userInfoState } from '@/store/userInfo';
import { login } from '@/api/auth';
import { getCompleteMission, getProgressMission } from '@/api/mission';
import { useRecoilState } from 'recoil';
import {
  completeMissionState,
  MissionType,
  progressMissionState,
} from '@/store/mission';
import { getUserInfo } from '@/api/userInfo';

import NavBar from '@/components/NavBar';
import HomeDashBoard from '@/components/HomeDashboard';
import SectionHeader from '@/components/SectionHeader';
import MissionCard from '@/components/MissionCard';
import VideoContent from '@/components/VideoContent';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/api/instance';

export default function MainPage() {
  const [progressMission, setProgreesMission] =
    useRecoilState(progressMissionState);
  const [completeMission, setCompleteMission] =
    useRecoilState(completeMissionState);
  const [isUserParent, setIsUserParent] = useRecoilState(isUserParentState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [childPoint, setChildPoint] = useState(0);

  // 자녀
  const getChildData = async () => {
    try {
      localStorage.removeItem('accessToken');
      const res = await login('joonsu.96@daum.net', 'admin');
      // console.log(res.data); // 응답 데이터 처리
      localStorage.setItem('accessToken', res.accessToken);
      fetchProgressMission();
      fetchCompleteMission();
      getUserType();
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // 부모
  const getParentData = async () => {
    try {
      localStorage.removeItem('accessToken');
      const res = await login('dks729927@gmail.com', 'admin');
      // console.log(res.data); // 응답 데이터 처리
      localStorage.setItem('accessToken', res.accessToken);
      fetchProgressMission();
      fetchCompleteMission();
      getUserType();
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const getUserType = async () => {
    const response = await getUserInfo();
    setUserInfo(response);
    // console.log(response);
    if (response.type === 'parent') {
      setIsUserParent(true);
    } else {
      const response = await axiosInstance.get('/mypage/point');
      setChildPoint(response.data.totalPoints);
    }
  };

  const fetchProgressMission = async () => {
    try {
      const res = await getProgressMission();
      // console.log(res.data)
      setProgreesMission(res);
    } catch (error) {
      throw new Error(`fetchProgressMission Error: ${error}`);
    }
  };

  const fetchCompleteMission = async () => {
    try {
      const res = await getCompleteMission();
      // console.log(res);
      setCompleteMission(res);
    } catch (error) {
      throw new Error(`fetchCompleteMission Error: ${error}`);
    }
  };

  const getCurrentMonthMissionCount = (missions: MissionType[]) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return missions.filter((mission: MissionType) => {
      const doneDate = new Date(mission.doneDate);
      return (
        doneDate.getMonth() === currentMonth &&
        doneDate.getFullYear() === currentYear
      );
    }).length;
  };

  // fetchData();
  useEffect(() => {
    fetchProgressMission();
    fetchCompleteMission();
  }, []);

  const navigate = useNavigate();
  const videoInfo = {
    index: 1,
    img: '/images/quiz/1.jpg',
    title: '신나는 신용생활 [EP.1]',
    description:
      '신용의 원리와 중요성에 대해 이해하고 어떻게 하면 신용을 쌓을 수 있을지 알아보도록 해요.🔎',
    videoUrl: 'https://www.youtube.com/watch?v=md1-qbKR_eI',
  };

  return (
    <>
      <NavBar />
      <HomeDashBoard
        name={
          isUserParent
            ? `자녀 ${userInfo.childNameList[0].name}`
            : userInfo.name
        }
        point={
          isUserParent ? userInfo.childNameList[0].point / 7 : childPoint / 7
        }
        money={isUserParent ? userInfo.childNameList[0].point : childPoint}
        successfulMisson={getCurrentMonthMissionCount(completeMission)}
      />
      <BottomHalf>
        <Section>
          <SectionHeader title="진행 중인 미션" path="/mission/child" />
          <CardContainer>
            {progressMission.slice(0, 2).map((mission, index) => {
              return (
                <MissionCard
                  key={index}
                  content={mission.content}
                  category={mission.category}
                  endDate={mission.endDate}
                  point={mission.point}
                />
              );
            })}
          </CardContainer>
        </Section>
        <Section>
          <SectionHeader
            title="최근 성공한 미션"
            path="/mission/child?tab=completed"
          />
          <CardContainer>
            {completeMission.slice(0, 2).map((mission, index) => {
              return (
                <MissionCard
                  key={index}
                  content={mission.content}
                  category={mission.category}
                  endDate={mission.doneDate}
                  point={mission.point}
                />
              );
            })}
          </CardContainer>
        </Section>
        <Section>
          <SectionHeader title="최근 학습" path="/edu" />
          <VideoContent {...videoInfo} />
        </Section>
        <div className="flex flex-wrap gap-2 mt-40">
          <Button onClick={() => getChildData()}>자녀 로그인</Button>
          <Button onClick={() => getParentData()}>부모 로그인</Button>
          <Button onClick={() => location.reload()}>새로고침</Button>
          <Button onClick={() => navigate('/login')}>로그인페이지</Button>
          <Button onClick={() => navigate('/signup')}>회원가입페이지</Button>
          <div>{isUserParent ? '부모' : '자식'}</div>
        </div>
      </BottomHalf>
    </>
  );
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 20px 20px 0 20px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BottomHalf = styled.div`
  margin-top: 291px;
  height: calc(100% - 291px - 76px);
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  overflow-y: scroll;
`;
