// set the dimensions and margins of the graph
var margin = { top: 20, right: 30, bottom: 30, left: 55 },
  width = 1200 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#stackedChart")
  .append("svg")
  .attr("class", ".svg-content")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var fillWithZeros = function(d) {
  for (var i = 0; i < d.length; i++) {
    d[i] = 0;
  }
};

var colorArray = ["#3A01DF", "#FF0040", "#FACC2E", "#6E6E6E"];

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
    default:
      break;
  }
};

var t = d3.transition().duration(2000);

// Parse the Data
d3.csv(
  "https://raw.githubusercontent.com/phuje/Data-test/master/person-abb.csv",
  function(data) {
    console.log("data", data);
    var row = { year: 0, S: 0, P: 0, M: 0, F: 0 };
    var dataset = new Array(numberYears);
    var numberYears = 795;
    var startYear = 1009;

    var ScountYears = new Array(numberYears);
    fillWithZeros(ScountYears);
    var PcountYears = new Array(numberYears);
    fillWithZeros(PcountYears);
    var McountYears = new Array(numberYears);
    fillWithZeros(McountYears);
    var FcountYears = new Array(numberYears);
    fillWithZeros(FcountYears);

    for (var i = 0; i < data.length; i++) {
      data[i].geb = parseInt(data[i].geb);
      data[i].tod = parseInt(data[i].tod);
      if (data[i].geb == null || data[i].tod == null) {
        continue;
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
      dataset[i] = {
        year: startYear + i,
        S: ScountYears[i],
        P: PcountYears[i],
        M: McountYears[i],
        F: FcountYears[i]
      };
    }
    console.log("dataset ", dataset);

    // List of groups = header of the csv files
    var keys = ["S", "P", "M", "F"];

    // Add X axis
    var x = d3
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
      .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([0, 800])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // color palette
    /*var color = d3.scaleOrdinal()
.domain(keys)
.range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'])*/

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
        .style("left", d3.mouse(this)[0] + 30 + "px")
        .style("top", d3.mouse(this)[1] + 30 + "px");
    };
    var moveTooltipStack = function(d) {
      tooltipStack
        .style("left", d3.mouse(this)[0] + 30 + "px")
        .style("top", d3.mouse(this)[1] + 30 + "px");
    };
    var hideTooltipStack = function(d) {
      tooltipStack
        .transition()
        .duration(200)
        .style("opacity", 0);
    };

    var getHoverText = function(d) {
      var type = "";
      switch (d.key) {
        case "S":
          type = "Kupferstiche";
          break;
        case "P":
          type = "Porträts";
          break;
        case "M":
          type = "Münzen";
          break;
        case "F":
          type = "Steinmetzarbeiten";
          break;
        default:
          break;
      }

      return type;
    };

    var showDetail = function(d) {
      d3.selectAll(".layer").remove();
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
        default:
          break;
      }

      //stack the data?
      var stackedData = d3.stack().keys(keys)(dataset);

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
        .on("click", showAll)
        .attr("d", area);
    };

    var showAll = function(d) {
      d3.selectAll(".layer").remove();
      console.log("showAll");

      for (var i = 0; i < numberYears; i++) {
        dataset[i] = {
          year: startYear + i,
          S: ScountYears[i],
          P: PcountYears[i],
          M: McountYears[i],
          F: FcountYears[i]
        };
      }

      //stack the data?
      var stackedData = d3.stack().keys(keys)(dataset);
      console.log("This is the stack result: ", stackedData);

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
        .on("click", showDetail)
        .attr("d", area);
    };

    showAll();
  }
);