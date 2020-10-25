import React from "react";
import { useSelector } from "react-redux";
import { HeaderVer2, SideBar } from "../components/layout";

const withLayout = (Component, noSidebar = true, page = "") => (props) => {
  const storeGlobal = useSelector((store) => store.global);
  return (
    <div className="app" style={{ paddingTop: storeGlobal.heightHeader }}>
      <HeaderVer2 page={page} />
      <SideBar noSidebar={noSidebar} page={page} />
      <Component {...props} />
    </div>
  );
};

export default withLayout;
