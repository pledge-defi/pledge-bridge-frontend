import React from 'react';
import logo from '@/assets/images/logo.svg';
import logoWithText from '@/assets/images/logoWithText.svg';
import currencyInfos from '@/constants/currencyInfos';
import { currencyState } from '@/model/global';
import services from '@/services';
import { useWeb3React } from '@web3-react/core';
import { find, get } from 'lodash';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { ConnectWallet } from '..';
import SwitchNetWork from '../SwitchNetWork';

const HeaderDiv = styled.div`
  height: 92px;
  border-bottom: 1px solid #e7e3eb;
  padding: 0 20px;
  ${({ theme }) =>
    theme.breakpointChecks.isMobile &&
    css`
      height: 65px;
    `};
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1120px;
    height: 100%;
    margin: 0 auto;
  }
`;

const Logo = styled.a`
  .mobile-icon {
    display: none;
    ${({ theme }) =>
      theme.breakpointChecks.isMobile &&
      css`
        width: 32px;
        display: block;
      `};
  }
  .desktop-icon {
    display: none;
    ${({ theme }) =>
      !theme.breakpointChecks.isMobile &&
      css`
        display: block;
      `};
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = () => {
  const [currency, setCurrency] = useRecoilState(currencyState);
  const history = useHistory();
  const { chainId } = useWeb3React();
  const [currentChainId, setCurrentChainId] = useState<number>();

  const handleClick = async (v: any) => {
    const netWorkInfo = get(currencyInfos, [v.key, 'netWorkInfo']);
    await services.evmServer.switchNetwork(netWorkInfo);
    setCurrency(v.key);
  };

  const handleClickLinkToHome = () => {
    history.push('/');
  };

  useEffect(() => {
    if (chainId !== currentChainId && currentChainId === undefined) {
      setCurrentChainId(chainId);
      const chainName = find(Object.values(currencyInfos), { chainId })?.chainName;
      setCurrency(chainName || 'BSC');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  return (
    <HeaderDiv>
      <div>
        <Logo onClick={handleClickLinkToHome}>
          <img src={logo} alt="" className="mobile-icon" />
          <img src={logoWithText} alt="" className="desktop-icon" />
        </Logo>
        <UserInfo>
          <SwitchNetWork currency={currency} onClick={handleClick} />
          <ConnectWallet />
        </UserInfo>
      </div>
    </HeaderDiv>
  );
};

export default Header;
