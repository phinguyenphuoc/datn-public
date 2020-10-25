import React from "react";
import { useSelector } from "react-redux";
import {
  Banner,
  Why,
  HowItWorks,
  Saying,
  JoinOurTeam,
  ModalJoin,
} from "../components/teachwithuspage";
import { registerTeacher } from "../redux/actions/teacher";
import { openModalMessage } from "../redux/actions/modalMessage";
import { setOpenModalJoinHomemuse } from "../redux/actions/global";
import ReactGA from "react-ga";

function TeachWithUsPage(props) {
  const storeOpenModal = useSelector(
    (store) => store.global.openModalJoinHomemuse
  );
  const handleToggleModal = () => {
    ReactGA.event({
      category: "Navigation",
      action: "Navigation to Join Homemuse Modal at Teach with us Page Footer",
      label: "Click 'Join homemuse as teacher Button'",
    });
    setOpenModalJoinHomemuse(!storeOpenModal);
  };
  const handleRegisterTeachers = (formData) => {
    registerTeacher(formData, () => {
      setOpenModalJoinHomemuse(false);
      openModalMessage({
        title: "Thank you",
        body: (
          <p>Your message has been sent. We will get back to you shortly.</p>
        ),
      });
    });
  };
  return (
    <>
      <Banner />
      <Why />
      <HowItWorks />
      <Saying />
      <JoinOurTeam handleClickButton={handleToggleModal} />
      <ModalJoin
        isOpen={storeOpenModal}
        handleToggle={handleToggleModal}
        handleSubmit={handleRegisterTeachers}
      />
    </>
  );
}

export default TeachWithUsPage;
