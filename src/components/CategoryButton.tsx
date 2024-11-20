import styled from 'styled-components';

interface CategoryButtonProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryButton = ({
  category,
  isSelected,
  onClick
}: CategoryButtonProps) => {
  return (
    <Button $isSelected={isSelected} onClick={onClick}>
      {category}
    </Button>
  );
};

export default CategoryButton;

interface ButtonProps {
  $isSelected: boolean;
}

const Button = styled.button<ButtonProps>`
  font-size: 12px;
  font-weight: 400;
  border: 1px solid var(--destructive);
  width: fit-content;
  border-radius: 16px;
  padding: 3px 12px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? 'var(--destructive)' : 'var(--white)'};
  color: ${({ $isSelected }) =>
    $isSelected ? 'var(--white)' : 'var(--destructive)'};
`;
