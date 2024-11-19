// import React from 'react';
import styled from 'styled-components';

import VideoContent from '@/components/VideoContent';

interface VideoInfo {
  index: number;
  img: string;
  title: string;
  description: string;
  videoUrl: string;
}

export default function EduVideo() {
  const eduVideoList: VideoInfo[] = [
    {
      index: 1,
      img: '/images/eduvideoimg.jpg',
      title: '초등돌봄교실 [EP.1]',
      description:
        'KB국민카드 2024 초등돌봄교실 금융교육 신나는 신용생활 - [EP.1] 신용이 중요해 KB국민카드 2024 초등돌봄교실 금융교육',
      videoUrl: 'https://www.youtube.com/watch?v=md1-qbKR_eI',
    },
    {
      index: 2,
      img: '/images/eduvideoimg.jpg',
      title: '초등돌봄교실 [EP.2]',
      description:
        'KB국민카드 2024 초등돌봄교실 금융교육 신나는 신용생활 - [EP.1] 신용이 중요해 KB국민카드 2024 초등돌봄교실 금융교육',
      videoUrl: 'https://www.youtube.com/watch?v=md1-qbKR_eI',
    },
    {
      index: 3,
      img: '/images/eduvideoimg.jpg',
      title: '초등돌봄교실 [EP.3]',
      description:
        'KB국민카드 2024 초등돌봄교실 금융교육 신나는 신용생활 - [EP.1] 신용이 중요해 KB국민카드 2024 초등돌봄교실 금융교육',
      videoUrl: 'https://www.youtube.com/watch?v=md1-qbKR_eI',
    },
    {
      index: 3,
      img: '/images/eduvideoimg.jpg',
      title: '초등돌봄교실 [EP.3]',
      description:
        'KB국민카드 2024 초등돌봄교실 금융교육 신나는 신용생활 - [EP.1] 신용이 중요해 KB국민카드 2024 초등돌봄교실 금융교육',
      videoUrl: 'https://www.youtube.com/watch?v=md1-qbKR_eI',
    },
    {
      index: 3,
      img: '/images/eduvideoimg.jpg',
      title: '초등돌봄교실 [EP.3]',
      description:
        'KB국민카드 2024 초등돌봄교실 금융교육 신나는 신용생활 - [EP.1] 신용이 중요해 KB국민카드 2024 초등돌봄교실 금융교육',
      videoUrl: 'https://www.youtube.com/watch?v=md1-qbKR_eI',
    },
  ];
  return (
    <>
      <VideoFrame>
        {eduVideoList.map((video, idx) => (
          <VideoContent key={idx} {...video} />
        ))}
      </VideoFrame>
    </>
  );
}

const VideoFrame = styled.div`
  height: calc(100% - 40px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: scroll;
`;
