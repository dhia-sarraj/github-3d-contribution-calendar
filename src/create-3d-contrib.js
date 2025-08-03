import * as d3 from "d3";

const diffDate = (beforeDate, afterDate,)=>{
    return Math.floor((afterDate - beforeDate) / (24 * 60 * 60 * 1000));
}

const dateOnly = (str)=>{
    const date = new Date(str);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return(`${year}-${month}-${day}`);
}

const createLeftSide = (baseX, baseY, height, dx, dy)=>{
    const leftSide = d3.path();
    leftSide.moveTo(baseX, baseY); // Move to point P1(baseX, baseY)
    leftSide.lineTo(baseX + dx, baseY + dy); // Create a line from point P1 to point P2(baseX + dx, baseY + dy)
    leftSide.lineTo(baseX + dx, baseY + dy - height); // Create a line from point P2 to point P3(baseX + dx, baseY + dy - height)
    leftSide.lineTo(baseX, baseY - height); // Create a line from point P3 to point P4(baseX, baseY - height)
    leftSide.closePath();
    
    return(leftSide.toString());
}

const createRightSide = (baseX, baseY, height, dx, dy)=>{
    const rightSide = d3.path();
    rightSide.moveTo(baseX + dx, baseY + dy); // Move to point P2
    rightSide.lineTo(baseX + dx * 2, baseY); // Create a line from point P2 to point P5(baseX + dx * 2, baseY)
    rightSide.lineTo(baseX + dx * 2, baseY - height); // Create a line from point P5 to point P6(baseX + dx * 2, baseY - height)
    rightSide.lineTo(baseX + dx, baseY + dy - height); // Create a line from point P6 to point P3
    rightSide.closePath();

    return(rightSide.toString());
}

const createTopSide = (baseX, baseY, height, dx, dy)=>{
    const topSide = d3.path();
    topSide.moveTo(baseX, baseY - height); // Move to point P4
    topSide.lineTo(baseX + dx, baseY + dy - height); // Create a line from point P4 to point P3
    topSide.lineTo(baseX + dx * 2, baseY - height); // Create a line from point P3 to point P6
    topSide.lineTo(baseX + dx, baseY - dy - height); // Create a line a from point P6 to point P7
    topSide.closePath();

    return(topSide.toString());
}

const getColors = (userInfo, day)=>{
    const colors = {
        "commit": "#7fbff0",
        "issue": "#2a9d8f",
        "pullRequest": "#003049",
        "pullRequestReview": "#fdf0d5",
        "repoEdit": "#c1121f",
        "privateCommit": "#9d0208"
    }
    let typesOfContributions = [];

    const date = day.date;
    const commitContributions = userInfo.commitContributionsByRepository;
    const issueContributions = userInfo.issueContributions;
    const pullRequestContributions = userInfo.pullRequestContributions;
    const pullRequestReviewContributions = userInfo.pullRequestReviewContributions;
    const repositoryContributions = userInfo.repositoryContributions;

    commitContributions.forEach(repo => {
        repo.contributions.nodes.forEach(contrib=>{
            if(dateOnly(contrib.occurredAt) === date){
                for(let i=1; i<=contrib.commitCount; i++){
                    typesOfContributions.push(colors["commit"]);
                }
            }
        });
    });
    issueContributions.nodes.forEach(issue=>{
        if(dateOnly(issue.occurredAt) === date){
            typesOfContributions.push(colors["issue"]);
        }
    });
    pullRequestContributions.nodes.forEach(pr=>{
        if(dateOnly(pr.occurredAt) === date){
            typesOfContributions.push(colors["pullRequest"]);
        }
    });
    pullRequestReviewContributions.nodes.forEach(prr=>{
        if(dateOnly(prr.occurredAt) === date){
            typesOfContributions.push(colors["pullRequestReview"]);
        }
    });
    repositoryContributions.nodes.forEach(repo=>{
        if(dateOnly(repo.occurredAt) === date){
            typesOfContributions.push(colors["repoEdit"]);
        }
    });

    for(let i=typesOfContributions.length+1; i<=day.contributionCount; i++){
         typesOfContributions.unshift(colors["privateCommit"]);
    }

    return(typesOfContributions);
}

const createBlock = (userInfo, day, group, startTime, dx, dy, dxx, dyy)=>{
    const dayOfWeek = day.weekday;
    const weeksSinceStart = Math.floor(diffDate(startTime, new Date(day.date).getTime()) / 7); 

    const baseX = 120 + (weeksSinceStart - dayOfWeek) * dx;
    const baseY = 120 + (weeksSinceStart + dayOfWeek) * dy;
    const height = Math.max(1, day.contributionCount) * 3 ;

    const subGroup = group.append("g"); // Each day is a group inside the calendar (which is also a group inside the whole SVG)
    
    const colors = getColors(userInfo, day).length === 0? ["#efefef"] : getColors(userInfo, day);

    if(colors.length === 1){
        const leftSide = createRightSide(baseX, baseY, 3, dxx, dyy);
        const rightSide = createLeftSide(baseX, baseY, 3, dxx, dyy);
        subGroup.append("path")
                .attr("d", leftSide)
                .attr("fill", d3.rgb(colors[0]).darker(1))
                .attr("stroke", "black")
                .attr("stroke-dasharray", "0.3,0.3")
                .attr("stroke-width", 0.2);
        subGroup.append("path")
                .attr("d", rightSide)
                .attr("fill", d3.rgb(colors[0]).darker(0.5))
                .attr("stroke", "black")
                .attr("stroke-dasharray", "0.3,0.3")
                .attr("stroke-width", 0.2);
        const topSide = createTopSide(baseX, baseY, height, dxx, dyy);
        subGroup.append("path")
                .attr("d", topSide)
                .attr('fill', colors[0]);
    }else{
        for(let i=0; i<day.contributionCount; i++){
            const leftSide = createRightSide(baseX, baseY - i*3, 3, dxx, dyy);
            const rightSide = createLeftSide(baseX, baseY - i*3, 3, dxx, dyy);
            subGroup.append("path")
                    .attr("d", leftSide)
                    .attr("fill", d3.rgb(colors[i]).darker(1))
                    .attr("stroke", "black")
                    .attr("stroke-dasharray", "0.3,0.3")
                    .attr("stroke-width", 0.2);
            subGroup.append("path")
                    .attr("d", rightSide)
                    .attr("fill", d3.rgb(colors[i]).darker(0.5))
                    .attr("stroke", "black")
                    .attr("stroke-dasharray", "0.3,0.3")
                    .attr("stroke-width", 0.2);
        }
        const topSide = createTopSide(baseX, baseY, height, dxx, dyy);
        subGroup.append("path")
                .attr("d", topSide)
                .attr('fill', colors[day.contributionCount-1]);
    }
}

export const create3DContrib = (svg, userInfo, width)=>{
    const weeks = userInfo.contributionCalendar.weeks; // List of weeks

    if(weeks.length === 0){
        return;
    }

    const startTime = new Date(weeks[0].contributionDays[0].date).getTime();
    const dx = width / 64;
    const dy = dx / 2;
    const dxx = dx * 0.88;
    const dyy = dy * 0.88;

    const group = svg.append("g");
    weeks.forEach(week => {
        week.contributionDays.forEach(day => {
            createBlock(userInfo, day, group, startTime, dx, dy, dxx, dyy);
        });
    });
}