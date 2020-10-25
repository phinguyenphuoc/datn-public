import React from "react";

function Banner(props) {
  return (
    <section className="articles__banner">
      <div className="articles__banner__inner ds-primary">
        <div className="articles__banner__text">
          <h1 className="h1">Articles</h1>
          <p className="text--xxlarge">
            Here, you'll find a variety of interesting and helpful content including our latest blog posts about music learning and press articles.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Banner;
