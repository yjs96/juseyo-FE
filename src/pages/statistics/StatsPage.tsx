import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { completeMissionState } from '@/store/mission';
import { getCompleteMission } from '@/api/mission';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';

import Header from '@/components/Header';
import MainFrame from '@/components/MainFrame';
import NavBar from '@/components/NavBar';
import styled from 'styled-components';

interface CategoryTotal {
  [key: string]: number;
}

export default function StatsPage() {
  const [sortDelay, setSortDelay] = useState<boolean>(false);
  const [completeMission, setCompleteMission] =
    useRecoilState(completeMissionState);

  const fetchCompleteMission = async () => {
    try {
      const res = await getCompleteMission();
      setCompleteMission(res);
    } catch (error) {
      throw new Error(`fetchCompleteMission Error: ${error}`);
    }
  };

  useEffect(() => {
    fetchCompleteMission();
    setTimeout(() => {
      setSortDelay(true);
    }, 160);
  }, []);

  const categoryData = completeMission?.reduce(
    (acc: CategoryTotal, mission) => {
      const category = mission.category;
      acc[category] = (acc[category] || 0) + mission.point;
      return acc;
    },
    {}
  );

  const chartData = Object.entries(categoryData || {}).map(
    ([category, value]) => ({
      id: category,
      label: category,
      value: value,
    })
  );

  // 최근 6개월 데이터 생성
  const getLast6Months = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-based index
    const months = [];

    for (let i = 3; i >= 0; i--) {
      const monthIndex = currentMonth - i;
      const date = new Date(currentDate.getFullYear(), monthIndex, 1);
      months.push({
        index: monthIndex,
        label: `${date.getMonth() + 1}월`,
        value: 0,
      });
    }
    return months;
  };

  // 최근 6개월 데이터 초기화
  const monthlyData = getLast6Months();

  // 완료된 미션의 포인트를 해당 월에 추가
  completeMission?.forEach((mission) => {
    const missionDate = new Date(mission.doneDate);
    const missionMonth = missionDate.getMonth();
    const monthData = monthlyData.find((m) => m.index === missionMonth);
    if (monthData) {
      monthData.value += mission.point;
    }
  });

  // Line 차트 데이터 구조로 변환
  const lineChartData = [
    {
      id: '월별 포인트',
      color: '#fede5b',
      data: monthlyData.map((month) => ({
        x: month.label,
        y: month.value,
      })),
    },
  ];

  const categoryColorMap = {
    일상: '#FEDE5B',
    집안일: '#99E5C4',
    학습: '#84D6FF',
    자기관리: '#F593BA',
    심부름: '#ECECEC',
    기타: '#FFC48F',
  } as const;

  const getCategoryColor = (category: string | number): string => {
    const categoryStr = String(category);
    return (
      categoryColorMap[categoryStr as keyof typeof categoryColorMap] ||
      '#ECECEC'
    );
  };

  return (
    <>
      <Header title="통계" />
      <NavBar />
      <MainFrame $headbar $bgGray $navbar $padded>
        <ChartFrame>
          <span>카테고리별</span>
          <ChartInner>
            <ResponsivePie
              data={chartData}
              margin={{ top: 16, right: 52, bottom: 10, left: 52 }}
              innerRadius={0.5}
              padAngle={1.3}
              cornerRadius={1}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              colors={({ id }) => getCategoryColor(id)}
              borderColor={{
                from: 'color',
                modifiers: [['darker', 0.2]],
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#727272"
              arcLinkLabelsThickness={1}
              arcLinkLabelsDiagonalLength={16}
              arcLinkLabelsStraightLength={10}
              arcLinkLabelsOffset={-11}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor="#1C1C1C"
              sortByValue={sortDelay}
            />
          </ChartInner>
        </ChartFrame>
        <ChartFrame>
          <span>월별 누적 포인트</span>
          <ChartInner>
            <ResponsiveLine
              data={lineChartData}
              margin={{ top: 24, right: 30, bottom: 36, left: 40 }}
              xScale={{ type: 'point' }}
              yScale={{
                type: 'linear',
                min: 0,
                max: 'auto',
                stacked: false,
                reverse: false,
              }}
              yFormat=" >-.0f"
              curve="monotoneX"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendOffset: -45,
                legendPosition: 'middle',
                tickValues: [
                  0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,
                  10000, 11000, 12000, 13000, 14000, 15000,
                ],
                format: (value) =>
                  typeof value === 'number'
                    ? `${value.toLocaleString()}`
                    : value,
              }}
              enableGridX={false}
              lineWidth={2}
              pointSize={8}
              colors="#fede5b"
              pointColor="#fede5b"
              pointBorderWidth={2}
              pointBorderColor="#fede5b"
              pointLabelYOffset={-12}
              enableTouchCrosshair={true}
              useMesh={true}
              legends={[]}
            />
          </ChartInner>
        </ChartFrame>
      </MainFrame>
    </>
  );
}

const ChartFrame = styled.div`
  width: 100%;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  background-color: var(--white);
  margin-top: 20px;

  span {
    font-size: 18px;
    font-weight: 500;
  }
`;

const ChartInner = styled.div`
  height: 288px;
  width: 100%;
  div {
    font-size: 8px !important;
    color: var(--black) !important;
  }
`;
