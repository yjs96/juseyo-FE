import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface SectionHeaderProps {
  title: string;
  path: string;
}

const SectionHeader = ({ title, path }: SectionHeaderProps) => {
  return (
    <Container>
      <h1>{title}</h1>
      <Link to={path}>
        <img src="/icons/chevron.svg" alt="이동" />
      </Link>
    </Container>
  );
};

export default SectionHeader;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 18px;
    font-weight: 600;
    color: var(--black);
  }
`;
