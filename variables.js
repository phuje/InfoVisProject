//general
var splitparamsArray;

var colorArray = ["#3A01DF", 
"#FF0040", 
"#FACC2E", 
"#6E6E6E", 
"#66c2a5", 
"#ff9090", 
"#034f84",
"#8da0cb",
"#e78ac3",
"#80ced6",
"#a6d854",
"#ffd92f",
"#622569",
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
    case "N": //totalNumberPeople
      return "#2196F3";
      break;
    case "male":
      return "#303F9F";
      break;
    case "female":
      return "#FF4081";
      break;
    case "pic":
      return "#FF4081";
      break;
    case "nopic":
      return "#009688";
      break;
    case "femPic":
      return "#9C27B0";
      break;
    case "malePic":
      return "#FFEB3B";
      break;
    case "femNoPic":
      return "#9C27B0";
      break;
    case "maleNoPic":
      return "#00BCD4";
      break;
    case "femS":
      return "#C8E6C9";
      break;
    case "maleS":
      return "#4CAF50";
      break;
    case "femP":
      return "#FF5252";
      break;
    case "maleP":
      return "#512DA8";
      break;
    case "femM":
      return "#E1BEE7";
      break;
    case "maleM":
      return "#E1BEE7";
      break;
    case "femF":
      return "#FF9800";
      break;
    case "maleF":
      return "#FFECB3";
      break;
    default: colorArray[0];
      break;
  }
};



//// STACKED AREA CHART VARIABLES ////

// List of groups = header of the csv files
var keysPictures = ["S", "P", "M", "F"];
var keysTotalPeople = ["N"];
var keysGender = ["female", "male"];
var keysHasPic = ["pic", "nopic"];

var numberYears;
var startYear;

//dataset is an array that contains numbers for each group for each year to draw the stacked area chart
var dataset;

var datasetOld; // for switching between detail view and stack all view

var datasetPictures;
var datasetTotalPeople;
var datasetGender;
var datasetHasPic;

//arrays to count number of people for specific groups
var ScountYears, PcountYears, McountYears,FcountYears;
var totalPeopleCountYears;
var femaleCountYears, maleCountYears;
var noPicCountYears, picCountYears;




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
