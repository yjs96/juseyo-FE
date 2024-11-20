// import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MainFrame from '@/components/MainFrame';
import { Button } from '@/components/ui/button';

export default function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, answers, param } = location.state || {
    score: 0,
    answers: [],
    param: 0,
  };

  const isPassed = score >= answers.length * 0.7;

  const handleRetry = () => {
    navigate(`/edu/${param}`);
  };

  return (
    <MainFrame>
      <ResultContainer>
        <ResultIconFrame>
          {isPassed ? (
            <CheckIcon>
              <i className="fa-solid fa-check"></i>
            </CheckIcon>
          ) : (
            <XIcon>
              <i className="fa-solid fa-xmark"></i>
            </XIcon>
          )}
        </ResultIconFrame>
        <ScoreDisplay>{(score / answers.length) * 100}점</ScoreDisplay>
        <ResultMessage>
          {isPassed ? '통과했어요! 👏' : '다시 한번 도전해보세요! 💪'}
        </ResultMessage>
        <ButtonFrame>
          {!isPassed && (
            <Button variant={'destructive'} onClick={handleRetry}>
              다시 도전하기
            </Button>
          )}
          <Button onClick={() => navigate('/edu')}>돌아가기</Button>
        </ButtonFrame>
      </ResultContainer>
    </MainFrame>
  );
}

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
`;

const ResultIconFrame = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const CheckIcon = styled.div`
  width: 120px;
  height: 120px;
  background-color: var(--background);
  border-radius: 100%;
  color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
`;

const XIcon = styled(CheckIcon)`
  color: var(--red);
`;

const ScoreDisplay = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const ButtonFrame = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ResultMessage = styled.div`
  font-size: 18px;
  margin-bottom: 24px;
`;
