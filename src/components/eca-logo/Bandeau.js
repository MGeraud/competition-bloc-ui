import React from "react";
import "./Bandeau.css";
import logoescapade from "./escapadelogo.png";

const Bandeau = () => {
    return(
        <div className="bandeau__background">
            <img src={logoescapade} alt="defaut" />
        </div>
    )
}

export default Bandeau;