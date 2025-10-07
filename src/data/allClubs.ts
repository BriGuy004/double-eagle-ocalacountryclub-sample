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
  // ARCIS GOLF - 17 clubs
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
  },

  // HAMPTON GOLF - 11 clubs
  {
    id: "cc-ocala",
    name: "Country Club of Ocala",
    city: "Ocala",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Ocala",
    category: "private",
    portfolioCompany: "hampton-golf",
    address: "6823 SE 12th Cir, Ocala, FL 34480",
    phone: "(352) 237-6644",
    website: "www.thecountryclubofocala.com"
  },
  {
    id: "glynlea",
    name: "Glynlea Country Club",
    city: "Port St. Lucie",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Port St. Lucie",
    category: "private",
    portfolioCompany: "hampton-golf",
    address: "10942 NW Furyk Dr, Port St. Lucie, FL 34987",
    phone: "(772) 242-6892",
    website: "www.glynlea.com"
  },
  {
    id: "river-hall",
    name: "River Hall Country Club",
    city: "Alva",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Fort Myers",
    category: "private",
    portfolioCompany: "hampton-golf",
    address: "3500 River Hall Pkwy, Alva, FL 33920",
    phone: "(239) 313-4653",
    website: "www.riverhallcc.com"
  },
  {
    id: "southern-hills-plantation",
    name: "Southern Hills Plantation Club",
    city: "Brooksville",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Tampa",
    category: "private",
    portfolioCompany: "hampton-golf",
    address: "4200 Summit View Dr, Brooksville, FL 34601",
    phone: "(352) 277-5000",
    website: "www.southernhillsplantationclub.com"
  },
  {
    id: "palencia-club",
    name: "The Palencia Club",
    city: "St. Augustine",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Jacksonville",
    category: "private",
    portfolioCompany: "hampton-golf",
    address: "600 Palencia Club Dr, St. Augustine, FL 32095",
    phone: "(904) 599-9040",
    website: "www.palenciaclub.com"
  },
  {
    id: "plantation-hampton",
    name: "The Plantation Golf & Country Club",
    city: "Fort Myers",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Fort Myers",
    category: "private",
    portfolioCompany: "hampton-golf",
    address: "10500 Dartington Dr, Fort Myers, FL 33913",
    phone: "(239) 561-8650",
    website: "www.plantationgolfcc.com"
  },
  {
    id: "verandah-club",
    name: "Verandah Club",
    city: "Fort Myers",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Fort Myers",
    category: "private",
    portfolioCompany: "hampton-golf",
    address: "12201 River Village Way, Fort Myers, FL 33905",
    phone: "(239) 694-7229",
    website: "www.verandahgolfclub.com"
  },
  {
    id: "northland-mn",
    name: "Northland Country Club",
    city: "Duluth",
    state: "Minnesota",
    stateAbbrev: "MN",
    majorCity: "Duluth",
    category: "private",
    portfolioCompany: "hampton-golf",
    address: "3901 E Superior St, Duluth, MN 55804",
    phone: "(218) 525-1941",
    website: "www.northlandcountryclub.com"
  },
  {
    id: "st-cloud",
    name: "St. Cloud Country Club",
    city: "St. Cloud",
    state: "Minnesota",
    stateAbbrev: "MN",
    majorCity: "St. Cloud",
    category: "private",
    portfolioCompany: "hampton-golf",
    address: "301 Montrose Rd, St. Cloud, MN 56301",
    phone: "(320) 253-1331",
    website: "www.stcloudcountryclub.com"
  },
  {
    id: "hampshire-club",
    name: "Hampshire Country Club",
    city: "Mamaroneck",
    state: "New York",
    stateAbbrev: "NY",
    majorCity: "New York",
    category: "private",
    portfolioCompany: "hampton-golf",
    address: "1025 Cove Rd, Mamaroneck, NY 10543",
    phone: "(914) 698-4610",
    website: "www.hampshireclub.com"
  },
  {
    id: "tennessee-national-hampton",
    name: "Tennessee National",
    city: "Loudon",
    state: "Tennessee",
    stateAbbrev: "TN",
    majorCity: "Knoxville",
    category: "private",
    portfolioCompany: "hampton-golf",
    address: "8301 Tennessee National Dr, Loudon, TN 37774",
    phone: "(865) 408-9992",
    website: "www.tennesseenational.com"
  },

  // CONCERT GOLF - 39 clubs
  {
    id: "heathrow-cc",
    name: "Heathrow Country Club",
    city: "Heathrow",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Orlando",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "1200 Bridgewater Drive, Heathrow, Florida 32746",
    website: "https://www.heathrowcc.com",
    phone: "407-333-1450"
  },
  {
    id: "legacy-alaqua",
    name: "The Legacy Club at Alaqua Lakes",
    city: "Longwood",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Orlando",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "1700 Alaqua Lakes Blvd, Longwood, FL 32779",
    website: "https://www.heathrowcc.com",
    phone: "407-444-9995"
  },
  {
    id: "west-lake-cc",
    name: "West Lake Country Club",
    city: "Augusta",
    state: "Georgia",
    stateAbbrev: "GA",
    majorCity: "Augusta",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "3556 West Lake Drive, Augusta, GA 30907",
    website: "https://www.westlakecountryclub.com",
    phone: "706-863-4640"
  },
  {
    id: "carrollwood-cc",
    name: "Carrollwood Country Club",
    city: "Tampa",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Tampa",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "13903 Clubhouse Drive, Tampa, FL 33618",
    website: "https://www.carrollwoodcc.com",
    phone: "813-961-1381"
  },
  {
    id: "golf-club-amelia",
    name: "The Golf Club of Amelia Island",
    city: "Amelia Island",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Jacksonville",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "4700 Amelia Island Pkwy, Amelia Island, FL 32034",
    website: "https://www.golfclubofamelia.com",
    phone: "904-277-8015"
  },
  {
    id: "white-manor-cc",
    name: "White Manor Country Club",
    city: "Malvern",
    state: "Pennsylvania",
    stateAbbrev: "PA",
    majorCity: "Philadelphia",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "831 Providence Road, Malvern, PA 19355",
    website: "https://www.whitemanorcc.com",
    phone: "610-647-1070"
  },
  {
    id: "woodmore-cc",
    name: "The Country Club at Woodmore",
    city: "Mitchellville",
    state: "Maryland",
    stateAbbrev: "MD",
    majorCity: "Washington DC",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "12320 Pleasant Prospect, Mitchellville, MD 20721",
    website: "https://www.ccwoodmore.com",
    phone: "301-249-6100"
  },
  {
    id: "muttontown-club",
    name: "The Muttontown Club",
    city: "East Norwich",
    state: "New York",
    stateAbbrev: "NY",
    majorCity: "New York",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "5933 Northern Boulevard, East Norwich, NY 11732",
    website: "https://www.themuttontownclub.com",
    phone: "516-922-7500"
  },
  {
    id: "sand-creek-cc",
    name: "Sand Creek Country Club",
    city: "Chesterton",
    state: "Indiana",
    stateAbbrev: "IN",
    majorCity: "Indianapolis",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "1001 Sand Creek Drive, Chesterton, IN 46304",
    website: "https://www.sandcreek.com",
    phone: "219-395-5200"
  },
  {
    id: "hawthorns-gcc",
    name: "Hawthorns Golf & Country Club",
    city: "Fishers",
    state: "Indiana",
    stateAbbrev: "IN",
    majorCity: "Indianapolis",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "12255 Club Point Dr, Fishers, IN 46037",
    website: "https://www.hawthornscountryclub.com",
    phone: "317-845-9100"
  },
  {
    id: "blue-hill-cc",
    name: "Blue Hill Country Club",
    city: "Canton",
    state: "Massachusetts",
    stateAbbrev: "MA",
    majorCity: "Boston",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "23 Pecunit Street, Canton, MA 02021",
    website: "https://www.bluehillcc.com",
    phone: "781-828-2000"
  },
  {
    id: "gaillardia-cc",
    name: "Gaillardia Country Club",
    city: "Oklahoma City",
    state: "Oklahoma",
    stateAbbrev: "OK",
    majorCity: "Oklahoma City",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "5300 Gaillardia Blvd, Oklahoma City, OK 73142",
    website: "https://www.gaillardia.com",
    phone: "405-302-2800"
  },
  {
    id: "macgregor-downs",
    name: "MacGregor Downs Country Club",
    city: "Cary",
    state: "North Carolina",
    stateAbbrev: "NC",
    majorCity: "Raleigh",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "430 Saint Andrews Lane, Cary, NC 27511",
    website: "https://www.macgregordowns.org",
    phone: "919-467-0146"
  },
  {
    id: "crestview-cc",
    name: "Crestview Country Club",
    city: "Wichita",
    state: "Kansas",
    stateAbbrev: "KS",
    majorCity: "Wichita",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "1000 N. 127th Street East, Wichita, KS 67206",
    website: "https://www.crestviewcountryclub.com",
    phone: "316-733-1344"
  },
  {
    id: "club-12-oaks",
    name: "The Club at 12 Oaks",
    city: "Holly Springs",
    state: "North Carolina",
    stateAbbrev: "NC",
    majorCity: "Raleigh",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "2008 Green Oaks Pkwy, Holly Springs, NC 27540",
    website: "https://www.theclubat12oaks.com",
    phone: "919-285-3680"
  },
  {
    id: "philmont-cc",
    name: "Philmont Country Club",
    city: "Huntingdon Valley",
    state: "Pennsylvania",
    stateAbbrev: "PA",
    majorCity: "Philadelphia",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "301 Tomlinson Road, Huntingdon Valley, PA 19006",
    website: "https://www.philmontcc.org",
    phone: "215-947-1271"
  },
  {
    id: "indian-spring-cc",
    name: "Indian Spring Country Club",
    city: "Boynton Beach",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "West Palm Beach",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "11501 El Clair Ranch Road, Boynton Beach, FL 33437",
    website: "https://www.indianspringcc.com",
    phone: "561-737-5544"
  },
  {
    id: "plantation-gcc",
    name: "Plantation Golf & Country Club",
    city: "Venice",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Sarasota",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "500 Rockley Blvd, Venice, FL 34293",
    website: "https://www.plantationgcc.com",
    phone: "941-497-1494"
  },
  {
    id: "fountains-cc",
    name: "Fountains Country Club",
    city: "Lake Worth",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "West Palm Beach",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "4476 Fountains Drive, Lake Worth, FL 11732",
    website: "https://www.fountainscc.com",
    phone: "561-642-2700"
  },
  {
    id: "cc-roswell",
    name: "The Country Club of Roswell",
    city: "Roswell",
    state: "Georgia",
    stateAbbrev: "GA",
    majorCity: "Atlanta",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "2500 Club Springs Drive, Roswell, GA 30076",
    website: "https://www.ccroswell.com",
    phone: "770-475-7800"
  },
  {
    id: "ranch-cc",
    name: "The Ranch Country Club",
    city: "Westminster",
    state: "Colorado",
    stateAbbrev: "CO",
    majorCity: "Denver",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "11887 Tejon Street, Westminster, CO 80234",
    website: "https://www.theranchcc.com",
    phone: "303-460-9700"
  },
  {
    id: "club-longview",
    name: "The Club at Longview",
    city: "Weddington",
    state: "North Carolina",
    stateAbbrev: "NC",
    majorCity: "Charlotte",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "8801 Longview Club Drive, Weddington, NC 28173",
    website: "https://www.theclubatlongview.com",
    phone: "704-443-2500"
  },
  {
    id: "glen-oaks-cc",
    name: "Glen Oaks Country Club",
    city: "West Des Moines",
    state: "Iowa",
    stateAbbrev: "IA",
    majorCity: "Des Moines",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "1401 Glen Oaks Drive, West Des Moines, IA 50266",
    website: "https://www.glenoakscc.com",
    phone: "515-221-900"
  },
  {
    id: "sagamore-club",
    name: "The Sagamore Club",
    city: "Noblesville",
    state: "Indiana",
    stateAbbrev: "IN",
    majorCity: "Indianapolis",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "10900 Golden Bear Way, Noblesville, IN 46060",
    website: "https://www.thesagamoreclub.com",
    phone: "317-776-2000"
  },
  {
    id: "players-club-omaha",
    name: "The Players Club",
    city: "Omaha",
    state: "Nebraska",
    stateAbbrev: "NE",
    majorCity: "Omaha",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "12101 Deer Creek Dr, Omaha, NE 68142",
    website: "https://www.playersclubomaha.com",
    phone: "402-963-9950"
  },
  {
    id: "marsh-landing-concert",
    name: "Marsh Landing Country Club",
    city: "Ponte Vedra Beach",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Jacksonville",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "25655 Marsh Landing Parkway, Ponte Vedra Beach, FL 32082",
    website: "https://www.marshlandingcc.com",
    phone: "904-285-6514"
  },
  {
    id: "hiwan-golf",
    name: "Hiwan Golf Club",
    city: "Evergreen",
    state: "Colorado",
    stateAbbrev: "CO",
    majorCity: "Denver",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "30671 Clubhouse Lane, Evergreen, CO 80439",
    website: "https://www.hiwan.com",
    phone: "303-674-3366"
  },
  {
    id: "club-renaissance",
    name: "The Club at Renaissance",
    city: "Fort Myers",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Fort Myers",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "12801 Renaissance Way, Fort Myers, FL 33912",
    website: "https://www.theclubatrenaissance.com",
    phone: "239-561-4170"
  },
  {
    id: "whitmoor-cc",
    name: "Whitmoor Country Club",
    city: "Weldon Spring",
    state: "Missouri",
    stateAbbrev: "MO",
    majorCity: "St. Louis",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "1100 Whitmoor Drive, Weldon Spring, MO 63304",
    website: "https://www.whitmoorcc.com",
    phone: "636-942-6100"
  },
  {
    id: "wisconsin-cc",
    name: "The Wisconsin Country Club",
    city: "Milwaukee",
    state: "Wisconsin",
    stateAbbrev: "WI",
    majorCity: "Milwaukee",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "6200 West Good Hope Rd, Milwaukee, WI 53223",
    website: "https://www.thewisconsincountryclub.com",
    phone: "414-353-8800"
  },
  {
    id: "northgate-cc",
    name: "Northgate Country Club",
    city: "Houston",
    state: "Texas",
    stateAbbrev: "TX",
    majorCity: "Houston",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "17110 Northgate Forest Drive, Houston, TX 77068",
    website: "https://www.northgatecountryclub.com",
    phone: "281-444-5302"
  },
  {
    id: "walden-conroe",
    name: "Walden on Lake Conroe Golf Club",
    city: "Montgomery",
    state: "Texas",
    stateAbbrev: "TX",
    majorCity: "Houston",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "13101 Walden Road, Montgomery, TX 77356",
    website: "https://www.waldengolf.com",
    phone: "936-448-4668"
  },
  {
    id: "club-pasadera",
    name: "The Club at Pasadera",
    city: "Monterey",
    state: "California",
    stateAbbrev: "CA",
    majorCity: "Monterey",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "100 Pasadera Drive, Monterey, CA 93940",
    website: "https://www.theclubatpasadera.com",
    phone: "831-647-2400"
  },
  {
    id: "jasna-polana",
    name: "Jasna Polana",
    city: "Princeton",
    state: "New Jersey",
    stateAbbrev: "NJ",
    majorCity: "New York",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "4519 Province Line Rd, Princeton, NJ 08540",
    website: "https://www.tpc.com/jasnapolana/",
    phone: "609-688-0500"
  },
  {
    id: "gc-everglades-concert",
    name: "Golf Club of the Everglades",
    city: "Naples",
    state: "Florida",
    stateAbbrev: "FL",
    majorCity: "Naples",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "8835 Vanderbilt Beach Rd, Naples, FL 34120",
    website: "https://www.gcoftheeverglades.com",
    phone: "239-354-4727"
  },
  {
    id: "georgia-club",
    name: "The Georgia Club",
    city: "Statham",
    state: "Georgia",
    stateAbbrev: "GA",
    majorCity: "Atlanta",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "1050 Chancellors Dr, Statham, GA 30666",
    website: "https://www.thegeorgiaclub.com",
    phone: "770-725-8100"
  },
  {
    id: "penn-oaks-golf",
    name: "Penn Oaks Golf Club",
    city: "West Chester",
    state: "Pennsylvania",
    stateAbbrev: "PA",
    majorCity: "Philadelphia",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "150 Penn Oaks Drive, West Chester, PA 19382",
    website: "https://www.pennoaksgolfclub.com",
    phone: "610-399-0501"
  },
  {
    id: "club-spurwing",
    name: "The Club at SpurWing",
    city: "Meridian",
    state: "Idaho",
    stateAbbrev: "ID",
    majorCity: "Boise",
    category: "private",
    portfolioCompany: "concert-golf",
    address: "6800 North Spurwing Way, Meridian, ID 83646",
    website: "https://www.theclubatspurwing.com",
    phone: "208-887-1800"
  },
  {
    id: "club-new-seabury",
    name: "The Club at New Seabury",
    city: "Mashpee",
    state: "Massachusetts",
    stateAbbrev: "MA",
    majorCity: "Boston",
    category: "resort",
    portfolioCompany: "concert-golf",
    address: "95 Shore Drive West, Mashpee, MA 02649",
    website: "https://www.newseabury.com",
    phone: "508-539-8322"
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

export const getClubsByPortfolio = (portfolioId: string): ClubLocation[] => {
  return arcisClubs.filter(club => club.portfolioCompany === portfolioId);
};
