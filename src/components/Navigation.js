import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "components/Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSplotch } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => <nav>
    <div className="menu">
        <Link to="/">
                <FontAwesomeIcon icon={faSplotch} size="5x" className="icon"/>
            
        </Link>
    </div>
    <div className="menu">
        <Link to="/profile">
            <Button type="disabled" shape="round" size="large">
                {userObj.displayName}'s Home
            </Button>
        </Link>
    </div>
        
            
        
</nav>

export default Navigation;