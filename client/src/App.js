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
import register from "./pages/register";

function App() {
  return (
    <Router>
    <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={register}/>
        <Route exact path="/Too_panjai" component={Too_panjai}/>
      </Switch>
    </Router>
  );
}

export default App;
