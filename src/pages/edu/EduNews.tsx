// import React from 'react';
import styled from 'styled-components';

export default function EduNews() {
  const cardNewsList = [
    {
      index: 1,
      imgUrl: '/images/card-news.jpg',
      title: '카드뉴스 제목1',
      description: '2024년 11월 18일',
      url: 'https://www.naver.com',
    },
    {
      index: 2,
      imgUrl: '/images/card-news.jpg',
      title: '카드뉴스 제목2',
      description: '카드뉴스 설명설명설명설명설명설명설명설명',
      url: 'https://www.naver.com',
    },
    {
      index: 3,
      imgUrl: '/images/card-news.jpg',
      title: '카드뉴스 제목3',
      description: '2024년 11월 18일',
      url: 'https://www.naver.com',
    },
    {
      index: 3,
      imgUrl: '/images/card-news.jpg',
      title: '카드뉴스 제목3',
      description: '2024년 11월 18일',
      url: 'https://www.naver.com',
    },
    {
      index: 3,
      imgUrl: '/images/card-news.jpg',
      title: '카드뉴스 제목3',
      description: '2024년 11월 18일',
      url: 'https://www.naver.com',
    },
    {
      index: 3,
      imgUrl: '/images/card-news.jpg',
      title: '카드뉴스 제목3',
      description: '2024년 11월 18일',
      url: 'https://www.naver.com',
    },
    {
      index: 3,
      imgUrl: '/images/card-news.jpg',
      title: '카드뉴스 제목3',
      description: '2024년 11월 18일',
      url: 'https://www.naver.com',
    },
    {
      index: 3,
      imgUrl: '/images/card-news.jpg',
      title: '카드뉴스 제목3',
      description: '2024년 11월 18일',
      url: 'https://www.naver.com',
    },
  ];

  const toArticle = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <>
      <CardFrame>
        {cardNewsList.map((card, idx) => (
          <Card key={idx} onClick={() => toArticle(card.url)}>
            <Thumbnail>
              <img src={card.imgUrl} alt={card.title} />
            </Thumbnail>
            <Description>
              <div>{card.title}</div>
              <span>{card.description}</span>
            </Description>
          </Card>
        ))}
      </CardFrame>
    </>
  );
}

const CardFrame = styled.div`
  height: calc(100% - 40px);
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  overflow-y: scroll;
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  gap: 8px;
`;

const Thumbnail = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;

  div {
    font-weight: 500;
  }

  span {
    font-size: 12px;
    color: var(--dark-gray);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; // 2줄까지만 표시
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;
