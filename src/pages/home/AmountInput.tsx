import currencyInfos from '@/constants/currencyInfos';
import type { CurrencyType } from '@/model/global';
import { currencyState } from '@/model/global';
import services from '@/services';
import { Dropdown, Menu } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Coin, InputDiv } from '@/components/styleComponents';

const StyleAmountInput = styled(InputDiv)`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  input {
    flex: 1;
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

type AmountInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  onClickMax?: () => void;
};

const AmountInput = ({ onClickMax, ...inputProps }: AmountInputProps) => {
  const [currency, setCurrency] = useRecoilState(currencyState);

  const handleChangeCurrency = async (v: CurrencyType) => {
    const netWorkInfo = get(currencyInfos, [v, 'netWorkInfo']);
    await services.evmServer.switchNetwork(netWorkInfo);
    setCurrency(v);
  };

  const coinElement = () => {
    return (
      <Dropdown
        overlay={
          <Menu
            selectedKeys={[currency]}
            onClick={(v) => handleChangeCurrency(v.key as CurrencyType)}
          >
            <Menu.Item key={'BSC'}>
              <Coin>
                <img
                  src={get(currencyInfos, ['BSC', 'currencyImageAsset'])}
                  alt=""
                  height={'24px'}
                />
                <span>{get(currencyInfos, ['BSC', 'currencyName'])}</span>
              </Coin>
            </Menu.Item>
            <Menu.Item key={'Ethereum'}>
              <Coin>
                <img
                  src={get(currencyInfos, ['Ethereum', 'currencyImageAsset'])}
                  alt=""
                  height={'24px'}
                />
                <span>{get(currencyInfos, ['Ethereum', 'currencyName'])}</span>
              </Coin>
            </Menu.Item>
          </Menu>
        }
      >
        <Coin>
          <img src={get(currencyInfos, [currency, 'currencyImageAsset'])} alt="" height={'24px'} />
          <span>{get(currencyInfos, [currency, 'currencyName'])}</span>
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
      <input type="text" {...inputProps} />
      <div className="max" onClick={onClickMax}>
        Max
      </div>
      {coinElement()}
    </StyleAmountInput>
  );
};

export default AmountInput;
