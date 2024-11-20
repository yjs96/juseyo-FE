// import React from 'react';
import CompletedMissionCard from '@/components/CompletedMissionCard';
import Header from '@/components/Header';
import MissionActionCard from '@/components/MissionActionCard';
import NavBar from '@/components/NavBar';
import TabBar from '@/components/TabBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useState } from 'react';
import styled from 'styled-components';

const MissionParents = () => {
  const tabs = ['요청받은 미션', '진행중인 미션', '완료된 미션'];
  const responseButtons = ['거절', '수락'];
  const resultButtons = ['실패', '성공'];

  const currentMonth = getCurrentMonth();
  const previousMonths = getPreviousMonths();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const getOngoingMissions = () => {
    const now = new Date();
    return missionData.filter((mission) => new Date(mission.deadline) > now);
  };

  const getCompletedMissions = () => {
    const now = new Date();
    return missionData.filter((mission) => new Date(mission.deadline) < now);
  };

  return (
    <>
      <NavBar />
      <Header title="미션" iconSrc="/icons/plus.svg" alt="추가" />
      <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 0 && (
        <>
          <MissionSection $activeTab={activeTab}>
            {getOngoingMissions().map(
              ({ title, category, deadline, amount }, index) => (
                <MissionActionCard
                  key={index}
                  title={title}
                  category={category}
                  deadline={deadline}
                  amount={amount}
                  buttons={responseButtons}
                />
              )
            )}
          </MissionSection>
        </>
      )}

      {activeTab === 1 && (
        <>
          <CategorySection $activeTab={activeTab}>
            <Text>2024년</Text>
            <Select
              defaultValue={currentMonth}
              onValueChange={setSelectedMonth}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {previousMonths.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}월
                  </SelectItem>
                ))}
                <SelectItem value={currentMonth}>{currentMonth}월</SelectItem>
              </SelectContent>
            </Select>
          </CategorySection>
          <MissionSection $activeTab={activeTab}>
            {getOngoingMissions()
              .filter((mission) => {
                const missionMonth = mission.deadline.slice(5, 7);
                return missionMonth === selectedMonth;
              })
              .map(({ title, category, deadline, amount }, index) => (
                <MissionActionCard
                  key={index}
                  title={title}
                  category={category}
                  deadline={deadline}
                  amount={amount}
                  buttons={resultButtons}
                />
              ))}
          </MissionSection>
        </>
      )}

      {activeTab === 2 && (
        <>
          <CategorySection $activeTab={activeTab}>
            <Text>2024년</Text>
            <Select
              defaultValue={currentMonth}
              onValueChange={setSelectedMonth}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {previousMonths.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}월
                  </SelectItem>
                ))}
                <SelectItem value={currentMonth}>{currentMonth}월</SelectItem>
              </SelectContent>
            </Select>
          </CategorySection>
          <MissionSection $activeTab={activeTab}>
            {getCompletedMissions()
              .filter((mission) => {
                const missionMonth = mission.deadline.slice(5, 7);
                return missionMonth === selectedMonth;
              })
              .map(({ title, category, deadline, amount }, index) => (
                <CompletedMissionCard
                  key={index}
                  title={title}
                  category={category}
                  deadline={deadline}
                  amount={amount}
                  isCompleted={true}
                />
              ))}
          </MissionSection>
        </>
      )}
    </>
  );
};

export default MissionParents;

const getCurrentMonth = () => {
  const now = new Date();
  return String(now.getMonth() + 1).padStart(2, '0');
};

const getPreviousMonths = () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  const months = [];

  for (let i = 1; i < currentMonth; i++) {
    months.push(String(i).padStart(2, '0'));
  }

  return months;
};

const missionData = [
  {
    title: '~~사오기',
    category: '일상',
    deadline: '2024-11-21 02:00:00',
    amount: 1200
  },
  {
    title: '설거지하기',
    category: '집안일',
    deadline: '2024-11-21 02:00:00',
    amount: 1200
  },
  {
    title: '~~사오기',
    category: '심부름',
    deadline: '2024-11-21 02:00:00',
    amount: 1200
  },
  {
    title: '국어 공부하기',
    category: '학습',
    deadline: '2024-11-21 02:00:00',
    amount: 1200
  },
  {
    title: '~~사오기',
    category: '기타',
    deadline: '2024-11-21 02:00:00',
    amount: 1200
  },
  {
    title: '~~사오기',
    category: '자기관리',
    deadline: '2024-11-21 02:00:00',
    amount: 1200
  },
  {
    title: '~~사오기',
    category: '심부름',
    deadline: '2024-11-21 02:00:00',
    amount: 1200
  },
  {
    title: '~~사오기',
    category: '심부름',
    deadline: '2024-11-21 02:00:00',
    amount: 1200
  },
  {
    title: '~~사오기',
    category: '심부름',
    deadline: '2024-11-21 02:00:00',
    amount: 1200
  },
  {
    title: '~~사오기',
    category: '심부름',
    deadline: '2024-11-19 02:00:00',
    amount: 1200
  },
  {
    title: '~~사오기',
    category: '심부름',
    deadline: '2024-11-18 02:00:00',
    amount: 1200
  }
];

const CategorySection = styled.div<{ $activeTab: number }>`
  margin-top: 103px;
  width: 100%;
  max-width: 600px;
  padding: ${({ $activeTab }) => ($activeTab !== 0 ? '8px 20px' : '16px 20px')};
  overflow-x: auto;
  white-space: nowrap;
  gap: 8px;
  display: flex;
  justify-content: ${({ $activeTab }) =>
    $activeTab === 0 ? '' : 'space-between'};
  align-items: center;
  background-color: var(--white);
  position: fixed;
  z-index: 50;
`;

const MissionSection = styled.div<{ $activeTab: number }>`
  margin-top: ${({ $activeTab }) => ($activeTab === 0 ? '120px' : '160.33px')};
  padding: 0 20px 90px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: var(--black);
`;
