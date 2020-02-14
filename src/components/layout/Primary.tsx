import React from "react";
import { Link } from "react-router-dom";

import "./Primary.css";

const Primary: React.FunctionComponent = ({ children }) => {
  return (
    <section className="Primary">
      <nav>
        <Link to="/dashboard">Home</Link>
      </nav>

      <main>{children}</main>
    </section>
  );
};

export default Primary;
