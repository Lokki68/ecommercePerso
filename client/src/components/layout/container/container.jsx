import React from "react";

import Header from "../header/Header.jsx";

const Container = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Container;
