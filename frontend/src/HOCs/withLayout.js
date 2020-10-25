import React from "react";
import { useSelector } from "react-redux";
import { Header, Footer } from "../components/layout";

const withLayout = (Component, showHideHeader = false) => (props) => {
  const storeGlobal = useSelector((store) => store.global);

  return (
    <div className="app" style={{ paddingTop: storeGlobal.heightHeader }}>
      <Header showHideHeader={showHideHeader} />
      <Component {...props} />
      <Footer />
    </div>
  );
};

export default withLayout;
