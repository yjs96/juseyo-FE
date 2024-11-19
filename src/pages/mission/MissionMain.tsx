// import React from 'react';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import TabBar from '@/components/TabBar';

export default function MissionMain() {
  return (
    <>
      <NavBar />
      <Header title="용돈 미션" iconSrc="/icons/plus.svg" alt="추가" />
      <TabBar />
    </>
  );
}
