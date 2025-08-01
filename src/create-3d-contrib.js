import * as d3 from "d3";

const diffDate = (beforeDate, afterDate,)=>{
    return Math.floor((afterDate - beforeDate) / (24 * 60 * 60 * 1000));
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

export const create3DContrib = (svg, userInfo, width, height)=>{
    const weeks = userInfo.contributionCalendar.weeks; // List of weeks

    if(weeks.length === 0){
        return;
    }

    const startTime = new Date(weeks[0].contributionDays[0].date).getTime();
    const dx = width / 64;
    const dy = dx / Math.sqrt(3);
    const dxx = dx * 0.88;
    const dyy = dy * 0.88;

    const group = svg.append("g");
    weeks.forEach(week => {
        week.contributionDays.forEach(day => {
            const dayOfWeek = day.weekday;
            const weeksSinceStart = Math.floor(diffDate(startTime, new Date(day.date).getTime()) / 7); 
        
            const baseX = 120 + (weeksSinceStart - dayOfWeek) * dx;
            const baseY = 120 + (weeksSinceStart + dayOfWeek) * dy;
            const height = Math.max(1, day.contributionCount) * 3 ;

            const colorBase = "#efefef";
            const colorTop = d3.rgb(colorBase);
            const colorRight = d3.rgb(colorBase).darker(0.5);
            const colorLeft = d3.rgb(colorBase).darker(1);

            const firstLeftBlock = createRightSide(baseX, baseY, 3, dxx, dyy);
            const leftSide = createRightSide(baseX, baseY, height, dxx, dyy);
            group.append("path")
                .attr("d", leftSide)
                .attr("fill", colorLeft.toString())
                .append("animate")
                .attr('attributeName', 'd')
                .attr('values', `${firstLeftBlock};${leftSide}`)
                .attr('dur', '3s')
                .attr('repeatCount', '1');
            
            const firstRightBlock = createLeftSide(baseX, baseY, 3, dxx, dyy);
            const rightSide = createLeftSide(baseX, baseY, height, dxx, dyy);
            group.append("path")
                .attr("d", rightSide)
                .attr('fill', colorRight.toString())
                .append("animate")
                .attr('attributeName', 'd')
                .attr('values', `${firstRightBlock};${rightSide}`)
                .attr('dur', '3s')
                .attr('repeatCount', '1');
            
                const firstTopBlock = createTopSide(baseX, baseY, 3, dxx, dyy);
                const topSide = createTopSide(baseX, baseY, height, dxx, dyy);
                group.append("path")
                    .attr("d", topSide)
                    .attr('fill', colorTop.toString())
                    .append("animate")
                    .attr('attributeName', 'd')
                    .attr('values', `${firstTopBlock};${topSide}`)
                    .attr('dur', '3s')
                    .attr('repeatCount', '1');
        });
    });
}