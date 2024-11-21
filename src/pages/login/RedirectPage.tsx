import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/instance.ts';

export default function RedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 인증 코드 추출
    const code = new URL(window.location.href).searchParams.get('code');
    // console.log(code);

    if (!code) {
      console.error('인증 코드가 없습니다.');
      navigate('/login');
      return;
    }

    const kakaoLogin = async () => {
      try {
        // 백엔드로 인증 코드 전송
        const response = await axiosInstance.get(
          `/auth/login/kakao?code=${code}`
        );

        // console.log(response);
        // console.log(response.data);

        // 응답으로 받은 토큰을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', response.data.accessToken);
        // console.log('토큰 있는디용?');

        // 필요한 경우 리프레시 토큰도 저장
        // if (response.data.refreshToken) {
        //   localStorage.setItem('refreshToken', response.data.refreshToken);
        // }

        // 로그인 성공 후 메인 페이지로 이동
        navigate('/');
      } catch (error) {
        // alert(`카카오 로그인 처리 중 에러 발생 ${error}`);
        console.log(error);
        // 에러 발생시 로그인 페이지로 리다이렉트
        if (!localStorage.getItem('accessToken')) {
          navigate('/login', {
            state: {
              error: '로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
            },
          });
        }
      }
    };

    kakaoLogin();
  }, [navigate]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <p className="text-lg">카카오 로그인 처리 중...</p>
      </div>
    </div>
  );
}
