import styled from 'styled-components';

interface FinishedMissionCardProps {
  content: string;
  category: string;
  point: number;
  date: string;
  isCompleted: boolean;
}

interface CategoryInfo {
  color: string;
  src: string;
}

const FinishedMissionCard = ({
  content,
  category,
  point,
  date,
  isCompleted
}: FinishedMissionCardProps) => {
  const getTimeRemaining = (finishedDate: string) => {
    const now = new Date();
    const deadlineDate = new Date(finishedDate);

    const timeDifference = deadlineDate.getTime() - now.getTime();

    const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (hoursRemaining <= 24 && hoursRemaining > 0)
      return `${hoursRemaining}시간 남음`;
    if (daysRemaining >= 1) return `D-${daysRemaining}`;
    if (hoursRemaining <= 0)
      return `${deadlineDate.getMonth() + 1}월 ${deadlineDate.getDate()}일`;
  };

  const { color, src } = getCategoryInfo(category);

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
            <p>{getTimeRemaining(date)}</p>
          </TextContainer>
        </TopContainer>
        <BottomContainer>
          <img src="/icons/point.svg" alt="포인트" />
          <p>{point.toLocaleString()}</p>
        </BottomContainer>
      </MissionContainer>
      <ButtonFrame>
        <Button className="text-[var(--dark-gray)]">
          {isCompleted ? '성공한 미션' : '실패한 미션'}
        </Button>
      </ButtonFrame>
    </Container>
  );
};

export default FinishedMissionCard;

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
