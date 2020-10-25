import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, ListTeachers, ModalContact } from "../components/teachers";
import {
  getTeachers,
  getTeachersAPI,
  updateFilter,
} from "../redux/actions/teachers";
import { openModalMessage } from "../redux/actions/modalMessage";
import { registerStudent } from "../redux/actions/student";
import ReactGA from "react-ga";

function Teachers(props) {
  const [limit, setLimit] = React.useState(0);
  const [openInstruments, setOpenInstruments] = React.useState(false);
  const [openModalTeacher, setOpenModalTeacher] = React.useState(false);
  const [isLocationDisplayed, setLocationDisplay] = React.useState(true);
  const [isDisplayFilter, setIsDisplayFilter] = React.useState(false);

  const storeTeachers = useSelector((store) => store.teachers);
  const { filter } = storeTeachers;
  const isSearchInstrument =
    props.location.state && props.location.state.isSearchInstrument;

  React.useEffect(() => {
    // Toggle location filter
    if (filter.lessonType && filter.lessonType.value === "online") {
      setLocationDisplay(false);
    } else {
      setLocationDisplay(true);
    }
  }, [filter]);

  React.useEffect(() => {
    if (
      limit &&
      !Object.keys(storeTeachers.dataFromAPI).length &&
      !storeTeachers.loading
    ) {
      getTeachersAPI({
        ...storeTeachers,
        limit,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  React.useEffect(() => {
    if (
      limit &&
      isSearchInstrument &&
      Object.keys(storeTeachers.dataFromAPI).length
    ) {
      handleGetTeachers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const history = useHistory();
  const handleClickOnCard = (data) => () => {
    ReactGA.event({
      category: "Teacher Click",
      action: "User clicked Teacher Card at Teachers Page",
      label: data.first_name + " " + data.last_name + " Clicked",
    });
    history.push(`/teachers/${data.tag}`);
  };

  React.useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    let limit = 8;
    // TODO: it should be configed in a place
    if (window.innerWidth > 1150) {
      limit = 8;
    } else {
      limit = 6;
    }
    setLimit(limit);
  };

  const handleGetTeachers = (dataFilter = filter) => {
    getTeachers(
      {
        filter: dataFilter,
        page: 1,
        limit,
      },
      storeTeachers.dataFromAPI
    );
  };

  const handleChangeInstruments = (e) => {
    let { instruments } = filter;
    const selectedInstrument = e.target.name;

    if (
      e.target.checked &&
      instruments.every((item) => item.value !== selectedInstrument)
    ) {
      // push to array if it does not existed
      instruments.push({
        value: selectedInstrument,
        label: selectedInstrument,
      });
    }

    if (!e.target.checked) {
      // remove instrument from array
      instruments = instruments.filter(
        (item) => item.value !== selectedInstrument
      );
    }

    updateFilter({ ...filter, instruments });
  };

  const handleSubmit = (e) => {
    if (filter.instruments.length !== 0) {
      filter.instruments.forEach((item) => {
        ReactGA.event({
          category: "Instruments Filter",
          action: item.label,
        });
      });
    }
    e.preventDefault();
    setOpenInstruments(false);
    handleGetTeachers();
  };

  const handleSeeMore = () => {
    ReactGA.event({
      category: "Search",
      action: "Load More at Teachers Page",
      label: "Click 'Load More Button'",
    });
    getTeachers(
      {
        filter,
        page: storeTeachers.page + 1,
        limit,
      },
      storeTeachers.dataFromAPI
    );
  };

  const handleChangeLocation = (value, e) => {
    if (value) {
      ReactGA.event({
        category: "Location Filter",
        action: value.label,
      });
    }
    const newFilter = { ...filter, location: value };
    updateFilter(newFilter);
    if (e.name !== "location-small-screen") {
      handleGetTeachers(newFilter);
    }
  };

  const handleChangeLessonType = (value) => {
    if (value) {
      ReactGA.event({
        category: "LessonType Filter",
        action: value.label,
      });
    }
    let newFilter = { ...filter, lessonType: value };
    // Toggle location filter
    if (value.value === "online") {
      newFilter["location"] = null;
    }
    updateFilter(newFilter);
    handleGetTeachers(newFilter);
  };

  const toggleInstruments = () => setOpenInstruments(!openInstruments);

  const onResetInstruments = () => {
    updateFilter({ ...filter, instruments: [] });
  };

  const handleToggleModalTeacher = () => {
    setOpenModalTeacher(!openModalTeacher);
  };

  const handleRegisterStudent = (formData) => {
    registerStudent(formData, () => {
      setOpenModalTeacher(false);
      openModalMessage({
        title: "Thank you",
        body: (
          <p>
            The request has been sent. The teacher will contact you shortly.
          </p>
        ),
      });
      history.push("/teachers");
    });
  };

  const handleDisplayfilter = () => {
    setIsDisplayFilter(!isDisplayFilter);
  };

  const handleClickCloseFilter = () => {
    setIsDisplayFilter(!isDisplayFilter);
  };

  const handleClickApplyFilter = () => {
    handleGetTeachers(filter);
    setIsDisplayFilter(!isDisplayFilter);
  };

  return (
    <>
      <div className="teachers__title">
        <h1 className="h1">
          Music <span className="primary">teachers</span>
        </h1>
      </div>
      <Form
        onChangeInstruments={handleChangeInstruments}
        onSubmit={handleSubmit}
        onChangeLocation={handleChangeLocation}
        onChangeLessonType={handleChangeLessonType}
        openInstruments={openInstruments}
        toggleInstruments={toggleInstruments}
        onResetInstruments={onResetInstruments}
        isLocationDisplayed={isLocationDisplayed}
        isDisplayFilter={isDisplayFilter}
        handleClickClose={handleClickCloseFilter}
        clickApplyFilter={handleClickApplyFilter}
      />
      <ListTeachers
        handleClick={handleClickOnCard}
        handleSeeMore={handleSeeMore}
        handleToggleModalJoin={handleToggleModalTeacher}
        handleClickButtonFilter={handleDisplayfilter}
      />
      <ModalContact
        isOpen={openModalTeacher}
        handleToggle={handleToggleModalTeacher}
        handleSubmit={handleRegisterStudent}
      />
    </>
  );
}

export default Teachers;
