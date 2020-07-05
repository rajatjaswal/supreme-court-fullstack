import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Visualizations from './components/Visualizations';
import Home from './components/Home';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <Home />
        </Tab>
        <Tab eventKey="visualizations" title="Visualizations">
          <Visualizations />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
