import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import MapHolder from "./game/MapHolder"
import LP from "./LP/LP"
import RoomsComponent from "./rooms/roomsComponent"

const App = () =>
    (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/lp">LP</Link>
                    </li>
                    <li>
                        <Link to="/rooms">roomss</Link>
                    </li>
                </ul>

                <hr/>

                <Route exact path="/" component={MapHolder}/>
                <Route path="/lp" component={LP}/>
                <Route path="/rooms" component={RoomsComponent}/>
            </div>
        </Router>
    );

export default App;

