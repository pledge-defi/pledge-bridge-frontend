import { Table } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import type { ColumnsType } from 'antd/lib/table/interface.d';
import DetailDrawer from './DetailDrawer';
import { DetailCoin } from '@/components/styleComponents';
import currencyInfos from '@/constants/currencyInfos';
import { get } from 'lodash';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const TableWapper = styled.div`
  margin: 0 auto;
  width: 1200px;
  .title {
    padding: 120px 0 48px 0;
    color: #262533;
    font-weight: 600;
    font-size: 36px;
    line-height: 58px;
  }
`;

const History = () => {
  const [drawerElement, setDrawerElement] = useState<JSX.Element | undefined>();

  const handleClickShowDetail = () => {
    setDrawerElement(<DetailDrawer key={new Date().getTime().toString()} title="Detail" />);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Source Chain',
      dataIndex: 'SourceChain',
      render: () => {
        return (
          <DetailCoin style={{ fontWeight: 500 }}>
            <img src={get(currencyInfos, ['BSC', 'chainImageAsset'])} alt="" height={'24px'} />
            BSC
          </DetailCoin>
        );
      },
    },
    {
      title: 'Destination Chain',
      dataIndex: 'SourceChain',
      render: () => {
        return (
          <DetailCoin style={{ fontWeight: 500 }}>
            <img src={get(currencyInfos, ['Ethereum', 'chainImageAsset'])} alt="" height={'24px'} />
            Ethereum
          </DetailCoin>
        );
      },
    },
    {
      title: 'Assets',
      dataIndex: 'SourceChain',
      render: () => 'PLGR',
    },
    {
      title: 'Amount',
      dataIndex: 'SourceChain',
      render: () => '10.34363467',
    },
    {
      title: 'Fee',
      dataIndex: 'SourceChain',
      render: () => '0.34363467',
    },
    {
      title: 'Time',
      dataIndex: 'SourceChain',
      render: () => '2021/11/01 12:10:00',
    },
    {
      title: 'Status',
      dataIndex: 'SourceChain',
      render: () => {
        return <a onClick={handleClickShowDetail}>Processing</a>;
      },
    },
  ];
  return (
    <>
      {drawerElement}
      <TableWapper>
        <div className="title">Deposit History</div>
        <Table dataSource={dataSource} columns={columns} />
      </TableWapper>
    </>
  );
};

export default History;
