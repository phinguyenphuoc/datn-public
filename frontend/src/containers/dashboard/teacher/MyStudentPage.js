import React from "react";
import { useSelector } from "react-redux";
import { MyStudent } from "../../../components/dashboard/teacher/myStudent";
import {
  getStudents,
  getStudentProgressReport,
} from "../../../redux/actions/teacher";
function MyStudentPage(props) {
  const storeStudents = useSelector((store) => store.teacher.students);
  const storeStudentsProgressReport = useSelector(
    (store) => store.teacher.dataStudentProgressReport
  );

  React.useEffect(() => {
    // getStudents();
  }, []);

  React.useEffect(() => {
    if (
      storeStudents &&
      storeStudents.data &&
      !storeStudentsProgressReport.loading &&
      !Object.keys(storeStudentsProgressReport.data).length
    ) {
      storeStudents.data.forEach((element) => {
        // getStudentProgressReport(element.id);
      });
    }
  }, [storeStudents, storeStudentsProgressReport]);

  return (
    <>
      <MyStudent
        dataStudent={storeStudents.data}
        dataStudentsProgressReport={storeStudentsProgressReport.data}
      />
    </>
  );
}

export default MyStudentPage;
