// import React from 'react';
import { useEffect, useState } from 'react';
import axiosInstance from '@/api/instance';

import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
interface Example {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
}

export default function MainPage() {
  const [exampleData, setExampleData] = useState<Example | null>(null);

  const getExampleData = async () => {
    try {
      const response = await axiosInstance.get('/todos/1');
      const data = response.data;
      setExampleData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExampleData();
  }, []);

  return (
    <>
      <NavBar />
      <div>MainPage</div>
      <div>{exampleData?.title}</div>
      <Button>버튼</Button>
      <Button variant={'destructive'}>버튼</Button>
      <Button size={'lg'}>버튼</Button>
      <Button size={'full'}>버튼</Button>
    </>
  );
}
