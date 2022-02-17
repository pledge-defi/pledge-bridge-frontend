import Header from '@/components/Header';
import { useMatchBreakpoints } from '@/hooks';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const BasicLayoutDiv = styled.div``;

type Props = {
  children: React.ReactNode;
};

const BasicLayout = ({ children }: Props) => {
  const breakpointChecks = useMatchBreakpoints();

  return (
    <ThemeProvider theme={{ breakpointChecks }}>
      <BasicLayoutDiv>
        <Header />
        {children}
      </BasicLayoutDiv>
    </ThemeProvider>
  );
};

export default BasicLayout;
