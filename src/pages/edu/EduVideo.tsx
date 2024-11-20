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
      img: '/images/quiz/1.jpg',
      title: '신나는 신용생활 [EP.1]',
      description:
        '신용의 원리와 중요성에 대해 이해하고 어떻게 하면 신용을 쌓을 수 있을지 알아보도록 해요.🔎',
      videoUrl: 'https://www.youtube.com/watch?v=md1-qbKR_eI',
    },
    {
      index: 2,
      img: '/images/quiz/2.png',
      title: '신나는 신용생활 [EP.2]',
      description:
        '용돈을 어떻게 사용하고, 저축해야 하는지 이해하고 똑똑하게 소비하는 방법을 알아보도록 해요.🔎',
      videoUrl: 'https://www.youtube.com/watch?v=DBnxSHPWN94',
    },
    {
      index: 3,
      img: '/images/quiz/3.jpg',
      title: '게임으로 배우는 초등학생 청소년경제금융교육',
      description:
        '금융 상식, 합리적인 소비 습관을 알리기 위해 숭실대 교육봉사동아리 어리회와 함께 동표가 쉽고 재미있게 알려주는 금융 교육시간🤓',
      videoUrl: 'https://www.youtube.com/watch?v=NbC6gR_uTc0',
    },
    {
      index: 4,
      img: '/images/quiz/4.png',
      title: '숭실대가 함께하는 초등학생 금융교육 게임',
      description:
        '숭실대 Z들과 함께 금융에 대해 인터뷰도 나눠보고, 어리회와 함께 청소년 경제금융교육을 기획해 일일 금융교육 선생님으로 활약해볼까요?✨',
      videoUrl: 'https://www.youtube.com/watch?v=NDnJ8kbgYaQ',
    },
    {
      index: 5,
      img: '/images/quiz/5.jpg',
      title: '똑똑한 신용생활 - 초등생 경제금융교육 현장',
      description:
        '인천 산곡남초등학교에서 진행한 ⭐똑똑한 신용생활⭐ 금융교육 현장속으로 고고!🎈🎈🎈',
      videoUrl: 'https://www.youtube.com/watch?v=Jn7dIdsVQEk',
    },
  ];
  return (
    <>
      <VideoFrame>
        {eduVideoList.map((video, idx) => (
          <VideoContainer>
            <VideoContent key={idx} {...video} />
          </VideoContainer>
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
  gap: 16px;
  overflow-y: scroll;
  background-color: var(--background);
`;

const VideoContainer = styled.div`
  background-color: var(--white);
  border-radius: 12px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.02);

  div {
    border-bottom: none;
  }

  div > .info-frame {
    padding: 16px 16px 0 16px;
  }
`;
