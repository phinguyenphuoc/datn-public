import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardProfileParentLayout from "../../../components/layout/DashboardProfileParentLayout";
import {
  GeneralInfo,
  Password,
  Users,
} from "../../../components/dashboard/parent/profile";
import { ModalUpdatePicture } from "../../../components/common";
// import { updatePassword } from "../../../redux/actions/updatePassword";
import { openModalMessage } from "../../../redux/actions/modalMessage";
import {
  getParentProfile,
  updateParentInfo,
  updateParentAvatar,
} from "../../../redux/actions/parent";
import { getAuth, setAuth } from "../../../utils/helpers";
import { Auth } from "aws-amplify";

function ProfileParent(props) {
  const storeParentProfile = useSelector((store) => store.parent.profile.data);

  const storeParentUpdateAvatar = useSelector(
    (store) => store.parent.updateAvatar
  );
  const storeStudentProfile = useSelector(
    (store) => store.student.students.data
  );
  React.useEffect(() => {
    getParentProfile();
  }, []);

  const [openModalUpdatePicture, setOpenModalUpdatePicture] = React.useState(
    false
  );
  const [updatePassErr, setUpdatePassErr] = React.useState("")

  const handleModalUpdatePicture = (e) => {
    e.preventDefault();
    setOpenModalUpdatePicture(!openModalUpdatePicture);
  };

  const handleUpdateProfile = (formData) => {
    console.log(formData)
    updateParentInfo(formData, (data) => {
      openModalMessage({
        title: "Profile updated",
        body: <p>Your profile has been updated successfully.</p>,
      });
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

  const handleUpdateAvatar = (formData) => {
    updateParentAvatar(formData, (data) => {
      setOpenModalUpdatePicture(false);
      openModalMessage({
        title: "Avatar updated",
        body: <p>Your avatar picture has been updated successfully.</p>,
      });
      const auth = getAuth();
      auth.user_avatar = data.media.url;
      setAuth(auth);
    });
  }

  return (
    <>
      <DashboardProfileParentLayout
        onOpenModalUpdateAvatar={handleModalUpdatePicture}
        userInfo={storeParentProfile}
      >
        <Switch>
          <Route path="/dashboard/student/profile" exact>
            <GeneralInfo handleSubmit={handleUpdateProfile} />
          </Route>
          <Route path="/dashboard/student/profile/password" exact>
            <Password handleSubmit={handleUpdatePassword} err={updatePassErr} />
          </Route>
          <Route path="/dashboard/student/profile/users" exact>
            <Users userInfo={storeStudentProfile} />
          </Route>
        </Switch>
      </DashboardProfileParentLayout>
      {openModalUpdatePicture && (
        <ModalUpdatePicture
          isOpen={openModalUpdatePicture}
          handleToggle={handleModalUpdatePicture}
          handleSubmit={handleUpdateAvatar}
          isSubmitting={storeParentUpdateAvatar.loading}
          avatarImage={storeParentProfile.avatar}
        />
      )}
    </>
  );
}

export default ProfileParent;
