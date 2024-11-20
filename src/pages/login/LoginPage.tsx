import styled from 'styled-components';

export default function LoginPage() {
  const kakaoLoginRequestCodeHandler = async () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_REST_API_KEY
    }&redirect_uri=${
      import.meta.env.VITE_FRONT_BASE
    }/redirect&response_type=code`;
  };

  return (
    <>
      <MainFrame>
        <LoginFrame>
          <Logo>
            <img src="/icons/icon-256x256.png" alt="" />
          </Logo>
          <DescFrame>
            <div>주세요</div>
            <span>작은 미션으로 시작하는 우리 아이 경제교육</span>
          </DescFrame>
          <ButtonFrame>
            <KakaoButton onClick={kakaoLoginRequestCodeHandler}>
              카카오 로그인
              <img src="/images/kakao-logo.png" alt="" />
            </KakaoButton>
          </ButtonFrame>
        </LoginFrame>
      </MainFrame>
    </>
  );
}

const MainFrame = styled.div`
  height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginFrame = styled.div`
  width: 100%;
  margin-top: -64px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 16px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DescFrame = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  div {
    font-size: 28px;
    font-weight: 500;
  }

  span {
    color: var(--dark-gray);
  }
`;

const ButtonFrame = styled.div`
  position: relative;
  margin-top: 60px;
  width: 100%;
  padding: 0 20px;
`;

const KakaoButton = styled.div`
  position: relative;
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fee500;
  border-radius: 8px;
  font-weight: 500;
  img {
    position: absolute;
    left: 12px;
    height: 28px;
  }
`;
