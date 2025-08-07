import { colorPalette } from "./create-svg.js";

const getText = (key)=>{
    switch (key){
        case "commit":
            return("Commit");
        case "issue":
            return("Issue");
        case "pullRequest": 
            return("Pull Request");
        case "pullRequestReview":
            return("Pull Request Review");
        case "repoEdit":
            return("Repo Edit");
        case "privateCommit":
            return("Private Commit");
    }
};

export const createColorLegend = (svg, colorTheme)=>{
    const palette = svg.append("g");
    let i = 450;
    for (const [key, value] of Object.entries(colorPalette[colorTheme])){
        if(key != "background"){
            palette.append("rect")
                    .attr("x", 25)
                    .attr("y", i)
                    .attr("width", 15)
                    .attr("height", 15)
                    .attr("fill", value);
            palette.append("text")
                    .attr("x", 45)
                    .attr("y", i+12)
                    .text(getText(key))
                    .attr("fill", `${colorTheme === "dark" ? "white" : "black"}`)
                    .style("font-size", "15px")
                    .style("font-family", "Arial, sans-serif")
        }
        i +=25;
    }
};