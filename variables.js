//general
var splitparamsArray;

var colorArray = ["#3A01DF", 
"#FF0040", 
"#FACC2E", 
"#6E6E6E", 
"#66c2a5", 
"#ff9090", 
"#fc8d62",
"#8da0cb",
"#e78ac3",
"#a6d854",
"#ffd92f",
"#e5c494",
"#b3b3b3"];

var getColor = function(key) {
  switch (key) {
    case "S":
      return colorArray[0];
      break;
    case "P":
      return colorArray[1];
      break;
    case "M":
      return colorArray[2];
      break;
    case "F":
      return colorArray[3];
      break;
    case "N":
      return colorArray[4];
      break;
    case "male":
      return colorArray[3];
      break;
    case "female":
      return colorArray[6];
      break;
    case "pic":
      return colorArray[7];
      break;
    case "nopic":
      return colorArray[8];
      break;
    case "femPic":
      return colorArray[7];
      break;
    case "malePic":
      return colorArray[8];
      break;
    case "femNoPic":
      return colorArray[5];
      break;
    case "maleNoPic":
      return colorArray[6];
      break;
    case "femS":
      return colorArray[5];
      break;
    case "maleS":
      return colorArray[6];
      break;
    case "femP":
      return colorArray[0];
      break;
    case "maleP":
      return colorArray[1];
      break;
    case "femM":
      return colorArray[2];
      break;
    case "maleM":
      return colorArray[3];
      break;
    case "femF":
      return colorArray[4];
      break;
    case "maleF":
      return colorArray[7];
      break;
    default: colorArray[0];
      break;
  }
};



//// STACKED AREA CHART VARIABLES ////

var numberYears;
var startYear;

//dataset is an array that contains numbers for each group for each year to draw the stacked area chart
var dataset;

var datasetPictures;

var ScountYears, PcountYears, McountYears,FcountYears;

var totalPeopleCountYears;

var datasetTotalPeople;



//// BUBBLE CHART VARIABLES ////

//node that contains the information for all bubbles
var dataNode = [];

var totalPeople = {
  descr: "Gesamtanzahl der Personen im Datensatz: ",
  number: 0,
  radius: 0,
  key: "N"
};

var totalMen = {
  descr: "Anzahl der Männer: ",
  number: 0,
  radius: 0,
  key: "male"
};

var totalWomen = {
  descr: "Anzahl der Frauen: ",
  number: 0,
  radius: 0,
  key: "female"
};

//all persons with a picture
var withDepiction = {
  descr: "Anzahl der Personen mit Abbildung: ",
  number: 0,
  radius: 0,
  key: "pic"

};

var femaleWithPic = {
  descr: "Anzahl der Frauen mit Abbildung: ",
  number: 0,
  radius: 0,
  key: "femPic"
};

var maleWithPic = {
  descr: "Anzahl der Männer mit Abbildung: ",
  number: 0,
  radius: 0,
  key: "malePic"
};

var noDepiction = {
  descr: "Anzahl der Personen ohne Abbildung: ",
  number: 0,
  radius: 0,
  key: "nopic"
};

var femaleWithoutPic = {
  descr: "Anzahl der Frauen ohne Abbildung: ",
  number: 0,
  radius: 0,
  key: "femNoPic"
};

var maleWithoutPic = {
  descr: "Anzahl der Männer ohne Abbildung: ",
  number: 0,
  radius: 0,
  key: "maleNoPic"
};

var kupferstichS = {
  descr: "Anzahl der Kupferstiche: ",
  number: 0,
  radius: 0,
  key: "S"
};

var kupferstichFem = {
  descr: "Anzahl der Kupferstiche von Frauen: ",
  number: 0,
  radius: 0,
  key: "femS"
};

var kupferstichMale = {
  descr: "Anzahl der Kupferstiche von Männern: ",
  number: 0,
  radius: 0,
  key: "maleS"
};

var portraitP = {
  descr: "Anzahl der Portraits: ",
  number: 0,
  radius: 0,
  key: "P"
};

var portraitFem = {
  descr: "Anzahl der Portraits von Frauen: ",
  number: 0,
  radius: 0,
  key: "femP"
};

var portraitMale = {
  descr: "Anzahl der Portraits von Männern: ",
  number: 0,
  radius: 0,
  key: "maleP"
};

var steinmetzF = {
  descr: "Anzahl der Steinmetzarbeiten: ",
  number: 0,
  radius: 0,
  key: "F"
};

var steinmetzFem = {
  descr: "Anzahl der Steinmetzarbeiten von Frauen: ",
  number: 0,
  radius: 0,
  key: "femF"
};

var steinmetzMale = {
  descr: "Anzahl der Steinmetzarbeiten von Männern: ",
  number: 0,
  radius: 0,
  key: "maleF"
};

var muenzeM = {
  descr: "Anzahl der Münzabbildungen: ",
  number: 0,
  radius: 0,
  key: "M"
};

var muenzeFem = {
  descr: "Anzahl der Münzabbildungen von Frauen: ",
  number: 0,
  radius: 0,
  key: "femM"
};

var muenzeMale = {
  descr: "Anzahl der Münzabbildungen von Männern: ",
  number: 0,
  radius: 0,
  key: "maleM"
};
