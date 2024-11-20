import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface HeaderProps {
  title: string;
}

const HeaderBack = ({ title }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <i onClick={() => navigate(-1)} className="fa-solid fa-chevron-left"></i>
      <h1>{title}</h1>
    </HeaderContainer>
  );
};

export default HeaderBack;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  background-color: var(--white);
  position: fixed;
  z-index: 3;
  gap: 8px;

  h1 {
    font-size: 22px;
    font-weight: 600;
  }
`;
