import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, ListTeachers } from "../components/teachers";
import {
  getTeachers,
  getTeachersAPI,
  updateFilter,
} from "../redux/actions/teachers";

function Teachers(props) {
  const [limit, setLimit] = React.useState(0);
  const [openInstruments, setOpenInstruments] = React.useState(false);
  const [openModalTeacher, setOpenModalTeacher] = React.useState(false);
  const [isDisplayFilter, setIsDisplayFilter] = React.useState(false);

  const storeTeachers = useSelector((store) => store.teachers);
  const { filter } = storeTeachers;
  const isSearchInstrument =
    props.location.state && props.location.state.isSearchInstrument;


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
    e.preventDefault();
    setOpenInstruments(false);
    handleGetTeachers();
  };

  const handleSeeMore = () => {
    getTeachers(
      {
        filter,
        page: storeTeachers.page + 1,
        limit,
      },
      storeTeachers.dataFromAPI
    );
  };

  const toggleInstruments = () => setOpenInstruments(!openInstruments);

  const onResetInstruments = () => {
    updateFilter({ ...filter, instruments: [] });
  };

  const handleToggleModalTeacher = () => {
    setOpenModalTeacher(!openModalTeacher);
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
      <div className="teachers__title" style={{ backgroundColor: "#fff" }}>
        <h1 className="h1">
          Music <span className="primary">teachers</span>
        </h1>
      </div>
      <Form
        onChangeInstruments={handleChangeInstruments}
        onSubmit={handleSubmit}
        openInstruments={openInstruments}
        toggleInstruments={toggleInstruments}
        onResetInstruments={onResetInstruments}
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
    </>
  );
}

export default Teachers;
