import { Coin, InputDiv } from '@/components/styleComponents';
import chainInfos from '@/constants/chainInfos';
import { chainInfoKeyState, chainInfoState } from '@/model/global';
import services from '@/services';
import { useDebounceEffect } from 'ahooks';
import { Dropdown, Menu, message } from 'antd';
import { find, map } from 'lodash';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Input } from 'antd';

const StyleAmountInput = styled(InputDiv)`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  input {
    flex: 1;
    min-width: 0;
    font-weight: bold;
    background: none;
    border: none;
    outline: none;
    ::placeholder {
      color: #8b89a3;
      font-weight: normal;
      font-size: 14px;
    }
  }
  input:focus {
    border: none;
  }
  > div {
    display: flex;
    justify-content: space-between;
  }
  .max {
    position: relative;
    margin-right: 18px;
    padding: 0 8px;
    color: #5d52ff;
    font-weight: 500;
    font-size: 16px;
    background: rgba(93, 82, 255, 0.1);
    border-radius: 10px;
    cursor: pointer;
    ::before {
      position: absolute;
      top: 0;
      right: -10px;
      width: 2px;
      height: 100%;
      background: #e6e6eb;
      content: '';
    }
  }
`;

type AmountInputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange'
> & {
  onChange: (e?: string) => void;
  maxAmount?: string;
};

const AmountInput = ({ maxAmount, onChange, ...inputProps }: AmountInputProps) => {
  const [chainInfoKey, setChainInfoKey] = useRecoilState(chainInfoKeyState);
  const [chainInfo, setChainInfo] = useRecoilState(chainInfoState);
  const handleChangeCurrency = async (v: any) => {
    const newChainInfo = find(chainInfos, { chainName: v });
    const netWorkInfo = newChainInfo?.netWorkInfo;
    await services.evmServer.switchNetwork(netWorkInfo!);
    setChainInfoKey(v);
    setChainInfo(newChainInfo!);
  };

  const handleChangeInput: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = (e) => {
    console.log(e.target.value);
    onChange(e.target.value);
  };

  const handleClickMax = () => {
    onChange(maxAmount);
  };

  useDebounceEffect(
    () => {
      if (!!maxAmount && (Number(inputProps.value) as number) > Number(maxAmount)) {
        message.warning('Insufficient balance');
      }
    },
    [inputProps.value],
    {
      wait: 500,
    },
  );

  const coinElement = () => {
    return (
      <Dropdown
        overlay={
          <Menu selectedKeys={[chainInfoKey]} onClick={(v) => handleChangeCurrency(v.key)}>
            {map(chainInfos, (c) => {
              return (
                <Menu.Item key={c.chainName}>
                  <Coin>
                    <img src={c.currencyImageAsset} alt="" height={'24px'} />
                    <span>{c.currencyName}</span>
                  </Coin>
                </Menu.Item>
              );
            })}
          </Menu>
        }
      >
        <Coin>
          <img src={chainInfo.currencyImageAsset} alt="" height={'24px'} />
          <span>{chainInfo.currencyName}</span>
          <img
            src={require('@/assets/images/dropDownGrey.svg')}
            alt=""
            style={{ paddingLeft: '8px' }}
          />
        </Coin>
      </Dropdown>
    );
  };

  return (
    <StyleAmountInput>
      {/* <input type="text" {...inputProps} onChange={handleChangeInput} /> */}
      <Input
        style={{ width: '100%', padding: '0' }}
        onChange={handleChangeInput}
        bordered={false}
      />
      <div>
        <div className="max" onClick={handleClickMax}>
          Max
        </div>
        {coinElement()}
      </div>
    </StyleAmountInput>
  );
};

export default AmountInput;
