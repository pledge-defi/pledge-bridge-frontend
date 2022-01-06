import React, { useEffect, useState } from 'react';
import logo from '@/assets/images/bridgeLogo.svg';
import styled from 'styled-components';
import { ConnectWallet } from '..';
import { Dropdown, Menu } from 'antd';
import { useRecoilState } from 'recoil';
import { currencyState } from '@/model/global';
import currencyInfos from '@/constants/currencyInfos';
import { find, get } from 'lodash';
import { useHistory } from 'react-router-dom';
import services from '@/services';
import { useWeb3React } from '@web3-react/core';

const HeaderDiv = styled.div`
  height: 92px;
  border-bottom: 1px solid #e7e3eb;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1120px;
    height: 100%;
    margin: 0 auto;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  > img {
    margin-right: 10px;
  }
`;

const Logo = styled.a`
  display: flex;
  > span {
    padding-left: 10px;
    color: #181826;
    font-size: 28px;
  }
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    min-width: 120px;
    padding: 10px 20px;
    color: #5d52ff;
    background: rgba(93, 82, 255, 0.1);
    border: 1px solid #5d52ff;
    border-radius: 22px;
    cursor: pointer;
    > span {
      padding: 0 6px 0 10px;
    }
  }
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
          <img src={logo} alt="" />
          <span>Pledge Bridge</span>
        </Logo>
        <UserInfo>
          <Dropdown
            overlay={
              <Menu selectedKeys={[currency]} onClick={handleClick}>
                <Menu.Item key={'BSC'}>
                  <FlexDiv>
                    <img
                      src={get(currencyInfos, ['BSC', 'chainImageAsset'])}
                      alt=""
                      width={24}
                      height={24}
                    />
                    <span>BSC</span>
                  </FlexDiv>
                </Menu.Item>
                <Menu.Item key={'Ethereum'}>
                  <FlexDiv>
                    <img
                      src={get(currencyInfos, ['Ethereum', 'chainImageAsset'])}
                      alt=""
                      width={24}
                      height={24}
                    />
                    <span>Ethereum</span>
                  </FlexDiv>
                </Menu.Item>
              </Menu>
            }
          >
            <div>
              <img
                src={get(currencyInfos, [currency, 'chainImageAsset'])}
                alt=""
                width={24}
                height={24}
              />
              <span>{currency}</span>
              <img src={require('@/assets/images/dropDown.svg')} alt="" />
            </div>
          </Dropdown>
          <ConnectWallet />
        </UserInfo>
      </div>
    </HeaderDiv>
  );
};

export default Header;
