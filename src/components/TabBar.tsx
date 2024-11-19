import { useState } from 'react';
import styled from 'styled-components';

const TabBar = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <Tab $isActive={activeTab === 0} onClick={() => setActiveTab(0)}>
        진행중
      </Tab>
      <Tab $isActive={activeTab === 1} onClick={() => setActiveTab(1)}>
        완료
      </Tab>
      <Tab $isActive={activeTab === 2} onClick={() => setActiveTab(2)}>
        요청됨
      </Tab>
    </Container>
  );
};

export default TabBar;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 65px;
  position: fixed;
  display: flex;
`;

interface TabProps {
  $isActive: boolean;
}

const Tab = styled.button<TabProps>`
  flex: 1;
  padding: 6px 0;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: var(--black);
  background-color: var(--white);
  border-bottom: ${({ $isActive }) =>
    $isActive ? '2px solid var(--primary)' : '2px solid transparent'};
`;
