import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/layout";

const withLayout = (Component) => (props) => {
  const storeGlobal = useSelector((store) => store.global);

  return (
    <div className="app" style={{ paddingTop: storeGlobal.heightHeader }}>
      <Header isDashboard />
      <Component {...props} />
    </div>
  );
};

export default withLayout;
