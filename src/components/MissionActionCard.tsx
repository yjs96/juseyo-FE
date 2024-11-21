import styled from 'styled-components';

import {
  getProgressMissionComplete,
  getProgressMissionFail,
  getRequestMissionApprove,
  getRequestMissionReject,
} from '@/api/requestMission';
import toast from 'react-hot-toast';
import {
  progressMissionUpdateTriggerState,
  requestMissionUpdateTriggerState,
} from '@/store/mission';
import { useSetRecoilState } from 'recoil';

interface MissionActionCardProps {
  id: number;
  content: string;
  category: string;
  point: number;
  endDate: string;
  buttons: Array<string>;
}

interface CategoryInfo {
  color: string;
  src: string;
}

const MissionActionCard = ({
  id,
  content,
  category,
  point,
  endDate,
  buttons,
}: MissionActionCardProps) => {
  const setRequestMissionUpdateTrigger = useSetRecoilState(
    requestMissionUpdateTriggerState
  );
  const setprogressMissionUpdateTrigger = useSetRecoilState(
    progressMissionUpdateTriggerState
  );

  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const deadlineDate = new Date(endDate);

    const timeDifference = deadlineDate.getTime() - now.getTime();

    const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (hoursRemaining <= 24 && hoursRemaining > 0)
      return `${hoursRemaining}시간 남음`;
    if (daysRemaining >= 1) return `${daysRemaining}일 남음`;
    if (hoursRemaining <= 0)
      return `${deadlineDate.getMonth() + 1}월 ${deadlineDate.getDate()}일`;
  };

  const { color, src } = getCategoryInfo(category);

  // 요청 받은 미션
  const rejectMission = async () => {
    try {
      await getRequestMissionReject(id);
      setRequestMissionUpdateTrigger('reject');
      toast.success('미션을 거절했어요');
    } catch (error) {
      toast.error('미션 거절 실패');
      throw new Error(`rejectMission Error: ${error}`);
    }
  };

  const approveMission = async () => {
    try {
      await getRequestMissionApprove(id);
      setRequestMissionUpdateTrigger('approve');
      toast.success('미션을 수락했어요!');
    } catch (error) {
      toast.error('미션 수락 실패');
      throw new Error(`approveMission Error: ${error}`);
    }
  };

  // 진행중인 미션
  const missionFail = async () => {
    try {
      await getProgressMissionFail(id);
      setprogressMissionUpdateTrigger('fail');
      toast.success('미션이 실패로 기록되었습니다');
    } catch (error) {
      toast.error('미션 실패 요청 실패');
      throw new Error(`missionFail Error: ${error}`);
    }
  };
  const missionComplete = async () => {
    try {
      await getProgressMissionComplete(id);
      setprogressMissionUpdateTrigger('complete');
      toast.success('미션이 성공으로 기록되었습니다!');
    } catch (error) {
      toast.error('미션 성공 요청 실패');
      throw new Error(`approveMission Error: ${error}`);
    }
  };

  return (
    <Container>
      <MissionContainer color={color}>
        <TopContainer>
          <CategoryBadge>
            <img src={src} alt={category} />
            <span>{category}</span>
          </CategoryBadge>
          <TextContainer>
            <h1>{content}</h1>
            <p>{getTimeRemaining(endDate)}</p>
          </TextContainer>
        </TopContainer>
        <BottomContainer>
          <img src="/icons/point.svg" alt="포인트" />
          <p>{point.toLocaleString()}</p>
        </BottomContainer>
      </MissionContainer>
      <ButtonFrame>
        <Button
          className="text-[var(--red)]"
          onClick={buttons[0] === '거절' ? rejectMission : missionFail}
        >
          {buttons[0]}
        </Button>
        <Button
          className="text-[var(--black)]"
          onClick={buttons[1] === '수락' ? approveMission : missionComplete}
        >
          {buttons[1]}
        </Button>
      </ButtonFrame>
    </Container>
  );
};

export default MissionActionCard;

const getCategoryInfo = (category: string): CategoryInfo => {
  switch (category) {
    case '일상':
      return { color: 'var(--primary)', src: '/icons/daily.svg' };
    case '학습':
      return { color: 'var(--blue)', src: '/icons/study.svg' };
    case '집안일':
      return { color: 'var(--green)', src: '/icons/housework.svg' };
    case '자기관리':
      return { color: '#f593ba', src: '/icons/management.svg' };
    case '심부름':
      return { color: 'var(--gray)', src: '/icons/errand.svg' };
    case '기타':
      return { color: 'var(--orange)', src: '/icons/etc.svg' };
  }
  return { color: 'var(--primary)', src: '/icons/daily.svg' };
};

const Container = styled.div`
  width: calc(50% - 8px);
  display: flex;
  flex-direction: column;
`;

const MissionContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  border-radius: 12px 12px 0 0;
  padding: 16px 16px 8px 16px;
  background-color: ${(props) => props.color};
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;

  p {
    font-size: 20px;
    font-weight: 600;
    color: var(--black);
  }
`;

const CategoryBadge = styled.div`
  width: fit-content;
  border-radius: 100px;
  padding: 1px 8px;
  background-color: var(--white);
  opacity: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  span {
    font-size: 12px;
    font-weight: 500;
    color: var(--black);
  }
`;

const TextContainer = styled.div`
  h1 {
    font-size: 16px;
    font-weight: 500;
    color: var(--black);
  }

  p {
    font-size: 12px;
    font-weight: 400;
    color: var(--dark-gray);
  }
`;

const ButtonFrame = styled.div`
  width: 100%;
  display: flex;
  background-color: var(--background);
  border-radius: 0 0 12px 12px;

  :first-child {
    border-right: 1px solid var(--border);
  }
`;

const Button = styled.div`
  flex: 1;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
`;
