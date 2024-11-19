import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import MainPage from '@/pages/main/MainPage';
import MissionMain from '@/pages/mission/MissionMain';
import EduMain from '@/pages/edu/EduMain';
import MyPage from '@/pages/mypage/MyPage';

import EduQuiz from '@/pages/edu/EduQuiz';
import QuizResult from '@/pages/edu/QuizResult';

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
        <Route path="/mission" element={<MissionMain />}></Route>
        <Route path="/edu" element={<EduMain />}></Route>
        <Route path="/edu/:id" element={<EduQuiz />}></Route>
        <Route path="/edu/result" element={<QuizResult />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
