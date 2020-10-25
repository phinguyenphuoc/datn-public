// import { RATE_DURATIONS } from "./constants";

export const formatRate = (pricings = []) => {
  // let minRate = 0;
  let price = 0;
  // let duration = "";

  // find min rate
  // pricings.forEach(item => {
  //   const rate =
  //     parseInt(item.gross_price) / parseInt(RATE_DURATIONS[item.duration]);

  //   if (minRate === 0 || rate < minRate) {
  //     minRate = rate;
  //     price = item.gross_price;
  //     duration = item.duration;
  //   }
  // });
  // if (!duration) return null;
  // return `$${price}/${
  //   RATE_DURATIONS[duration] === 60 ? "hour" : `${RATE_DURATIONS[duration]}min`
  // }`;

  // find lowest rate
  if (pricings.length) {
    price = pricings.reduce(
      (min, p) => (p.gross_price < min ? p.gross_price : min),
      pricings[0].gross_price
    );
  }

  return `$${price}`;
};

export const getAuth = () => {
  const auth = localStorage.getItem("auth");
  return typeof auth === "string" ? JSON.parse(auth) : {};
};

export const setAuth = (dataAuth) => {
  localStorage.setItem("auth", JSON.stringify(dataAuth));
};

export const checkRolesAccepted = (auth, rolesAccepted) => {
  return (
    rolesAccepted.length &&
    auth.user_roles &&
    auth.user_roles.some((role) => rolesAccepted.includes(role))
  );
};

export const formatPhoneNumber = (entry = "") => {
  if (!entry) {
    return "";
  }
  const entryReplace = entry
    .replace(/\D/g, "")
    .replace(/^1/, "")
    .match(/([^\d]*\d[^\d]*){1,10}$/);
  if (!entryReplace) {
    return "";
  }
  const match = entryReplace[0];
  const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match;
  const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : "";
  const part3 = match.length > 6 ? ` ${match.substring(6, 10)}` : "";
  return `${part1}${part2}${part3}`;
};
export const getPhoneNumberOnlyDigits = (phone = "") => {
  return phone.replace(/\)/g, "").replace(/\(/g, "").replace(/\s/g, "");
};

export const validatePassword = (password) => {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
  return regex.test(password);
};

export const formatTime1 = (time = "") => {
  if (!time) return "";
  const hour = time.slice(0, 2);
  const formatHour = parseInt(hour);
  const minute = time.slice(3, 5);
  if (formatHour > 12) {
    return `${formatHour - 12}:${minute}`;
  } else {
    return `${time} `;
  }
};

export const formatTime2 = (time = "") => {
  if (!time) return "";
  const hour = time.slice(0, 2);
  const formatHour = parseInt(hour);
  const minute = time.slice(3, 5);
  if (formatHour > 12) {
    return `${formatHour - 12}:${minute}pm`;
  } else if (formatHour === 12) {
    return `${formatHour}:${minute}pm`;
  } else {
    return `${time}am`;
  }
};

export const convertTimeToNumber = (time = "") => {
  if (!time) return 0;
  const newTime = time.replace(":", "");
  return parseInt(newTime);
};

export const getParam = (name) => {
  if (!name) return "";
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

export const roundCurrentTime = () => {
  const currentTime = new Date();
  const minute = currentTime.getMinutes();
  const roundMinute = (Math.ceil((minute * 2) / 10) * 10) / 2;
  return currentTime.setMinutes(roundMinute);
};

export const formatExp = (month = "", year = "") => {
  const formatYear = year.toString().slice(2, 5);
  if (parseInt(month) < 10) {
    return `0${month}/${formatYear}`;
  } else return `${month}/${formatYear}`;
};
