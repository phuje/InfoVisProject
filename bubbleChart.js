var margin = { top: 10, right: 10, bottom: 10, left: 10 },
  width = document.getElementById("bubbleChart").offsetWidth - margin.left - margin.right,
  height = 440//600/*window.innerHeight*/ ,
sizeDivisor = 50,
  nodePadding = 2.5;

var svgBubble = d3
  .select("#datavis")
  .append("svg")
  .attr("width", "100%")
  .attr("height", height);

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
  //tooltip.transition().duration(100);
  tooltip
    .style("opacity", 1)
    .html(d.descr + d.number)
    .style("left", d3.mouse(this)[0] + 50 + "px")
    .style("top", d3.mouse(this)[1] + 120 + 30 + "px");
};
var moveTooltip = function(d) {
  tooltip
    .style("left", d3.mouse(this)[0] + 30 + "px")
    .style("top", d3.mouse(this)[1] + 120+ 30 + "px");
};
var hideTooltip = function(d) {
  tooltip
    //.transition().duration(100)
    .style("opacity", 0);
};

var minZoom = 1;
var maxZoom = 10;
var slider = d3
  .select(".zoomHolder")
  .append("input")
  .datum({})
  .attr("type", "range")
  .attr("value", minZoom)
  .attr("min", minZoom)
  .attr("max", maxZoom)
  .attr("step", (maxZoom - minZoom) / 1000000)
  .on("input", slided);

//is called when zoom slider is moved - calculates the new sizeDivisor which scales the bubbles and updates the view
function slided() {
  sizeDivisor = 50 / d3.select(".zoom input").property("value");
  addBubbles(false);
}

d3.csv(
  "https://raw.githubusercontent.com/phuje/Data-test/master/datensatz.csv", //person-abb.csv",
  function(data) {
    totalPeople.number = data.length;
    for (var i = 0; i < data.length; i++) {
      data[i].abb === "NULL" ? noDepiction.number++ : withDepiction.number++;
      data[i].geb = parseInt(data[i].geb);
      data[i].tod = parseInt(data[i].tod);
      data[i].alter = isNaN(data[i].tod - data[i].geb)
        ? null
        : data[i].tod - data[i].geb;

      data[i].sex === "m" ? totalMen.number++ : totalWomen.number++;
      if (data[i].abb === "NULL") {
        data[i].sex === "m"
          ? maleWithoutPic.number++
          : femaleWithoutPic.number++;
      } else {
        data[i].sex === "m" ? maleWithPic.number++ : femaleWithPic.number++;

        switch (data[i].abb) {
          case "S":
            kupferstichS.number++;
            data[i].sex === "m"
              ? kupferstichMale.number++
              : kupferstichFem.number++;
            break;
          case "P":
            portraitP.number++;
            data[i].sex === "m" ? portraitMale.number++ : portraitFem.number++;
            break;
          case "M":
            muenzeM.number++;
            data[i].sex === "m" ? muenzeMale.number++ : muenzeFem.number++;
            break;
          case "F":
            steinmetzF.number++;
            data[i].sex === "m"
              ? steinmetzMale.number++
              : steinmetzFem.number++;
            break;
          default:
            break;
        }
      }

      //console.log(data[i]);
    }

    console.log("Abbildungen Insgesamt: ", withDepiction.number);
    console.log("Male: ", totalMen.number);
    console.log("Female: ", totalWomen.number);
    //if (error) throw error;
    // sort the nodes so that the bigger ones are at the back
    //data = data.sort(function(a,b){ return b.size - a.size; });

    //update the simulation based on the data
    updateBubbleChart();
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


function updateBubbleChart(){
  
  if (arraysEqual([1, 0, 0], splitparamsArray)) {
    dataNode = [noDepiction, withDepiction];
  } else if (arraysEqual([1, 1, 0], splitparamsArray)) {
    dataNode = [maleWithPic, femaleWithPic, maleWithoutPic, femaleWithoutPic];
  } else if (arraysEqual([0, 1, 0], splitparamsArray)) {
    dataNode = [totalMen, totalWomen];
  } else if (arraysEqual([0, 0, 1], splitparamsArray) || arraysEqual([1, 0, 1], splitparamsArray)) {
    dataNode = [kupferstichS, portraitP, steinmetzF, muenzeM];
  } else if (arraysEqual([0, 1, 1], splitparamsArray) || arraysEqual([1, 1, 1], splitparamsArray)) {
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
    dataNode = [totalPeople];
    resetZoom();
  }

  addBubbles(true);
}

function addBubbles(newBubbles) {
  //remove old circles <g> element
  d3.selectAll(".node").remove();

  var node = svgBubble
    .append("g")
    .attr("class", "node")
    .selectAll("circle")
    .data(dataNode)
    .enter()
    .append("circle")
    .attr("class", "bubbles")
    .attr("r", function(d){ if(newBubbles){ return 0;} else{return d.number / sizeDivisor;}}) //if new bubbles start with radius 0 for transition, if not newBubbles(zoom) then keep normal radius
    .attr("fill", function(d) {
      return getColor(d.key);
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

  if(newBubbles){
    d3.selectAll(".bubbles")
    .transition()
    .duration(1000)
    .attr("r", function(d) {
      //d.radius = d.radius !== 0 ? d.radius : d.number;
      return d.number / sizeDivisor;
    })
  }

  simulation
    .nodes(dataNode)
    .force(
      "collide",
      d3
        .forceCollide()
        .strength(0.5)
        .radius(function(d) {
          //console.log(d);
          //d.radius = d.radius !== 0 ? d.radius : d.number;
          return d.number / sizeDivisor + nodePadding;
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



  simulation.alphaTarget(0.03).restart();
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function resetZoom(){
  d3.select(".zoom input").property("value", minZoom);
  slided();
}


