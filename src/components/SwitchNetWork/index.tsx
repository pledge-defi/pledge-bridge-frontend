import React from 'react';
import currencyInfos from '@/constants/currencyInfos';
import type { CurrencyType } from '@/model/global';
import { Dropdown, Menu } from 'antd';
import { get } from 'lodash';
import styled from 'styled-components';
import { HeaderBox } from '../styleComponents';

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  > img {
    margin-right: 10px;
  }
`;

const SwitchNetWorkHeaderBox = styled(HeaderBox)`
  line-height: 24px;
  > span {
    padding: 0 6px 0 10px;
  }
`;

type SwitchNetWorkProps = {
  currency: CurrencyType;
  onClick: (v: any) => void;
};

function SwitchNetWork({ currency, onClick = () => {} }: SwitchNetWorkProps) {
  return (
    <Dropdown
      overlay={
        <Menu selectedKeys={[currency]} onClick={onClick}>
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
      <SwitchNetWorkHeaderBox>
        <img
          src={get(currencyInfos, [currency, 'chainImageAsset'])}
          alt=""
          width={24}
          height={24}
        />
        <span>{currency}</span>
        <img src={require('@/assets/images/dropDown.svg')} alt="" width={12} />
      </SwitchNetWorkHeaderBox>
    </Dropdown>
  );
}

export default SwitchNetWork;
