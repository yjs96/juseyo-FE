import styled from 'styled-components';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';

interface HomeDashBoardProps {
  name: string;
  level: number;
  money: number;
  point: number;
  successfulMisson: number;
}

const HomeDashBoard = ({
  name,
  level,
  money,
  point,
  successfulMisson,
}: HomeDashBoardProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setProgress(33);
    }, 240);
  }, []);
  return (
    <HomeDashboard>
      <Name>{name}님,</Name>
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
            <Title>현재 레벨 {level}</Title>
            <Point>다음 레벨까지 {point}P</Point>
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
`;
