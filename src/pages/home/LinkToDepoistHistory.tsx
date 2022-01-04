import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const DepoistHistory = styled.a`
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

const LinkToDepoistHistory = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/history');
  };
  return (
    <DepoistHistory onClick={handleClick}>
      <img src={require('@/assets/images/DepoistHistory.svg')} alt="" /> Depoist History
    </DepoistHistory>
  );
};

export default LinkToDepoistHistory;
