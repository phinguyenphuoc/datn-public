import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Student } from "../../../components/dashboard/parent/profile";
import { openModalMessage } from "../../../redux/actions/modalMessage";
import { ModalUpdatePicture } from "../../../components/common";
import {
  updateStudentInfo,
  updateStudenttAvatar
} from "../../../redux/actions/student";

function UserStudent(props) {
  const [openModalUpdatePicture, setOpenModalUpdatePicture] = React.useState(
    false
  );
  const handleModalUpdatePicture = (e) => {
    e.preventDefault();
    setOpenModalUpdatePicture(!openModalUpdatePicture);
  };
  const storeStudentUpdateAvatar = useSelector(
    (store) => store.student.updateAvatar
  );
  const storeStickers = useSelector((store) => store.stickers);
  const storeStudents = useSelector((store) => store.student.students);
  const userId = useParams().userId;
  const userStudentInfo =
    storeStudents.data.filter(
      (item) => item.id.toString() === userId.toString()
    )[0] || {};

  // React.useEffect(() => {
  //   if (!storeStudents.success && !storeStudents.loading) {
  //     getStudentProfile();
  //   }
  // }, [storeStudents]);

  const handleUpdateProfile = (formData) => {
    updateStudentInfo(formData, userId, (data) => {
      openModalMessage({
        title: "Profile updated",
        body: <p>Your profile has been updated successfully.</p>,
      });
    });
  };

  const handleUpdateAvatar = (formData, isUploadPicture) => {
    if (isUploadPicture) {
      updateStudenttAvatar(formData, userId, () => {
        setOpenModalUpdatePicture(false);
        openModalMessage({
          title: "Avatar updated",
          body: <p>Your avatar picture has been updated successfully.</p>,
        });
      });
    }
  };
  return (
    <>
      <Student
        handleSubmit={handleUpdateProfile}
        userStudentInfo={userStudentInfo}
        onOpenModalUpdateAvatar={handleModalUpdatePicture}
      />
      {openModalUpdatePicture && (
        <ModalUpdatePicture
          isOpen={openModalUpdatePicture}
          handleToggle={handleModalUpdatePicture}
          handleSubmit={handleUpdateAvatar}
          isSubmitting={storeStudentUpdateAvatar.loading}
          avatarImage={userStudentInfo.avatar}
          dataSticker={storeStickers.data}
        />
      )}
    </>
  );
}

export default UserStudent;
