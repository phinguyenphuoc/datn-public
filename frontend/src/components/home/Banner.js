import React from "react";
import { Link } from "react-router-dom";
import { MutiSelect } from "../common";
import Search from "../../assets/images/fasearch.svg";
import { getInstruments } from "../../redux/actions/instruments";
// import ReactGA from "react-ga";

import { useSelector } from "react-redux";

function Banner({ onChange, instruments }) {
  const storeInstruments = useSelector(
    (store) => store.instruments.data.instruments
  );

  const optionInstruments = storeInstruments
    ? storeInstruments.map((item, index) => {
      return {
        value: item.name,
        label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      };
    })
    : [];

  React.useEffect(() => {
    if (!storeInstruments) {
      getInstruments();
    }
  }, [storeInstruments]);

  const handleGaTracking = () => {
    // ReactGA.event({
    //   category: "Search & Navigation",
    //   action: "Search Music Teachers & Navigation to Teachers Page at Homepage",
    // });
    // if (instruments) {
    //   instruments.forEach((item) => {
    //     ReactGA.event({
    //       category: "Instruments Filter",
    //       action: item.label,
    //     });
    //   });
    // }
  };

  return (
    <section className="banner">
      <div className="banner__inner clearfix ds-primary">
        <div className="banner__text">
          <h1 className="h1">
            Online <br /> <span>Music Lessons,</span>
          </h1>
          <p className="text--xxlarge margin-b-xl">
            by the Best Music Teachers
          </p>
        </div>
        <div className="banner__mutiselect">
          <div className="mutiselect">
            <MutiSelect
              isMulti
              options={optionInstruments}
              placeholder="What instrument do you want to learn?"
              onChange={onChange}
              value={instruments}
            />
          </div>
          <Link
            onClick={() => handleGaTracking()}
            to={{
              pathname: "/teachers",
              state: { isSearchInstrument: true },
            }}
            className="button-search"
          >
            <button className="button button--secondary">
              <img src={Search} alt="Search" />
              Search{" "}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Banner;
