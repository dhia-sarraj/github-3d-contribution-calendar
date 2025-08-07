export const addStats = (svg, userInfo, colorTheme)=>{
    const totalContributions = userInfo.contributionsCollection.contributionCalendar.totalContributions;
    const totalStars = userInfo.starredRepositories.totalCount;
    const totalForks = userInfo.repositories.totalCount;


    // Add contribution Icon
    const contribution = svg.append("g")
                            .attr("transform", "translate(250, 595)")
    contribution.append("path")
                .attr("d", "")
                .attr("fill", `${colorTheme === "dark" ? "#ffffff": "#000000"}`);
    contribution.append("text")
                .attr("x", "28")
                .attr("y", "17")
                .style("font-size", "17px")
                .style("font-weight", "bold")
                .style("font-family", "arial, sans-serif")
                .text(`${totalContributions} contributions`)
                .attr("fill", `${colorTheme === "dark" ? "#ffffff": "#000000"}`);

    // Add star icon
    const star = svg.append("g")
                    .attr("transform", "translate(450, 595)");
    star.append("path")
        .attr("d","M12 .25a.5.75 0 0 1 .673.418l3.058 6.197 6.839.994a.75.75 0 0 1 .415 1.279l-4.948 4.823 1.168 6.811a.751.751 0 0 1-1.088.791L12 18.347l-6.117 3.216a.75.75 0 0 1-1.088-.79l1.168-6.812-4.948-4.823a.75.75 0 0 1 .416-1.28l6.838-.993L11.328.668A.75.75 0 0 1 12 .25Zm0 2.445L9.44 7.882a.75.75 0 0 1-.565.41l-5.725.832 4.143 4.038a.748.748 0 0 1 .215.664l-.978 5.702 5.121-2.692a.75.75 0 0 1 .698 0l5.12 2.692-.977-5.702a.748.748 0 0 1 .215-.664l4.143-4.038-5.725-.831a.75.75 0 0 1-.565-.41L12 2.694Z")
        .attr("fill", `${colorTheme === "dark" ? "#ffffff": "#000000"}`);
    
    star.append("text")
        .attr("x", "28")
        .attr("y", "17")
        .style("font-size", "17px")
        .style("font-weight", "bold")
        .style("font-family", "arial, sans-serif")
        .text(`${totalStars} stars`)
        .attr("fill", `${colorTheme === "dark" ? "#ffffff": "#000000"}`);

    // Add fork icon
    const fork = svg.append("g")
                    .attr("transform", "translate(575, 595)");
    fork.append("path")
        .attr("d", "M8.75 19.25a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM15 4.75a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0Zm-12.5 0a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM5.75 6.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 5.75 6.5ZM12 21a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 12 21Zm6.25-14.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 18.25 6.5Z")
        .attr("fill", `${colorTheme === "dark" ? "#ffffff": "#000000"}`);
    fork.append("path")
        .attr("d", "M6.5 7.75v1A2.25 2.25 0 0 0 8.75 11h6.5a2.25 2.25 0 0 0 2.25-2.25v-1H19v1a3.75 3.75 0 0 1-3.75 3.75h-6.5A3.75 3.75 0 0 1 5 8.75v-1Z")
        .attr("fill", `${colorTheme === "dark" ? "#ffffff": "#000000"}`);
    fork.append("path")
        .attr("d", "M11.25 16.25v-5h1.5v5h-1.5Z")
        .attr("fill", `${colorTheme === "dark" ? "#ffffff": "#000000"}`);
    fork.append("text")
        .attr("x", "28")
        .attr("y", "17")
        .style("font-size", "17px")
        .style("font-weight", "bold")
        .style("font-family", "Arial, sans-serif")
        .text(`${totalForks} forks`)
        .attr("fill", `${colorTheme === "dark" ? "#ffffff": "#000000"}`);
};