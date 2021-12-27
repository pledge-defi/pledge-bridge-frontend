import React from 'react';
import logo from '@/assets/images/Vector.svg';
import styled from 'styled-components';
import { ConnectWallet } from '..';

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
    width: 120px;
    padding: 10px 20px;
    background: rgba(93, 82, 255, 0.1);
    border: 1px solid #5d52ff;
    border-radius: 22px;
    cursor: pointer;
  }
  /* > span {
    width: 44px;
    height: 44px;
    margin-left: 44px;
    background: #ffffff;
    border: 1px solid #5d52ff;
    border-radius: 50%;
  } */
`;

const Header = () => {
  return (
    <HeaderDiv>
      <div>
        <Logo>
          <img src={logo} alt="" />
          <span>Pledge Bridge</span>
        </Logo>
        <UserInfo>
          <div>
            <img src={require('@/assets/images/Ellipse 757.svg')} alt="" />
            <span>BSC</span>
            <img src={require('@/assets/images/dropDown.svg')} alt="" />
          </div>
          <ConnectWallet />
        </UserInfo>
      </div>
    </HeaderDiv>
  );
};

export default Header;
