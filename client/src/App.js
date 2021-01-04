import './App.css';

import { BrowserRouter as Router, 
  Route, 
  Switch, 
  Link, 
  Redirect
} from "react-router-dom";

//pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Too_panjai from "./pages/Too-panjai";
import Navbar from "./components/Navbar/Navbar";  //forth
import Profile from "./components/Profile/profile"; //june
import register from "./pages/register";


function App() {
  return (
    <Router>
    <Navbar></Navbar>
      <Switch>
        <Route exact={true} path="/" component={Homepage}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Too_panjai" component={Too_panjai}/>
        <Route path="/profile" component={Profile}/>
      </Switch>
    </Router>
  );
}

export default App;
