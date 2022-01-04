import { map } from 'lodash';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Bridge from './Bridge';
import Withdraw from './Withdraw';

const HomeDiv = styled.div`
  padding-top: 40px;
`;

const SelectTab = styled.div`
  background: #f5f5fa;
  border-radius: 15px;
  height: 56px;
  width: 319px;
  display: flex;
  justify-content: space-between;
  color: #8b89a3;
  margin: 0 auto;
  > div {
    flex: 1;
    margin: 4px;
    font-weight: 600;
    font-size: 22px;
    line-height: 48px;
    text-align: center;
    border-radius: 11px;
    cursor: pointer;
  }
  .active {
    color: #000;
    background: #ffffff;
  }
`;

const activeTabs = ['Bridge', 'Withdraw'] as const;
type ActiveTabs = typeof activeTabs[number];

const Home = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabs>('Bridge');

  const handleClickChangeActiveTab = (a: ActiveTabs) => {
    setActiveTab(a);
  };

  const activeElement = useMemo(() => {
    switch (activeTab) {
      case 'Bridge':
        return <Bridge />;
      case 'Withdraw':
        return <Withdraw />;
    }
  }, [activeTab]);

  return (
    <HomeDiv>
      <SelectTab>
        {map(activeTabs, (a) => (
          <div
            key={a}
            className={a === activeTab ? 'active' : undefined}
            onClick={() => handleClickChangeActiveTab(a)}
          >
            {a}
          </div>
        ))}
      </SelectTab>
      {activeElement}
    </HomeDiv>
  );
};

export default Home;
