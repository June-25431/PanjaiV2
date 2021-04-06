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
import Profile from "./pages/userInformation"; //june
import register from "./pages/register";
import Noti1 from "./components/Noti1/Noti1"; //june
import search from './pages/searchResult'
import favorite from './pages/myfavorite'
// import category from './components/category/category';
import category from './pages/Category';
import Categoryshow from './pages/Categoryshow';
import { Category } from '@material-ui/icons';
// import PrivateRoute from 'react-private-route'


function App() {
  return (
    <Router>
    <Navbar />
      <Switch>
        <Route exact={true} path="/" component={Homepage}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Register" component={register}/>
        <Route path="/Too_panjai" component={Too_panjai}/>
        {/* <PrivateRoute   isAuthenticated={isLoggedIn()} path="/Too_panjai" component={Too_panjai}/> */}
        {/* <Route exact path="/Foundation/:id" component={ShowFDT}/>
        <Route path="/Foundation" component={Foundation}/> */}
        <Route path="/profile/:id" component={Profile}/>
        <Route path="/notification" component={Noti1}/>
        <Route path="/Foundation/:name/:id" component={Categoryshow}/>
        <Route path="/Foundation/:name" component={category}/>
        <Route path="/searchResult" component={search}/>
        <Route path="/myfav" component={favorite}/>
      </Switch>
    </Router>
  );
}

export default App;
