import { map } from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';

const HomeDiv = styled.div`
  padding-top: 40px;
`;

const SelectTab = styled.div`
  background: #f5f5fa;
  border-radius: 15px;
  height: 56px;
  width: 319px;
  display: flex;
  justify-content: space-between;
  color: #8b89a3;
  margin: 0 auto;
  > div {
    flex: 1;
    margin: 4px;
    font-weight: 600;
    font-size: 22px;
    line-height: 48px;
    text-align: center;
    border-radius: 11px;
    cursor: pointer;
  }
  .active {
    color: #000;
    background: #ffffff;
  }
`;

const FormWapper = styled.div`
  width: 552px;
  background: #ffffff;
  /* 描边 */
  border: 1px solid #e6e6eb;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 0 40px;
  margin: 0 auto;
  margin-top: 28px;
`;

const Label = styled.div`
  font-family: Poppins;
  font-size: 14px;
  line-height: 22px;
  color: #8b89a3;
  padding: 24px 0 10px 0;
`;

const InputDiv = styled.div`
  height: 44px;
  border: 1px solid #e6e6eb;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px 16px;
`;

const SelectInput = styled(InputDiv)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Coin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    padding-left: 8px;
    font-weight: 600;
  }
`;

const NormalFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TransformerItem = styled.div`
  width: 210;
  width: 210px;
  height: 92px;
  background: #f5f5fa;
  border-radius: 10px;
  padding: 26px 16px;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 8px;
    > div {
      font-weight: bold;
      font-size: 20px;
      line-height: 30px;
    }
    > span {
      color: #5d52ff;
      font-weight: 300;
    }
  }
`;

const Key = styled.div`
  font-size: 14px;
  color: #8b89a3;
`;

const activeTabs = ['Bridge', 'Withdraw'] as const;
type ActiveTabs = typeof activeTabs[number];

const Home = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabs>('Bridge');

  const handleClickChangeActiveTab = (a: ActiveTabs) => {
    setActiveTab(a);
  };

  return (
    <HomeDiv>
      <SelectTab>
        {map(activeTabs, (a) => (
          <div
            key={a}
            className={a === activeTab ? 'active' : undefined}
            onClick={() => handleClickChangeActiveTab(a)}
          >
            {a}
          </div>
        ))}
      </SelectTab>
      <FormWapper>
        <Label>Asset</Label>
        <SelectInput>
          <Coin>
            <img src={require('@/assets/images/coin1.svg')} alt="" height={'24px'} />
            <span>PLGR</span>
          </Coin>
          <img src={require('@/assets/images/dropDown.svg')} alt="" height={7} />
        </SelectInput>
        <NormalFlexBox>
          <div>
            <Label>From</Label>
            <TransformerItem>
              <img src={require('@/assets/images/Ellipse 757.svg')} alt="" height={40} />
              <div>
                <div>PLGR</div>
                <span>BSC Network</span>
              </div>
            </TransformerItem>
          </div>
          <img src={require('@/assets/images/arrow.svg')} alt="" style={{ paddingTop: 50 }} />
          <div>
            <Label>To</Label>
            <TransformerItem>
              <img src={require('@/assets/images/rog2.svg')} alt="" height={40} />
              <div>
                <div>MPLGR</div>
                <span>Ethereum Network</span>
              </div>
            </TransformerItem>
          </div>
        </NormalFlexBox>
        <Label>Receiving address</Label>
        <InputDiv>
          <Key>0xE40C3...933f28D2</Key>
        </InputDiv>
        <Label>Amount</Label>
        <InputDiv>
          <Key>0xE40C3...933f28D2</Key>
        </InputDiv>
      </FormWapper>
    </HomeDiv>
  );
};

export default Home;
