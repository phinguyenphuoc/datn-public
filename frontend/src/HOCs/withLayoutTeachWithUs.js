import React from "react";
import { useSelector } from "react-redux";
import { HeaderTeachWithUs, Footer } from "../components/layout";

const withLayoutTeachWithUs = (Component) => (props) => {
  const storeGlobal = useSelector((store) => store.global);

  return (
    <div
      className="app"
      style={{ paddingTop: storeGlobal.heightHeader, background: "#1c1b21" }}
    >
      <HeaderTeachWithUs />
      <Component {...props} />
      <Footer />
    </div>
  );
};

export default withLayoutTeachWithUs;
