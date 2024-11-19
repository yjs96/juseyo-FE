// import React from "react";
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';

export default function MyPage() {
  return (
    <>
      <NavBar />
      <Header title="마이페이지" iconSrc="/icons/notification.svg" alt="알림" />
    </>
  );
}
