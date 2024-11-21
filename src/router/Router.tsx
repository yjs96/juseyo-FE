import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import MainPage from '@/pages/main/MainPage';
import MissionChild from '@/pages/mission/MissionChild';
import EduMain from '@/pages/edu/EduMain';
import MyPage from '@/pages/mypage/MyPage';

import EduQuiz from '@/pages/edu/EduQuiz';
import QuizResult from '@/pages/edu/QuizResult';
import SignUp from '@/pages/login/SignUp';
import SignUpSuccess from '@/pages/login/SignUpSuccess';
import LoginPage from '@/pages/login/LoginPage';
import RedirectPage from '@/pages/login/RedirectPage';
import MissionParents from '@/pages/mission/MissionParents';
import StatsPage from '@/pages/statistics/StatsPage';

function ThemeColorManager() {
  const location = useLocation();

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (metaThemeColor) {
      if (location.pathname === '/') {
        metaThemeColor.setAttribute('content', '#FEDE5B');
      } else {
        metaThemeColor.setAttribute('content', '#FDFDFD');
      }
    }
  }, [location]);

  return null;
}

export default function Router() {
  return (
    <BrowserRouter>
      <ThemeColorManager />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/mission/child" element={<MissionChild />}></Route>
        <Route path="/mission/parents" element={<MissionParents />}></Route>
        <Route path="/edu" element={<EduMain />}></Route>
        <Route path="/edu/:id" element={<EduQuiz />}></Route>
        <Route path="/edu/result" element={<QuizResult />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signup/:id" element={<SignUp />}></Route>
        <Route path="/signup/success" element={<SignUpSuccess />}></Route>
        <Route path="/redirect" element={<RedirectPage />}></Route>
        <Route path="/stats" element={<StatsPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
