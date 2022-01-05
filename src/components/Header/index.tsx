import React from 'react';
import logo from '@/assets/images/bridgeLogo.svg';
import styled from 'styled-components';
import { ConnectWallet } from '..';
import { Dropdown, Menu } from 'antd';
import { useRecoilState } from 'recoil';
import { currencyState } from '@/model/global';
import currencyInfos from '@/constants/currencyInfos';
import { get } from 'lodash';

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

const Logo = styled.div`
  display: flex;
  > span {
    padding-left: 10px;
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

  const handleClick = (v: any) => {
    setCurrency(v.key);
  };

  return (
    <HeaderDiv>
      <div>
        <Logo>
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
