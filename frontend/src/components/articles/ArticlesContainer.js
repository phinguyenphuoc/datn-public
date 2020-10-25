import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ArticleCard from "./ArticleCard";

const StyledArticlesContainer = styled.section`
  background-color: #fff5f0;
  .article_container {
    display: flex;
    flex-wrap: wrap;
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;

function ArticlesContainer(props) {
  const storeArticles = useSelector((store) => store.articles.data.articles);

  return (
    <StyledArticlesContainer>
      <div className="container">
        <div className="article_container">
          {storeArticles &&
            storeArticles.map((item, index) => (
              <ArticleCard key={index} data={item} />
            ))}
        </div>
      </div>
    </StyledArticlesContainer>
  );
}

export default ArticlesContainer;
