//======================== STYLES ==============================
import './App.css';

//====================== COMPONENTS ============================
import Nav from './components/Nav'
import Landing from './components/Landing';
import Login from './components/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Flight from './components/Flight'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route exact path='/login' component={ Login }></Route>
        <Route exact path="/signup" component={ Signup }></Route>
        <Route exact path="/" component={ Landing }></Route>
        <Route exact path="/flight" component={ Flight }></Route>
      </div>
    </Router>
  );
}

export default App;
