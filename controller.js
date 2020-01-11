// updates views depending on the split parameters selected in filter
//if main filter was changed, the views of bubble chart and stacked area chart are changed accordingly
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
  
    //console.log("splitparams", splitParams);
  
    var arr = [splitParams.depiction, splitParams.gender, splitParams.typeOfPic];
  
    //erste Filteroption bei Filtern nach Abbildung unanklickbar und ungeklickt machen
    if (arr[2] == 1) {
      document.getElementById("checkWithDepiction").checked = false;
      document.getElementById("checkWithDepiction").disabled = true;
    } else {
      document.getElementById("checkWithDepiction").disabled = false;
    }
  
    /**updates bubble chart with filter as defined in arr array that contains the filter booleans */
    splitparamsArray = arr;
    updateBubbleChart(arr);
    updateStackedAreaChart();
  
    
  }

  // if reset button of main filter was clicked, the views of bubble chart and stacked area chart are reset to totalNumberPeople
  function resetFilters(){
    
    console.log("resetFilters()");
    d3.selectAll(".mainFilterCheckbox").property('checked', false);
  
    resetZoom();
  
    updateVis();
  }