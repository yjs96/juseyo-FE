// import React from 'react';

import NavBar from '@/components/NavBar';
import HomeDashBoard from '@/components/HomeDashboard';
import SectionHeader from '@/components/SectionHeader';
import styled from 'styled-components';
import MissionCard from '@/components/MissionCard';
import VideoContent from '@/components/VideoContent';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
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
        name="문효만"
        level={1}
        money={20500}
        point={230}
        successfulMisson={2}
      />
      <BottomHalf>
        <div onClick={() => navigate('/signup')}>회원가입</div>
        <div onClick={() => navigate('/login')}>로그인</div>
        <Section>
          <SectionHeader title="진행 중인 미션" path="/mission" />
          <CardContainer>
            <MissionCard
              title="~~사오기"
              category="일상"
              daedline="2024-11-19 23:00:00"
              amount={1200}
            />
            <MissionCard
              title="설거지하기"
              category="집안일"
              daedline="2024-11-22 20:00:00"
              amount={2000}
            />
          </CardContainer>
        </Section>
        <Section>
          <SectionHeader title="최근 완료한 미션" path="/mission" />
          <CardContainer>
            <MissionCard
              title="~~사오기"
              category="기타"
              amount={1500}
              daedline="2024-11-15 18:00:00"
            />
            <MissionCard
              title="국어 공부하기"
              category="학습"
              amount={2500}
              daedline="2024-11-13 22:00:00"
            />
          </CardContainer>
        </Section>
        <Section>
          <SectionHeader title="최근 학습" path="/edu" />
          <VideoContent {...videoInfo} />
        </Section>
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
