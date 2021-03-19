//======================== STYLES ==============================
import './App.css';

//====================== COMPONENTS ============================
import Nav from './components/Nav'
import Landing from './components/Landing';
import Login from './components/Login'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Signup from './components/Signup'

function App() {
  return (
  	<Router>
    <div className="App">
      <Nav />
      <Route exact path='/login' component={Login}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Landing />
    </div>
    </Router>
  );
}

export default App;
