import React from 'react';
import { useHistory } from 'react-router-dom';
import type { TransferredType } from '../typings';

type LinkToHistoryProps = {
  type: TransferredType;
  account: string;
};

const LinkToHistory = ({ type = 'deposit', account }: LinkToHistoryProps) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/history/${type}/${account}`);
  };
  return (
    <a onClick={handleClick}>
      <img src={require('@/assets/images/history.svg')} alt="" />
    </a>
  );
};

export default LinkToHistory;
