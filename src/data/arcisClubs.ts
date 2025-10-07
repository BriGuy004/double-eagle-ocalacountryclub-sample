export interface ClubLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  stateAbbrev: string;
  majorCity: string;
  category: "private" | "resort" | "daily-fee";
}

export const arcisClubs: ClubLocation[] = [
  { id: "ancala", name: "Ancala Country Club", city: "Scottsdale", state: "Arizona", stateAbbrev: "AZ", majorCity: "Phoenix", category: "private" },
  { id: "broad-bay", name: "Broad Bay Country Club", city: "Virginia Beach", state: "Virginia", stateAbbrev: "VA", majorCity: "Virginia Beach", category: "private" },
  { id: "champions-retreat", name: "Champions Retreat Golf Club", city: "Evans", state: "Georgia", stateAbbrev: "GA", majorCity: "Augusta", category: "private" },
  { id: "eagle-brook", name: "Eagle Brook Country Club", city: "Geneva", state: "Illinois", stateAbbrev: "IL", majorCity: "Chicago", category: "private" },
  { id: "four-bridges", name: "Four Bridges Country Club", city: "Liberty Township", state: "Ohio", stateAbbrev: "OH", majorCity: "Cincinnati", category: "private" },
  { id: "fox-meadow", name: "Fox Meadow Country Club", city: "Medina", state: "Ohio", stateAbbrev: "OH", majorCity: "Cleveland", category: "private" },
  { id: "gentle-creek", name: "Gentle Creek Country Club", city: "Prospect", state: "Kentucky", stateAbbrev: "KY", majorCity: "Louisville", category: "private" },
  { id: "hunt-valley", name: "Hunt Valley Country Club", city: "Phoenix", state: "Maryland", stateAbbrev: "MD", majorCity: "Baltimore", category: "private" },
  { id: "lakeridge", name: "Lakeridge Country Club", city: "Lutz", state: "Florida", stateAbbrev: "FL", majorCity: "Tampa", category: "private" },
  { id: "lantana", name: "Lantana Golf Club", city: "Argyle", state: "Texas", stateAbbrev: "TX", majorCity: "Dallas", category: "private" },
  { id: "montgomery", name: "Montgomery Country Club", city: "Gaithersburg", state: "Maryland", stateAbbrev: "MD", majorCity: "Washington DC", category: "private" },
  { id: "onion-creek", name: "Onion Creek Club", city: "Austin", state: "Texas", stateAbbrev: "TX", majorCity: "Austin", category: "private" },
  { id: "river-place", name: "River Place Country Club", city: "Austin", state: "Texas", stateAbbrev: "TX", majorCity: "Austin", category: "private" },
  { id: "signature-solon", name: "Signature of Solon Country Club", city: "Solon", state: "Ohio", stateAbbrev: "OH", majorCity: "Cleveland", category: "private" },
  { id: "tatum-ranch", name: "Tatum Ranch Golf Club", city: "Cave Creek", state: "Arizona", stateAbbrev: "AZ", majorCity: "Phoenix", category: "private" },
  { id: "pradera", name: "The Club at Pradera", city: "Parker", state: "Colorado", stateAbbrev: "CO", majorCity: "Denver", category: "private" },
  { id: "ruby-hill", name: "The Club at Ruby Hill", city: "Pleasanton", state: "California", stateAbbrev: "CA", majorCity: "San Francisco", category: "private" },
  { id: "snoqualmie", name: "The Club at Snoqualmie Ridge", city: "Snoqualmie", state: "Washington", stateAbbrev: "WA", majorCity: "Seattle", category: "private" },
  { id: "tartan-fields", name: "The Club at Tartan Fields", city: "Dublin", state: "Ohio", stateAbbrev: "OH", majorCity: "Columbus", category: "private" },
  { id: "weston-hills", name: "The Club at Weston Hills", city: "Weston", state: "Florida", stateAbbrev: "FL", majorCity: "Miami", category: "private" },
  { id: "arrowhead", name: "The Clubs at Arrowhead", city: "Glendale", state: "Arizona", stateAbbrev: "AZ", majorCity: "Phoenix", category: "private" },
  { id: "cc-south", name: "The Country Club of the South", city: "Johns Creek", state: "Georgia", stateAbbrev: "GA", majorCity: "Atlanta", category: "private" },
  { id: "dominion", name: "The Dominion Country Club", city: "San Antonio", state: "Texas", stateAbbrev: "TX", majorCity: "San Antonio", category: "private" },
  { id: "chaparral-pines", name: "The Golf Club at Chaparral Pines", city: "Payson", state: "Arizona", stateAbbrev: "AZ", majorCity: "Phoenix", category: "private" },
  { id: "manor", name: "The Manor Golf & Country Club", city: "Alpharetta", state: "Georgia", stateAbbrev: "GA", majorCity: "Atlanta", category: "private" },
  { id: "oaks-valencia", name: "The Oaks Club at Valencia", city: "Valencia", state: "California", stateAbbrev: "CA", majorCity: "Los Angeles", category: "private" },
  { id: "pinery", name: "The Pinery Country Club", city: "Parker", state: "Colorado", stateAbbrev: "CO", majorCity: "Denver", category: "private" },
  { id: "rim", name: "The Rim Golf Club", city: "Payson", state: "Arizona", stateAbbrev: "AZ", majorCity: "Phoenix", category: "private" },
  { id: "stone-canyon", name: "The Stone Canyon Club", city: "Oro Valley", state: "Arizona", stateAbbrev: "AZ", majorCity: "Tucson", category: "private" },
  { id: "woodlands", name: "The Woodlands Country Club", city: "The Woodlands", state: "Texas", stateAbbrev: "TX", majorCity: "Houston", category: "private" },
  { id: "tpc-rivers", name: "TPC River's Bend", city: "Maineville", state: "Ohio", stateAbbrev: "OH", majorCity: "Cincinnati", category: "private" },
  { id: "twin-creeks", name: "Twin Creeks Country Club", city: "Allen", state: "Texas", stateAbbrev: "TX", majorCity: "Dallas", category: "private" },
  { id: "valencia", name: "Valencia Country Club", city: "Valencia", state: "California", stateAbbrev: "CA", majorCity: "Los Angeles", category: "private" },
  { id: "weymouth", name: "Weymouth Country Club", city: "Medina", state: "Ohio", stateAbbrev: "OH", majorCity: "Cleveland", category: "private" },
  { id: "white-columns", name: "White Columns Country Club", city: "Milton", state: "Georgia", stateAbbrev: "GA", majorCity: "Atlanta", category: "private" },
  { id: "wakonda", name: "Wakonda Club", city: "Des Moines", state: "Iowa", stateAbbrev: "IA", majorCity: "Des Moines", category: "private" },
  { id: "hyperion", name: "Hyperion Field Club", city: "Johnston", state: "Iowa", stateAbbrev: "IA", majorCity: "Des Moines", category: "private" },
  { id: "interlachen", name: "Interlachen Country Club", city: "Edina", state: "Minnesota", stateAbbrev: "MN", majorCity: "Minneapolis", category: "private" },
  { id: "minikahda", name: "Minikahda Club", city: "Minneapolis", state: "Minnesota", stateAbbrev: "MN", majorCity: "Minneapolis", category: "private" },
  { id: "rochester-mn", name: "Rochester Golf Club", city: "Rochester", state: "Minnesota", stateAbbrev: "MN", majorCity: "Rochester", category: "private" },
  { id: "milwaukee", name: "Milwaukee Country Club", city: "River Hills", state: "Wisconsin", stateAbbrev: "WI", majorCity: "Milwaukee", category: "private" },
  { id: "blue-mound", name: "Blue Mound Golf & Country Club", city: "Wauwatosa", state: "Wisconsin", stateAbbrev: "WI", majorCity: "Milwaukee", category: "private" },
  { id: "belle-meade", name: "Belle Meade Country Club", city: "Nashville", state: "Tennessee", stateAbbrev: "TN", majorCity: "Nashville", category: "private" },
  { id: "richland", name: "Richland Country Club", city: "Nashville", state: "Tennessee", stateAbbrev: "TN", majorCity: "Nashville", category: "private" },
  { id: "memphis", name: "Memphis Country Club", city: "Memphis", state: "Tennessee", stateAbbrev: "TN", majorCity: "Memphis", category: "private" },
  { id: "tennessee-national", name: "Tennessee National Golf Club", city: "Loudon", state: "Tennessee", stateAbbrev: "TN", majorCity: "Knoxville", category: "private" },
  { id: "northland-country-club", name: "Northland Country Club", city: "Duluth", state: "Minnesota", stateAbbrev: "MN", majorCity: "Duluth", category: "private" },
  { id: "golf-club-everglades", name: "Golf Club of The Everglades", city: "Naples", state: "Florida", stateAbbrev: "FL", majorCity: "Naples", category: "private" },
  { id: "marsh-landing-country-club", name: "Marsh Landing Country Club", city: "Ponte Vedra Beach", state: "Florida", stateAbbrev: "FL", majorCity: "Ponte Vedra Beach", category: "private" },
  { id: "stonegate-golf-club", name: "Stonegate Golf Club", city: "Kissimmee", state: "Florida", stateAbbrev: "FL", majorCity: "Kissimmee", category: "private" },
  { id: "golf-club-amelia-island", name: "The Golf Club Of Amelia Island", city: "Fernandina Beach", state: "Florida", stateAbbrev: "FL", majorCity: "Fernandina Beach", category: "private" }
];

export const getMajorCities = (): string[] => {
  return [...new Set(arcisClubs.map(club => club.majorCity))].sort();
};

export const getCitiesByState = (): Record<string, string[]> => {
  const stateMap: Record<string, Set<string>> = {};
  
  arcisClubs.forEach(club => {
    if (!stateMap[club.state]) {
      stateMap[club.state] = new Set();
    }
    stateMap[club.state].add(club.majorCity);
  });
  
  const result: Record<string, string[]> = {};
  Object.keys(stateMap).sort().forEach(state => {
    result[state] = Array.from(stateMap[state]).sort();
  });
  
  return result;
};

export const getClubsByMajorCity = (majorCity: string): ClubLocation[] => {
  return arcisClubs.filter(club => club.majorCity === majorCity);
};

export const getClubsByState = (stateAbbrev: string): ClubLocation[] => {
  return arcisClubs.filter(club => club.stateAbbrev === stateAbbrev);
};
