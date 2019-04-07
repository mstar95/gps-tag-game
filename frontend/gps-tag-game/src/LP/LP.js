import React, {useState} from "react";
import "./login.css"
import {withRouter} from 'react-router-dom'

const LP = ({history}) => {

    const [val, setVal] = useState({height: 0, width: 0});

    function go() {
        fetch(`http://localhost:8080/users`, {
            method: "POST",
            headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': val
            })
        }).then(x => x.json()).then((user) => console.log(user) || history.push(`/rooms/${user.id}`))
    }

    return (
        <>
            <div className="xd"></div>
            <div className="box">
                <h2>Login</h2>
                <form>
                    <div className="inputBox">
                        <input name="email" required onChange={e => setVal(e.target.value)}/>
                        <label>Nazwa</label>
                    </div>
                </form>
                <button className="guzik" name="Do" onClick={e => go(e)}> Dołącz</button>
            </div>
        </>
    )
};


export default withRouter(LP);