import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface VideoInfo {
  index: number;
  img: string;
  title: string;
  description: string;
  videoUrl: string;
}

export default function VideoContent({
  index,
  img,
  title,
  description,
  videoUrl,
}: VideoInfo) {
  const navigate = useNavigate();
  const handleWatchVideo = (videoUrl: string) => {
    // YouTube 비디오 ID 추출
    const videoId = videoUrl.split('v=')[1];

    // YouTube 딥링크 URL 생성
    const youtubeDeepLink = `vnd.youtube://${videoId}`;
    const webUrl = videoUrl;

    // 딥링크로 앱 열기 시도
    window.location.href = youtubeDeepLink;

    // 앱이 없는 경우를 대비해 시간 지연 후 웹으로 이동
    const timeout = setTimeout(() => {
      window.location.href = webUrl;
    }, 1000);

    // 페이지를 벗어나면 타임아웃 클리어
    window.onblur = () => {
      clearTimeout(timeout);
    };
  };

  return (
    <>
      <ContentFrame>
        <InfoFrame>
          <Thumbnail>
            <img src={img} alt="edvideo" />
          </Thumbnail>
          <Description>
            <div>{title}</div>
            <span>{description}</span>
          </Description>
        </InfoFrame>
        <ButtonFrame>
          <Button onClick={() => handleWatchVideo(videoUrl)}>보러가기</Button>
          <Button onClick={() => navigate(`/edu/${index}`)}>퀴즈풀기</Button>
        </ButtonFrame>
      </ContentFrame>
    </>
  );
}

const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const InfoFrame = styled.div`
  display: flex;
  gap: 16px;
`;

const Thumbnail = styled.div`
  flex: 0.84;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Description = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;

  div {
    font-weight: 600;
  }

  span {
    color: var(--dark-gray);
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; // 2줄까지만 표시
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const ButtonFrame = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);

  :first-child {
    border-right: 1px solid var(--border);
  }
`;

const Button = styled.div`
  flex: 1;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--dark-gray);
  font-size: 14;
  font-weight: 500;
`;
