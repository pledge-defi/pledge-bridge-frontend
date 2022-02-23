import React from 'react';
import type { ChainInfoKeysType } from '@/constants/chainInfos';
import chainInfos from '@/constants/chainInfos';
import { Dropdown, Menu } from 'antd';
import { find, map } from 'lodash';
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
  chainInfoKey: ChainInfoKeysType;
  onClick: (v: any) => void;
};

function SwitchNetWork({ chainInfoKey, onClick = () => {} }: SwitchNetWorkProps) {
  return (
    <Dropdown
      overlay={
        <Menu selectedKeys={[chainInfoKey]} onClick={onClick}>
          {map(chainInfos, (c) => {
            return (
              <Menu.Item key={c.chainName}>
                <FlexDiv>
                  <img src={c.chainImageAsset} alt="" width={24} height={24} />
                  <span>{c.chainName}</span>
                </FlexDiv>
              </Menu.Item>
            );
          })}
        </Menu>
      }
    >
      <SwitchNetWorkHeaderBox>
        <img
          src={find(chainInfos, { chainName: chainInfoKey })?.chainImageAsset}
          alt=""
          width={24}
          height={24}
        />
        <span>{chainInfoKey}</span>
        <img src={require('@/assets/images/dropDown.svg')} alt="" width={12} />
      </SwitchNetWorkHeaderBox>
    </Dropdown>
  );
}

export default SwitchNetWork;
