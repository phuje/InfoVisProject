//general
var splitparamsArray;

var colorArray = ["#3A01DF", "#FF0040", "#FACC2E", "#6E6E6E", "#66c2a5", "#ff9090"];

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
    default:
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
  radius: 0
};

var totalWomen = {
  descr: "Anzahl der Frauen: ",
  number: 0,
  radius: 0
};

//all persons with a picture
var withDepiction = {
  descr: "Anzahl der Personen mit Abbildung: ",
  number: 0,
  radius: 0
};

var femaleWithPic = {
  descr: "Anzahl der Frauen mit Abbildung: ",
  number: 0,
  radius: 0
};

var maleWithPic = {
  descr: "Anzahl der Männer mit Abbildung: ",
  number: 0,
  radius: 0
};

var noDepiction = {
  descr: "Anzahl der Personen ohne Abbildung: ",
  number: 0,
  radius: 0
};

var femaleWithoutPic = {
  descr: "Anzahl der Frauen ohne Abbildung: ",
  number: 0,
  radius: 0
};

var maleWithoutPic = {
  descr: "Anzahl der Männer ohne Abbildung: ",
  number: 0,
  radius: 0
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
  radius: 0
};

var kupferstichMale = {
  descr: "Anzahl der Kupferstiche von Männern: ",
  number: 0,
  radius: 0
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
  radius: 0
};

var portraitMale = {
  descr: "Anzahl der Portraits von Männern: ",
  number: 0,
  radius: 0
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
  radius: 0
};

var steinmetzMale = {
  descr: "Anzahl der Steinmetzarbeiten von Männern: ",
  number: 0,
  radius: 0
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
  radius: 0
};

var muenzeMale = {
  descr: "Anzahl der Münzabbildungen von Männern: ",
  number: 0,
  radius: 0
};
