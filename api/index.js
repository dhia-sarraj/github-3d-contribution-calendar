import { fetchData } from "../src/fetch-data.js"
import { createSvg } from "../src/create-svg.js"

export default async(req, res)=>{
    const username = req.query.username;
    const colorTheme = req.query.colorTheme;
    let userInfo = await fetchData(username);

    const svgString = createSvg(userInfo.data.user, colorTheme);
    
    // Sending a response (svg)
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svgString);
}