import currencyInfos from '@/constants/currencyInfos';
import type { CurrencyType } from '@/model/global';
import { currencyState } from '@/model/global';
import { Button, Input } from 'antd';
import { get } from 'lodash';
import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

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

const Bridge = () => {
  const currency = useRecoilValue(currencyState);

  const getFromToCurrency = useCallback(
    (c: CurrencyType) => (
      <TransformerItem>
        <img src={get(currencyInfos, [c, 'chainImageAsset'])} alt="" height={40} />
        <div>
          <div>{get(currencyInfos, [c, 'currencyName'])}</div>
          <span>{get(currencyInfos, [c, 'chainDesc'])}</span>
        </div>
      </TransformerItem>
    ),
    [],
  );

  return (
    <FormWapper>
      <Label>Asset</Label>
      <SelectInput>
        <Coin>
          <img src={get(currencyInfos, [currency, 'currencyImageAsset'])} alt="" height={'24px'} />
          <span>{get(currencyInfos, [currency, 'currencyName'])}</span>
        </Coin>
        <img src={require('@/assets/images/dropDown.svg')} alt="" height={7} />
      </SelectInput>
      <NormalFlexBox>
        <div>
          <Label>From</Label>
          {getFromToCurrency(currency)}
        </div>
        <img src={require('@/assets/images/arrow.svg')} alt="" style={{ paddingTop: 50 }} />
        <div>
          <Label>To</Label>
          {getFromToCurrency(currency === 'BSC' ? 'Ethereum' : 'BSC')}
        </div>
      </NormalFlexBox>
      <Label>Receiving address</Label>
      <InputDiv>
        <Key>0xE40C3...933f28D2</Key>
      </InputDiv>
      <Label>Amount</Label>
      <Input />
      <Button type="primary" style={{ height: 60, width: '100%' }}>
        Approve
      </Button>
    </FormWapper>
  );
};

export default Bridge;
