import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Resgister from './components/Resgister';
import Home from './components/Home';
import Profile from './components/Profile';
import {
  BrowserRouter ,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


import axios from 'axios';



const Headers = () =>  {
  return(
    <header>
      <ul>
       
      <li> <Link to='/home' >Home</Link></li>
      <li> <Link to='/login' >Login</Link></li>
      <li>  <Link to='/register' >Register</Link></li>
      <li>  <Link to='/logout' >Logout</Link></li>
      </ul>
     

    </header>
  );
}
function App() {






  return (
    <div className="App">

        <BrowserRouter>
          <Headers></Headers>

          <Switch>
              <Route  path="/home" component={Home} />
              <Route  path="/register" component={Resgister} />
              <Route  path="/login" component={Login} />
              <Route  path="/profile" component={Profile} />
              <Route  exact={true} 
              path="/"  
              component={() =><Redirect to="/login"></Redirect>} />
            </Switch>
          </BrowserRouter>
    </div>
  );
}

export default App;
