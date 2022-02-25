import React from 'react';
import {  Link } from "react-router-dom";

const Nav = () =>{
  return (
  <div>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/create">Create</Link>
    </li>
    <li>
      <Link to="/join">Join</Link>
    </li>
    <li>
      <Link to="/profile">Profile</Link>
    </li>
  </div>
  );
}
export default Nav;