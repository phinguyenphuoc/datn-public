import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/layout";

const withLayout = (Component, showHideHeader = false, page = "") => (
  props
) => {
  const storeGlobal = useSelector((store) => store.global);

  return (
    <div className="app" style={{ paddingTop: storeGlobal.heightHeader }}>
      <Header showHideHeader={showHideHeader} page={page} />
      <Component {...props} />
    </div>
  );
};

export default withLayout;
