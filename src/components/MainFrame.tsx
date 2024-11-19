import React from 'react';
import styled from 'styled-components';

interface MainFrameProps {
  $headbar?: boolean;
  $navbar?: boolean;
  $padded?: boolean;
  children?: React.ReactNode;
}

export default function MainFrame({
  $headbar,
  $navbar,
  $padded,
  children,
}: MainFrameProps) {
  return (
    <StyledMainFrame $headbar={$headbar} $navbar={$navbar} $padded={$padded}>
      {children}
    </StyledMainFrame>
  );
}

const StyledMainFrame = styled.div<MainFrameProps>`
  background-color: var(--white);
  position: relative;
  width: 100%;
  height: ${(props) => {
    if (props.$headbar && props.$navbar) {
      return 'calc(100% - 76px - 65px)';
    } else if (!props.$headbar && props.$navbar) {
      return 'calc(100% - 76px)';
    } else if (props.$headbar && !props.$navbar) {
      return 'calc(100% - 65px)';
    }
    return '100%';
  }};
  margin-top: ${(props) => (props.$headbar ? '65px' : '0px')};
  padding: ${(props) => (props.$padded ? '0 5.13%' : '0')};
  overflow-x: hidden;
  overflow-y: scroll;
`;
