// import React from 'react';
import { getRequestMission } from "@/api/mission";
import CategoryButton from "@/components/CategoryButton";
import Header from "@/components/Header";
import MissionCard from "@/components/MissionCard";
import NavBar from "@/components/NavBar";
import TabBar from "@/components/TabBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  completeMissionState,
  progressMissionState,
  requestMissionState,
} from "@/store/mission";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

export default function MissionChild() {
  const tabs = ["진행중", "완료", "요청됨"];
  const category = [
    "전체",
    "일상",
    "집안일",
    "학습",
    "자기관리",
    "심부름",
    "기타",
  ];
  const currentMonth = getCurrentMonth();
  const previousMonths = getPreviousMonths();

  const location = useLocation();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const [progressMission, setProgreesMission] =
    useRecoilState(progressMissionState);
  const [completeMission, setCompleteMission] =
    useRecoilState(completeMissionState);
  const [requestMission, setRequestMission] =
    useRecoilState(requestMissionState);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");

    if (tabParam === "completed") {
      setActiveTab(1);
    }

    const fetchRequestMission = async () => {
      try {
        const res = await getRequestMission();
        // console.log(res.data)
        setRequestMission(res.data);
      } catch (error) {
        throw new Error(`fetchRequestMission Error: ${error}`);
      }
    };

    fetchRequestMission();
  }, [location.search]);

  // const getOngoingMissions = () => {
  //   const now = new Date();
  //   return progressMission.filter((mission) => new Date(mission.endDate) > now);
  // };

  // const getCompletedMissions = () => {
  //   const now = new Date();
  //   return completeMission.filter((mission) => new Date(mission.endDate) < now);
  // };

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
          <MissionSection>
            {progressMission
              .filter((mission) =>
                selectedCategory === "전체"
                  ? true
                  : mission.category === selectedCategory
              )
              .map((mission, index) => (
                <MissionCard
                  key={index}
                  title={mission.content}
                  category={mission.category}
                  deadline={mission.endDate}
                  amount={mission.point}
                />
              ))}
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
          <MissionSection>
            {completeMission
              .filter((mission) => {
                const missionMonth = mission.doneDate.slice(5, 7);
                return missionMonth === selectedMonth;
              })
              .map((mission, index) => (
                <MissionCard
                  key={index}
                  title={mission.content}
                  category={mission.category}
                  deadline={mission.endDate}
                  amount={mission.point}
                />
              ))}
          </MissionSection>
        </>
      )}

      {activeTab === 2 && (
        <>
          <CategorySection $activeTab={activeTab}>
            <Text>수락 대기중인 미션</Text>
          </CategorySection>
          <MissionSection>
            {requestMission.map((mission, index) => {
              return (
                <MissionCard
                  key={index}
                  title={mission.content}
                  category={mission.category}
                  deadline={mission.endDate}
                  amount={mission.point}
                />
              );
            })}
          </MissionSection>
        </>
      )}
    </>
  );
}

const getCurrentMonth = () => {
  const now = new Date();
  return String(now.getMonth() + 1).padStart(2, "0");
};

const getPreviousMonths = () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  const months = [];

  for (let i = 1; i < currentMonth; i++) {
    months.push(String(i).padStart(2, "0"));
  }

  return months;
};

// const missionData = [
//   {
//     title: '~~사오기',
//     category: '일상',
//     deadline: '2024-11-21 02:00:00',
//     amount: 1200
//   },
//   {
//     title: '설거지하기',
//     category: '집안일',
//     deadline: '2024-11-21 02:00:00',
//     amount: 1200
//   },
//   {
//     title: '~~사오기',
//     category: '심부름',
//     deadline: '2024-11-21 02:00:00',
//     amount: 1200
//   },
//   {
//     title: '국어 공부하기',
//     category: '학습',
//     deadline: '2024-11-21 02:00:00',
//     amount: 1200
//   },
//   {
//     title: '~~사오기',
//     category: '기타',
//     deadline: '2024-11-21 02:00:00',
//     amount: 1200
//   },
//   {
//     title: '~~사오기',
//     category: '자기관리',
//     deadline: '2024-11-21 02:00:00',
//     amount: 1200
//   },
//   {
//     title: '~~사오기',
//     category: '심부름',
//     deadline: '2024-11-21 02:00:00',
//     amount: 1200
//   },
//   {
//     title: '~~사오기',
//     category: '심부름',
//     deadline: '2024-11-21 02:00:00',
//     amount: 1200
//   },
//   {
//     title: '~~사오기',
//     category: '심부름',
//     deadline: '2024-11-21 02:00:00',
//     amount: 1200
//   },
//   {
//     title: '~~사오기',
//     category: '심부름',
//     deadline: '2024-11-19 02:00:00',
//     amount: 1200
//   },
//   {
//     title: '~~사오기',
//     category: '심부름',
//     deadline: '2024-11-18 02:00:00',
//     amount: 1200
//   }
// ];

const CategorySection = styled.div<{ $activeTab: number }>`
  margin-top: 103px;
  width: 100%;
  max-width: 600px;
  padding: ${({ $activeTab }) => ($activeTab === 1 ? "8px 20px" : "16px 20px")};
  overflow-x: auto;
  white-space: nowrap;
  gap: 8px;
  display: flex;
  justify-content: ${({ $activeTab }) =>
    $activeTab === 0 ? "" : "space-between"};
  align-items: center;
  background-color: var(--white);
  position: fixed;
  z-index: 50;
`;

const MissionSection = styled.div`
  margin-top: 160.33px;
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
