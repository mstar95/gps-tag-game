import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LP from "./LP/LP"
import RoomsComponent from "./rooms/roomsComponent"
import MapPage from "./game/MapPage"


const App = () =>
    (
        <Router>
            <div>
                <div className="navbar"><h1>Berek</h1></div>

                <Route path="/game/:id/:roomId" component={MapPage}/>
                <Route exact path="/" component={LP}/>
                <Route path="/rooms/:id" component={RoomsComponent}/>
            </div>
        </Router>
    );

export default App;

