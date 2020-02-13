import React from "react";

import "./Primary.css";

const Primary: React.FunctionComponent = ({ children }) => {
  return (
    <div className="Primary">
      <header className="Primary-header">{children}</header>
    </div>
  );
};

export default Primary;
