import styled from 'styled-components';

interface MissionCardProps {
  title: string;
  category: string;
  amount: number;
  daedline: string;
}

interface CategoryInfo {
  color: string;
  src: string;
}

const MissionCard = ({
  title,
  category,
  amount,
  daedline,
}: MissionCardProps) => {
  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);

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
    <Container color={color}>
      <TopContainer>
        <CategoryBadge>
          <img src={src} alt={category} />
          <span>{category}</span>
        </CategoryBadge>
        <TextContainer>
          <h1>{title}</h1>
          <p>{getTimeRemaining(daedline)}</p>
        </TextContainer>
      </TopContainer>
      <BottomContainer>
        <img src="/icons/point.svg" alt="포인트" />
        <p>{amount.toLocaleString()}</p>
      </BottomContainer>
    </Container>
  );
};

export default MissionCard;

const getCategoryInfo = (category: string): CategoryInfo => {
  switch (category) {
    case '일상':
      return { color: 'var(--primary)', src: '/images/daily.png' };
    case '학습':
      return { color: 'var(--blue)', src: '/images/study.png' };
    case '집안일':
      return { color: 'var(--green)', src: '/images/housework.png' };
    case '심부름':
      return { color: 'var(--gray)', src: '/images/errand.png' };
    case '기타':
      return { color: 'var(--orange)', src: '/images/etc.png' };
  }
  return { color: 'var(--primary)', src: '/images/daily.png' };
};

const Container = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: calc(50% - 8px);
  border-radius: 12px;
  padding: 16px;
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
