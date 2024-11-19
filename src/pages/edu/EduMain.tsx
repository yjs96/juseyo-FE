// import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import Header from '@/components/Header';
import MainFrame from '@/components/MainFrame';
import NavBar from '@/components/NavBar';

import EduVideo from './EduVideo';
import EduNews from './EduNews';

interface TabProps {
  $active: boolean;
}

export default function EduMain() {
  const [isVideo, setIsVideo] = useState<boolean>(true);

  return (
    <>
      <NavBar />
      <Header title="금융 교육" iconSrc="/icons/search.svg" alt="검색" />
      <MainFrame $headbar $navbar>
        <TabFrame>
          <Tab $active={isVideo} onClick={() => setIsVideo(true)}>
            영상
          </Tab>
          <Tab $active={!isVideo} onClick={() => setIsVideo(false)}>
            뉴스
          </Tab>
        </TabFrame>
        {isVideo ? <EduVideo /> : <EduNews />}
      </MainFrame>
    </>
  );
}

const TabFrame = styled.div`
  width: 100%;
  display: flex;
`;

const Tab = styled.div<TabProps>`
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid
    ${(props) => (props.$active ? 'var(--primary)' : 'transparent')};
  font-weight: 500;
`;
