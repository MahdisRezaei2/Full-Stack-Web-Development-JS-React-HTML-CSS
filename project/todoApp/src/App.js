//import logo from './logo.svg'; // the file is localand it is not a javascrip file, this file lives in our source directory
// //side-effect import it oes not import ask to add the refrenced css

// app component, camel-case names: helloWorld, recat components use pascal-case: HelloWorld
// returns a JSX expression
//classname is same as class attribute in html

import { Route,Switch } from "react-router-dom";
// import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Error from "./components/Error";
import Navbar from "./components/Navbar";



// linkes refers to path, path refers to the component and component shows the  page !
function App(props) {
  
  return (
    <div className="todoapp stack-large">
        <Navbar />
        <Switch>
          <Route   path='/' component={Home} exact/>
          <Route  path ='/about' component={About}/>
          <Route component={Error}/>
        </Switch>
    </div>
   
  );
}

export default App;
