import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import FilesList from './components/FilesList';
import FileOperations from './components/FileOperations'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={FilesList} />
          <Route path='/:id' component={FileOperations} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
