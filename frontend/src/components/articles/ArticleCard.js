import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledArticleCard = styled.div`
  width: 25%;
  margin-bottom: 16px;
  padding-left: 8px;
  padding-right: 8px;

  .card_container {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    height: 100%;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    border: none;

    &__logo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80px;
      img {
        max-height: 80px;
        max-width: 100%;
      }
    }

    &__title {
      margin-top: 16px;
      text-align: left;
      font-weight: bold;
      font-size: 16px;
    }

    &__date {
      margin-top: 8px;
      text-align: right;
      font-style: italic;
      font-size: 15px;
    }

    &__link {
      margin-top: auto;
      a {
        display: inline-flex;
        height: 40px;
        margin-top: 16px;
        padding: 0 35px;
        border-radius: 30px;
        box-shadow: inset 0 0 0 1px #0056b3;
        align-items: center;
        text-align: center;
        justify-content: center;
        transition: all 0.15s cubic-bezier(0.42, 0, 0.58, 1);
        cursor: pointer;

        &:hover {
          box-shadow: inset 0 0 0 1px #fca58c;
        }
      }
    }
  }

  @media only screen and (max-width: 1150px) {
    width: 33.33%;
  }

  @media only screen and (max-width: 870px) {
    width: 50%;
  }

  @media only screen and (max-width: 650px) {
    width: 100%;
  }
`;

function ArticleCard({ data }) {
  const genURL = () => {
    const publicationDate = new Date(data.updated_at);
    return `/articles/${publicationDate.getFullYear()}/${
      publicationDate.getMonth() + 1
      }/${convertTitleToURL(data.title)}`;
  };

  const convertTitleToURL = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const getLogo = () => {
    return data.medias.find((item) => item.tag === "thumbnail");
  };

  const getLogoUrl = () => {
    const logo = getLogo();
    return logo?.url;
  };

  const getLogoName = () => {
    const logo = getLogo();
    return logo?.name;
  };

  return (
    <StyledArticleCard>
      <div className="card_container">
        <div className="card_container__logo">
          {getLogoUrl() && (<img src={getLogoUrl()} alt={getLogoName()} />)}
        </div>
        <div className="card_container__title">{data.title}</div>
        <div className="card_container__date">
          {(data.article_source === "external"
            ? data.article_source_info.name + " - "
            : "") + moment(data.updated_at).format("ll")}
        </div>
        <div className="card_container__link">
          {data.article_source === "internal" ? (
            <Link to={{ pathname: genURL(), state: data }}>See more</Link>
          ) : (
              <a
                href={data.article_source_info.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                See more
              </a>
            )}
        </div>
      </div>
    </StyledArticleCard>
  );
}

export default ArticleCard;
