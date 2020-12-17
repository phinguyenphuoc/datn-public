import React from "react";
import { Switch, Route } from "react-router-dom";
import DashboardProfileTeacherLayout from "../../../components/layout/DashboardProfileTeacherLayout";
import {
  GeneralInfo,
  Password,
  HomemuseProfile,
  PaymentMethods,
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
  const [updatePassErr, setUpdatePassErr] = React.useState("")

  const storeTeacherProfile = useSelector(
    (store) => store.teacher.profile.data
  );

  React.useEffect(() => {
    getTeacherProfile();
  }, []);

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
          />
        </Route>
        <Route path="/dashboard/teacher/profile/payment-methods" exact>
          <PaymentMethods />
        </Route>
      </Switch>
    </DashboardProfileTeacherLayout>
  );
}

export default ProfileTeacher;
