//general
var splitparamsArray = [0, 0, 0]; //default

var needToChangeYScaleStack;



var getColor = function (key) {
  switch (key) {
    case "S":
      return "#F15A24";
      break;
    case "P":
      return "#8991F9";
      break;
    case "M":
      return "#EDBA00";
      break;
    case "F":
      return "#69B0C5";
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
      return "#333333";
      break;
    case "nopic":
      return "#999999";
      break;
    case "femPic":
      return "#B21B4F";
      break;
    case "malePic":
      return "#111A52";
      break;
    case "femNoPic":
      return "#FF5A92";
      break;
    case "maleNoPic":
      return "#5F72EC";
      break;
    case "femS":
      return "#A4340C";
      break;
    case "maleS":
      return "#F47B50";
      break;
    case "femP":
      return "#4E54AC";
      break;
    case "maleP":
      return "#A6ACFF";
      break;
    case "femM":
      return "#A07E00";
      break;
    case "maleM":
      return "#FFCE1A";
      break;
    case "femF":
      return "#4C6E78";
      break;
    case "maleF":
      return "#90B9C5";
      break;
    default: "#2196F3";
      break;
  }
};



//// STACKED AREA CHART VARIABLES ////

// List of groups = header of the csv files
var keysPictures = ["S", "P", "M", "F"];
var keysTotalPeople = ["N"];
var keysGender = ["female", "male"];
var keysHasPic = ["pic", "nopic"];
var keysPicGender = ["maleS", "femS", "maleP", "femP", "maleM", "femM", "maleF", "femF"];
var keysHasPicGender = ["malePic", "femPic", "maleNoPic", "femNoPic"];

var numberYears;
var startYear;

//dataset is an array that contains numbers for each group for each year to draw the stacked area chart
var dataset;

var datasetOld; // for switching between detail view and stack all view

var datasetPictures;
var datasetTotalPeople;
var datasetGender;
var datasetHasPic;
var datasetPicGender;
var datasetHasPicGender;

//arrays to count number of people for specific groups
var ScountYears, PcountYears, McountYears, FcountYears;
var totalPeopleCountYears;
var femaleCountYears, maleCountYears;
var noPicCountYears, picCountYears;
var SmaleCountYears, SfemaleCountYears, PmaleCountYears, PfemaleCountYears, MmaleCountYears, MfemaleCountYears, FmaleCountYears, FfemaleCountYears;
var malePicCountYears, maleNoPicCountYears, femalePicCountYears, femaleNoPicCountYears;



//// BUBBLE CHART VARIABLES ////

//node that contains the information for all bubbles
var dataNode = [];

var totalPeople = {
  descr: "Gesamtanzahl der Personen: ",
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
