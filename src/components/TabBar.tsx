import styled from 'styled-components';

interface TabBarProps {
  tabs: Array<string>;
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TabBar = ({ tabs, activeTab, setActiveTab }: TabBarProps) => {
  return (
    <Container>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          $isActive={activeTab === index}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </Tab>
      ))}
    </Container>
  );
};

export default TabBar;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 65px;
  position: fixed;
  z-index: 50;
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
