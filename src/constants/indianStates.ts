export interface Place {
  title: string;
  uri: string;
  description?: string;
}

export interface City {
  name: string;
  places: Place[];
}

export interface State {
  name: string;
  cities: City[];
}

export const INDIAN_STATES_DATA: State[] = [
  {
    name: "Maharashtra",
    cities: [
      { name: "Mumbai", places: [
        { title: "Gateway of India", uri: "https://www.google.com/maps/search/Gateway+of+India+Mumbai" },
        { title: "Marine Drive", uri: "https://www.google.com/maps/search/Marine+Drive+Mumbai" },
        { title: "Elephanta Caves", uri: "https://www.google.com/maps/search/Elephanta+Caves" }
      ] },
      { name: "Pune", places: [
        { title: "Shaniwar Wada", uri: "https://www.google.com/maps/search/Shaniwar+Wada+Pune" },
        { title: "Aga Khan Palace", uri: "https://www.google.com/maps/search/Aga+Khan+Palace+Pune" },
        { title: "Sinhagad Fort", uri: "https://www.google.com/maps/search/Sinhagad+Fort" }
      ] },
      { name: "Solapur", places: [
        { title: "Siddheshwar Temple", uri: "https://www.google.com/maps/search/Siddheshwar+Temple+Solapur", description: "A beautiful temple surrounded by a lake." },
        { title: "Bhuikot Fort", uri: "https://www.google.com/maps/search/Bhuikot+Fort+Solapur", description: "A historic fort with lush gardens." },
        { title: "Great Indian Bustard Sanctuary", uri: "https://www.google.com/maps/search/Great+Indian+Bustard+Sanctuary+Solapur", description: "Wildlife sanctuary for the rare bird." }
      ] },
      { name: "Nagpur", places: [
        { title: "Deekshabhoomi", uri: "https://www.google.com/maps/search/Deekshabhoomi+Nagpur" },
        { title: "Ambazari Lake", uri: "https://www.google.com/maps/search/Ambazari+Lake+Nagpur" }
      ] },
      { name: "Nashik", places: [
        { title: "Panchavati", uri: "https://www.google.com/maps/search/Panchavati+Nashik" },
        { title: "Sula Vineyards", uri: "https://www.google.com/maps/search/Sula+Vineyards+Nashik" }
      ] },
      { name: "Aurangabad", places: [
        { title: "Ajanta Caves", uri: "https://www.google.com/maps/search/Ajanta+Caves" },
        { title: "Ellora Caves", uri: "https://www.google.com/maps/search/Ellora+Caves" },
        { title: "Bibi Ka Maqbara", uri: "https://www.google.com/maps/search/Bibi+Ka+Maqbara" }
      ] },
      { name: "Kolhapur", places: [
        { title: "Mahalakshmi Temple", uri: "https://www.google.com/maps/search/Mahalakshmi+Temple+Kolhapur" },
        { title: "Rankala Lake", uri: "https://www.google.com/maps/search/Rankala+Lake+Kolhapur" }
      ] },
      { name: "Amravati", places: [
        { title: "Ambadevi Temple", uri: "https://www.google.com/maps/search/Ambadevi+Temple+Amravati" },
        { title: "Chikhaldara", uri: "https://www.google.com/maps/search/Chikhaldara+Amravati" }
      ] },
      { name: "Thane", places: [
        { title: "Upvan Lake", uri: "https://www.google.com/maps/search/Upvan+Lake+Thane" },
        { title: "Tikuji-ni-Wadi", uri: "https://www.google.com/maps/search/Tikuji-ni-Wadi+Thane" }
      ] },
      { name: "Pimpri-Chinchwad", places: [
        { title: "Appu Ghar", uri: "https://www.google.com/maps/search/Appu+Ghar+Pune" },
        { title: "Science Exhibition Center", uri: "https://www.google.com/maps/search/Pimpri+Chinchwad+Science+Exhibition+Center" }
      ] }
    ]
  },
  {
    name: "Karnataka",
    cities: [
      { name: "Bengaluru", places: [
        { title: "Lalbagh Botanical Garden", uri: "https://www.google.com/maps/search/Lalbagh+Botanical+Garden+Bengaluru" },
        { title: "Bangalore Palace", uri: "https://www.google.com/maps/search/Bangalore+Palace" },
        { title: "Cubbon Park", uri: "https://www.google.com/maps/search/Cubbon+Park+Bengaluru" }
      ] },
      { name: "Mysuru", places: [
        { title: "Mysore Palace", uri: "https://www.google.com/maps/search/Mysore+Palace" },
        { title: "Chamundi Hill", uri: "https://www.google.com/maps/search/Chamundi+Hill+Mysuru" }
      ] },
      { name: "Mangaluru", places: [
        { title: "Panambur Beach", uri: "https://www.google.com/maps/search/Panambur+Beach+Mangaluru" },
        { title: "Kudroli Gokarnath Temple", uri: "https://www.google.com/maps/search/Kudroli+Gokarnath+Temple" }
      ] },
      { name: "Hubballi-Dharwad", places: [
        { title: "Unkal Lake", uri: "https://www.google.com/maps/search/Unkal+Lake+Hubli" },
        { title: "Chandramouleshwara Temple", uri: "https://www.google.com/maps/search/Chandramouleshwara+Temple+Hubli" }
      ] },
      { name: "Belagavi", places: [
        { title: "Belgaum Fort", uri: "https://www.google.com/maps/search/Belgaum+Fort" },
        { title: "Gokak Falls", uri: "https://www.google.com/maps/search/Gokak+Falls" }
      ] },
      { name: "Davanagere", places: [
        { title: "Kondajji Lake", uri: "https://www.google.com/maps/search/Kondajji+Lake+Davanagere" },
        { title: "Bathi Hill", uri: "https://www.google.com/maps/search/Bathi+Hill+Davanagere" }
      ] },
      { name: "Ballari", places: [
        { title: "Bellary Fort", uri: "https://www.google.com/maps/search/Bellary+Fort" },
        { title: "Hampi", uri: "https://www.google.com/maps/search/Hampi" }
      ] },
      { name: "Shivamogga", places: [
        { title: "Jog Falls", uri: "https://www.google.com/maps/search/Jog+Falls" },
        { title: "Sakrebyle Elephant Camp", uri: "https://www.google.com/maps/search/Sakrebyle+Elephant+Camp" }
      ] },
      { name: "Tumakuru", places: [
        { title: "Siddaganga Mutt", uri: "https://www.google.com/maps/search/Siddaganga+Mutt+Tumkur" },
        { title: "Devarayanadurga", uri: "https://www.google.com/maps/search/Devarayanadurga+Tumkur" }
      ] }
    ]
  },
  {
    name: "Kerala",
    cities: [
      { name: "Kochi", places: [
        { title: "Fort Kochi", uri: "https://www.google.com/maps/search/Fort+Kochi" },
        { title: "Mattancherry Palace", uri: "https://www.google.com/maps/search/Mattancherry+Palace" }
      ] },
      { name: "Thiruvananthapuram", places: [
        { title: "Padmanabhaswamy Temple", uri: "https://www.google.com/maps/search/Padmanabhaswamy+Temple" },
        { title: "Kovalam Beach", uri: "https://www.google.com/maps/search/Kovalam+Beach" }
      ] },
      { name: "Kozhikode", places: [
        { title: "Kozhikode Beach", uri: "https://www.google.com/maps/search/Kozhikode+Beach" },
        { title: "Kappad Beach", uri: "https://www.google.com/maps/search/Kappad+Beach" }
      ] },
      { name: "Thrissur", places: [
        { title: "Vadakkunnathan Temple", uri: "https://www.google.com/maps/search/Vadakkunnathan+Temple+Thrissur" },
        { title: "Athirappilly Falls", uri: "https://www.google.com/maps/search/Athirappilly+Falls" }
      ] },
      { name: "Kollam", places: [
        { title: "Ashtamudi Lake", uri: "https://www.google.com/maps/search/Ashtamudi+Lake+Kollam" },
        { title: "Jatayu Earth's Center", uri: "https://www.google.com/maps/search/Jatayu+Earth's+Center" }
      ] },
      { name: "Palakkad", places: [
        { title: "Palakkad Fort", uri: "https://www.google.com/maps/search/Palakkad+Fort" },
        { title: "Malampuzha Dam", uri: "https://www.google.com/maps/search/Malampuzha+Dam" }
      ] }
    ]
  },
  {
    name: "Gujarat",
    cities: [
      { name: "Ahmedabad", places: [
        { title: "Sabarmati Ashram", uri: "https://www.google.com/maps/search/Sabarmati+Ashram" },
        { title: "Adalaj Stepwell", uri: "https://www.google.com/maps/search/Adalaj+Stepwell" }
      ] },
      { name: "Surat", places: [
        { title: "Dumas Beach", uri: "https://www.google.com/maps/search/Dumas+Beach+Surat" },
        { title: "Surat Castle", uri: "https://www.google.com/maps/search/Surat+Castle" }
      ] },
      { name: "Vadodara", places: [
        { title: "Laxmi Vilas Palace", uri: "https://www.google.com/maps/search/Laxmi+Vilas+Palace+Vadodara" },
        { title: "Sayaji Baug", uri: "https://www.google.com/maps/search/Sayaji+Baug+Vadodara" }
      ] },
      { name: "Rajkot", places: [
        { title: "Watson Museum", uri: "https://www.google.com/maps/search/Watson+Museum+Rajkot" },
        { title: "Rotary Dolls Museum", uri: "https://www.google.com/maps/search/Rotary+Dolls+Museum+Rajkot" }
      ] },
      { name: "Bhavnagar", places: [
        { title: "Nilambag Palace", uri: "https://www.google.com/maps/search/Nilambag+Palace+Bhavnagar" },
        { title: "Takhteshwar Temple", uri: "https://www.google.com/maps/search/Takhteshwar+Temple+Bhavnagar" }
      ] },
      { name: "Jamnagar", places: [
        { title: "Lakhota Lake", uri: "https://www.google.com/maps/search/Lakhota+Lake+Jamnagar" },
        { title: "Marine National Park", uri: "https://www.google.com/maps/search/Marine+National+Park+Jamnagar" }
      ] },
      { name: "Junagadh", places: [
        { title: "Girnar Hill", uri: "https://www.google.com/maps/search/Girnar+Hill+Junagadh" },
        { title: "Uparkot Fort", uri: "https://www.google.com/maps/search/Uparkot+Fort+Junagadh" }
      ] },
      { name: "Gandhinagar", places: [
        { title: "Akshardham Temple", uri: "https://www.google.com/maps/search/Akshardham+Temple+Gandhinagar" },
        { title: "Indroda Nature Park", uri: "https://www.google.com/maps/search/Indroda+Nature+Park" }
      ] },
      { name: "Anand", places: [
        { title: "Amul Dairy Museum", uri: "https://www.google.com/maps/search/Amul+Dairy+Museum+Anand" },
        { title: "Swaminarayan Temple", uri: "https://www.google.com/maps/search/Swaminarayan+Temple+Anand" }
      ] }
    ]
  },
  {
    name: "Rajasthan",
    cities: [
      { name: "Jaipur", places: [
        { title: "Hawa Mahal", uri: "https://www.google.com/maps/search/Hawa+Mahal+Jaipur" },
        { title: "Amer Fort", uri: "https://www.google.com/maps/search/Amer+Fort+Jaipur" },
        { title: "City Palace", uri: "https://www.google.com/maps/search/City+Palace+Jaipur" }
      ] },
      { name: "Udaipur", places: [
        { title: "City Palace", uri: "https://www.google.com/maps/search/City+Palace+Udaipur" },
        { title: "Lake Pichola", uri: "https://www.google.com/maps/search/Lake+Pichola+Udaipur" }
      ] },
      { name: "Jodhpur", places: [
        { title: "Mehrangarh Fort", uri: "https://www.google.com/maps/search/Mehrangarh+Fort+Jodhpur" },
        { title: "Umaid Bhawan Palace", uri: "https://www.google.com/maps/search/Umaid+Bhawan+Palace+Jodhpur" }
      ] },
      { name: "Bikaner", places: [
        { title: "Junagarh Fort", uri: "https://www.google.com/maps/search/Junagarh+Fort+Bikaner" },
        { title: "Karni Mata Temple", uri: "https://www.google.com/maps/search/Karni+Mata+Temple+Deshnoke" }
      ] },
      { name: "Ajmer", places: [
        { title: "Ajmer Sharif Dargah", uri: "https://www.google.com/maps/search/Ajmer+Sharif+Dargah" },
        { title: "Ana Sagar Lake", uri: "https://www.google.com/maps/search/Ana+Sagar+Lake+Ajmer" }
      ] },
      { name: "Kota", places: [
        { title: "Seven Wonders Park", uri: "https://www.google.com/maps/search/Seven+Wonders+Park+Kota" },
        { title: "Kishore Sagar", uri: "https://www.google.com/maps/search/Kishore+Sagar+Kota" }
      ] },
      { name: "Bhilwara", places: [
        { title: "Harni Mahadev", uri: "https://www.google.com/maps/search/Harni+Mahadev+Bhilwara" },
        { title: "Smriti Van", uri: "https://www.google.com/maps/search/Smriti+Van+Bhilwara" }
      ] }
    ]
  },
  {
    name: "Tamil Nadu",
    cities: [
      { name: "Chennai", places: [
        { title: "Marina Beach", uri: "https://www.google.com/maps/search/Marina+Beach+Chennai" },
        { title: "Kapaleeshwarar Temple", uri: "https://www.google.com/maps/search/Kapaleeshwarar+Temple+Chennai" }
      ] },
      { name: "Coimbatore", places: [
        { title: "Marudhamalai Temple", uri: "https://www.google.com/maps/search/Marudhamalai+Temple+Coimbatore" },
        { title: "Adiyogi Shiva Statue", uri: "https://www.google.com/maps/search/Adiyogi+Shiva+Statue+Coimbatore" }
      ] },
      { name: "Madurai", places: [
        { title: "Meenakshi Amman Temple", uri: "https://www.google.com/maps/search/Meenakshi+Amman+Temple+Madurai" },
        { title: "Thirumalai Nayakkar Mahal", uri: "https://www.google.com/maps/search/Thirumalai+Nayakkar+Mahal" }
      ] },
      { name: "Salem", places: [
        { title: "Yercaud", uri: "https://www.google.com/maps/search/Yercaud+Salem" },
        { title: "Mettur Dam", uri: "https://www.google.com/maps/search/Mettur+Dam+Salem" }
      ] },
      { name: "Tiruchirappalli", places: [
        { title: "Rockfort Temple", uri: "https://www.google.com/maps/search/Rockfort+Temple+Trichy" },
        { title: "Sri Ranganathaswamy Temple", uri: "https://www.google.com/maps/search/Sri+Ranganathaswamy+Temple+Srirangam" }
      ] },
      { name: "Tirunelveli", places: [
        { title: "Nellaiappar Temple", uri: "https://www.google.com/maps/search/Nellaiappar+Temple+Tirunelveli" },
        { title: "Papanasam Falls", uri: "https://www.google.com/maps/search/Papanasam+Falls" }
      ] },
      { name: "Vellore", places: [
        { title: "Vellore Fort", uri: "https://www.google.com/maps/search/Vellore+Fort" },
        { title: "Golden Temple Sripuram", uri: "https://www.google.com/maps/search/Golden+Temple+Sripuram+Vellore" }
      ] },
      { name: "Erode", places: [
        { title: "Bhavani Sangameshwarar Temple", uri: "https://www.google.com/maps/search/Bhavani+Sangameshwarar+Temple" },
        { title: "Kodiveri Dam", uri: "https://www.google.com/maps/search/Kodiveri+Dam" }
      ] },
      { name: "Thoothukudi", places: [
        { title: "Our Lady of Snows Basilica", uri: "https://www.google.com/maps/search/Our+Lady+of+Snows+Basilica+Tuticorin" },
        { title: "Roche Park", uri: "https://www.google.com/maps/search/Roche+Park+Tuticorin" }
      ] }
    ]
  },
  {
    name: "Uttar Pradesh",
    cities: [
      { name: "Lucknow", places: [
        { title: "Bara Imambara", uri: "https://www.google.com/maps/search/Bara+Imambara+Lucknow" },
        { title: "Rumi Darwaza", uri: "https://www.google.com/maps/search/Rumi+Darwaza+Lucknow" }
      ] },
      { name: "Kanpur", places: [
        { title: "JK Temple", uri: "https://www.google.com/maps/search/JK+Temple+Kanpur" },
        { title: "ZOO Kanpur", uri: "https://www.google.com/maps/search/Kanpur+Zoo" }
      ] },
      { name: "Varanasi", places: [
        { title: "Kashi Vishwanath Temple", uri: "https://www.google.com/maps/search/Kashi+Vishwanath+Temple" },
        { title: "Dashashwamedh Ghat", uri: "https://www.google.com/maps/search/Dashashwamedh+Ghat" }
      ] },
      { name: "Agra", places: [
        { title: "Taj Mahal", uri: "https://www.google.com/maps/search/Taj+Mahal" },
        { title: "Agra Fort", uri: "https://www.google.com/maps/search/Agra+Fort" },
        { title: "Fatehpur Sikri", uri: "https://www.google.com/maps/search/Fatehpur+Sikri" }
      ] },
      { name: "Prayagraj", places: [
        { title: "Triveni Sangam", uri: "https://www.google.com/maps/search/Triveni+Sangam+Prayagraj" },
        { title: "Allahabad Fort", uri: "https://www.google.com/maps/search/Allahabad+Fort" }
      ] },
      { name: "Meerut", places: [
        { title: "Augarnath Temple", uri: "https://www.google.com/maps/search/Augarnath+Temple+Meerut" },
        { title: "Hastinapur", uri: "https://www.google.com/maps/search/Hastinapur+Meerut" }
      ] },
      { name: "Ghaziabad", places: [
        { title: "ISKCON Temple Ghaziabad", uri: "https://www.google.com/maps/search/ISKCON+Temple+Ghaziabad" },
        { title: "Swarna Jayanti Park", uri: "https://www.google.com/maps/search/Swarna+Jayanti+Park+Ghaziabad" }
      ] },
      { name: "Noida", places: [
        { title: "Okhla Bird Sanctuary", uri: "https://www.google.com/maps/search/Okhla+Bird+Sanctuary" },
        { title: "Worlds of Wonder", uri: "https://www.google.com/maps/search/Worlds+of+Wonder+Noida" }
      ] },
      { name: "Bareilly", places: [
        { title: "Trivati Nath Temple", uri: "https://www.google.com/maps/search/Trivati+Nath+Temple+Bareilly" },
        { title: "Alakhnath Temple", uri: "https://www.google.com/maps/search/Alakhnath+Temple+Bareilly" }
      ] },
      { name: "Aligarh", places: [
        { title: "Aligarh Fort", uri: "https://www.google.com/maps/search/Aligarh+Fort" },
        { title: "Sir Syed House", uri: "https://www.google.com/maps/search/Sir+Syed+House+Aligarh" }
      ] },
      { name: "Moradabad", places: [
        { title: "Raza Library", uri: "https://www.google.com/maps/search/Raza+Library+Rampur" },
        { title: "Prem Wonderland", uri: "https://www.google.com/maps/search/Prem+Wonderland+Moradabad" }
      ] }
    ]
  },
  {
    name: "West Bengal",
    cities: [
      { name: "Kolkata", places: [
        { title: "Victoria Memorial", uri: "https://www.google.com/maps/search/Victoria+Memorial+Kolkata" },
        { title: "Howrah Bridge", uri: "https://www.google.com/maps/search/Howrah+Bridge" }
      ] },
      { name: "Darjeeling", places: [
        { title: "Tiger Hill", uri: "https://www.google.com/maps/search/Tiger+Hill+Darjeeling" },
        { title: "Batasia Loop", uri: "https://www.google.com/maps/search/Batasia+Loop+Darjeeling" }
      ] },
      { name: "Asansol", places: [
        { title: "Nehru Park", uri: "https://www.google.com/maps/search/Nehru+Park+Asansol" },
        { title: "Maithon Dam", uri: "https://www.google.com/maps/search/Maithon+Dam" }
      ] },
      { name: "Siliguri", places: [
        { title: "Salugara Monastery", uri: "https://www.google.com/maps/search/Salugara+Monastery+Siliguri" },
        { title: "Bengal Safari", uri: "https://www.google.com/maps/search/Bengal+Safari+Siliguri" }
      ] },
      { name: "Durgapur", places: [
        { title: "Bhabani Pathak's Tilla", uri: "https://www.google.com/maps/search/Bhabani+Pathak's+Tilla+Durgapur" },
        { title: "Troika Park", uri: "https://www.google.com/maps/search/Troika+Park+Durgapur" }
      ] },
      { name: "Kharagpur", places: [
        { title: "Hijli Detainment Camp", uri: "https://www.google.com/maps/search/Hijli+Detainment+Camp" },
        { title: "Nehru Museum", uri: "https://www.google.com/maps/search/Nehru+Museum+IIT+Kharagpur" }
      ] }
    ]
  },
  {
    name: "Madhya Pradesh",
    cities: [
      { name: "Indore", places: [
        { title: "Rajwada Palace", uri: "https://www.google.com/maps/search/Rajwada+Palace+Indore" },
        { title: "Lal Bagh Palace", uri: "https://www.google.com/maps/search/Lal+Bagh+Palace+Indore" }
      ] },
      { name: "Bhopal", places: [
        { title: "Upper Lake", uri: "https://www.google.com/maps/search/Upper+Lake+Bhopal" },
        { title: "Van Vihar National Park", uri: "https://www.google.com/maps/search/Van+Vihar+National+Park+Bhopal" }
      ] },
      { name: "Gwalior", places: [
        { title: "Gwalior Fort", uri: "https://www.google.com/maps/search/Gwalior+Fort" },
        { title: "Jai Vilas Palace", uri: "https://www.google.com/maps/search/Jai+Vilas+Palace+Gwalior" }
      ] },
      { name: "Jabalpur", places: [
        { title: "Bhedaghat", uri: "https://www.google.com/maps/search/Bhedaghat+Jabalpur" },
        { title: "Dhuandhar Falls", uri: "https://www.google.com/maps/search/Dhuandhar+Falls" }
      ] },
      { name: "Ujjain", places: [
        { title: "Mahakaleshwar Jyotirlinga", uri: "https://www.google.com/maps/search/Mahakaleshwar+Jyotirlinga+Ujjain" },
        { title: "Kal Bhairav Temple", uri: "https://www.google.com/maps/search/Kal+Bhairav+Temple+Ujjain" }
      ] },
      { name: "Sagar", places: [
        { title: "Lakha Banjara Lake", uri: "https://www.google.com/maps/search/Lakha+Banjara+Lake+Sagar" },
        { title: "Rahatgarh Falls", uri: "https://www.google.com/maps/search/Rahatgarh+Falls" }
      ] }
    ]
  },
  {
    name: "Punjab",
    cities: [
      { name: "Amritsar", places: [
        { title: "Golden Temple", uri: "https://www.google.com/maps/search/Golden+Temple+Amritsar" },
        { title: "Jallianwala Bagh", uri: "https://www.google.com/maps/search/Jallianwala+Bagh" }
      ] },
      { name: "Ludhiana", places: [
        { title: "Nehru Rose Garden", uri: "https://www.google.com/maps/search/Nehru+Rose+Garden+Ludhiana" },
        { title: "Lodhi Fort", uri: "https://www.google.com/maps/search/Lodhi+Fort+Ludhiana" }
      ] },
      { name: "Jalandhar", places: [
        { title: "Devi Talab Mandir", uri: "https://www.google.com/maps/search/Devi+Talab+Mandir+Jalandhar" },
        { title: "Science City", uri: "https://www.google.com/maps/search/Pushpa+Gujral+Science+City" }
      ] },
      { name: "Patiala", places: [
        { title: "Qila Mubarak", uri: "https://www.google.com/maps/search/Qila+Mubarak+Patiala" },
        { title: "Sheesh Mahal", uri: "https://www.google.com/maps/search/Sheesh+Mahal+Patiala" }
      ] },
      { name: "Bathinda", places: [
        { title: "Qila Mubarak Bathinda", uri: "https://www.google.com/maps/search/Qila+Mubarak+Bathinda" },
        { title: "Rose Garden Bathinda", uri: "https://www.google.com/maps/search/Rose+Garden+Bathinda" }
      ] },
      { name: "Hoshiarpur", places: [
        { title: "Takhni-Rehmapur Wildlife Sanctuary", uri: "https://www.google.com/maps/search/Takhni-Rehmapur+Wildlife+Sanctuary" },
        { title: "Sheesh Mahal Hoshiarpur", uri: "https://www.google.com/maps/search/Sheesh+Mahal+Hoshiarpur" }
      ] }
    ]
  },
  {
    name: "Telangana",
    cities: [
      { name: "Hyderabad", places: [
        { title: "Charminar", uri: "https://www.google.com/maps/search/Charminar+Hyderabad" },
        { title: "Golconda Fort", uri: "https://www.google.com/maps/search/Golconda+Fort+Hyderabad" }
      ] },
      { name: "Warangal", places: [
        { title: "Thousand Pillar Temple", uri: "https://www.google.com/maps/search/Thousand+Pillar+Temple+Warangal" },
        { title: "Warangal Fort", uri: "https://www.google.com/maps/search/Warangal+Fort" }
      ] },
      { name: "Nizamabad", places: [
        { title: "Nizamabad Fort", uri: "https://www.google.com/maps/search/Nizamabad+Fort" },
        { title: "Ali Sagar Reservoir", uri: "https://www.google.com/maps/search/Ali+Sagar+Reservoir" }
      ] },
      { name: "Khammam", places: [
        { title: "Khammam Fort", uri: "https://www.google.com/maps/search/Khammam+Fort" },
        { title: "Lakaram Lake", uri: "https://www.google.com/maps/search/Lakaram+Lake+Khammam" }
      ] },
      { name: "Karimnagar", places: [
        { title: "Lower Manair Dam", uri: "https://www.google.com/maps/search/Lower+Manair+Dam+Karimnagar" },
        { title: "Elgandal Fort", uri: "https://www.google.com/maps/search/Elgandal+Fort" }
      ] },
      { name: "Mahbubnagar", places: [
        { title: "Pillalamarri", uri: "https://www.google.com/maps/search/Pillalamarri+Mahbubnagar" },
        { title: "Jurala Project", uri: "https://www.google.com/maps/search/Jurala+Project" }
      ] }
    ]
  },
  {
    name: "Delhi",
    cities: [
      { name: "New Delhi", places: [
        { title: "India Gate", uri: "https://www.google.com/maps/search/India+Gate+Delhi" },
        { title: "Qutub Minar", uri: "https://www.google.com/maps/search/Qutub+Minar+Delhi" },
        { title: "Red Fort", uri: "https://www.google.com/maps/search/Red+Fort+Delhi" }
      ] }
    ]
  },
  {
    name: "Goa",
    cities: [
      { name: "Panaji", places: [
        { title: "Basilica of Bom Jesus", uri: "https://www.google.com/maps/search/Basilica+of+Bom+Jesus+Goa" },
        { title: "Miramar Beach", uri: "https://www.google.com/maps/search/Miramar+Beach+Panaji" }
      ] },
      { name: "Margao", places: [
        { title: "Colva Beach", uri: "https://www.google.com/maps/search/Colva+Beach+Goa" },
        { title: "Benaulim Beach", uri: "https://www.google.com/maps/search/Benaulim+Beach+Goa" }
      ] }
    ]
  },
  {
    name: "Himachal Pradesh",
    cities: [
      { name: "Shimla", places: [
        { title: "The Ridge", uri: "https://www.google.com/maps/search/The+Ridge+Shimla" },
        { title: "Jakhu Temple", uri: "https://www.google.com/maps/search/Jakhu+Temple+Shimla" },
        { title: "Mall Road", uri: "https://www.google.com/maps/search/Mall+Road+Shimla" }
      ] },
      { name: "Manali", places: [
        { title: "Hadimba Devi Temple", uri: "https://www.google.com/maps/search/Hadimba+Devi+Temple+Manali" },
        { title: "Solang Valley", uri: "https://www.google.com/maps/search/Solang+Valley" },
        { title: "Rohtang Pass", uri: "https://www.google.com/maps/search/Rohtang+Pass" }
      ] },
      { name: "Dharamshala", places: [
        { title: "McLeod Ganj", uri: "https://www.google.com/maps/search/McLeod+Ganj" },
        { title: "Bhagsunag Waterfall", uri: "https://www.google.com/maps/search/Bhagsunag+Waterfall" }
      ] }
    ]
  },
  {
    name: "Uttarakhand",
    cities: [
      { name: "Dehradun", places: [
        { title: "Robber's Cave", uri: "https://www.google.com/maps/search/Robber's+Cave+Dehradun" },
        { title: "Sahastradhara", uri: "https://www.google.com/maps/search/Sahastradhara+Dehradun" }
      ] },
      { name: "Rishikesh", places: [
        { title: "Laxman Jhula", uri: "https://www.google.com/maps/search/Laxman+Jhula+Rishikesh" },
        { title: "Triveni Ghat", uri: "https://www.google.com/maps/search/Triveni+Ghat+Rishikesh" },
        { title: "Parmarth Niketan", uri: "https://www.google.com/maps/search/Parmarth+Niketan" }
      ] },
      { name: "Nainital", places: [
        { title: "Naini Lake", uri: "https://www.google.com/maps/search/Naini+Lake+Nainital" },
        { title: "Naina Devi Temple", uri: "https://www.google.com/maps/search/Naina+Devi+Temple+Nainital" }
      ] }
    ]
  },
  {
    name: "Andhra Pradesh",
    cities: [
      { name: "Visakhapatnam", places: [
        { title: "Rishikonda Beach", uri: "https://www.google.com/maps/search/Rishikonda+Beach" },
        { title: "Kailasagiri", uri: "https://www.google.com/maps/search/Kailasagiri+Visakhapatnam" },
        { title: "INS Kursura Submarine Museum", uri: "https://www.google.com/maps/search/INS+Kursura+Submarine+Museum" }
      ] },
      { name: "Tirupati", places: [
        { title: "Venkateswara Temple", uri: "https://www.google.com/maps/search/Venkateswara+Temple+Tirumala" },
        { title: "Silathoranam", uri: "https://www.google.com/maps/search/Silathoranam+Tirupati" }
      ] },
      { name: "Vijayawada", places: [
        { title: "Kanakadurga Temple", uri: "https://www.google.com/maps/search/Kanakadurga+Temple+Vijayawada" },
        { title: "Undavalli Caves", uri: "https://www.google.com/maps/search/Undavalli+Caves" }
      ] },
      { name: "Guntur", places: [
        { title: "Uppalapadu Bird Sanctuary", uri: "https://www.google.com/maps/search/Uppalapadu+Bird+Sanctuary" },
        { title: "Amaravathi Stupa", uri: "https://www.google.com/maps/search/Amaravathi+Stupa" }
      ] },
      { name: "Nellore", places: [
        { title: "Mypadu Beach", uri: "https://www.google.com/maps/search/Mypadu+Beach+Nellore" },
        { title: "Nelapattu Bird Sanctuary", uri: "https://www.google.com/maps/search/Nelapattu+Bird+Sanctuary" }
      ] },
      { name: "Rajamahendravaram", places: [
        { title: "Godavari Bridge", uri: "https://www.google.com/maps/search/Godavari+Bridge+Rajahmundry" },
        { title: "ISKCON Rajahmundry", uri: "https://www.google.com/maps/search/ISKCON+Rajahmundry" }
      ] },
      { name: "Kurnool", places: [
        { title: "Konda Reddy Fort", uri: "https://www.google.com/maps/search/Konda+Reddy+Fort+Kurnool" },
        { title: "Belum Caves", uri: "https://www.google.com/maps/search/Belum+Caves" }
      ] }
    ]
  },
  {
    name: "Bihar",
    cities: [
      { name: "Patna", places: [
        { title: "Golghar", uri: "https://www.google.com/maps/search/Golghar+Patna" },
        { title: "Patna Museum", uri: "https://www.google.com/maps/search/Patna+Museum" },
        { title: "Takht Sri Patna Sahib", uri: "https://www.google.com/maps/search/Takht+Sri+Patna+Sahib" }
      ] },
      { name: "Gaya", places: [
        { title: "Mahabodhi Temple", uri: "https://www.google.com/maps/search/Mahabodhi+Temple+Bodh+Gaya" },
        { title: "Vishnupad Temple", uri: "https://www.google.com/maps/search/Vishnupad+Temple+Gaya" }
      ] },
      { name: "Muzaffarpur", places: [
        { title: "Litchi Gardens", uri: "https://www.google.com/maps/search/Litchi+Gardens+Muzaffarpur" },
        { title: "Garib Sthan Mandir", uri: "https://www.google.com/maps/search/Garib+Sthan+Mandir+Muzaffarpur" }
      ] },
      { name: "Bhagalpur", places: [
        { title: "Vikramshila Gangetic Dolphin Sanctuary", uri: "https://www.google.com/maps/search/Vikramshila+Gangetic+Dolphin+Sanctuary" },
        { title: "Kupeshwar Nath Temple", uri: "https://www.google.com/maps/search/Kupeshwar+Nath+Temple+Bhagalpur" }
      ] },
      { name: "Darbhanga", places: [
        { title: "Ahilya Asthan", uri: "https://www.google.com/maps/search/Ahilya+Asthan+Darbhanga" },
        { title: "Kusheshwar Asthan Bird Sanctuary", uri: "https://www.google.com/maps/search/Kusheshwar+Asthan+Bird+Sanctuary" }
      ] },
      { name: "Arrah", places: [
        { title: "Aranya Devi Temple", uri: "https://www.google.com/maps/search/Aranya+Devi+Temple+Arrah" },
        { title: "Jagdishpur Fort", uri: "https://www.google.com/maps/search/Jagdishpur+Fort+Arrah" }
      ] }
    ]
  },
  {
    name: "Odisha",
    cities: [
      { name: "Bhubaneswar", places: [
        { title: "Lingaraj Temple", uri: "https://www.google.com/maps/search/Lingaraj+Temple+Bhubaneswar" },
        { title: "Udayagiri and Khandagiri Caves", uri: "https://www.google.com/maps/search/Udayagiri+and+Khandagiri+Caves" },
        { title: "Nandankanan Zoological Park", uri: "https://www.google.com/maps/search/Nandankanan+Zoological+Park" }
      ] },
      { name: "Puri", places: [
        { title: "Jagannath Temple", uri: "https://www.google.com/maps/search/Jagannath+Temple+Puri" },
        { title: "Puri Beach", uri: "https://www.google.com/maps/search/Puri+Beach" },
        { title: "Konark Sun Temple", uri: "https://www.google.com/maps/search/Konark+Sun+Temple" }
      ] },
      { name: "Rourkela", places: [
        { title: "Hanuman Vatika", uri: "https://www.google.com/maps/search/Hanuman+Vatika+Rourkela" },
        { title: "Mandira Dam", uri: "https://www.google.com/maps/search/Mandira+Dam+Rourkela" }
      ] },
      { name: "Sambalpur", places: [
        { title: "Hirakud Dam", uri: "https://www.google.com/maps/search/Hirakud+Dam" },
        { title: "Samaleswari Temple", uri: "https://www.google.com/maps/search/Samaleswari+Temple+Sambalpur" }
      ] }
    ]
  },
  {
    name: "Assam",
    cities: [
      { name: "Guwahati", places: [
        { title: "Kamakhya Temple", uri: "https://www.google.com/maps/search/Kamakhya+Temple+Guwahati" },
        { title: "Umananda Island", uri: "https://www.google.com/maps/search/Umananda+Island" }
      ] },
      { name: "Kaziranga", places: [
        { title: "Kaziranga National Park", uri: "https://www.google.com/maps/search/Kaziranga+National+Park" }
      ] },
      { name: "Dibrugarh", places: [
        { title: "Tea Gardens", uri: "https://www.google.com/maps/search/Tea+Gardens+Dibrugarh" },
        { title: "Dehing Patkai Wildlife Sanctuary", uri: "https://www.google.com/maps/search/Dehing+Patkai+Wildlife+Sanctuary" }
      ] },
      { name: "Silchar", places: [
        { title: "Khaspur", uri: "https://www.google.com/maps/search/Khaspur+Silchar" },
        { title: "Bhuban Mahadev Temple", uri: "https://www.google.com/maps/search/Bhuban+Mahadev+Temple+Silchar" }
      ] }
    ]
  },
  {
    name: "Jammu & Kashmir",
    cities: [
      { name: "Srinagar", places: [
        { title: "Dal Lake", uri: "https://www.google.com/maps/search/Dal+Lake+Srinagar" },
        { title: "Shalimar Bagh", uri: "https://www.google.com/maps/search/Shalimar+Bagh+Srinagar" },
        { title: "Nishat Bagh", uri: "https://www.google.com/maps/search/Nishat+Bagh+Srinagar" }
      ] },
      { name: "Gulmarg", places: [
        { title: "Gulmarg Gondola", uri: "https://www.google.com/maps/search/Gulmarg+Gondola" },
        { title: "Khilanmarg", uri: "https://www.google.com/maps/search/Khilanmarg" }
      ] },
      { name: "Pahalgam", places: [
        { title: "Betaab Valley", uri: "https://www.google.com/maps/search/Betaab+Valley" },
        { title: "Aru Valley", uri: "https://www.google.com/maps/search/Aru+Valley" }
      ] },
      { name: "Jammu", places: [
        { title: "Raghunath Temple", uri: "https://www.google.com/maps/search/Raghunath+Temple+Jammu" },
        { title: "Bahu Fort", uri: "https://www.google.com/maps/search/Bahu+Fort+Jammu" }
      ] }
    ]
  },
  {
    name: "Jharkhand",
    cities: [
      { name: "Ranchi", places: [
        { title: "Dassam Falls", uri: "https://www.google.com/maps/search/Dassam+Falls+Ranchi" },
        { title: "Jonha Falls", uri: "https://www.google.com/maps/search/Jonha+Falls+Ranchi" },
        { title: "Rock Garden", uri: "https://www.google.com/maps/search/Rock+Garden+Ranchi" }
      ] },
      { name: "Jamshedpur", places: [
        { title: "Jubilee Park", uri: "https://www.google.com/maps/search/Jubilee+Park+Jamshedpur" },
        { title: "Dimna Lake", uri: "https://www.google.com/maps/search/Dimna+Lake+Jamshedpur" }
      ] },
      { name: "Dhanbad", places: [
        { title: "Maithon Dam", uri: "https://www.google.com/maps/search/Maithon+Dam+Dhanbad" },
        { title: "Panchet Dam", uri: "https://www.google.com/maps/search/Panchet+Dam" }
      ] },
      { name: "Bokaro", places: [
        { title: "Bokaro Steel City Park", uri: "https://www.google.com/maps/search/Bokaro+Steel+City+Park" },
        { title: "Garga Dam", uri: "https://www.google.com/maps/search/Garga+Dam+Bokaro" }
      ] }
    ]
  },
  {
    name: "Chhattisgarh",
    cities: [
      { name: "Raipur", places: [
        { title: "Marine Drive Raipur", uri: "https://www.google.com/maps/search/Marine+Drive+Raipur" },
        { title: "Swami Vivekanand Sarovar", uri: "https://www.google.com/maps/search/Swami+Vivekanand+Sarovar+Raipur" }
      ] },
      { name: "Bastar", places: [
        { title: "Chitrakote Falls", uri: "https://www.google.com/maps/search/Chitrakote+Falls" },
        { title: "Teerathgarh Falls", uri: "https://www.google.com/maps/search/Teerathgarh+Falls" }
      ] },
      { name: "Bhilai", places: [
        { title: "Maitri Bagh", uri: "https://www.google.com/maps/search/Maitri+Bagh+Bhilai" },
        { title: "Civic Center", uri: "https://www.google.com/maps/search/Civic+Center+Bhilai" }
      ] },
      { name: "Bilaspur", places: [
        { title: "Kanan Pendari Zoo", uri: "https://www.google.com/maps/search/Kanan+Pendari+Zoo+Bilaspur" },
        { title: "Achanakmar Wildlife Sanctuary", uri: "https://www.google.com/maps/search/Achanakmar+Wildlife+Sanctuary" }
      ] }
    ]
  },
  {
    name: "Haryana",
    cities: [
      { name: "Gurugram", places: [
        { title: "Kingdom of Dreams", uri: "https://www.google.com/maps/search/Kingdom+of+Dreams+Gurugram" },
        { title: "Cyber Hub", uri: "https://www.google.com/maps/search/Cyber+Hub+Gurugram" },
        { title: "Sultanpur National Park", uri: "https://www.google.com/maps/search/Sultanpur+National+Park" }
      ] },
      { name: "Kurukshetra", places: [
        { title: "Brahma Sarovar", uri: "https://www.google.com/maps/search/Brahma+Sarovar+Kurukshetra" },
        { title: "Jyotisar", uri: "https://www.google.com/maps/search/Jyotisar+Kurukshetra" }
      ] },
      { name: "Faridabad", places: [
        { title: "Surajkund", uri: "https://www.google.com/maps/search/Surajkund+Faridabad" },
        { title: "Badkhal Lake", uri: "https://www.google.com/maps/search/Badkhal+Lake+Faridabad" }
      ] },
      { name: "Panipat", places: [
        { title: "Panipat Battlefield", uri: "https://www.google.com/maps/search/Panipat+Battlefield" },
        { title: "Kala Amb", uri: "https://www.google.com/maps/search/Kala+Amb+Panipat" }
      ] },
      { name: "Rohtak", places: [
        { title: "Tilyar Lake", uri: "https://www.google.com/maps/search/Tilyar+Lake+Rohtak" },
        { title: "Banni Khera Farm", uri: "https://www.google.com/maps/search/Banni+Khera+Farm" }
      ] },
      { name: "Hisar", places: [
        { title: "Firoz Shah Palace", uri: "https://www.google.com/maps/search/Firoz+Shah+Palace+Hisar" },
        { title: "Asigarh Fort", uri: "https://www.google.com/maps/search/Asigarh+Fort+Hansi" }
      ] }
    ]
  },
  {
    name: "Sikkim",
    cities: [
      { name: "Gangtok", places: [
        { title: "MG Marg", uri: "https://www.google.com/maps/search/MG+Marg+Gangtok" },
        { title: "Rumtek Monastery", uri: "https://www.google.com/maps/search/Rumtek+Monastery" },
        { title: "Tsomgo Lake", uri: "https://www.google.com/maps/search/Tsomgo+Lake" }
      ] },
      { name: "Namchi", places: [
        { title: "Siddheshwar Dham", uri: "https://www.google.com/maps/search/Siddheshwar+Dham+Namchi" },
        { title: "Samdruptse Hill", uri: "https://www.google.com/maps/search/Samdruptse+Hill+Namchi" }
      ] }
    ]
  },
  {
    name: "Arunachal Pradesh",
    cities: [
      { name: "Tawang", places: [
        { title: "Tawang Monastery", uri: "https://www.google.com/maps/search/Tawang+Monastery" },
        { title: "Sela Pass", uri: "https://www.google.com/maps/search/Sela+Pass" }
      ] },
      { name: "Itanagar", places: [
        { title: "Ita Fort", uri: "https://www.google.com/maps/search/Ita+Fort" },
        { title: "Ganga Lake", uri: "https://www.google.com/maps/search/Ganga+Lake+Itanagar" }
      ] },
      { name: "Ziro", places: [
        { title: "Ziro Valley", uri: "https://www.google.com/maps/search/Ziro+Valley" },
        { title: "Talley Valley Wildlife Sanctuary", uri: "https://www.google.com/maps/search/Talley+Valley+Wildlife+Sanctuary" }
      ] }
    ]
  },
  {
    name: "Meghalaya",
    cities: [
      { name: "Shillong", places: [
        { title: "Elephant Falls", uri: "https://www.google.com/maps/search/Elephant+Falls+Shillong" },
        { title: "Shillong Peak", uri: "https://www.google.com/maps/search/Shillong+Peak" }
      ] },
      { name: "Cherrapunji", places: [
        { title: "Nohkalikai Falls", uri: "https://www.google.com/maps/search/Nohkalikai+Falls" },
        { title: "Double Decker Living Root Bridge", uri: "https://www.google.com/maps/search/Double+Decker+Living+Root+Bridge" }
      ] },
      { name: "Tura", places: [
        { title: "Tura Peak", uri: "https://www.google.com/maps/search/Tura+Peak" },
        { title: "Nokrek National Park", uri: "https://www.google.com/maps/search/Nokrek+National+Park" }
      ] }
    ]
  },
  {
    name: "Manipur",
    cities: [
      { name: "Imphal", places: [
        { title: "Kangla Fort", uri: "https://www.google.com/maps/search/Kangla+Fort+Imphal" },
        { title: "Loktak Lake", uri: "https://www.google.com/maps/search/Loktak+Lake" }
      ] }
    ]
  },
  {
    name: "Mizoram",
    cities: [
      { name: "Aizawl", places: [
        { title: "Solomon's Temple", uri: "https://www.google.com/maps/search/Solomon's+Temple+Aizawl" },
        { title: "Durtlang Hills", uri: "https://www.google.com/maps/search/Durtlang+Hills+Aizawl" }
      ] }
    ]
  },
  {
    name: "Nagaland",
    cities: [
      { name: "Kohima", places: [
        { title: "Kohima War Cemetery", uri: "https://www.google.com/maps/search/Kohima+War+Cemetery" },
        { title: "Kisama Heritage Village", uri: "https://www.google.com/maps/search/Kisama+Heritage+Village" }
      ] },
      { name: "Dimapur", places: [
        { title: "Kachari Ruins", uri: "https://www.google.com/maps/search/Kachari+Ruins+Dimapur" },
        { title: "Triple Falls", uri: "https://www.google.com/maps/search/Triple+Falls+Dimapur" }
      ] }
    ]
  },
  {
    name: "Tripura",
    cities: [
      { name: "Agartala", places: [
        { title: "Ujjayanta Palace", uri: "https://www.google.com/maps/search/Ujjayanta+Palace+Agartala" },
        { title: "Neermahal", uri: "https://www.google.com/maps/search/Neermahal+Tripura" }
      ] }
    ]
  },
  {
    name: "Andaman & Nicobar",
    cities: [
      { name: "Port Blair", places: [
        { title: "Cellular Jail", uri: "https://www.google.com/maps/search/Cellular+Jail+Port+Blair" },
        { title: "Radhanagar Beach", uri: "https://www.google.com/maps/search/Radhanagar+Beach+Havelock" }
      ] }
    ]
  },
  {
    name: "Chandigarh",
    cities: [
      { name: "Chandigarh", places: [
        { title: "Rock Garden", uri: "https://www.google.com/maps/search/Rock+Garden+Chandigarh" },
        { title: "Sukhna Lake", uri: "https://www.google.com/maps/search/Sukhna+Lake+Chandigarh" }
      ] }
    ]
  },
  {
    name: "Ladakh",
    cities: [
      { name: "Leh", places: [
        { title: "Pangong Lake", uri: "https://www.google.com/maps/search/Pangong+Lake" },
        { title: "Shanti Stupa", uri: "https://www.google.com/maps/search/Shanti+Stupa+Leh" },
        { title: "Leh Palace", uri: "https://www.google.com/maps/search/Leh+Palace" }
      ] }
    ]
  },
  {
    name: "Puducherry",
    cities: [
      { name: "Puducherry", places: [
        { title: "Promenade Beach", uri: "https://www.google.com/maps/search/Promenade+Beach+Puducherry" },
        { title: "Auroville", uri: "https://www.google.com/maps/search/Auroville" }
      ] }
    ]
  }
];
