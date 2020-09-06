import React from 'react';
import { Link } from "react-router-dom";

const Nav = (props) => {

    return(
        <nav>
      <ul>
        <li>
          <Link to="/">Articles</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/preferences">Preferences</Link>
        </li>
      </ul>
    </nav>
    );
}

export default Nav;