import styled from 'styled-components';

interface HeaderProps {
  title: string;
  iconSrc: string;
  alt: string;
}

const Header = ({ title, iconSrc, alt }: HeaderProps) => {
  return (
    <HeaderContainer>
      <h1>{title}</h1>
      <img src={iconSrc} alt={alt} />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  background-color: var(--white);
  position: fixed;
  z-index: 1000;

  h1 {
    font-size: 22px;
    font-weight: 600;
  }
`;
