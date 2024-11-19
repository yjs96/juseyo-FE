// import React from 'react';

import NavBar from '@/components/NavBar';
import HomeDashBoard from '@/components/HomeDashboard';
import SectionHeader from '@/components/SectionHeader';
import styled from 'styled-components';
import MissionCard from '@/components/MissionCard';
import VideoContent from '@/components/VideoContent';

export default function MainPage() {
  const videoInfo = {
    index: 1,
    img: '/images/eduvideoimg.jpg',
    title: '초등돌봄교실 [EP.1]',
    description:
      'KB국민카드 2024 초등돌봄교실 금융교육 신나는 신용생활 - [EP.1] 신용이 중요해 KB국민카드 2024 초등돌봄교실 금융교육',
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
