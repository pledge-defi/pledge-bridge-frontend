import { Table } from 'antd';
import React from 'react';
import styled from 'styled-components';

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

const columns = [
  {
    title: 'Source Chain',
    dataIndex: 'SourceChain',
  },
  {
    title: 'Destination Chain',
    dataIndex: 'SourceChain',
  },
  {
    title: 'Assets',
    dataIndex: 'SourceChain',
  },
  {
    title: 'Amount',
    dataIndex: 'SourceChain',
  },
  {
    title: 'Fee',
    dataIndex: 'SourceChain',
  },
  {
    title: 'Time',
    dataIndex: 'SourceChain',
  },
  {
    title: 'Status',
    dataIndex: 'SourceChain',
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
  return (
    <TableWapper>
      <div className="title">Deposit History</div>
      <Table dataSource={dataSource} columns={columns} />
    </TableWapper>
  );
};

export default History;
