// import './App.css';
import { BrowserRouter as Router, Route , Switch  } from "react-router-dom";
// import { HashRouter as Router, Route} from "react-router-dom";
// import { Switch } from "react-router-dom";
// import { Link } from "react-router-dom";

import Navbar from "./navbar";
import Home from './home';
import Inventory from "./inventory";
import Statistics from "./statistics";
import Order from "./order" 
import Makebill from "./makebill";
import Item_details from "./item_details";
import Add_items from "./add_items";
import Select_item from "./select_item";
import Contact from "./contact";
// import MyComponent from "./graph1";
import Revenue from "./revenue_sheet";
function App() {
  return (
   <Router>
<div className="App">
  <Navbar/>
  <Switch>
    <Route exact path = "/"component  ={Home} />
    <Route  path ="/home" component={Home}/>
    <Route exact path ="/inventory" component={Inventory}/>
    <Route path ="/statistics" component={Revenue} />
    <Route path ="/order" component={Order} />
   
    <Route exact path ="/makebill" component={Makebill}/>
    <Route exact path = "/inventory/:id" component={Item_details} />
    <Route exact path="/makebill/:id" component={Select_item} />
    <Route path = "/add_items" component= {Add_items} />
    <Route path="/contact" component={Contact} />
    {/* <Route path ="/" */}
  </Switch>

</div>
   </Router> 
   
  );
}

export default App;
