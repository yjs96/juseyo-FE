import styled from 'styled-components';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';

interface HomeDashBoardProps {
  name: string;
  point: number;
  money: number;
  successfulMisson: number;
}

const getLevelInfo = (point: number) => {
  const roundedPoint = Math.round(point / 10) * 10;
  const levels = [
    { min: 0, max: 500, name: '설레는 첫걸음' },
    { min: 500, max: 1000, name: '똑똑한 두걸음' },
    { min: 1000, max: 1500, name: '씩씩한 세걸음' },
    { min: 1500, max: 2500, name: '희망찬 네걸음' },
    { min: 2500, max: 3500, name: '즐거운 다섯걸음' },
    { min: 3500, max: 5000, name: '무럭무럭 여섯걸음' },
    { min: 5000, max: 6500, name: '굳건한 일곱걸음' },
    { min: 6500, max: 8500, name: '행운의 여덟걸음' },
    { min: 8500, max: 10500, name: '용기의 아홉걸음' },
    { min: 10500, max: Infinity, name: '만족의 열걸음' },
  ];

  const currentLevel =
    levels.findIndex((level) => roundedPoint < level.max) + 1;
  const levelInfo = levels[currentLevel - 1];

  const nextLevelPoint = currentLevel < 10 ? levelInfo.max - roundedPoint : 0;
  const progress =
    ((roundedPoint - levelInfo.min) / (levelInfo.max - levelInfo.min)) * 100;

  return {
    level: currentLevel,
    name: levelInfo.name,
    nextPoint: nextLevelPoint,
    progress: Math.min(progress, 100),
  };
};

const HomeDashBoard = ({
  name,
  point,
  money,
  successfulMisson,
}: HomeDashBoardProps) => {
  const [progress, setProgress] = useState<number>(0);
  const levelInfo = getLevelInfo(point);

  useEffect(() => {
    setTimeout(() => {
      setProgress(levelInfo.progress);
    }, 240);
  }, [levelInfo.progress]);

  return (
    <HomeDashboard>
      <Name>{name}님의</Name>
      <ContentContainer>
        <SavedCard>
          <TextContainer>
            <Title>이번달 적립 용돈</Title>
            <p>{successfulMisson}개의 미션을 성공했어요!</p>
          </TextContainer>
          <Money>{money.toLocaleString()}원</Money>
        </SavedCard>
        <LevelCard>
          <LevelContainer>
            <div className="flex items-center">
              <Title>현재 레벨 {levelInfo.level}</Title>
              <span>{levelInfo.name}</span>
            </div>
            <Point>다음 레벨까지 {levelInfo.nextPoint}P</Point>
          </LevelContainer>
          <Progress value={progress} />
        </LevelCard>
      </ContentContainer>
    </HomeDashboard>
  );
};

export default HomeDashBoard;

const HomeDashboard = styled.div`
  position: fixed;
  width: 100%;
  padding: 20px;
  background: var(--primary);
  max-width: 600px;
  z-index: 3;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Name = styled.div`
  padding: 15px 0;
  font-size: 22px;
  font-weight: 600;
  color: var(--black);
`;

const SavedCard = styled.div`
  width: 100%;
  margin: auto;
  padding: 20px;
  background-color: var(--white);
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled.div`
  p {
    font-size: 12px;
    font-weight: 400;
    color: var(--dark-gray);
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: var(--black);
`;

const Money = styled.p`
  font-size: 22px;
  font-weight: 600;
  color: var(--black);
`;

const Point = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--dark-gray);
`;

const LevelCard = styled.div`
  width: 100%;
  margin: auto;
  padding: 20px;
  background-color: var(--white);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LevelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div > span {
    font-size: 12px;
    color: var(--dark-gray);
    margin-left: 8px;
  }
`;
