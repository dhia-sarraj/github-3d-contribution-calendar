import { fetchData } from "./fetch-data.js"
import { createSvg } from "./create-svg.js"

export default async(req, res)=>{
    const username = req.query.username;
    let userInfo = await fetchData(username)

    const svgString = createSvg(userInfo);
    
    // Sending a response (svg)
    res.send(svgString);
}