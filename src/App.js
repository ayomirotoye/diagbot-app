import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import { FetchProvider } from './context/FetchContext';
import { Provider } from "react-redux";
import AppShell from './AppShell';
import store from './state/store';

import Home from './pages/Home';
import FourOFour from './pages/FourOFour';
import GetDiagnosis from './pages/GetDiagnosis';


const LoadingFallback = () => (
  <AppShell>
    <div className="p-4">Loading...</div>
  </AppShell>
);

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route exact path="/diagnose">
      <GetDiagnosis />
    </Route>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="*">
      <FourOFour />
    </Route>
  </Switch>
);


const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <UnauthenticatedRoutes />
        </Switch>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <Router>
       <Provider store={store}>
        <FetchProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </FetchProvider>
      </Provider>
    </Router>
  );
}

export default App;
