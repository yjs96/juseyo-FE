import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function SignUpSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <SuccessFrame>
        <IconFrame>
          <CheckIcon>
            <i className="fa-solid fa-check"></i>
          </CheckIcon>
          <span>회원가입이 완료되었어요</span>
        </IconFrame>
        <SignupButton size="full" onClick={() => navigate('/')}>
          확인
        </SignupButton>
      </SuccessFrame>
    </>
  );
}

const SuccessFrame = styled.div`
  height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconFrame = styled.div`
  margin-top: -32px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  flex-direction: column;
  align-items: center;
  gap: 28px;

  span {
    font-size: 18px;
    font-weight: 500;
    color: var(--black);
  }
`;

const CheckIcon = styled.div`
  width: 120px;
  height: 120px;
  background-color: var(--background);
  border-radius: 100%;
  color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
`;

const SignupButton = styled(Button)`
  position: absolute;
  bottom: 48px;
  width: calc(100% - 10.26%);
`;
