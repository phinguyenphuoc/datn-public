import React, { useEffect } from "react";
import { Banner, ArticlesContainer } from "../components/articles";
import { getArticles } from "../redux/actions/articles";

function Articles(props) {
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <Banner />
      <ArticlesContainer />
    </>
  );
}

export default Articles;
