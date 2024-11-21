// import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isUserParentState } from '@/store/userInfo';

interface NavTab {
  path: string;
  name: string;
  icon: string;
}

function NavBar() {
  const location = useLocation();
  const isUserParent = useRecoilValue(isUserParentState);

  const parentTabs: NavTab[] = [
    {
      path: '/',
      name: '홈',
      icon: 'fa-solid fa-house',
    },
    {
      path: '/mission/parents',
      name: '미션',
      icon: 'fa-solid fa-rectangle-list',
    },
    {
      path: '/stats',
      name: '통계',
      icon: 'fa-solid fa-chart-pie',
    },
    {
      path: '/mypage',
      name: '마이페이지',
      icon: 'fa-solid fa-user',
    },
  ];

  const childTabs: NavTab[] = [
    {
      path: '/',
      name: '홈',
      icon: 'fa-solid fa-house',
    },
    {
      path: '/mission/child',
      name: '미션',
      icon: 'fa-solid fa-rectangle-list',
    },
    {
      path: '/edu',
      name: '교육',
      icon: 'fa-solid fa-pen',
    },
    {
      path: '/mypage',
      name: '마이페이지',
      icon: 'fa-solid fa-user',
    },
  ];

  const navTabs = (): NavTab[] => {
    if (isUserParent) {
      return parentTabs;
    }
    return childTabs;
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <NavBarFrame>
        {navTabs().map((tab, idx) => (
          <StyledLink to={tab.path} key={idx}>
            <Tab className={isActive(tab.path) ? 'active' : ''}>
              <i className={tab.icon}></i>
              <span>{tab.name}</span>
            </Tab>
          </StyledLink>
        ))}
      </NavBarFrame>
    </>
  );
}

export default NavBar;

const NavBarFrame = styled.div`
  position: fixed;
  padding: 0 2%;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  height: 76px;
  display: flex;
  border-top: 1px solid var(--gray);
  background-color: var(--white);
  z-index: 2;
`;

const StyledLink = styled(Link)`
  position: relative;
  width: calc(100% / 4);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--nav-gray);

  span {
    font-size: 12px;
    font-weight: 500;
    margin-top: 6px;
    margin-bottom: 12px;
  }

  &.active {
    color: var(--black);
  }
`;
