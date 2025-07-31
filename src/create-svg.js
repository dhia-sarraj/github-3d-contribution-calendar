import * as d3 from "d3";
import { JSDOM } from "jsdom";
import { create3DContrib } from "./create-3d-contrib.js"

const width = 900;
const height = 500;

export const createSvg = (userInfo)=>{
    const fakeDom = new JSDOM("<!DOCTYPE html><html><body><div class='container'></div></body></html>");
    const container = d3.select(fakeDom.window.document).select(".container");
    const svg = container
        .append("svg")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);
    
    // background
    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#eeddaa");

    // Creating the 3D contribution calendar
    // create3DContrib(svg, userInfo);

    return(container.html());
}