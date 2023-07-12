import React from "react";
import Pagination from "../assets/pagination.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <header className="container">
      <div className="head__block">
        <img src={Pagination} alt="Pagination images" className="img" />
        <h1>Paginate</h1>
      </div>
    </header>
  );
};

export default Navbar;
