export const OPTION_ONLY_ME = "Only me";
export const OPTION_ME_AND_CHILDREN = "Me and my children";
export const OPTION_ONLY_CHILDREN = "Only my children";

export const OPTIONS_CLASSES = [
  { value: OPTION_ONLY_ME, label: OPTION_ONLY_ME },
  { value: OPTION_ME_AND_CHILDREN, label: OPTION_ME_AND_CHILDREN },
  { value: OPTION_ONLY_CHILDREN, label: OPTION_ONLY_CHILDREN },
];

export const RATE_DURATIONS = {
  "30_min": 30,
  "45_min": 45,
  "60_min": 60,
};

export const CITIES = [
  { value: "", label: "-- Any --" },
  { value: "Alameda", label: "Alameda" },
  { value: "Albany", label: "Albany" },
  { value: "American Canyon", label: "American Canyon" },
  { value: "Antioch", label: "Antioch" },
  { value: "Atherton", label: "Atherton" },
  { value: "Belmont", label: "Belmont" },
  { value: "Belvedere", label: "Belvedere" },
  { value: "Benicia", label: "Benicia" },
  { value: "Berkeley", label: "Berkeley" },
  { value: "Brentwood", label: "Brentwood" },
  { value: "Bristbane", label: "Bristbane" },
  { value: "Burlingame", label: "Burlingame" },
  { value: "Calistoga", label: "Calistoga" },
  { value: "Campbell", label: "Campbell" },
  { value: "Clayton", label: "Clayton" },
  { value: "Cloverdale", label: "Cloverdale" },
  { value: "Colma", label: "Colma" },
  { value: "Concord", label: "Concord" },
  { value: "Corte Madera", label: "Corte Madera" },
  { value: "Cotati", label: "Cotati" },
  { value: "Cupertino", label: "Cupertino" },
  { value: "Daly City", label: "Daly City" },
  { value: "Danville", label: "Danville" },
  { value: "Dixon", label: "Dixon" },
  { value: "Dublin", label: "Dublin" },
  { value: "East Palo Alto", label: "East Palo Alto" },
  { value: "El Cerrito", label: "El Cerrito" },
  { value: "Emeryville", label: "Emeryville" },
  { value: "Fairfax", label: "Fairfax" },
  { value: "Fairfield", label: "Fairfield" },
  { value: "Foster City", label: "Foster City" },
  { value: "Fremont", label: "Fremont" },
  { value: "Gilroy", label: "Gilroy" },
  { value: "Half Moon Bay", label: "Half Moon Bay" },
  { value: "Healdsburg", label: "Healdsburg" },
  { value: "Hercules", label: "Hercules" },
  { value: "Hillsborough", label: "Hillsborough" },
  { value: "Lafayette", label: "Lafayette" },
  { value: "Larkspur", label: "Larkspur" },
  { value: "Livermore", label: "Livermore" },
  { value: "Los Altos", label: "Los Altos" },
  { value: "Los Altos Hills", label: "Los Altos Hills" },
  { value: "Los Gatos", label: "Los Gatos" },
  { value: "Martinez", label: "Martinez" },
  { value: "Menlo Park", label: "Menlo Park" },
  { value: "Mill Valley", label: "Mill Valley" },
  { value: "Millbrae", label: "Millbrae" },
  { value: "Milpitas", label: "Milpitas" },
  { value: "Monte Sereno", label: "Monte Sereno" },
  { value: "Moraga", label: "Moraga" },
  { value: "Morgan Hill", label: "Morgan Hill" },
  { value: "Mountain View", label: "Mountain View" },
  { value: "Napa", label: "Napa" },
  { value: "Newark", label: "Newark" },
  { value: "Novato", label: "Novato" },
  { value: "Oakland", label: "Oakland" },
  { value: "Oakley", label: "Oakley" },
  { value: "Orinda", label: "Orinda" },
  { value: "Pacifica", label: "Pacifica" },
  { value: "Palo Alto", label: "Palo Alto" },
  { value: "Petaluma", label: "Petaluma" },
  { value: "Piedmont", label: "Piedmont" },
  { value: "Pinole", label: "Pinole" },
  { value: "Pittsburg", label: "Pittsburg" },
  { value: "Pleasant Hill", label: "Pleasant Hill" },
  { value: "Pleasanton", label: "Pleasanton" },
  { value: "Portola Valley", label: "Portola Valley" },
  { value: "Redwood City", label: "Redwood City" },
  { value: "Richmond", label: "Richmond" },
  { value: "Rio Vista", label: "Rio Vista" },
  { value: "Rohnert Park", label: "Rohnert Park" },
  { value: "Ross", label: "Ross" },
  { value: "St. Helena", label: "St. Helena" },
  { value: "San Anselmo", label: "San Anselmo" },
  { value: "San Bruno", label: "San Bruno" },
  { value: "San Carlos", label: "San Carlos" },
  { value: "San Francisco", label: "San Francisco" },
  { value: "San Jose", label: "San Jose" },
  { value: "San Leandro", label: "San Leandro" },
  { value: "San Mateo", label: "San Mateo" },
  { value: "San Pablo", label: "San Pablo" },
  { value: "San Rafael", label: "San Rafael" },
  { value: "San Ramon", label: "San Ramon" },
  { value: "Santa Clara", label: "Santa Clara" },
  { value: "Saratoga", label: "Saratoga" },
  { value: "Sausalito", label: "Sausalito" },
  { value: "Sebastopol", label: "Sebastopol" },
  { value: "Sonoma", label: "Sonoma" },
  { value: "South San Francisco", label: "South San Francisco" },
  { value: "Suisun City", label: "Suisun City" },
  { value: "Sunnyvale", label: "Sunnyvale" },
  { value: "Tiburon", label: "Tiburon" },
  { value: "Union City", label: "Union City" },
  { value: "Vacaville", label: "Vacaville" },
  { value: "Vallejo", label: "Vallejo" },
  { value: "Walnut Creek", label: "Walnut Creek" },
  { value: "Windsor", label: "Windsor" },
  { value: "Woodside", label: "Woodside" },
  { value: "Yountville", label: "Yountville" },
];

export const LESSONTYPES = [
  { value: "", label: "-- Any --" },
  { value: "online", label: "Online lesson" },
  { value: "in-person", label: "At home lesson" },
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

export const OPTIONS_REASON = [
  { value: "Medical issue", label: "Medical issue" },
  { value: "Other", label: "Other" },
];

export const USER_ROLE_STUDENT = "student";
export const USER_ROLE_TEACHER = "teacher";

export const OPTIONS_LEVEL = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

export const OPTIONS_LANGUAGES = [
  { value: "English", label: "English" },
  { value: "Vietnam", label: "Vietnam" },
  // { value: "French", label: "French" },
  // { value: "Mandarin", label: "Mandarin" },
  // { value: "Hindi", label: "Hindi" },
  // { value: "Russian", label: "Russian" },
  // { value: "Italian", label: "Italian" },
  // { value: "Portuguese", label: "Portuguese" },
];
