// import React from 'react';

import NavBar from "@/components/NavBar";
import HomeDashBoard from "@/components/HomeDashboard";
import SectionHeader from "@/components/SectionHeader";
import styled from "styled-components";
import MissionCard from "@/components/MissionCard";
import VideoContent from "@/components/VideoContent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { login } from "@/api/auth";
import {
  getCompleteMission,
  getFailMission,
  getProgressMission,
  getRequestMission,
} from "@/api/mission";
import { useRecoilState } from "recoil";
import {
  completeMissionState,
  failMissionState,
  progressMissionState,
  requestMissionState,
} from "@/store/mission";

export default function MainPage() {
  const [progressMission, setProgreesMission] =
    useRecoilState(progressMissionState);
  const [completeMission, setCompleteMission] =
    useRecoilState(completeMissionState);
  const [failMission, setFailMission] = useRecoilState(failMissionState);
  const [requestMission, setRequestMission] =
    useRecoilState(requestMissionState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await login("admin_child", "admin");
        // console.log(res.data); // 응답 데이터 처리
        localStorage.setItem("accessToken", res.data.accessToken);
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    const fetchProgressMission = async () => {
      try {
        const res = await getProgressMission();
        // console.log(res.data)
        setProgreesMission(res.data);
      } catch (error) {
        throw new Error(`fetchProgressMission Error: ${error}`);
      }
    };

    const fetchCompleteMission = async () => {
      try {
        const res = await getCompleteMission();
        // console.log(res.data)
        setCompleteMission(res.data);
      } catch (error) {
        throw new Error(`fetchCompleteMission Error: ${error}`);
      }
    };

    const fetchFailMission = async () => {
      try {
        const res = await getFailMission();
        // console.log(res.data)
        setFailMission(res.data);
      } catch (error) {
        throw new Error(`fetchFailMission Error: ${error}`);
      }
    };

    const fetchRequestMission = async () => {
      try {
        const res = await getRequestMission();
        // console.log(res.data)
        setRequestMission(res.data);
      } catch (error) {
        throw new Error(`fetchRequestMission Error: ${error}`);
      }
    };

    fetchData();
    fetchProgressMission();
    fetchCompleteMission();
    fetchFailMission();
    fetchRequestMission();
  }, []);

  const navigate = useNavigate();
  const videoInfo = {
    index: 1,
    img: "/images/quiz/1.jpg",
    title: "신나는 신용생활 [EP.1]",
    description:
      "신용의 원리와 중요성에 대해 이해하고 어떻게 하면 신용을 쌓을 수 있을지 알아보도록 해요.🔎",
    videoUrl: "https://www.youtube.com/watch?v=md1-qbKR_eI",
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
        <div onClick={() => navigate("/signup")}>회원가입</div>
        <div onClick={() => navigate("/login")}>로그인</div>
        <Section>
          <SectionHeader title="진행 중인 미션" path="/mission/child" />
          <CardContainer>
            {progressMission.slice(0, 2).map((mission, index) => {
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
          </CardContainer>
        </Section>
        <Section>
          <SectionHeader
            title="최근 완료한 미션"
            path="/mission/child?tab=completed"
          />
          <CardContainer>
            {completeMission.slice(0, 2).map((mission, index) => {
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
