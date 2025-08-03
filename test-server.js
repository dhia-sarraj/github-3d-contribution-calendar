import express from "express";
import render from "./src/index.js";

const app = express();

app.get("/test", render);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server running! http://localhost:${PORT}/test/?username="your-username"&colorTheme=(dark/light)`);
})