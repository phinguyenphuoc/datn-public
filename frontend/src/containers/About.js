import React from "react";
import {
  Banner,
  Teachers,
  MusicDashboard,
  WhyHomemuse,
} from "../components/about";

function About(props) {
  return (
    <>
      <Banner />
      <WhyHomemuse />
      <Teachers />
      <MusicDashboard />
    </>
  );
}

export default About;
