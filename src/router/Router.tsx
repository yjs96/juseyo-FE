import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '@/pages/main/MainPage';
import MissionMain from '@/pages/mission/MissionMain';
import EduMain from '@/pages/edu/EduMain';
import MyPage from '@/pages/mypage/MyPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/mission" element={<MissionMain />}></Route>
        <Route path="/edu" element={<EduMain />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
