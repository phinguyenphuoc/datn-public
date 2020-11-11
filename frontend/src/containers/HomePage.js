import React from "react";
import { useSelector } from "react-redux";
import {
  Banner,
  Welcome,
  Music,
  HowItWorks,
  // LearningSolution,
  Feedback,
} from "../components/home";
import SearchTeachers from "../components/home/SearchTeachers";
import { updateFilter } from "../redux/actions/teachers";
import { getAllTeachers } from "../redux/actions/global";
import { useHistory } from "react-router-dom";

function HomePage(props) {
  const [instruments, setInstruments] = React.useState(null);
  const filter = useSelector((store) => store.teachers.filter);

  const handleChangeInstruments = (value) => {
    updateFilter({ ...filter, instruments: value });
    setInstruments(value);
  };

  const history = useHistory();
  const handlefilterInstrument = (item) => () => {
    updateFilter({
      ...filter,
      instruments: [{ value: item, label: item }],
    });
    history.push({
      pathname: "/teachers",
      state: { isSearchInstrument: true },
    });
  };

  const dataAllTeacher = useSelector((store) => store.global.allTeachers);
  React.useEffect(() => {
    if (!Object.keys(dataAllTeacher.data).length && !dataAllTeacher.loading) {
      getAllTeachers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Banner onChange={handleChangeInstruments} instruments={instruments} />
      <Music
        dataAllTeacher={dataAllTeacher}
        handleClickInstrument={handlefilterInstrument}
      />
      <HowItWorks />
      {/* <LearningSolution /> */}
      <Feedback />
      <SearchTeachers />
    </>
  );
}

export default HomePage;
