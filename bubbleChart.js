var margin = { top: 50 /*, right: 30, bottom: 30, left: 55*/ },
  width = window.innerWidth * 0.75,
  height = window.innerHeight,
  sizeDivisor = 50,
  nodePadding = 2.5;
var svgBubble = d3
  .select("#datavis")
  .append("svg")
  .attr("width", "100%")
  .attr("height", height);
var color = d3.scaleOrdinal([
  "#66c2a5",
  "#fc8d62",
  "#8da0cb",
  "#e78ac3",
  "#a6d854",
  "#ffd92f",
  "#e5c494",
  "#b3b3b3"
]);
var simulation = d3
  .forceSimulation()
  .force(
    "forceX",
    d3
      .forceX()
      .strength(0.1)
      .x(width * 0.5)
  )
  .force(
    "forceY",
    d3
      .forceY()
      .strength(0.1)
      .y((height + margin.top) * 0.5)
  )
  .force(
    "center",
    d3
      .forceCenter()
      .x(width * 0.5)
      .y((height + margin.top) * 0.5)
  )
  .force("charge", d3.forceManyBody().strength(-15));

// ---------------------------//
//      TOOLTIP               //
// ---------------------------//

// -1- Create a tooltip div that is hidden by default:
var tooltip = d3
  .select("#datavis")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white")
  .style("position", "absolute");

// -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
var showTooltip = function(d) {
  tooltip.transition().duration(200);
  tooltip
    .style("opacity", 1)
    .html(d.descr + d.number)
    .style("left", d3.mouse(this)[0] + 30 + "px")
    .style("top", d3.mouse(this)[1] + 30 + "px");
};
var moveTooltip = function(d) {
  tooltip
    .style("left", d3.mouse(this)[0] + 30 + "px")
    .style("top", d3.mouse(this)[1] + 30 + "px");
};
var hideTooltip = function(d) {
  tooltip
    .transition()
    .duration(200)
    .style("opacity", 0);
};

var numberPersons = 7665;
var numberMenTotal = 6401;
var numberWomenTotal = 1264;

var KupferstichS = 0,
  PortraitP = 0,
  MuenzeM = 0,
  SteinmetzF = 0;
var extra = {
  KupferstichS: 0,
  PortraitP: 0,
  MuenzeM: 0,
  SteinmetzF: 0
};
var extraMale = {
  KupferstichS: 0,
  PortraitP: 0,
  MuenzeM: 0,
  SteinmetzF: 0
};
var extraFemale = {
  KupferstichS: 0,
  PortraitP: 0,
  MuenzeM: 0,
  SteinmetzF: 0
};

//all persons with a picture
var personWithPic = {
  descr: "Number of people with a depiction: ",
  radius: 0,
  number: 0
};

var femaleWithPic = {
  descr: "Number of women with a depiction: ",
  radius: 0,
  number: 0
};

var maleWithPic = {
  descr: "Number of men with a depiction: ",
  radius: 0,
  number: 0
};

//all even those without picture, hardcoded for now
var personsAll = {
  descr: "Number of people without a depiction: ",
  radius: 0,
  number: numberPersons
};

var maleAll = {
  descr: "Number of men in dataset: ",
  number: numberMenTotal,
  radius: numberMenTotal
};

var femaleAll = {
  descr: "Number of women in dataset: ",
  number: numberWomenTotal,
  radius: numberWomenTotal
};

var femaleWithoutPic = {
  descr: "Number of women without a depiction: ",
  radius: 0,
  number: 0
};

var maleWithoutPic = {
  descr: "Number of men without a depiction: ",
  radius: 0,
  number: 0
};

//hardcoded numbers for now
var kupferstichS = {
  descr: "Number of Kupferstiche: ",
  radius: 881,
  number: 881
};

var portraitP = {
  descr: "Number of portraits: ",
  radius: 673,
  number: 673
};

var steinmetzF = {
  descr: "Number of Steinmetzarbeiten: ",
  radius: 113,
  number: 113
};

var muenzeM = {
  descr: "Number of coin depictions: ",
  radius: 168,
  number: 168
};

var kupferstichFem = {
  descr: "Number of Kupferstiche of women: ",
  radius: 71,
  number: 71
};

var kupferstichMale = {
  descr: "Number of Kupferstiche of men: ",
  radius: 810,
  number: 810
};

var portraitFem = {
  descr: "Number of portraits of women: ",
  radius: 162,
  number: 162
};

var portraitMale = {
  descr: "Number of portraits of men: ",
  radius: 511,
  number: 511
};

var steinmetzFem = {
  descr: "Number of Steinmetzarbeiten of women: ",
  radius: 15,
  number: 15
};

var steinmetzMale = {
  descr: "Number of Steinmetzarbeiten of men: ",
  radius: 98,
  number: 98
};

var muenzeFem = {
  descr: "Number of coin depictions of women: ",
  radius: 10,
  number: 10
};

var muenzeMale = {
  descr: "Number of coin depictions of men: ",
  radius: 158,
  number: 158
};

var minZoom = 1;
var maxZoom = 10;
var slider = d3
  .select(".zoom")
  .append("input")
  .datum({})
  .attr("type", "range")
  .attr("value", minZoom)
  .attr("min", minZoom)
  .attr("max", maxZoom)
  .attr("step", (maxZoom - minZoom) / 100000)
  .on("input", slided);

function slided(d) {
  sizeDivisor = 50 / d3.select(this).property("value");
  updateVis();
}

d3.csv(
  "https://raw.githubusercontent.com/phuje/Data-test/master/person-abb.csv",
  function(data) {
    personWithPic.number = data.length;
    personWithPic.radius = data.length;
    personsAll.number = numberPersons - personWithPic.number; //person without pics
    personsAll.radius = personsAll.number;
    for (var i = 0; i < data.length; i++) {
      data[i].geb = parseInt(data[i].geb);
      data[i].tod = parseInt(data[i].tod);
      data[i].alter = data[i].tod - data[i].geb;

      data[i].sex === "m" ? maleWithPic.number++ : femaleWithPic.number++;
      maleWithPic.radius = maleWithPic.number;
      femaleWithPic.radius = femaleWithPic.number;

      //console.log(data[i]);
      switch (data[i].abb) {
        case "S":
          extra.KupferstichS++;
          if (data[i].sex === "m") {
            extraMale.KupferstichS++;
          } else if (data[i].sex === "w") {
            extraFemale.KupferstichS++;
          }
          break;
        case "P":
          extra.PortraitP++;
          if (data[i].sex === "m") {
            extraMale.PortraitP++;
          } else if (data[i].sex === "w") {
            extraFemale.PortraitP++;
          }
          break;
        case "M":
          extra.MuenzeM++;
          if (data[i].sex === "m") {
            extraMale.MuenzeM++;
          } else if (data[i].sex === "w") {
            extraFemale.MuenzeM++;
          }
          break;
        case "F":
          extra.SteinmetzF++;
          if (data[i].sex === "m") {
            extraMale.SteinmetzF++;
          } else if (data[i].sex === "w") {
            extraFemale.SteinmetzF++;
          }
          break;
        default:
          break;
      }
    }

    femaleWithoutPic.number = numberWomenTotal - femaleWithPic.number;
    femaleWithoutPic.radius = femaleWithoutPic.number;
    maleWithoutPic.number = numberMenTotal - maleWithPic.number;
    maleWithoutPic.radius = maleWithoutPic.number;

    console.log("Abbildungen Insgesamt: ", extra);
    console.log("Abbildung Male: ", extraMale);
    console.log("Abbildung Female: ", extraFemale);
    //if (error) throw error;
    // sort the nodes so that the bigger ones are at the back
    //data = data.sort(function(a,b){ return b.size - a.size; });

    //update the simulation based on the data
    updateVis();
  }
);

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.03).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}
function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0.03);
  d.fx = null;
  d.fy = null;
}

//function types(d) {
//console.log(d);
// d.gdp = +d.gdp;
// d.size = +d.gdp / sizeDivisor;
// d.size < 3 ? d.radius = 3 : d.radius = d.size;
//return d;
//}

function updateVis() {
  //saves by which parameters the bubbles should be split
  var splitParams = {
    depiction: 0,
    gender: 0,
    typeOfPic: 0
  };

  splitParams.depiction = document.getElementById("checkWithDepiction").checked
    ? 1
    : 0;
  splitParams.gender = document.getElementById("checkGender").checked ? 1 : 0;
  splitParams.typeOfPic = document.getElementById("checkPicType").checked
    ? 1
    : 0;

  console.log("splitparams", splitParams);

  var arr = [splitParams.depiction, splitParams.gender, splitParams.typeOfPic];
  //console.log("arr", arr);

  //erste Filteroption sichtbar oder nicht sichtbar machen
  if (arr[2] == 1) {
    document.getElementById("checkWithDepiction").disabled = true;
  } else {
    document.getElementById("checkWithDepiction").disabled = false;
  }

  var dataNode = [];
  if (arraysEqual([1, 0, 0], arr)) {
    dataNode = [personsAll, personWithPic];
  } else if (arraysEqual([1, 1, 0], arr)) {
    dataNode = [maleWithPic, femaleWithPic, maleWithoutPic, femaleWithoutPic];
  } else if (arraysEqual([0, 1, 0], arr)) {
    dataNode = [maleAll, femaleAll];
  } else if (arraysEqual([0, 0, 1], arr) || arraysEqual([1, 0, 1], arr)) {
    dataNode = [kupferstichS, portraitP, steinmetzF, muenzeM];
  } else if (arraysEqual([0, 1, 1], arr) || arraysEqual([1, 1, 1], arr)) {
    dataNode = [
      kupferstichFem,
      portraitFem,
      steinmetzFem,
      muenzeFem,
      kupferstichMale,
      portraitMale,
      steinmetzMale,
      muenzeMale
    ];
  } else {
    // [0, 0, 0]
    dataNode = [
      {
        descr: "Total number of people in dataset: ",
        number: numberPersons,
        radius: numberPersons
      }
    ];
  }

  addBubbles(dataNode);
}

function addBubbles(dataNode) {
  //remove old circles <g> element
  d3.selectAll(".node").remove();

  simulation
    .nodes(dataNode)
    .force(
      "collide",
      d3
        .forceCollide()
        .strength(0.5)
        .radius(function(d) {
          //console.log(d);
          return d.radius / sizeDivisor + nodePadding;
        })
        .iterations(1)
    )
    .on("tick", function(d) {
      node
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });
    });

  var node = svgBubble
    .append("g")
    .attr("class", "node")
    .selectAll("circle")
    .data(dataNode)
    .enter()
    .append("circle")
    .attr("class", function(d) {
      return "bubbles";
    })
    .attr("r", function(d) {
      return d.radius / sizeDivisor;
    })
    .attr("fill", function(d) {
      return color(d.descr);
    })
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .on("mouseover", showTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip)
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  simulation.alphaTarget(0.03).restart();
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
