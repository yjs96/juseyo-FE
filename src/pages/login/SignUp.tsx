import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import toast from 'react-hot-toast';

import HeaderBack from '@/components/HeaderBack';
import MainFrame from '@/components/MainFrame';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignUp() {
  const [isParent, setIsParent] = useState<boolean>(true);
  const [parentName, setParentName] = useState<string>('');
  const [parentId, setParentId] = useState<string>('');
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [account, setAccount] = useState<string>('');
  const param = useParams().id;

  const navigate = useNavigate();

  useEffect(() => {
    setIsParent(param === undefined);

    if (param != undefined) {
      const temp = decodeURIComponent(atob(param));
      const asObj = JSON.parse(temp);
      setParentName(asObj.userName);
      setParentId(asObj.parentId);
    }
  }, [param]);

  const handleButtonClick = (role: string) => {
    if (role == 'parent' && !isParent) {
      toast.error('초대링크 가입은 자녀만 가능해요');
    }
    if (role == 'child' && isParent) {
      toast.error('자녀 가입은 초대링크로 가능해요');
    }
  };

  const handleNameValid = () => {
    if (!isNameValid) {
      setIsNameValid(true);
      toast.success('사용 가능한 이메일이에요');
    }
  };

  const isFormValid = (): boolean => {
    const hasAllInputs =
      email.trim() !== '' && password.trim() !== '' && account.trim() !== '';
    return isNameValid && hasAllInputs;
  };

  const handleSuccess = () => {
    if (isFormValid()) {
      navigate('/signup/success');
    }
  };

  return (
    <>
      <HeaderBack title="회원가입" />
      <MainFrame $headbar $padded>
        <br></br>
        <Label htmlFor="email">이메일</Label>
        <InputWithButton>
          <StyledInput
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsNameValid(false);
            }}
          />
          <Button
            variant={isNameValid ? 'destructive' : 'default'}
            onClick={() => handleNameValid()}
          >
            중복확인
          </Button>
        </InputWithButton>
        <br></br>
        <Label htmlFor="password">비밀번호</Label>
        <StyledInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <Label htmlFor="account">계좌번호</Label>
        <StyledInput
          id="account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <br></br>
        {!isParent && (
          <>
            <Label htmlFor="parentName">부모님 성함</Label>
            <StyledInput id="parentName" disabled placeholder={parentName} />
            <br></br>
            <Label htmlFor="parentId">부모님 아이디</Label>
            <StyledInput id="parentId" disabled placeholder={parentId} />
          </>
        )}
        <br></br>
        <Label>유형</Label>
        <ButtonFrame>
          <Button
            onClick={() => handleButtonClick('parent')}
            variant={isParent ? 'default' : 'destructive'}
          >
            부모
          </Button>
          <Button
            onClick={() => handleButtonClick('child')}
            variant={isParent ? 'destructive' : 'default'}
          >
            자녀
          </Button>
        </ButtonFrame>
        <br></br>
        <SignupButton
          size="full"
          variant={isFormValid() ? 'default' : 'destructive'}
          onClick={() => handleSuccess()}
        >
          가입하기
        </SignupButton>
      </MainFrame>
    </>
  );
}

const StyledInput = styled(Input)`
  margin-top: 6px;
`;

const InputWithButton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  Button {
    margin-top: 6px;
    height: 40px;
  }
`;

const ButtonFrame = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 6px;

  Button {
    flex: 1;
    height: 40px;
  }
`;

const SignupButton = styled(Button)`
  position: absolute;
  bottom: 48px;
  width: calc(100% - 10.26%);
`;
