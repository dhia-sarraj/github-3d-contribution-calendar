import * as d3 from "d3";
import { JSDOM } from "jsdom";
import { create3DContrib } from "./create-3d-contrib.js"
import { createColorLegend } from "./create-color-legend.js";
import { addStats } from "./add-stats.js"

const width = 1000;
const height = 650;

export const colorPalette = {
    "dark": {
        "background": "#0d1117",
        "commit": "#7fbff0",
        "issue": "#ffb86c",
        "pullRequest": "#50fa7b",
        "pullRequestReview": "#bd93f9",
        "repoEdit": "#ff79c6",
        "privateCommit": "#ff5555"        
    },
    "light": {
        "background": "transparent",
        "commit": "#7fbff0",
        "issue": "#2a9d8f",
        "pullRequest": "#003049",
        "pullRequestReview": "#fdf0d5",
        "repoEdit": "#e5be76",
        "privateCommit": "#9d0208"
    }
}

export const createSvg = (userInfo, colorTheme)=>{
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
        .attr("fill", `${colorPalette[colorTheme]["background"]}`);

    // Creating the 3D contribution calendar
    create3DContrib(svg, userInfo.contributionsCollection, width, colorTheme);

    // Add color legend
    createColorLegend(svg, colorTheme);

    // Add stats
    addStats(svg, userInfo, colorTheme);

    return(container.html());
}