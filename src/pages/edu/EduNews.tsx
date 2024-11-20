// import React from 'react';
import styled from 'styled-components';

export default function EduNews() {
  const cardNewsList = [
    {
      index: 1,
      imgUrl: '/images/cardnews/01.png',
      title: '막상 나에게 닥치면 피하기 어려운 금융사기[금융위원회X뱀비]',
      date: '2024년 11월 13일',
      url: 'https://www.fsc.go.kr/edu/cardnews?cnId=2524',
    },
    {
      index: 2,
      imgUrl: '/images/cardnews/02.png',
      title: '11월 1주 #금융정책 살펴보기',
      date: '2024년 11월 11일',
      url: 'https://www.fsc.go.kr/no040101?cnId=2518',
    },
    {
      index: 3,
      imgUrl: '/images/cardnews/03.png',
      title:
        '교육, 문화, 복지분야 등 종이 상품권·카드바우처를 휴대폰으로 손쉽게 이용하세요',
      date: '2024년 11월 06일',
      url: 'https://www.fsc.go.kr/no040101?cnId=2514',
    },
    {
      index: 4,
      imgUrl: '/images/cardnews/04.png',
      title: '불법사금융 속을 뻔한 ssul #불법사금융 예방하기 [금융위 네컷툰]',
      date: '2024년 10월 31일',
      url: 'https://www.fsc.go.kr/edu/cardnews?cnId=2502',
    },
    {
      index: 5,
      imgUrl: '/images/cardnews/05.png',
      title:
        '불완전판매 피해, 금융소비자보호법으로 보호받아요! 📢 금융 초보를 위한 #금융생활Talk 20.',
      date: '2024년 10월 21일',
      url: 'https://www.fsc.go.kr/edu/cardnews?cnId=2483',
    },
    {
      index: 6,
      imgUrl: '/images/cardnews/06.png',
      title: '일상생활에서 개인정보 지키는 꿀팁!',
      date: '2024년 09월 30일',
      url: 'https://www.kinfa.or.kr/notificationPromotion/cardNewsDetail.do?seq=27725',
    },
    {
      index: 7,
      imgUrl: '/images/cardnews/07.png',
      title: '금융위원회와 함께 다시 보는 동화 백설공주편',
      date: '2024년 09월 27일',
      url: 'https://www.fsc.go.kr/edu/cardnews?cnId=2457',
    },
    {
      index: 8,
      imgUrl: '/images/cardnews/08.png',
      title:
        '안전한 금융거래를 위한 6가지 유의사항, 꼭 알아두세요! [금융프렌즈]',
      date: '2024년 09월 25일',
      url: 'https://www.fsc.go.kr/edu/cardnews?curPage=3&cnId=2457',
    },
    {
      index: 9,
      imgUrl: '/images/cardnews/09.png',
      title: '금융위원회와 함께 다시 보는 동화 아기돼지 삼형제편',
      date: '2024년 09월 19일',
      url: 'https://www.fsc.go.kr/edu/cardnews?cnId=2439',
    },
    {
      index: 10,
      imgUrl: '/images/cardnews/10.png',
      title:
        '금융이 인공지능을 만났다고? 코리아핀테크위크2024 방문툰 [금융프렌즈]',
      date: '2024년 09월 05일',
      url: 'https://www.fsc.go.kr/edu/cardnews?cnId=2414',
    },
    {
      index: 11,
      imgUrl: '/images/cardnews/11.png',
      title:
        '보이스피싱 피해 사전 차단하기! 금융 초보를 위한 #금융생활Talk 13.',
      date: '2024년 09월 02일',
      url: 'https://www.fsc.go.kr/edu/cardnews?curPage=4&cnId=2414',
    },
  ];

  const toArticle = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <>
      <MainFrame>
        <CardFrame>
          {cardNewsList.map((card, idx) => (
            <Card key={idx} onClick={() => toArticle(card.url)}>
              <Thumbnail>
                <img src={card.imgUrl} alt={card.title} />
              </Thumbnail>
              <Description>
                <div>{card.title}</div>
                <span>{card.date}</span>
              </Description>
            </Card>
          ))}
        </CardFrame>
      </MainFrame>
    </>
  );
}

const MainFrame = styled.div`
  height: calc(100% - 40px);
  overflow-y: scroll;
  background-color: var(--background);
`;

const CardFrame = styled.div`
  max-height: calc(100% - 40px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 12px;
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px;
  gap: 8px;
  background-color: var(--white);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.02);
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
  justify-content: space-between;

  div {
    font-weight: 500;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; // 2줄까지만 표시
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
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
