/*
  FILE: src/App.js
  WHAT THIS FILE CARRIES:
  - Root component of the app.
  - Just wraps <Main /> (which decides which screen to show) in a centered div.
*/
import './App.css';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
