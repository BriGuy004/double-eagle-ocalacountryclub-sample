export interface ClubLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  stateAbbrev: string;
  majorCity: string;
  category: "private" | "resort" | "daily-fee";
  portfolioCompany: string;
  address?: string;
  phone?: string;
  website?: string;
}

export const arcisClubs: ClubLocation[] = [
  {
    id: "ancala",
    name: "Ancala Country Club",
    city: "Scottsdale",
    state: "Arizona",
    stateAbbrev: "AZ",
    majorCity: "Phoenix",
    category: "private",
    portfolioCompany: "arcis",
    address: "11700 E Via Linda, Scottsdale, AZ 85259",
    phone: "(480) 391-1000",
    website: "www.ancalacc.com"
  },
  {
    id: "broad-bay",
    name: "Broad Bay Country Club",
    city: "Virginia Beach",
    state: "Virginia",
    stateAbbrev: "VA",
    majorCity: "Virginia Beach",
    category: "private",
    portfolioCompany: "arcis",
    address: "2120 Lords Lndg, Virginia Beach, VA 23454",
    phone: "(757) 496-9090",
    website: "www.broadbaycc.com"
  },
  {
    id: "champions-retreat",
    name: "Champions Retreat",
    city: "Evans",
    state: "Georgia",
    stateAbbrev: "GA",
    majorCity: "Augusta",
    category: "private",
    portfolioCompany: "arcis",
    address: "37 Champions Pkwy, Evans, GA 30809",
    phone: "(706) 854-6960",
    website: "championsretreat.net"
  },
  {
    id: "eagle-brook",
    name: "Eagle Brook Country Club",
    city: "Geneva",
    state: "Illinois",
    stateAbbrev: "IL",
    majorCity: "Chicago",
    category: "private",
    portfolioCompany: "arcis",
    address: "2288 Fargo Blvd, Geneva, IL 60134",
    phone: "(630) 208-4653",
    website: "www.eaglebrookclub.com"
  },
  {
    id: "fox-meadow",
    name: "Fox Meadow Country Club",
    city: "Greenville",
    state: "South Carolina",
    stateAbbrev: "SC",
    majorCity: "Greenville",
    category: "private",
    portfolioCompany: "arcis",
    address: "100 Pine Forest Dr, Greenville, SC 29605",
    phone: "(864) 288-0282",
    website: "www.foxmeadowcc.com"
  },
  {
    id: "gentle-creek",
    name: "Gentle Creek",
    city: "Prosper",
    state: "Texas",
    stateAbbrev: "TX",
    majorCity: "Dallas",
    category: "private",
    portfolioCompany: "arcis",
    address: "3131 E Prosper Trail, Prosper, TX 75078",
    phone: "(972) 346-2500",
    website: "www.gentlecreek.com"
  },
  {
    id: "hunt-valley",
    name: "Hunt Valley Country Club",
    city: "Glen Mills",
    state: "Pennsylvania",
    stateAbbrev: "PA",
    majorCity: "Philadelphia",
    category: "private",
    portfolioCompany: "arcis",
    address: "1800 Baltimore National Pike, Glen Mills, PA 19342",
    phone: "(484) 841-5000",
    website: "www.huntvalleygc.com"
  },
  {
    id: "lakeridge",
    name: "LakeRidge Country Club",
    city: "Fort Myers",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Fort Myers",
    category: "private",
    portfolioCompany: "arcis",
    address: "1401 Arrowhead Dr, Fort Myers, FL 33919",
    phone: "(239) 768-1900",
    website: "www.lakeridgecc.com"
  },
  {
    id: "lantana",
    name: "Lantana Golf Club",
    city: "Lantana",
    state: "Texas",
    stateAbbrev: "TX",
    majorCity: "Dallas",
    category: "private",
    portfolioCompany: "arcis",
    address: "800 Golf Club Dr, Lantana, TX 76226",
    phone: "(940) 728-4653",
    website: "www.lantanagolf.com"
  },
  {
    id: "montgomery",
    name: "Montgomery Country Club",
    city: "Montgomery",
    state: "Texas",
    stateAbbrev: "TX",
    majorCity: "Houston",
    category: "private",
    portfolioCompany: "arcis",
    address: "1 Country Club Dr, Montgomery, TX 77316",
    phone: "(936) 597-6450",
    website: "www.montgomerycountryclub.com"
  },
  {
    id: "onion-creek",
    name: "Onion Creek Club",
    city: "Austin",
    state: "Texas",
    stateAbbrev: "TX",
    majorCity: "Austin",
    category: "private",
    portfolioCompany: "arcis",
    address: "2510 Onion Creek Pkwy, Austin, TX 78747",
    phone: "(512) 282-2162",
    website: "www.onioncreekclub.com"
  },
  {
    id: "river-place",
    name: "River Place Country Club",
    city: "Austin",
    state: "Texas",
    stateAbbrev: "TX",
    majorCity: "Austin",
    category: "private",
    portfolioCompany: "arcis",
    address: "4207 River Place Blvd, Austin, TX 78730",
    phone: "(512) 346-1114",
    website: "www.riverplaceclub.com"
  },
  {
    id: "signature-solon",
    name: "Signature of Solon Country Club",
    city: "Solon",
    state: "Ohio",
    stateAbbrev: "OH",
    majorCity: "Cleveland",
    category: "private",
    portfolioCompany: "arcis",
    address: "39000 Signature Dr, Solon, OH 44139",
    phone: "(440) 498-8888",
    website: "www.signatureofsoloncc.com"
  },
  {
    id: "tatum-ranch",
    name: "Tatum Ranch Golf Club",
    city: "Cave Creek",
    state: "Arizona",
    stateAbbrev: "AZ",
    majorCity: "Phoenix",
    category: "private",
    portfolioCompany: "arcis",
    address: "29888 N Tatum Ranch Dr, Cave Creek, AZ 85331",
    phone: "(480) 585-2399",
    website: "www.tatumranchgc.com"
  },
  {
    id: "arrowhead",
    name: "The Clubs at Arrowhead",
    city: "Glendale",
    state: "Arizona",
    stateAbbrev: "AZ",
    majorCity: "Phoenix",
    category: "private",
    portfolioCompany: "arcis",
    address: "19888 N 73rd Ave, Glendale, AZ 85308",
    phone: "(623) 561-1500",
    website: "theclubsatarrowhead.com"
  },
  {
    id: "pradera",
    name: "The Club at Pradera",
    city: "Parker",
    state: "Colorado",
    stateAbbrev: "CO",
    majorCity: "Denver",
    category: "private",
    portfolioCompany: "arcis",
    address: "5225 Raintree Dr, Parker, CO 80134",
    phone: "(720) 842-2525",
    website: "www.theclubatpradera.com"
  },
  {
    id: "ruby-hill",
    name: "Ruby Hill Golf Club",
    city: "Pleasanton",
    state: "California",
    stateAbbrev: "CA",
    majorCity: "San Francisco",
    category: "private",
    portfolioCompany: "arcis",
    address: "3400 W Ruby Hill Dr, Pleasanton, CA 94566",
    phone: "(925) 417-5840",
    website: "www.rubyhill.com"
  }
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
