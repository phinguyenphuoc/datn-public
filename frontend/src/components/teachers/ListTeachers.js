import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { Loading, CardTeacher } from "../common";
import defaultAvatar from "../../assets/images/avatar-picture.svg";
import { getInstruments } from "../../redux/actions/instruments";

const ListTeachers = ({
  handleToggleModalJoin,
  handleClick,
  handleSeeMore,
  handleClickButtonFilter,
}) => {
  const listsectionRef = React.useRef(null);
  const [isCrollToBottom, setIsCrollToBottom] = React.useState(false);
  const storeTeachers = useSelector((store) => store.teachers);
  const isLoadingFirstPage = storeTeachers.loading && storeTeachers.page === 1;
  const isLoadingMorePage = storeTeachers.loading && storeTeachers.page > 1;
  const storeInstruments = useSelector(
    (store) => store.instruments.data.instruments
  );

  React.useEffect(() => {
    if (!storeInstruments) {
      getInstruments();
    }
  }, [storeInstruments]);

  React.useEffect(() => {
    let isCalling = false;

    const callHandleSeeMore = (e) => {
      const listSection = listsectionRef.current;
      if (
        !listSection ||
        isCalling ||
        e.deltaY < 0 ||
        isLoadingFirstPage ||
        isLoadingMorePage ||
        storeTeachers.isOutOfTeachers
      ) {
        return;
      }
      if (
        window.scrollY >=
        listSection.offsetTop +
        listSection.offsetHeight -
        window.innerHeight -
        20
      ) {
        isCalling = true;
        handleSeeMore();
        setTimeout(() => {
          isCalling = false;
        }, 500);
      }
    };

    window.addEventListener("scroll", callHandleSeeMore);
    return () => window.removeEventListener("scroll", callHandleSeeMore);
  }, [
    handleSeeMore,
    isLoadingFirstPage,
    isLoadingMorePage,
    storeTeachers.isOutOfTeachers,
    listsectionRef,
  ]);

  const handleGaTracking = () => {
    // ReactGA.event({
    //   category: "Navigation",
    //   action: "Navigation to Teach with us Page at Teachers Page",
    //   label: "Click 'Are you a music teacher link'",
    // });
  };

  React.useEffect(() => {
    const handleScrollButtonFilter = (e) => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100 &&
        storeTeachers.isOutOfTeachers &&
        storeTeachers.data.length !== 0
      ) {
        setIsCrollToBottom(true);
      } else {
        setIsCrollToBottom(false);
      }
    };

    window.addEventListener("scroll", handleScrollButtonFilter);
    return () => window.removeEventListener("scroll", handleScrollButtonFilter);
  }, [storeTeachers]);

  return (
    <section ref={listsectionRef} id="listsection" className="teachers">
      {isLoadingFirstPage ? (
        <div className="teachers__loading">
          <Loading />
        </div>
      ) : (
          <div className="teachers__inner">
            <div className="link">
              <Link
                onClick={() => handleGaTracking()}
                to="/teach-with-us"
                className="secondary"
              >
                Are you a music teacher?
            </Link>
            </div>
            <div className="teachers__items">
              {storeTeachers.data.map((item) => (
                <CardTeacher
                  id={item.id}
                  onClick={handleClick(item)}
                  key={`teacher-${item.id}`}
                  image={item.avatar || defaultAvatar}
                  name={`${item.first_name} ${item.last_name}`}
                  position={item.city}
                  description={item.pickup_line} d
                  skills={item.skills}
                  pricings={item.pricings}
                  // For Rating && Lesson Types
                  rating={item.rating}
                />
              ))}
            </div>

            {storeTeachers.isOutOfTeachers ? (
              <></>
            ) : (
                <div className="button__see-more">
                  {isLoadingMorePage ? (
                    <Loading />
                  ) : (
                      <button
                        className="button button--secondary"
                        onClick={handleSeeMore}
                      >
                        Load more
                      </button>
                    )}
                </div>
              )}
            <div className=" button__filter">
              <button
                className={classNames("button button--secondary", {
                  "-display-none": isCrollToBottom,
                })}
                onClick={handleClickButtonFilter}
              >
                Filter results
            </button>
            </div>
          </div>
        )}
    </section>
  );
};

export default ListTeachers;
