import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import RiskLevel from '../containers/RiskLevel';
import Personalized from '../containers/Personalized';
import NotFound from '../containers/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={RiskLevel} />
          <Route exact path="/personalized" component={Personalized} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
