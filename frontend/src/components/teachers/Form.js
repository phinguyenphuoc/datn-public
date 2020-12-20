import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { SelectInstruments } from "../common";
import { setSizeTeachersFilter } from "../../redux/actions/global";
import { updateFilter } from "../../redux/actions/teachers";

function Form({
  onChangeInstruments,
  onSubmit,
  openInstruments,
  toggleInstruments,
  onResetInstruments,
  isDisplayFilter,
  handleClickClose,
  clickApplyFilter,
}) {
  const [isSticky, setIsSticky] = React.useState(false);
  const [lessonTypeOnMobile, setLessonTypeOnMobile] = React.useState(null);
  const formRef = React.useRef(null);
  const storeInstruments = useSelector(
    (store) => store.instruments.data.instruments
  );
  const storeGlobal = useSelector((store) => store.global);
  const { heightHeader, topHeader } = storeGlobal;

  React.useEffect(() => {
    const elBody = document.querySelector("body");
    if (isDisplayFilter) {
      elBody.style.overflowY = "hidden";
      elBody.style.height = "100vh";
      elBody.style.position = "fixed";
    } else {
      elBody.style.overflow = "";
      elBody.style.position = "";
      elBody.style.height = "";
    }
  }, [isDisplayFilter]);

  const optionInstruments = storeInstruments
    ? storeInstruments.map((item) => {
      return {
        value: item.name,
        label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      };
    })
    : [];

  const storeTeachers = useSelector((store) => store.teachers);
  const { filter } = storeTeachers;

  const handleSetSizeTeachersFilter = () => {
    setSizeTeachersFilter({
      top: formRef.current.offsetTop,
      height: formRef.current.offsetHeight,
    });
  };

  React.useEffect(() => {
    if (heightHeader) {
      handleSetSizeTeachersFilter();
    }
  }, [heightHeader]);

  React.useLayoutEffect(() => {
    function stickyHeader() {
      if (window.pageYOffset > 200) {
        setIsSticky(true);
      } else setIsSticky(false);
    }
    window.addEventListener("scroll", stickyHeader);
    stickyHeader();
    return () => window.removeEventListener("scroll", stickyHeader);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (lessonTypeOnMobile) {
      const newFilter = { ...filter, lessonType: lessonTypeOnMobile };
      if (lessonTypeOnMobile.value === "online") {
        newFilter["location"] = null;
      }
      updateFilter(newFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonTypeOnMobile]);

  return (
    <>
      <section
        id="teachers__filter"
        className={classNames("form__filter", {
          "-sticky": isSticky,
        })}
        ref={formRef}
        style={{ top: `${topHeader + heightHeader}px` }}
      >
        <div className="form__filter__inner">
          <form onSubmit={onSubmit}>
            <div className="filters">
              <div>
                <div className="filters__multi-select">
                  <SelectInstruments
                    options={optionInstruments}
                    onChange={onChangeInstruments}
                    openInstruments={openInstruments}
                    toggleInstruments={toggleInstruments}
                    onResetInstruments={onResetInstruments}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section
        className={classNames("form__filter__mobile", {
          "-open": isDisplayFilter,
        })}
      >
        <div className="form__filter__inner">
          <div className="filter__text">
            <p>Filter teachers</p>
            <button className="icon-x" onClick={handleClickClose}></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="filters">
              <div className="fillter-instrument">
                <div className="filters__multi-select">
                  <SelectInstruments
                    options={optionInstruments}
                    onChange={onChangeInstruments}
                    openInstruments={true}
                    onResetInstruments={onResetInstruments}
                    toggleInstruments={() => { }}
                    onMobile={true}
                  />
                </div>
              </div>
            </div>
            <div className="button__apply-filter">
              <button
                className="button button--primary"
                onClick={clickApplyFilter}
              >
                Apply filters
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Form;
