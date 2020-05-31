import React from 'react';
import {
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Intro from './components/Intro';
import NotFound from './components/NotFound';
import Poll from './components/Poll';
import Main from './components/Main';
import Enter from './components/Enter';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Switch location={location} key={location.pathname}>
        <Route exact path='/'>
          <Intro />
        </Route>
        <Route path='/poll'>
          <Poll />
        </Route>
        <Route path='/main'>
          <Main />
        </Route>
        <Route path='/enter'>
          <Enter />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

export default App;
