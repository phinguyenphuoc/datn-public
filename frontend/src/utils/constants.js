export const RATE_DURATIONS = {
  "30_min": 30,
  "45_min": 45,
  "60_min": 60,
};

export const LESSONTYPES = [
  { value: "online", label: "Online lesson" },
];

export const OPTIONS_MONTHS = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

// From 2020 to current year + 2
const returnDynamicOptionsYear = () => {
  const currentYear = new Date().getFullYear();
  let year = 2020;
  const options = [];
  while (year <= currentYear + 2) {
    options.push({ value: year.toString(), label: year.toString() });
    year++;
  }
  return options;
};

export const OPTIONS_YEARS = returnDynamicOptionsYear();

export const USER_ROLE_STUDENT = "student";
export const USER_ROLE_TEACHER = "teacher";

export const OPTIONS_LEVEL = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

export const OPTIONS_LANGUAGES = [
  { value: "English", label: "English" },
  { value: "Vietnam", label: "Vietnam" }
];
