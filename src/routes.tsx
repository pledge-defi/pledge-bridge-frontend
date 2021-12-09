import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import History from './pages/history';
import BasicLayout from './layout/BasicLayout';
import { HashRouter } from 'react-router-dom';

const Routes = () => {
  return (
    <BasicLayout>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/history">
            <History />
          </Route>
        </Switch>
      </HashRouter>
    </BasicLayout>
  );
};

export default Routes;
