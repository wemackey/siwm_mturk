////////////////////////////////////////////////////////////////
// SINGLE ITEM SPATIAL WM TASK
////////////////////////////////////////////////////////////////
// TO DO LIST
////////////////////////////////////////////////////////////////
//  Add x_axis jitter for probe with correct sampling distribution
//	Calculate/store variables: %Cor, RT
//	Incorporate PsiTurk
//	Configure multiple runs (add "next" button?)
//	Add a scoreboard and develop points system (beat high score?)
//  Add RSVP stream at fixation

////////////////////////////////////////////////////////////////
// DECLARE TRIAL VARIABLES
////////////////////////////////////////////////////////////////
var trials = 50; //total number of trials per run
var donetrials = 0; //number of trials completed in this run
var ang = [15,25,35,45,55,65,75,105,115,125,135,145,155,165,195,205,215,225,235,245,255,285,295,305,315,325,335,345]; // possible angles
var ecc = 300; // stimulus eccentricity in pixels from fixation
var userans = null; //user response (left = 1, right = 0)
var corans = null; //correct response (left = 1, right = 0)
var jitter = [10,50,100]; //jittered test location widths
var lr = [0,1]; //left or right probe
var del = [1500,2000,2500,3000,3500]; //possible delay periods
var listenkey = false; //do we want user input now?
var feedbackmsg = "no feedback"; //feedback message string
var colors = d3.scale.category20b();
var ci=0;
<<<<<<< HEAD
var let =["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var score=0; //user score
var mpx=1; //score multiplier
var crow=0; //how many correct in a row
=======
<<<<<<< HEAD
var score=0;
=======
var let =["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
>>>>>>> FETCH_HEAD
>>>>>>> fe4b480d95a4c9d7a9ea68842d45bbad643fc49f

////////////////////////////////////////////////////////////////
// GET KEYPRESS RESPONSES
////////////////////////////////////////////////////////////////
function onKeyDown(evt) {
    if (evt.keyCode == 39) userans = 1; // right
    else if (evt.keyCode == 37) userans = 0; // left
}

function onKeyUp(evt) {
    if (evt.keyCode == 39) userans = 1; // right
    else if (evt.keyCode == 37) userans = 0; // left
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

////////////////////////////////////////////////////////////////
// INITIALIZE TASK/TASKLOOP
////////////////////////////////////////////////////////////////
function init(svg) {
	    dispText(svg);
  return setTimeout(function() {ITI(svg)},500);
 }

function taskloop(svg){
  if (donetrials<trials){
    userans = null;
    drawStimulus(svg);
  }
  else taskend();
    //variable delay
    //probe dot l/r
    //await response
    //give feedback on ACC and RT
}

////////////////////////////////////////////////////////////////
// SHUFFLE FUNCTION
////////////////////////////////////////////////////////////////
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

////////////////////////////////////////////////////////////////
// CALL EXPLOSION EFFECT
////////////////////////////////////////////////////////////////
function doVisual(fmx, fmy) {
  var fmx = parseFloat(fmx);
  var fmy = parseFloat(fmy)

// Circle explosion
//    for (var k = 0; k < 9; k++) {
//			svg.append("svg:circle")
//				.attr("cx",fmx).attr("cy",fmy).attr("r",10)
//				.style("stroke",colors(++ci)).style("fill",colors(++ci))
//				.transition().duration(800).ease(Math.sqrt)
//					.attr("cx",fmx+Math.floor(Math.random()*200)-100).attr("cy",fmy+Math.floor(Math.random()*200)-100)
//					.style("stroke-opacity",1e-6).style("fill-opacity",1e-6).remove();
//		}

// Confetti explosion

		for (var k = 0; k < 50; k++) {
			var randx = Math.floor(Math.random()*2000)-1000,
				randy = Math.floor(Math.random()*2000)-1000;
				thunnidx=30, thunnidy=30;
			if (randx < 0){thunnidx *= -1;}
			if (randy < 0){thunnidy*=-1;}
			svg.append("svg:line")
			.attr("x1",fmx).attr("y1",fmy).attr("x2",fmx).attr("y2",fmy)
			.style("stroke",colors(++ci)).style("stroke-width", "10px")
			.transition().duration(1000).ease(Math.sqrt)
				.attr("x1",fmx+randx).attr("y1",fmy+randy)
				.attr("x2",fmx+randx+thunnidx).attr("y2",fmy+randy+thunnidy)
				.style("stroke-opacity",0.1).remove();
		}
}

////////////////////////////////////////////////////////////////
// CREATE STAGE
////////////////////////////////////////////////////////////////
function makeStage(w,h) {
  var svg = d3.select(".container")
     .insert("center")
     .insert("svg")
     .attr("width", w)
     .attr("height", h);
  return svg;
}

////////////////////////////////////////////////////////////////
// CLEAR STAGE
////////////////////////////////////////////////////////////////
function clearStimulus(svg) {
  svg.selectAll("circle").remove();
}

////////////////////////////////////////////////////////////////
// DRAW STIMULI
////////////////////////////////////////////////////////////////
function drawStimulus(svg) {
  clearStimulus(svg);
  shuffle(ang);
  cirx = ecc * Math.cos(ang[1]);
  ciry = ecc * Math.sin(ang[1]);
  var circle1 = svg.append("circle");
  circle1.attr("cx", 1024/2 + cirx)
         .attr("cy", 768/2 + ciry)
       .attr('r', 10)
       .attr("fill","black")
       .attr("stroke","black")
       .attr("stroke-width", 3);

  var fixation = svg.append("circle");
  fixation.attr("cx", 1024/2)
          .attr("cy", 768/2)
        .attr('r', 3)
        .attr("fill","black")
        .attr("stroke","black")
        .attr("stroke-width", 3);

      procx = circle1.attr("cx");
      procy = circle1.attr("cy");
      pror = circle1.attr("r");
      profill = circle1.attr("fill");
      prostroke = circle1.attr("stroke");
      prostrokewidth = circle1.attr("stroke-width");

  return setTimeout(function() {delayperiod(svg)},200);
}

////////////////////////////////////////////////////////////////
// DELAY PERIOD
////////////////////////////////////////////////////////////////
function delayperiod(svg){
  clearStimulus(svg);

  var fixation = svg.append("circle");
  fixation.attr("cx", 1024/2)
          .attr("cy", 768/2)
        .attr('r', 3)
        .attr("fill","black")
        .attr("stroke","black")
        .attr("stroke-width", 3);

  shuffle(del);
  return setTimeout(probe,del[1]);
}

////////////////////////////////////////////////////////////////
// RSVP STREAM
////////////////////////////////////////////////////////////////
function dispText(svg){
	svg.selectAll("text").remove();
	shuffle(let);
var text = svg.append("text");
		 text.attr("x", 1024/2)
         .attr("y", (768/2) - 10)
		 .attr("font-size",45)
		 .attr("text-anchor","middle")
		 .attr("font-weight","bold")
		 .text (let[1]);
		return setTimeout(function() {dispText(svg)},500);
}

////////////////////////////////////////////////////////////////
// SCORE UPDATE
////////////////////////////////////////////////////////////////
var show_score = function() {
	remove_word();
		d3.select("#score")
			.append("div")
			.attr("id","disp_score")
			.style("color","black")
			.style("text-align","center")
			.style("font-size","50px")
			.style("font-weight","400")
			.style("margin","20px")
			.text(score);
	};
	
var show_mpx = function() {
		d3.select("#mpx")
			.append("div")
			.attr("id","disp_mpx")
			.style("color","black")
			.style("text-align","center")
			.style("font-size","50px")
			.style("font-weight","400")
			.style("margin","20px")
			.text(mpx);
	};	

var remove_word = function() {
		d3.select("#disp_score").remove();
		d3.select("#disp_mpx").remove();
	};
////////////////////////////////////////////////////////////////
// DISPLAY PROBE
////////////////////////////////////////////////////////////////
function probe(){
  shuffle(jitter);
  shuffle(lr);

  if(lr[1]==1){
    jx = parseFloat(procx) - jitter[1];
    corans = 0;
  }
  else {
    jx = parseFloat(procx) + jitter[1];
    corans = 1;
  }

  var probecircle = svg.append("circle");
  probecircle.attr("cx", jx)
         .attr("cy", procy)
       .attr('r', pror)
       .attr("fill",profill)
       .attr("stroke",prostroke)
       .attr("stroke-width", prostrokewidth);

  var fixation = svg.append("circle");
  fixation.attr("cx", 1024/2)
          .attr("cy", 768/2)
        .attr('r', 3)
        .attr("fill","black")
        .attr("stroke","black")
        .attr("stroke-width", 3);

  return setTimeout(getresponse,1200);
}

////////////////////////////////////////////////////////////////
// GET USER RESPONSE AND GIVE FEEDBACK
////////////////////////////////////////////////////////////////
function getresponse(){
  feedback();
}

function feedback(){
  clearStimulus(svg);
  if(corans==userans){
    doVisual(jx, procy);
    feedbackmsg = "Correct!";
	score=score+(100*mpx);
	crow=crow+1;
	if (crow==3) {
		mpx=mpx+1; 
		crow=0;
	}
    var fixation = svg.append("circle");
    fixation.attr("cx", 1024/2)
             .attr("cy", 768/2)
           .attr('r', 3)
           .attr("fill","green")
           .attr("stroke","green")
           .attr("stroke-width", 5);
  }
  else if(userans==null){
    feedbackmsg = "Failed to answer!";
	crow=0;
	mpx=1;
    var fixation = svg.append("circle");
    fixation.attr("cx", 1024/2)
             .attr("cy", 768/2)
           .attr('r', 3)
           .attr("fill","white")
           .attr("stroke","white")
           .attr("stroke-width", 5);
  }
  else {
    feedbackmsg = "Incorrect!";
	crow=0;
	mpx=1;
    var fixation = svg.append("circle");
    fixation.attr("cx", 1024/2)
             .attr("cy", 768/2)
           .attr('r', 3)
           .attr("fill","red")
           .attr("stroke","red")
           .attr("stroke-width", 5);
  }

 	// alert(feedbackmsg);
	show_score();
	show_mpx();

 	console.log(score);
	console.log(mpx);
	console.log(crow);
 	donetrials = donetrials + 1;
 	return setTimeout(function() {ITI(svg)},1000);
}

////////////////////////////////////////////////////////////////
// ITI
////////////////////////////////////////////////////////////////
function ITI(svg){
  clearStimulus(svg);
  var fixation = svg.append("circle");
  fixation.attr("cx", 1024/2)
          .attr("cy", 768/2)
        .attr('r', 3)
        .attr("fill","black")
        .attr("stroke","black")
        .attr("stroke-width", 3);

  return setTimeout(function() {taskloop(svg)},2000);
}

////////////////////////////////////////////////////////////////
// END TASK
////////////////////////////////////////////////////////////////
function taskend(){
  // alert('Task complete!')
}

function clearButton() {
  d3.select(".container")
    .selectAll("button")
    .remove();
}

function makeButton(text, callback) {
  d3.select(".buttonbar")
    .insert("button")
    .attr("type", "button")
    .attr("class", "btn btn-primary btn-lrg")
    .text(text)
    .on("click", function(d) { console.log("clicked"); callback(); } );
}

function doTrial(svg) {
  clearStimulus(svg);
  // clearButton();
  init(svg);
  makeButton("Next Trial", function () { init(svg); } );
}

var svg = makeStage(1024,768);

doTrial(svg);
