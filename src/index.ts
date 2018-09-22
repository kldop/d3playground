// Typescript example, manipulating elements from index.html
import * as d3 from 'd3';

console.log("JS is running");

d3.select("h1").style("color", "blue");
d3.select("#select-div").style("background-color", "#039BE5");

const square = d3.selectAll("rect");
square.style("fill", "orange");