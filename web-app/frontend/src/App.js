//======================== STYLES ==============================
import './App.css';

//====================== COMPONENTS ============================
import Nav from './components/Nav'
import Landing from './components/Landing';
import Login from './components/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Flight from './components/Flight'
import Train from './components/Train'
import Footer from './components/Footer'
import Hotel from './components/Hotel'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'
import Account from './components/Account'
import FlightBooking from './components/FlightBooking'
import FlightBookingFinal from './components/FlightBookingFinal'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route exact path='/login' component={ Login }></Route>
        <Route exact path="/signup" component={ Signup }></Route>
        <Route exact path="/" component={ Landing }></Route>
        <Route exact path="/hotel" component={ Hotel }></Route>
        <Route exact path="/flight" render={(props)=><Flight {...props}/>}></Route>
        <Route exact path="/flight/results" render={(props)=><FlightBooking {...props}/> }></Route>
        <Route exact path="/flight/booking" render={(props)=><FlightBookingFinal {...props}/>}></Route>
        <Route exact path="/train" component={ Train }></Route>
        <Route exact path="/train/results" component={ Landing }></Route>
        <Route exact path="/blog" component={ Blog }></Route>
        <Route exact path="/blogPost" component={ BlogPost }></Route>
        <Route exact path='/account' component={ Account }></Route>
        {/* <Footer /> */ }
      </div>
    </Router>
  );
}

export default App;
