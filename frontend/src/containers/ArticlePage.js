import React from "react";
import { Banner, ArticleContent } from "../components/articlepage";

function ArticlePage({ location: { state: articleData } }) {
  return (
    <>
      <Banner
        title={articleData.title}
        subtitle={articleData.subtitle}
        date={articleData.updated_at}
      />
      <ArticleContent
        title={articleData.title}
        medias={articleData.medias}
        paragraphs={articleData.paragraphs}
        social_share_links={articleData.social_share_links}
      />
    </>
  );
}

export default ArticlePage;
