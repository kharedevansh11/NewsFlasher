import NavBar from './components/NavBar';
import './App.css';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import React, { useState } from 'react';

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <LoadingBar color="#f11946" progress={progress} />
        <NavBar name="NewsFlash" />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={<News setProgress={setProgress} key="general" pageSize={9} country="in" category="general" />}
            ></Route>
            <Route
              exact
              path="/business"
              element={<News setProgress={setProgress} key="business" pageSize={9} country="in" category="business" />}
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <News setProgress={setProgress} key="entertainment" pageSize={9} country="in" category="entertainment" />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={<News setProgress={setProgress} key="health" pageSize={9} country="in" category="health" />}
            ></Route>
            <Route
              exact
              path="/science"
              element={<News setProgress={setProgress} key="science" pageSize={9} country="in" category="science" />}
            ></Route>
            <Route
              exact
              path="/sports"
              element={<News setProgress={setProgress} key="sports" pageSize={9} country="in" category="sports" />}
            ></Route>
            <Route
              exact
              path="/technology"
              element={<News setProgress={setProgress} key="technology" pageSize={9} country="in" category="technology" />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
