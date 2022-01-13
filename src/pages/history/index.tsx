import { DetailCoin } from '@/components/styleComponents';
import currencyInfos from '@/constants/currencyInfos';
import { txsHistory } from '@/services/pledge/api/txsHistory';
import { FORMAT_TIME_STANDARD } from '@/utils/constants';
import { multiplied_18 } from '@/utils/public';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table/interface.d';
import { capitalize, get } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import type { TransferredType } from '../typings';
import DetailDrawer from './DetailDrawer';

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

const initialPageSetting = {
  page: 1,
  pageSize: 5,
};

const History = () => {
  const [drawerElement, setDrawerElement] = useState<JSX.Element | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const { type } = useParams<{ type: TransferredType }>();
  const [conditionData, setConditionData] = useState<API.TxsHistoryRequest>({
    ...initialPageSetting,
    txType: type === 'deposit' ? 0 : 1,
  });
  const [{ count = 0, rows = [] }, setData] = useState<API.HistoryData>({});

  const fetch_data = async () => {
    setLoading(true);
    const response = await txsHistory(conditionData);
    setLoading(false);
    if (response) {
      setData(response.data || {});
    }
  };

  const handleChange = ({ current, pageSize }: TablePaginationConfig) => {
    setConditionData({ ...conditionData, page: current, pageSize });
  };

  const handleClickShowDetail = () => {
    setDrawerElement(<DetailDrawer key={new Date().getTime().toString()} title="Detail" />);
  };

  const columns: ColumnsType<API.HistoryDetail> = [
    {
      title: 'Source Chain',
      dataIndex: 'srcChain',
      render: (t: 'BSC' | 'ETH') => {
        return (
          <DetailCoin style={{ fontWeight: 500 }}>
            <img
              src={get(currencyInfos, [t === 'ETH' ? 'Ethereum' : t, 'chainImageAsset'])}
              alt=""
              height={'24px'}
            />
            {t === 'ETH' ? 'Ethereum' : t}
          </DetailCoin>
        );
      },
    },
    {
      title: 'Destination Chain',
      dataIndex: 'destChain',
      render: (t) => {
        return (
          <DetailCoin style={{ fontWeight: 500 }}>
            <img
              src={get(currencyInfos, [t === 'ETH' ? 'Ethereum' : t, 'chainImageAsset'])}
              alt=""
              height={'24px'}
            />
            {t === 'ETH' ? 'Ethereum' : t}
          </DetailCoin>
        );
      },
    },
    {
      title: 'Assets',
      dataIndex: 'asset',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (t) => multiplied_18(t),
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      render: (t) => multiplied_18(t),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      render: (t) => moment(t).format(FORMAT_TIME_STANDARD),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: () => {
        return <a onClick={handleClickShowDetail}>Processing</a>;
      },
    },
  ];

  useEffect(() => {
    fetch_data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionData]);

  return (
    <>
      {drawerElement}
      <TableWapper>
        <div className="title">{capitalize(type)} History</div>
        <Table
          loading={loading}
          onChange={handleChange}
          pagination={{
            total: count,
            pageSize: conditionData.pageSize,
            current: conditionData.page,
          }}
          dataSource={rows}
          columns={columns}
          rowClassName="history-row"
        />
      </TableWapper>
    </>
  );
};

export default History;
