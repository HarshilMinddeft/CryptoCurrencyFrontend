import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { Vortex } from "react-loader-spinner";
const Header = () => {
  return (
    <div className="navbar">
      <div
        style={{
          justifyContent: "left",
        }}
      >
        <Vortex
          visible={true}
          height="60"
          width="50"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
      </div>
      <div className="logo"></div>
      <h1>CryptoMaina</h1>
      <FaEthereum color="orange" size={"25"} />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/currency">Coins</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
