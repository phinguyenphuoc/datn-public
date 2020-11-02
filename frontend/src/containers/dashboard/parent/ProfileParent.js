import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardProfileParentLayout from "../../../components/layout/DashboardProfileParentLayout";
import {
  GeneralInfo,
  Password,
  Users,
} from "../../../components/dashboard/parent/profile";
import { ModalUpdatePicture } from "../../../components/common";
import { updatePassword } from "../../../redux/actions/updatePassword";
import { openModalMessage } from "../../../redux/actions/modalMessage";
import {
  getParentProfile,
  updateParentInfo,
  updateParentAvatar,
  updateParentAvatarSticker,
} from "../../../redux/actions/parent";
import { getStickersInfo } from "../../../redux/actions/stickers";
import { getAuth, setAuth } from "../../../utils/helpers";

function ProfileParent(props) {
  const storeParentProfile = useSelector((store) => store.parent.profile.data);
  const storeParentUpdateAvatar = useSelector(
    (store) => store.parent.updateAvatar
  );
  const storeStudentProfile = useSelector(
    (store) => store.student.students.data
  );
  React.useEffect(() => {
    // getParentProfile();
    getStickersInfo();
  }, []);
  const storeStickers = useSelector((store) => store.stickers);
  const [openModalUpdatePicture, setOpenModalUpdatePicture] = React.useState(
    false
  );

  const handleModalUpdatePicture = (e) => {
    e.preventDefault();
    setOpenModalUpdatePicture(!openModalUpdatePicture);
  };

  const handleUpdateProfile = (formData) => {
    console.log("formData", formData)
    // const { address, birth_date,  first_name, last_name, phone} = formData
    updateParentInfo(formData, (data) => {
      openModalMessage({
        title: "Profile updated",
        body: <p>Your profile has been updated successfully.</p>,
      });
    });
  };

  const handleUpdatePassword = (formData) => {
    updatePassword(formData, (data) => {
      openModalMessage({
        title: "Password updated",
        body: <p>Your password has been updated successfully.</p>,
      });
      localStorage.setItem("auth", JSON.stringify(data));
    });
    const auth = getAuth();
    auth.user_password_updated = true;
    setAuth(auth);
  };

  const handleUpdateAvatar = (formData, isUploadPicture) => {
    if (isUploadPicture) {
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
    } else {
      updateParentAvatarSticker(formData, (data) => {
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
  };

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
            <Password handleSubmit={handleUpdatePassword} />
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
          dataSticker={storeStickers.data}
        />
      )}
    </>
  );
}

export default ProfileParent;
