import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MapHolder from "./game/MapHolder"
import LP from "./LP/LP"
import RoomsComponent from "./rooms/roomsComponent"

const App = () =>
    (
        <Router>
            <div>
                <div className="navbar"><h1>Berek</h1></div>

                <Route exact path="/" component={MapHolder}/>
                <Route path="/lp" component={LP}/>
                <Route path="/rooms" component={RoomsComponent}/>
            </div>
        </Router>
    );

export default App;

