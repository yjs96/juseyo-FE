import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import MainFrame from '@/components/MainFrame';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { ProgressQuiz } from '@/components/ui/progress-quiz';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

const quizData: QuizQuestion[] = [
  {
    question: '문제 1',
    options: ['답변 1-1', '답변 1-2'],
    correct: 0,
  },
  {
    question: '문제 2',
    options: ['답변 2-1', '답변 2-2'],
    correct: 1,
  },
  {
    question: '문제 3',
    options: ['답변 3-1', '답변 3-2'],
    correct: 1,
  },
  {
    question: '문제 4',
    options: ['답변 4-1', '답변 4-2'],
    correct: 1,
  },
  {
    question: '문제 5',
    options: ['답변 5-1', '답변 5-2'],
    correct: 1,
  },
  {
    question: '문제 6',
    options: ['답변 6-1', '답변 6-2'],
    correct: 1,
  },
  {
    question: '문제 7',
    options: ['답변 7-1', '답변 7-2'],
    correct: 1,
  },
  {
    question: '문제 8',
    options: ['답변 8-1', '답변 8-2'],
    correct: 1,
  },
  {
    question: '문제 9',
    options: ['답변 9-1', '답변 9-2'],
    correct: 1,
  },
  {
    question: '문제 10',
    options: ['답변 10-1', '답변 10-2'],
    correct: 1,
  },
];

export default function EduQuiz() {
  const navigate = useNavigate();
  const param = useParams().id;
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const totalQuestions = quizData.length;

  const handleAnswer = (selectedOption: number) => {
    const newAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newAnswers);

    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore(newAnswers);
      navigate('/edu/result', { state: { score, param, answers: newAnswers } });
    }
  };

  const calculateScore = (answers: number[]) => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].correct ? 1 : 0);
    }, 0);
  };

  const progress = ((currentQuestion + 1) / totalQuestions) * 100 - 10;

  return (
    <>
      <ProgressQuiz value={progress} />
      <MainFrame $navbar>
        <QuestionFrame>{quizData[currentQuestion].question}</QuestionFrame>
        <ButtonContainer>
          {quizData[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              className="h-20 w-full"
              onClick={() => handleAnswer(index)}
            >
              {option}
            </Button>
          ))}
        </ButtonContainer>
      </MainFrame>
      <NavBar />
    </>
  );
}

const QuestionFrame = styled.div`
  width: 100%;
  height: calc(100% - 216px - 10px - 65px);
  margin-top: 75px;
  display: flex;
  justify-content: center;
  padding-top: 16%;
  font-size: 20px;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  gap: 24px;
`;
