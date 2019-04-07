import React from "react";
import "./login.css"

const LP = () => {
    return (
        <div className="box">
            <h2>Login</h2>
            <form>
                <div className="inputBox">
                    <input name="email" required onKeyUp="this.setAttribute('value', this.value);" value=""/>
                        <label>Nazwa</label>
                </div>
                <input type="submit" name="Do" value="Dołącz"/>
            </form>
        </div>
)
};


export default LP;