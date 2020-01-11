// set the dimensions and margins of the graph
var margin = { top: 20, right: 30, bottom: 50, left: 50 },
  width = document.getElementById("stackedView").offsetWidth /*- margin.left - margin.right*/,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#stackedChart")
  .append("svg")
  .attr("class", ".svg-content")
  .attr("width", width/* + margin.left + margin.right*/)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

var t = d3.transition().duration(2000);

// List of groups = header of the csv files
var keysPictures = ["S", "P", "M", "F"];
var keysTotalPeople = ["N"];

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
  tooltipStack.transition().duration(200);
  tooltipStack
    .style("opacity", 1)
    .html(getHoverText(d))
    .style("left", d3.mouse(this)[0]+document.getElementById("bubbleChart").offsetWidth + "px")
    .style("top", d3.mouse(this)[1] + margin.top +100+ 80+30 + "px");
};
var moveTooltipStack = function(d) {
  tooltipStack
    .style("left", d3.mouse(this)[0]+document.getElementById("bubbleChart").offsetWidth  + margin.left + 30 + "px")
    .style("top", d3.mouse(this)[1] + margin.top + 100+ 80+ 30 + "px");
};
var hideTooltipStack = function(d) {
  tooltipStack
    .transition()
    .duration(200)
    .style("opacity", 0);
};

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
      text = "Alle Personen im Datensatz mit Geburts- und Todesjahr"
    default:
      break;
  }

  return text;
};


// Add X, Y axis
var x, y;
var maxY = 2500;

// color palette
/*var color = d3.scaleOrdinal()
.domain(keys)
.range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'])*/

var fillWithZeros = function(d) {
  for (var i = 0; i < d.length; i++) {
    d[i] = 0;
  }
};

function isValidData(dataItem){
  dataItem.geb = parseInt(dataItem.geb);
  dataItem.tod = parseInt(dataItem.tod);
  return !isNaN (dataItem.geb) && !isNaN (dataItem.tod);
}


// Parse the Data and count numbers
d3.csv(
  "https://raw.githubusercontent.com/phuje/Data-test/master/datensatz.csv",
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
    
    for (var i = 0; i < data.length; i++) {
      data[i].geb = parseInt(data[i].geb);
      data[i].tod = parseInt(data[i].tod);
      if (data[i].geb == null || data[i].tod == null) {
        continue;
      }

      for (
        var j = data[i].geb - startYear;
        j <= data[i].tod - startYear;
        j++
      ) {
        totalPeopleCountYears[j]++;
      }


      switch (data[i].abb) {
        case "S":
          for (
            var j = data[i].geb - startYear;
            j <= data[i].tod - startYear;
            j++
          ) {
            ScountYears[j]++;
          }
          /*if (data[i].sex === "m") {
          extraMale.KupferstichS++;
        } else if (data[i].sex === "w") {
          extraFemale.KupferstichS++;
        }*/
          break;
        case "P":
          for (
            var j = data[i].geb - startYear;
            j <= data[i].tod - startYear;
            j++
          ) {
            PcountYears[j]++;
          }
          /*if (data[i].sex === "m") {
          extraMale.PortraitP++;
        } else if (data[i].sex === "w") {
          extraFemale.PortraitP++;
        }*/
          break;
        case "M":
          for (
            var j = data[i].geb - startYear;
            j <= data[i].tod - startYear;
            j++
          ) {
            McountYears[j]++;
          }
          /*if (data[i].sex === "m") {
          extraMale.MuenzeM++;
        } else if (data[i].sex === "w") {
          extraFemale.MuenzeM++;
        }*/
          break;
        case "F":
          for (
            var j = data[i].geb - startYear;
            j <= data[i].tod - startYear;
            j++
          ) {
            FcountYears[j]++;
          }
          /*if (data[i].sex === "m") {
          extraMale.SteinmetzF++;
        } else if (data[i].sex === "w") {
          extraFemale.SteinmetzF++;
        }*/
          break;
        default:
          break;
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
    //console.log("dataset ", dataset);

    for (var i = 0; i < numberYears; i++) {
      datasetTotalPeople[i] = {
        year: startYear + i,
        N: totalPeopleCountYears[i]
      };
    }

    
    //dataset = datasetPictures;
    
    updateStackedAreaDataset();

    buildXYAxes();

    buildGrid();

    
    stackAndDisplayLayers();


    //showAll();
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

  y = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([height, 0]);

  svg.append("g").call(d3.axisLeft(y));
}

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
          .attr("class", "hlines")
          .attr("x1", function(d){ return x(d);})
          .attr("x2", function(d){ return x(d);})
          .attr("y1", 0)
          .attr("y2", height);
}

//all layers are shown
var showAll = function(d) {
  console.log("showAll");

  for (var i = 0; i < numberYears; i++) {
    datasetPictures[i] = {
      year: startYear + i,
      S: ScountYears[i],
      P: PcountYears[i],
      M: McountYears[i],
      F: FcountYears[i]
    };
  }

  dataset = datasetPictures;
  keys = keysPictures;

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
        datasetPictures[i] = {
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
        datasetPictures[i] = {
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
        datasetPictures[i] = {
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
        datasetPictures[i] = {
          year: startYear + i,
          S: 0,
          P: 0,
          M: 0,
          F: FcountYears[i]
        };
      }
      break;
    default:
      break;
  }
  dataset = datasetPictures;
  keys = keysPictures;

  stackAndDisplayLayers();
  svg.selectAll(".layer").on("click", showAll);
};

//filter stack button logic, for choosing to stack specific types
function filterStack(){
  console.log("showAll");

  var stackS = document.getElementById("kupferstichStack").checked ? 1 : 0;
  var stackP = document.getElementById("portraitStack").checked ? 1 : 0;
  var stackM = document.getElementById("muenzeStack").checked ? 1 : 0;
  var stackF = document.getElementById("steinmetzStack").checked ? 1 : 0;

  for (var i = 0; i < numberYears; i++) {
    datasetPictures[i].year = startYear + i;
    datasetPictures[i].S = stackS ? ScountYears[i] : 0;
    datasetPictures[i].P = stackP ? PcountYears[i] : 0;
    datasetPictures[i].M = stackM ? McountYears[i] : 0;
    datasetPictures[i].F = stackF ? FcountYears[i] : 0;
  }

  dataset = datasetPictures;
  keys = keysPictures;

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

  d3.selectAll(".layer").remove();

  var stackedData = d3.stack().keys(keys)(dataset);

  console.log("stackedData: ", stackedData);

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

  // Show the areas
  svg
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
    .style("fill", function(d) {
      return getColor(d.key);
    })
    .attr("class", "layer")
    .on("mouseover", showTooltipStack)
    .on("mousemove", moveTooltipStack)
    .on("mouseleave", hideTooltipStack)
    //.on("click", showAll)
    .attr("d", area);
}


//initialize arrays
function initialiseArrays(){

  dataset = new Array(numberYears);
  datasetTotalPeople = new Array(numberYears);
  datasetPictures= new Array(numberYears);

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
}

function updateStackedAreaDataset(){
  if (arraysEqual([1, 0, 0], splitparamsArray)) {
    //dataNode = [noDepiction, withDepiction];
  } else if (arraysEqual([1, 1, 0], splitparamsArray)) {
    //dataNode = [maleWithPic, femaleWithPic, maleWithoutPic, femaleWithoutPic];
  } else if (arraysEqual([0, 1, 0], splitparamsArray)) {
    //dataNode = [totalMen, totalWomen];
  } else if (arraysEqual([0, 0, 1], splitparamsArray) || arraysEqual([1, 0, 1], splitparamsArray)) {
    //dataNode = [kupferstichS, portraitP, steinmetzF, muenzeM];
    dataset = datasetPictures;
    keys = keysPictures;
    document.getElementById("stackedFilter").style.display = "initial";
  } else if (arraysEqual([0, 1, 1], splitparamsArray) || arraysEqual([1, 1, 1], splitparamsArray)) {
    /*dataNode = [
      kupferstichFem,
      portraitFem,
      steinmetzFem,
      muenzeFem,
      kupferstichMale,
      portraitMale,
      steinmetzMale,
      muenzeMale
    ];*/
  } else {
    // [0, 0, 0]
    dataset = datasetTotalPeople;
    keys = keysTotalPeople;
    document.getElementById("stackedFilter").style.display = "none";
    
  }

}

//called by controller when filter has changed
function updateStackedAreaChart(){
  updateStackedAreaDataset();
  stackAndDisplayLayers();
  svg.selectAll(".layer").on("click", showDetail);
}
