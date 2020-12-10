import React from "react";
import { Switch, Route } from "react-router-dom";
import DashboardProfileTeacherLayout from "../../../components/layout/DashboardProfileTeacherLayout";
import {
  GeneralInfo,
  Password,
  HomemuseProfile,
  PaymentMethods,
  // ModalZoom,
  // ModalZoomSuccess,
  // ModalZoomWrong,
  ModalStripeSuccess,
  ModalStripeWrong,
} from "../../../components/dashboard/teacher/profile";
import {
  getTeacherProfile,
  updateTeacherInfo,
} from "../../../redux/actions/teacher";
// import { updatePassword } from "../../../redux/actions/updatePassword";
import { useSelector } from "react-redux";
import { openModalMessage } from "../../../redux/actions/modalMessage";
import { getAuth, setAuth, getParam } from "../../../utils/helpers";
import { Auth } from "aws-amplify";

function ProfileTeacher(props) {
  const [openModalZoom, setOpenModalZoom] = React.useState(false);
  const [openModalZoomSuccess, setOpenModalZoomSuccess] = React.useState(false);
  const [openModalZoomWrong, setOpenModalZoomWrong] = React.useState(false);
  const [openModalStripeSuccess, setOpenModalStripeSuccess] = React.useState(
    false
  );
  const [openModalStripeWrong, setOpenModalStripeWrong] = React.useState(false);
  const [updatePassErr, setUpdatePassErr] = React.useState("")

  const storeTeacherProfile = useSelector(
    (store) => store.teacher.profile.data
  );

  const storeConnectStrip = useSelector((store) => store.teacher.stripe);
  const zoom_code = getParam("code");
  const state = getParam("state");
  const origin = getParam("origin");

  const isOnline =
    storeTeacherProfile.teaching_type &&
    storeTeacherProfile.teaching_type.data &&
    storeTeacherProfile.teaching_type.data.includes("online");
  const isHasConferencingTools =
    storeTeacherProfile.conferencing_tools &&
    storeTeacherProfile.conferencing_tools.includes("zoom");

  React.useEffect(() => {
    getTeacherProfile();
  }, []);

  React.useEffect(() => {
    if (
      origin === "stripe_auth" &&
      storeConnectStrip.isCalled &&
      !storeConnectStrip.error.status
    ) {
      setOpenModalStripeSuccess(true);
    }
  }, [origin, storeConnectStrip]);

  React.useEffect(() => {
    if (isOnline && !isHasConferencingTools) {
      setOpenModalZoom(true);
    }
    // eslint-disable-next-line
  }, [isOnline, isHasConferencingTools]);

  const handleUpdateProfile = (formData) => {
    updateTeacherInfo(formData, (data) => {
      openModalMessage({
        title: "Profile updated",
        body: <p>Your profile has been updated successfully.</p>,
      });
      const auth = getAuth();
      auth.user_avatar = data.profile.avatar;
      // auth.user_profil_published = data.profil.published;
      setAuth(auth);
    });
  };

  const handleUpdatePassword = async (formData) => {
    try {
      const { current_password, new_password } = formData;
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        current_password,
        new_password
      );
      openModalMessage({
        title: "Password updated",
        body: <p>Your password has been updated successfully.</p>,
      });
    } catch (err) {
      setUpdatePassErr(err.message)
    }
  };

  const handleToggleModalZoom = () => {
    setOpenModalZoom(!openModalZoom);
  };

  const handleToggleModalZoomSuccess = () => {
    setOpenModalZoomSuccess(!openModalZoomSuccess);
  };

  const handleToggleModalZoomWrong = () => {
    setOpenModalZoomWrong(!openModalZoomWrong);
  };

  const handleToggleModalStripeSuccess = () => {
    setOpenModalStripeSuccess(!openModalStripeSuccess);
  };

  const handleToggleModalStripeWrong = () => {
    setOpenModalStripeWrong(!openModalStripeWrong);
  };

  React.useEffect(() => {
    if (openModalZoomSuccess) {
      setTimeout(() => {
        setOpenModalZoomSuccess(false);
      }, 5000);
    }
  }, [openModalZoomSuccess]);

  React.useEffect(() => {
    if (openModalZoomWrong) {
      setTimeout(() => {
        setOpenModalZoomWrong(false);
      }, 5000);
    }
  }, [openModalZoomWrong]);

  React.useEffect(() => {
    if (openModalStripeSuccess) {
      setTimeout(() => {
        setOpenModalStripeSuccess(false);
      }, 5000);
    }
  }, [openModalStripeSuccess]);

  return (
    <DashboardProfileTeacherLayout userInfo={storeTeacherProfile}>
      <Switch>
        <Route path="/dashboard/teacher/profile" exact>
          <GeneralInfo handleSubmit={handleUpdateProfile} />
        </Route>
        <Route path="/dashboard/teacher/profile/password" exact>
          <Password handleSubmit={handleUpdatePassword} err={updatePassErr} />
        </Route>
        <Route path="/dashboard/teacher/profile/homemuse-profile" exact>
          <HomemuseProfile
            handleSubmit={handleUpdateProfile}
            setOpenModalZoom={setOpenModalZoom}
            isHasConferencingTools={isHasConferencingTools}
          />
          {/* <ModalZoom
            isOpen={openModalZoom}
            handleToggle={handleToggleModalZoom}
          />
          <ModalZoomSuccess
            isOpen={openModalZoomSuccess}
            handleToggle={handleToggleModalZoomSuccess}
          />
          <ModalZoomWrong
            isOpen={openModalZoomWrong}
            handleToggle={handleToggleModalZoomWrong}
          /> */}
        </Route>
        <Route path="/dashboard/teacher/profile/payment-methods" exact>
          <PaymentMethods setOpenModalStripeWrong={setOpenModalStripeWrong} />
          <ModalStripeSuccess
            isOpen={openModalStripeSuccess}
            handleToggle={handleToggleModalStripeSuccess}
          />
          <ModalStripeWrong
            isOpen={openModalStripeWrong}
            handleToggle={handleToggleModalStripeWrong}
          />
        </Route>
      </Switch>
    </DashboardProfileTeacherLayout>
  );
}

export default ProfileTeacher;
