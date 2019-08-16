import React from 'react';
import Definitions from './components/Definitions';
import Synonyms from './components/Synonyms';
import './App.css';

function App() {
  return (
    <div id="App">
      <h1 id="title" className="text-light">WordsAPI</h1>
      <main>
        <div id="dictionary" className="col">
          <h2 className="text-light">Dictionary</h2>
          <Definitions />
        </div>
        <div id="thesaurus" className="col">
        <h2 className="text-light">Thesaurus</h2>
          <Synonyms />
        </div>
      </main>
    </div>
  );
}

export default App;
