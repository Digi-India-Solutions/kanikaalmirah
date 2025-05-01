import React from "react";

const PageHeading = ({ PageTitle }) => {
  return (
    <>
      <section className="banner-top-style p-0">
        <div className="container">
          <div className="row">
            <h2 className="heading">{PageTitle}</h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageHeading;
