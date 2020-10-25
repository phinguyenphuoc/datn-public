import React from "react";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon
} from 'react-share';

const ArticleContent = ({ title, medias, paragraphs, social_share_links }) => {
  const getTagImage = (tag) => {
    return medias.find((item) => item.tag === tag);
  };

  const getTagImageUrl = (tag) => {
    const media = getTagImage(tag);
    return media?.url;
  };

  const getTagImageName = (tag) => {
    const media = getTagImage(tag);
    return media?.name;
  };

  return (
    <section className="articlepage__container">
      <div className="articlepage__container__inner ds-main">
        <div className="articlepage__container__inner__social">
          <ul style={{ top: 150 }}>
            {social_share_links.map((item, index) => (
              <React.Fragment key={index}>
                {item.tag === 'twitter' && (<li>
                  <TwitterShareButton
                    url={window.location.href}
                    title={item.caption}
                    via={item.sid}
                    hashtags={item.hashtags}>
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>
                </li>)}
                {item.tag === 'facebook' && (<li>
                  <FacebookShareButton
                    url={window.location.href}
                    quote={item.caption}
                    hashtag={item.hashtags?.map((hashtag) => `#${hashtag}`).join(" ")}>
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                </li>)}
                {item.tag === 'email' && (<li>
                  <EmailShareButton
                    url={window.location.href}
                    subject={`Homemuse.io : ${title}`}
                    body={item.caption}
                    separator=" ">
                    <EmailIcon size={32} round={true} />
                  </EmailShareButton>
                </li>)}
                {item.tag === 'linkedin' && (<li>
                  <LinkedinShareButton
                    url={window.location.href}
                    title={item.caption}
                    source="homemuse.io">
                    <LinkedinIcon size={32} round={true} />
                  </LinkedinShareButton>
                </li>)}
                {item.tag === 'pinterest' &&
                  getTagImageUrl(paragraphs[0]?.tag) && (<li>
                    <PinterestShareButton
                      url={window.location.href}
                      description={item.caption}
                      media={getTagImageUrl(paragraphs[0]?.tag)}>
                      <PinterestIcon size={32} round={true} />
                    </PinterestShareButton>
                  </li>)}
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div className="articlepage__container__inner__wrapper">
          {paragraphs.map((item, index) => (
            <React.Fragment key={index}>
              {item.tag && (
                <div className="articlepage__container__inner__wrapper__img">
                  <img
                    src={getTagImageUrl(item.tag)}
                    alt={getTagImageName(item.tag)}
                  />
                </div>
              )}
              {item.intro && (
                <div className="articlepage__container__inner__wrapper__subtitle">
                  {item.intro}
                </div>
              )}
              {item.list && (
                <ol className="articlepage__container__inner__wrapper__list">
                  {item.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              )}
              {item.main && (
                <div className="articlepage__container__inner__wrapper__article">
                  {item.main}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleContent;
