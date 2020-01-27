// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 50, left: 60 },
  width = document.getElementById("stackedView").offsetWidth - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;  //570 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#stackedChart")
  .append("svg")
  .attr("class", ".svg-content")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var t = d3.transition().duration(2000);


// ---------------------------//
//      TOOLTIP               //
// ---------------------------//

// -1- Create a tooltip div that is hidden by default:
var tooltipStack = d3
  .select("#stackedChart")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltipStack")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white")
  .style("position", "absolute");

// -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
var showTooltipStack = function(d) {
  //tooltipStack.transition().duration(100);
  tooltipStack
    .style("opacity", 1)
    .html(getHoverText(d))
    .style("left", d3.mouse(this)[0]+document.getElementById("bubbleChart").offsetWidth + "px")
    .style("top", d3.mouse(this)[1] + margin.top +100+ 80+50 + "px");
};
var moveTooltipStack = function(d) {
  tooltipStack
    .style("left", d3.mouse(this)[0]+document.getElementById("bubbleChart").offsetWidth  + margin.left + 50 + "px")
    .style("top", d3.mouse(this)[1] + margin.top + 100+ 80+ 50 + "px");
};
var hideTooltipStack = function(d) {
  tooltipStack//.transition().duration(100)
    .style("opacity", 0);
};

//gets the text that should be displayed when user hovers on layer depending on the key of the data
var getHoverText = function(d) {
  var text = "";
  switch (d.key) {
    case "S":
      text = "Kupferstiche";
      break;
    case "P":
      text = "Porträts";
      break;
    case "M":
      text = "Münzen";
      break;
    case "F":
      text = "Steinmetzarbeiten";
      break;
    case "N":
      text = "Alle Personen im Datensatz mit Geburts- und Todesjahr";
      break;
    case "male":
      text = "Männer";
      break;
    case "female":
      text = "Frauen";
      break;
    case "pic":
      text = "Alle Personen mit Abbildung";
      break;
    case "nopic":
      text = "Alle Personen ohne Abbildung";
      break;
    case "maleS":
      text = "Männer mit Kupferstichen";
      break;
    case "femS":
      text = "Frauen mit Kupferstichen";
      break;
    case "maleP":
      text = "Männer mit Portraits";
      break;
    case "femP":
      text = "Frauen mit Portraits";
      break;
    case "maleM":
      text = "Männer mit Münzen";
      break;
    case "femM":
      text = "Frauen mit Münzen";
      break;
    case "maleF":
      text = "Männer mit Steinmetzarbeiten";
      break;
    case "femF":
      text = "Frauen mit Steinmetzarbeiten";
      break;
    case "malePic":
      text = "Alle Männer mit Abbildung";
      break;
    case "maleNoPic":
      text = "Alle Männer ohne Abbildung";
      break;
    case "femPic":
      text = "Alle Frauen mit Abbildung";
      break;
    case "femNoPic":
      text = "Alle Frauen ohne Abbildung";
      break;
    default:
      break;
  }

  return text;
};


// Add X, Y axis
var x, y;
var maxY = 2500;

//initialises arrays with zero values
var fillWithZeros = function(d) {
  for (var i = 0; i < d.length; i++) {
    d[i] = 0;
  }
};

//filters dataset to only include peuple with birth and death year
function isValidData(dataItem){
  dataItem.geb = parseInt(dataItem.geb);
  dataItem.tod = parseInt(dataItem.tod);
  return !isNaN (dataItem.geb) && !isNaN (dataItem.tod);
}


// Parse the Data and count numbers
d3.csv(
  "https://raw.githubusercontent.com/phuje/Data-test/master/datensatz.csv", //get dataset from github raw file
  function(data) {
    console.log("data", data);
    
    var filteredData = data.filter(isValidData);
    var latestYear = Math.max.apply(Math, filteredData.map(function(o) { return o.tod;}));
    console.log("latestYear ", latestYear);
    startYear = Math.min.apply(Math, filteredData.map(function (o) { return o.geb;}));
    console.log("startYear",startYear);
    numberYears = latestYear -startYear +1;
    console.log("numberYears",numberYears);

    initialiseArrays();
    
    //iterate through all persons (rows) in csv file to count data for visualisations
    for (var i = 0; i < data.length; i++) {
      data[i].geb = parseInt(data[i].geb);
      data[i].tod = parseInt(data[i].tod);
      if (data[i].geb == null || data[i].tod == null) {
        continue;
      }

      //for no filter 0, 0, 0 
      for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
        totalPeopleCountYears[j]++;
      }

      //for gender filter
      if(data[i].sex != null){
        switch (data[i].sex){
          case "m": 
          for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
              maleCountYears[j]++;
            }
            //for pic and gender filter
            if(data[i].abb == "NULL"){
              for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
                maleNoPicCountYears[j]++;
              }
            }else{
              for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
                malePicCountYears[j]++;
              }
            }
          break;
          case "w": 
            for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
              femaleCountYears[j]++;
            }
            //for pic and gender filter
            if(data[i].abb == "NULL"){
              for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
                femaleNoPicCountYears[j]++;
              }
            }else{
              for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
                femalePicCountYears[j]++;
              }
            }
          break;
          default: break;
        }
      }
      

      //filter type of depiction
      switch (data[i].abb) {
        case "S":
          for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
            ScountYears[j]++;
          }
          if (data[i].sex === "m") {
            for (
              var j = data[i].geb - startYear;
              j <= data[i].tod - startYear;
              j++
            ) {
              SmaleCountYears[j]++;
            }
          } else if (data[i].sex === "w") {
            for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
              SfemaleCountYears[j]++;
            }
          }
          break;
        case "P":
          for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
            PcountYears[j]++;
          }
          if (data[i].sex === "m") {
            for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
              PmaleCountYears[j]++;
            }
          } else if (data[i].sex === "w") {
            for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
              PfemaleCountYears[j]++;
            }
          }
          break;
        case "M":
          for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
            McountYears[j]++;
          }
          if (data[i].sex === "m") {
            for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
              MmaleCountYears[j]++;
            }
          } else if (data[i].sex === "w") {
            for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
              MfemaleCountYears[j]++;
            }
          }
          break;
        case "F":
          for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
            FcountYears[j]++;
          }
          if (data[i].sex === "m") {
            for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
              FmaleCountYears[j]++;
            }
          } else if (data[i].sex === "w") {
            for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
              FfemaleCountYears[j]++;
            }
          }
          break;
        default:
          break;
      }

      if(data[i].abb == "NULL"){
        for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
          noPicCountYears[j]++;
        }
      }else{
        for (var j = data[i].geb - startYear;j <= data[i].tod - startYear; j++) {
          picCountYears[j]++;
        }
      }
    }

    for (var i = 0; i < numberYears; i++) {
      datasetPictures[i] = {
        year: startYear + i,
        S: ScountYears[i],
        P: PcountYears[i],
        M: McountYears[i],
        F: FcountYears[i]
      };
    }

    for (var i = 0; i < numberYears; i++) {
      datasetTotalPeople[i] = {
        year: startYear + i,
        N: totalPeopleCountYears[i]
      };
    }

    for (var i = 0; i < numberYears; i++) {
      datasetGender[i] = {
        year: startYear + i,
        female: femaleCountYears[i],
        male: maleCountYears[i]
      };
    }

    for (var i = 0; i < numberYears; i++) {
      datasetHasPic[i] = {
        year: startYear + i,
        pic: picCountYears[i],
        nopic: noPicCountYears[i]
      };
    }

    for (var i = 0; i < numberYears; i++) {
      datasetHasPicGender[i] = {
        year: startYear + i,
        malePic: malePicCountYears[i],
        maleNoPic: maleNoPicCountYears[i],
        femPic: femalePicCountYears[i],
        femNoPic: femaleNoPicCountYears[i]
      };
    }

    for (var i = 0; i < numberYears; i++) {
      datasetPicGender[i] = {
        year: startYear + i,
        maleS: SmaleCountYears[i],
        femS: SfemaleCountYears[i],
        maleP: PmaleCountYears[i],
        femP: PfemaleCountYears[i],
        maleM: MmaleCountYears[i],
        femM: MfemaleCountYears[i],
        maleF: FmaleCountYears[i],
        femF: FfemaleCountYears[i]
      };
    }
    
    updateStackedAreaDataset();

    buildXYAxes();

    buildGrid();

    stackAndDisplayLayers();

  }

);

function buildXYAxes(){
  x = d3
    .scaleLinear()
    .domain(
      d3.extent(dataset, function(d) {
        return d.year;
      })
    )
    .range([0, width]);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(16));

  // Add the text label for the x axis
  svg.append("text")
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom*0.75) + ")")
    .style("text-anchor", "middle")
    .text("Jahr");

  y = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([height, 0]);

  svg.append("g").attr("class", "yaxis").call(d3.axisLeft(y));

  // Add the text label for the Y axis
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Anzahl Personen");
}

//builds the grid lines according to the data 
function buildGrid(){
      //horizontal grid
      svg.selectAll(".hlines").data(y.ticks(8)).enter()
      .append("line")
          .attr("class", "hlines")
          .attr("x1", 0)
          .attr("x2", width)
          .attr("y1", function(d){ return y(d);})
          .attr("y2", function(d){ return y(d);});
  
      //vertical grid
      svg.selectAll(".vlines").data(x.ticks(16)).enter()
      .append("line")
          .attr("class", "vlines")
          .attr("x1", function(d){ return x(d);})
          .attr("x2", function(d){ return x(d);})
          .attr("y1", 0)
          .attr("y2", height);
}

//all layers are shown
var showAll = function(d) {
  console.log("showAll");

  updateStackedAreaDataset(); //to go back to original stack with all layers
  stackAndDisplayLayers();
  svg.selectAll(".layer").on("click", showDetail);

};

//when a layer is clicked, it shows only this layer
var showDetail = function(d) {
  hideTooltipStack(d);

  console.log("showDetail", d);

  switch (d.key) {
    case "S":
      type = "Kupferstiche";
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          S: ScountYears[i],
          P: 0,
          M: 0,
          F: 0
        };
      }
      break;
    case "P":
      type = "Porträts";
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          S: 0,
          P: PcountYears[i],
          M: 0,
          F: 0
        };
      }
      break;
    case "M":
      type = "Münzen";
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          S: 0,
          P: 0,
          M: McountYears[i],
          F: 0
        };
      }
      break;
    case "F":
      type = "Steinmetzarbeiten";
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          S: 0,
          P: 0,
          M: 0,
          F: FcountYears[i]
        };
      }
      break;
    case "male":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          male: maleCountYears[i],
          female: 0
        };
      }
      break;
    case "female":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          female: femaleCountYears[i],
          male: 0
        };
      }
      break;
    case "pic":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          pic: picCountYears[i],
          nopic: 0
        };
      }
      break;
    case "nopic":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          pic: 0,
          nopic: noPicCountYears[i]
        };
      }
      break;
    case "femS":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          maleS: 0,
          femS: SfemaleCountYears[i],
          maleP: 0,
          femaleP: 0,
          maleM: 0,
          femaleM: 0,
          maleF: 0,
          femaleF:0
        };
      }
      break;
    case "maleS":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          maleS: SmaleCountYears[i],
          femS: 0,
          maleP: 0,
          femP: 0,
          maleM: 0,
          femM: 0,
          maleF: 0,
          femF:0
        };
      }
      break;
    case "femP":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          maleS: 0,
          femS: 0,
          maleP: 0,
          femP: PfemaleCountYears[i],
          maleM: 0,
          femM: 0,
          maleF: 0,
          femF:0
        };
      }
      break;
    case "maleP":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          maleS: 0,
          femS: 0,
          maleP: PmaleCountYears[i],
          femP: 0,
          maleM: 0,
          femM: 0,
          maleF: 0,
          femF:0
        };
      }
      break;
    case "femM":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          maleS: 0,
          femS: 0,
          maleP: 0,
          femP: 0,
          maleM: 0,
          femM: MfemaleCountYears[i],
          maleF: 0,
          femF:0
        };
      }
      break;
    case "maleM":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          maleS: 0,
          femS: 0,
          maleP: 0,
          femP: 0,
          maleM: MmaleCountYears[i],
          femM: 0,
          maleF: 0,
          femF:0
        };
      }
      break;
    case "femF":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          maleS: 0,
          femS: 0,
          maleP: 0,
          femP: 0,
          maleM: 0,
          femM: 0,
          maleF: 0,
          femF: FfemaleCountYears[i]
        };
      }
      break;
    case "maleF":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          maleS: 0,
          femS: 0,
          maleP: 0,
          femP: 0,
          maleM:0,
          femM: 0,
          maleF:  FmaleCountYears[i],
          femF:0
        };
      }
      break;
    case "malePic":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          malePic: malePicCountYears[i],
          maleNoPic: 0,
          femPic: 0,
          femNoPic: 0
        };
      }
      break;
    case "maleNoPic":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          malePic: 0,
          maleNoPic: maleNoPicCountYears[i],
          femPic: 0,
          femNoPic: 0
        };
      }
      break;
    case "femPic":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          malePic: 0,
          maleNoPic: 0,
          femPic: femalePicCountYears[i],
          femNoPic: 0
        };
      }
      break;
    case "femNoPic":
      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          malePic: 0,
          maleNoPic: 0,
          femPic: 0,
          femNoPic: femaleNoPicCountYears[i]
        };
      }
      break;
    default:
      break;
  }

  stackAndDisplayLayers();
  svg.selectAll(".layer").on("click", showAll);
};

//filter stack button logic, for choosing to stack specific types
function filterStack(){
  
  if (arraysEqual([0, 0, 1], splitparamsArray) || arraysEqual([1, 0, 1], splitparamsArray)) {
    var stackS = document.getElementById("kupferstichStack").checked ? 1 : 0;
    var stackP = document.getElementById("portraitStack").checked ? 1 : 0;
    var stackM = document.getElementById("muenzeStack").checked ? 1 : 0;
    var stackF = document.getElementById("steinmetzStack").checked ? 1 : 0;
  
    for (var i = 0; i < numberYears; i++) {
      dataset[i] = {
        year: startYear + i,
        S: stackS ? ScountYears[i] : 0,
        P: stackP ? PcountYears[i] : 0,
        M: stackM ? McountYears[i] : 0,
        F: stackF ? FcountYears[i] : 0
      };
    }
  } 
  else if(arraysEqual([1, 1, 0], splitparamsArray)){ //hasPicGender
    var femaleHasNoPic = document.getElementById("femaleHasNoPic").checked ? 1 : 0;
    var maleHasNoPic = document.getElementById("maleHasNoPic").checked ? 1 : 0;
    var femaleHasPic = document.getElementById("femaleHasPic").checked ? 1 : 0;
    var maleHasPic = document.getElementById("maleHasPic").checked ? 1 : 0;

    for (var i = 0; i < numberYears; i++) {
      dataset[i] = {
        year: startYear + i,
        malePic: maleHasPic ? malePicCountYears[i] : 0,
        maleNoPic: maleHasNoPic ? maleNoPicCountYears[i] : 0,
        femPic: femaleHasPic ? femalePicCountYears[i] : 0,
        femNoPic: femaleHasNoPic ? femaleNoPicCountYears[i] : 0
      };
    }
  }
  else if (arraysEqual([0, 1, 1], splitparamsArray) || arraysEqual([1, 1, 1], splitparamsArray)) {
    var steinmetzMale = document.getElementById("steinmetzMale").checked ? 1 : 0;
    var steinmetzFemale = document.getElementById("steinmetzFemale").checked ? 1 : 0;
    var muenzeMale = document.getElementById("muenzeMale").checked ? 1 : 0;
    var muenzeFemale = document.getElementById("muenzeFemale").checked ? 1 : 0;
    var portraitMale = document.getElementById("portraitMale").checked ? 1 : 0;
    var portraitFemale = document.getElementById("portraitFemale").checked ? 1 : 0;
    var kupferstichMale = document.getElementById("kupferstichMale").checked ? 1 : 0;
    var kupferstichFemale = document.getElementById("kupferstichFemale").checked ? 1 : 0;

    for (var i = 0; i < numberYears; i++) {
      dataset[i] = {
        year: startYear + i,
        maleS: kupferstichMale ? SmaleCountYears[i] : 0,
        femS: kupferstichFemale ? SfemaleCountYears[i] : 0,
        maleP: portraitMale ? PmaleCountYears[i] : 0,
        femP: portraitFemale ? PfemaleCountYears[i] : 0,
        maleM: muenzeMale ? MmaleCountYears[i] : 0,
        femM: muenzeFemale ? MfemaleCountYears[i] : 0,
        maleF: steinmetzMale ? FmaleCountYears[i] : 0,
        femF: steinmetzFemale ? FfemaleCountYears[i] : 0
      };
    }
  }

  stackAndDisplayLayers();
  svg.selectAll(".layer").on("click", showDetail);
}

//this function is called when the stack filter reset button is pressed. it resets the stacked area chart to show all layers
function showWholeStack(){
  showAll();
  d3.selectAll(".stackFilterCheckbox").property('checked', true);
}

//default case
d3.selectAll(".stackFilterCheckbox").property('checked', true);

//this function stacks the data as defined in dataset and displays the corresponding layers in the chart
function stackAndDisplayLayers(){

  var area = d3
    .area()
    .x(function(d, i) {
      return x(d.data.year);
    })
    .y0(function(d) {
      return y(d[0]);
    }) //lower y
    .y1(function(d) {
      return y(d[1]);
    }); //higher y

  //for transition startpoint
  var areaBase = d3
    .area()
    .x(function(d, i) {
      return x(d.data.year);
    })
    .y0(function(d) {
      return y(0);
    }) //lower y
    .y1(function(d) {
      return y(0);
    }); //higher y

  //transition out old layer
  d3.selectAll(".layer")
  .attr("class", "oldlayer")
  .transition()
      .duration(1000)
      .attr("d", areaBase)
      .on("end", function(d){d3.selectAll(".oldlayer").remove();});

  var stackedData = d3.stack().keys(keys)(dataset);

  console.log("stackedData: ", stackedData);

  // Show the areas and transition them in
  svg
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .style("fill", function(d) {
        return getColor(d.key);
      })
      .attr("class", "layer")
      .attr("d", areaBase) //for transition in
      .on("mouseover", showTooltipStack)
      .on("mousemove", moveTooltipStack)
      .on("mouseleave", hideTooltipStack)
      .transition()
      .duration(1000)
      .attr("d", area)

}


//initialize arrays
function initialiseArrays(){

  dataset = new Array(numberYears);
  datasetOld = new Array(numberYears);
  datasetTotalPeople = new Array(numberYears);
  datasetPictures= new Array(numberYears);
  datasetGender = new Array(numberYears);
  datasetHasPic = new Array(numberYears);
  datasetPicGender = new Array(numberYears);
  datasetHasPicGender = new Array(numberYears);

  ScountYears = new Array(numberYears);
  fillWithZeros(ScountYears);
  PcountYears = new Array(numberYears);
  fillWithZeros(PcountYears);
  McountYears = new Array(numberYears);
  fillWithZeros(McountYears);
  FcountYears = new Array(numberYears);
  fillWithZeros(FcountYears);

  totalPeopleCountYears = new Array(numberYears);
  fillWithZeros(totalPeopleCountYears);

  maleCountYears = new Array(numberYears);
  fillWithZeros(maleCountYears);
  femaleCountYears = new Array(numberYears);
  fillWithZeros(femaleCountYears);

  noPicCountYears = new Array(numberYears);
  fillWithZeros(noPicCountYears);
  picCountYears = new Array(numberYears);
  fillWithZeros(picCountYears);

  SmaleCountYears= new Array(numberYears);
  SfemaleCountYears= new Array(numberYears);
  PmaleCountYears= new Array(numberYears);
  PfemaleCountYears = new Array(numberYears);
  MmaleCountYears = new Array(numberYears);
  MfemaleCountYears= new Array(numberYears); 
  FmaleCountYears = new Array(numberYears);
  FfemaleCountYears = new Array(numberYears);
  fillWithZeros(SmaleCountYears);
  fillWithZeros(SfemaleCountYears);
  fillWithZeros(PmaleCountYears);
  fillWithZeros(PfemaleCountYears);
  fillWithZeros(MmaleCountYears);
  fillWithZeros(MfemaleCountYears);
  fillWithZeros(FmaleCountYears);
  fillWithZeros(FfemaleCountYears);

  malePicCountYears = new Array(numberYears);
  maleNoPicCountYears= new Array(numberYears);
  femalePicCountYears= new Array(numberYears);
  femaleNoPicCountYears= new Array(numberYears);
  fillWithZeros(malePicCountYears);
  fillWithZeros(maleNoPicCountYears);
  fillWithZeros(femalePicCountYears);
  fillWithZeros(femaleNoPicCountYears);
}

//udpates stacked area visualisation depending on filters selected
//selected filters are given in splitparamsArray
function updateStackedAreaDataset(){

  dataset = [];
  if (arraysEqual([1, 0, 0], splitparamsArray)) {
    console.log("Split hasPic, datasetHasPic", datasetHasPic);
    Array.prototype.push.apply(dataset, datasetHasPic);
    keys = keysHasPic;
  } else if (arraysEqual([1, 1, 0], splitparamsArray)) {
    console.log("Split hasPic and gender, datasetHasPicGender", datasetHasPicGender);
    Array.prototype.push.apply(dataset, datasetHasPicGender);
    keys = keysHasPicGender;

    showStackFilter("filterHasPicGender");
  } else if (arraysEqual([0, 1, 0], splitparamsArray)) {
    console.log("Split gender, datasetGender", datasetGender);
    Array.prototype.push.apply(dataset, datasetGender);
    keys = keysGender;

  } else if (arraysEqual([0, 0, 1], splitparamsArray) || arraysEqual([1, 0, 1], splitparamsArray)) {
    console.log("Split type of Pic");
    Array.prototype.push.apply(dataset, datasetPictures);
    keys = keysPictures;

    showStackFilter("filterPictures");
    
  } else if (arraysEqual([0, 1, 1], splitparamsArray) || arraysEqual([1, 1, 1], splitparamsArray)) {

    Array.prototype.push.apply(dataset, datasetPicGender);
    keys = keysPicGender;

    showStackFilter("filterPicturesGender");
  } else {
    // [0, 0, 0]
    Array.prototype.push.apply(dataset, datasetTotalPeople);
    keys = keysTotalPeople;
  }

  //only show stacked filter array when there are more than two layers
  if(keys.length <= 2){
    document.getElementById("stackedFilter").style.display = "none";
  } else{
    document.getElementById("stackedFilter").style.display = "block";
  }

  // 
  if(splitparamsArray[2] == 1){
    y = d3
    .scaleLinear()
      .domain([0, 800])
    .range([height, 0]);

    d3.selectAll(".yaxis").transition().duration(500).call(d3.axisLeft(y));

    if(needToChangeYScaleStack){
      svg.selectAll(".hlines").remove();
      svg.selectAll(".hlines").data(y.ticks(10)).enter()
        .append("line")
            .attr("class", "hlines")
            .attr("x1", 0)
            .attr("x2", width)
            .transition().duration(500)
            .attr("y1", function(d){ return y(d);})
            .attr("y2", function(d){ return y(d);});
    }
  } else{
    y = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([height, 0]);
    d3.selectAll(".yaxis").transition().duration(500).call(d3.axisLeft(y));

    if(needToChangeYScaleStack){
      svg.selectAll(".hlines").remove();
      svg.selectAll(".hlines").data(y.ticks(10)).enter()
        .append("line")
            .attr("class", "hlines")
            .attr("x1", 0)
            .attr("x2", width)
            .transition().duration(500)
            .attr("y1", function(d){ return y(d);})
            .attr("y2", function(d){ return y(d);});
    }
  
  }

}



//called by controller when filter has changed
function updateStackedAreaChart(){
  updateStackedAreaDataset();
  stackAndDisplayLayers();
  svg.selectAll(".layer").on("click", showDetail);
}

//adapts the stackedFilter to show only the right filter layers
function showStackFilter(group){
  var elements = document.getElementsByClassName("stackedSubFilter")

    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = "none";
    }
  document.getElementById(group).style.display = "initial";
}


