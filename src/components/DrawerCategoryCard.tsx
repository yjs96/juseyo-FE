import styled from 'styled-components';

interface DrawerCategoryCardProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
}

interface CategoryInfo {
  color: string;
  src: string;
}

const DrawerCategoryCard = ({
  category,
  isSelected,
  onClick
}: DrawerCategoryCardProps) => {
  const { color, src } = getCategoryInfo(category);

  return (
    <Container color={color} $isSelected={isSelected} onClick={onClick}>
      <ImageContainer>
        <img src={src} alt={category} className="w-5 h-5" />
      </ImageContainer>
      <p>{category}</p>
    </Container>
  );
};

export default DrawerCategoryCard;

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

const Container = styled.button<{ color: string; $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px;
  border-radius: 12px;
  background-color: ${(props) => props.color};
  transition: all 0.2s ease-in-out;
  filter: ${(props) => (props.$isSelected ? 'brightness(72%)' : 'none')};

  p {
    font-size: 16px;
    font-weight: 500;
    color: var(--black);
  }
`;

const ImageContainer = styled.div`
  border-radius: 100px;
  padding: 8px;
  background-color: var(--white);
  opacity: 80%;
`;
