import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import MainFrame from '@/components/MainFrame';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { ProgressQuiz } from '@/components/ui/progress-quiz';
import HeaderBack from '@/components/HeaderBack';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

const quizData: QuizQuestion[] = [
  {
    question: '금융생활에서 신용이란 무엇을 의미하나요?',
    options: ['돈을 잘 벌 수 있는 능력', '돈을 빌리고 잘 갚을 수 있는 능력'],
    correct: 1,
  },
  {
    question: '신용을 쌓는 것은 무엇과 같다고 했나요?',
    options: ['계단을 오르는 것', '미끄럼틀을 타는 것'],
    correct: 0,
  },
  {
    question: '도서관에서 책을 빌릴 때 신용을 쌓으려면 어떻게 해야 하나요?',
    options: [
      '반납일을 지키고 깨끗하게 사용하기',
      '친구들과 함께 보기 위해 오래 가지고 있기',
    ],
    correct: 0,
  },
  {
    question: '친구에게 학용품을 빌렸을 때 신용을 쌓으려면 어떻게 해야 하나요?',
    options: [
      '다음에 또 빌리기 위해 조금 더 가지고 있기',
      '조심히 사용하고 약속한 날짜에 돌려주기',
    ],
    correct: 1,
  },
  {
    question: '학교생활에서 신용을 쌓는 방법은 무엇인가요?',
    options: ['지각하지 않고 제시간에 등교하기', '숙제는 다음날에 하기'],
    correct: 0,
  },
  {
    question: '약속을 지키기 어려울 때는 어떻게 해야 하나요?',
    options: ['그냥 모른척하기', '미리 알리고 상황 설명하기'],
    correct: 1,
  },
  {
    question: '신용카드의 특징은 무엇인가요?',
    options: [
      '현금이 없어도 물건을 살 수 있다',
      '한도 없이 무제한으로 사용할 수 있다',
    ],
    correct: 0,
  },
  {
    question: '신용카드 사용 시 주의할 점은 무엇인가요?',
    options: ['갚을 수 있는 만큼만 사용하기', '원하는 것은 모두 구매하기'],
    correct: 0,
  },
  {
    question: '신용카드 대금을 정해진 날짜에 못 갚으면 어떻게 되나요?',
    options: ['더 많은 돈을 갚아야 한다', '다음달에 갚아도 괜찮다'],
    correct: 0,
  },
  {
    question: '일상생활에서 신용을 쌓기 위해 기억해야 할 가장 중요한 것은?',
    options: ['약속 지키기', '다른 사람 탓하기'],
    correct: 0,
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
      <HeaderBack title="퀴즈풀기" />
      <ProgressQuiz className="absolute top-16 z-10" value={progress} />
      <MainFrame $navbar>
        <QuestionFrame>
          <div>{currentQuestion + 1}번 문제</div>
          {quizData[currentQuestion].question}
        </QuestionFrame>
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
  align-items: center;
  padding: 16% 32px 0 32px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  flex-direction: column;
  gap: 12px;
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
