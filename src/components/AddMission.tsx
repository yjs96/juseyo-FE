import { useState } from 'react';
import styled from 'styled-components';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './ui/drawer';
import DrawerCategoryCard from './DrawerCategoryCard';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { Calendar } from './ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Input } from './ui/input';
import { postRequestMission } from '@/api/requestMission';
import { useNavigate } from 'react-router-dom';

interface AddMissionProps {
  iconSrc: string;
  alt: string;
}

const AddMission = ({ iconSrc, alt }: AddMissionProps) => {
  const navigate = useNavigate();

  const category = ['일상', '집안일', '학습', '자기관리', '심부름', '기타'];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [missionContent, setMissionContent] = useState<string>('');
  const [missionPoint, setMissionPoint] = useState<number | ''>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async() => {
    const requestData = {
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
      content: missionContent,
      category: selectedCategory,
      point: missionPoint
    };

    const res = await postRequestMission(requestData);

    if(!(res.status==200)){
      throw new Error(`미션 요청 실패`)
    }
    alert("미션 요청 성공")
    setIsDrawerOpen(false);
  };

  const isFormValid = () => {
    if (!selectedCategory) return false;
    if (!startDate) return false;
    if (!endDate) return false;
    if (missionContent.trim() === '') return false;
    if (missionPoint === '' || missionPoint === undefined) return false;
    return true;
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <img src={iconSrc} alt={alt} onClick={() => setIsDrawerOpen(true)} />
      </DrawerTrigger>
      <DrawerContent className="px-5">
        {/* 카테고리 선택 */}
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription>카테고리 선택</DrawerDescription>
        </DrawerHeader>
        <Section>
          {category.map((item: string, index: number) => (
            <DrawerCategoryCard
              key={index}
              category={item}
              isSelected={selectedCategory === item}
              onClick={() => handleCategoryClick(item)}
            />
          ))}
        </Section>

        {/* 날짜 선택 */}
        <DateContainer>
          <DateSection>
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
              <DrawerDescription>시작 날짜</DrawerDescription>
            </DrawerHeader>
            {/* 시작날짜 팝업 */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-sm font-normal text-[var(--dark-gray)]"
                >
                  <CalendarIcon />
                  {startDate ? format(startDate, 'yyyy-MM-dd') : 'YYYY-MM-DD'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </DateSection>

          <DateSection>
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
              <DrawerDescription>종료 날짜</DrawerDescription>
            </DrawerHeader>
            {/* 종료날짜 팝업 */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-sm font-normal text-[var(--dark-gray)]"
                >
                  <CalendarIcon />
                  {endDate ? format(endDate, 'yyyy-MM-dd') : 'YYYY-MM-DD'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </DateSection>
        </DateContainer>

        {/* 미션 설명 입력 */}
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription>미션 내용</DrawerDescription>
        </DrawerHeader>
        <Input
          placeholder="예) 방 청소하기"
          value={missionContent}
          onChange={(e) => setMissionContent(e.target.value)}
          className="text-sm"
        />

        {/* 미션 금액 입력 */}
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription>미션 금액</DrawerDescription>
        </DrawerHeader>
        <Input
          type="number"
          placeholder="예) 1500"
          value={missionPoint}
          onChange={(e) =>
            setMissionPoint(e.target.value === '' ? '' : Number(e.target.value))
          }
          className="text-sm"
        />

        {/* 버튼 구간 */}
        <ButtonContainer>
          <Button
            className="py-5"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            요청하기
          </Button>
          <Button
            className="py-5 bg-[var(--destructive)] text-[var(--white)]"
            onClick={() => setIsDrawerOpen(false)}
          >
            닫기
          </Button>
        </ButtonContainer>
      </DrawerContent>
    </Drawer>
  );
};

export default AddMission;

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;

  & > * {
    flex-basis: calc(50% - 8px);
  }
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const DateSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
