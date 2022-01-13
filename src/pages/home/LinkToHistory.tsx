import { capitalize } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import type { TransferredType } from '../typings';

const StyledHistory = styled.a`
  display: flex;
  justify-content: center;
  margin: 16px 0 40px 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: #5d52ff;
  > img {
    margin-right: 4px;
  }
`;

type LinkToHistoryProps = {
  type: TransferredType;
};

const LinkToHistory = ({ type = 'deposit' }: LinkToHistoryProps) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/history/${type}`);
  };
  return (
    <StyledHistory onClick={handleClick}>
      <img src={require('@/assets/images/DepoistHistory.svg')} alt="" /> {capitalize(type)} History
    </StyledHistory>
  );
};

export default LinkToHistory;
