import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import {
  completeMissionState,
  failMissionState,
  progressMissionState,
  requestMissionState
} from '@/store/mission';

import { login } from '@/api/auth';
import {
  getCompleteMission,
  getFailMission,
  getProgressMission,
  getRequestMission
} from '@/api/mission';

import CategoryButton from '@/components/CategoryButton';
import Header from '@/components/Header';
import MissionCard from '@/components/MissionCard';
import NavBar from '@/components/NavBar';
import TabBar from '@/components/TabBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import FinishedMissionCard from '@/components/FinishedMissionCard';

export default function MissionChild() {
  const tabs = ['진행중인 미션', '요청중인 미션', '완료된 미션'];
  const category = [
    '전체',
    '일상',
    '집안일',
    '학습',
    '자기관리',
    '심부름',
    '기타'
  ];
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ];
  const currentMonth = getCurrentMonth();

  const location = useLocation();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const [progressMission, setProgreesMission] =
    useRecoilState(progressMissionState);
  const [completeMission, setCompleteMission] =
    useRecoilState(completeMissionState);
  const [failMission, setFailMission] = useRecoilState(failMissionState);
  const [requestMission, setRequestMission] =
    useRecoilState(requestMissionState);

  const finishedMissions = () => {
    const combinedMissions = [
      ...completeMission.map((mission) => ({
        ...mission,
        date: mission.doneDate,
        isCompleted: true
      })),
      ...failMission.map((mission) => ({
        ...mission,
        date: mission.failDate,
        isCompleted: false
      }))
    ];
    const sortedMissions = combinedMissions.sort((a, b) => {
      return new Date(b.date!).getTime() - new Date(a.date!).getTime();
    });

    return sortedMissions;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');

    if (tabParam === 'completed') {
      setActiveTab(1);
    }

    const fetchData = async () => {
      try {
        const res = await login('admin_child', 'admin');
        // console.log(res.data); // 응답 데이터 처리
        localStorage.setItem('accessToken', res.accessToken);
      } catch (error) {
        console.error('Error during login:', error);
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

    const fetchRequestMission = async () => {
      try {
        const res = await getRequestMission();
        // console.log(res.data)
        setRequestMission(res);
      } catch (error) {
        throw new Error(`fetchRequestMission Error: ${error}`);
      }
    };

    const fetchFailMission = async () => {
      try {
        const res = await getFailMission();
        // console.log(res.data)
        setFailMission(res);
      } catch (error) {
        throw new Error(`fetchFailMission Error: ${error}`);
      }
    };

    const fetchCompleteMission = async () => {
      try {
        const res = await getCompleteMission();
        // console.log(res.data)
        setCompleteMission(res);
      } catch (error) {
        throw new Error(`fetchCompleteMission Error: ${error}`);
      }
    };

    fetchData();
    fetchRequestMission();
    fetchFailMission();
    fetchCompleteMission();
    fetchProgressMission();
  }, [
    location.search,
    setCompleteMission,
    setFailMission,
    setProgreesMission,
    setRequestMission
  ]);

  return (
    <>
      <NavBar />
      <Header title="용돈 미션" iconSrc="/icons/plus.svg" alt="추가" />
      <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 0 && (
        <>
          <CategorySection $activeTab={activeTab}>
            {category.map((item, index) => (
              <CategoryButton
                key={index}
                category={item}
                isSelected={selectedCategory === item}
                onClick={() => setSelectedCategory(item)}
              />
            ))}
          </CategorySection>
          <MissionSection $activeTab={activeTab}>
            {progressMission
              .filter((mission) =>
                selectedCategory === '전체'
                  ? true
                  : mission.category === selectedCategory
              )
              .map((mission, index) => (
                <MissionCard key={index} {...mission} />
              ))}
          </MissionSection>
        </>
      )}

      {activeTab === 1 && (
        <>
          <MissionSection $activeTab={activeTab}>
            {requestMission.map((mission, index) => {
              return <MissionCard key={index} {...mission} />;
            })}
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
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}월
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CategorySection>
          <MissionSection $activeTab={activeTab}>
            {finishedMissions()
              .filter((mission) => {
                const missionMonth = mission.date.slice(5, 7);
                return missionMonth === selectedMonth;
              })
              .map((mission, index) => (
                <FinishedMissionCard key={index} {...mission} />
              ))}
          </MissionSection>
        </>
      )}
    </>
  );
}

const getCurrentMonth = () => {
  const now = new Date();
  return String(now.getMonth() + 1).padStart(2, '0');
};

const CategorySection = styled.div<{ $activeTab: number }>`
  margin-top: 103px;
  width: 100%;
  max-width: 600px;
  padding: ${({ $activeTab }) => ($activeTab === 2 ? '8px 20px' : '16px 20px')};
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
  margin-top: ${({ $activeTab }) => ($activeTab === 1 ? '120px' : '162px')};
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
