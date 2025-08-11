export default async (req, res)=>{
    const username = req.query.username;
    const colorTheme = req.query.colorTheme || "dark";

    const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset = "utf-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                    <title>Calendar</title>
                    <style>
                        body{
                            margin: 0;
                            padding: 0;
                        }
                        main{
                            width: 1000px;
                            height: 650px;
                            display:flex;
                            align-items: center;
                            justify-content: center;
                        }
                        #loader{
                            animation: loader-spin 0.8s steps(8) infinite;
                        }
                        @keyframes loader-spin{
                            to{
                                transform: rotate(360deg)
                            }
                        }
                        #calendar{
                            display:none;
                        }
                    </style>
                </head>
                <body>
                    <main>
                        <svg id="loader" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve">
                            <g>
                                <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#979a51"/>
                                <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#e5e6d4" transform="rotate(45 64 64)"/>
                                <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#e5e6d4" transform="rotate(90 64 64)"/>
                                <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#e5e6d4" transform="rotate(135 64 64)"/>
                                <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#e5e6d4" transform="rotate(180 64 64)"/>
                                <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#e5e6d4" transform="rotate(225 64 64)"/>
                                <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#e5e6d4" transform="rotate(270 64 64)"/>
                                <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#e5e6d4" transform="rotate(315 64 64)"/>
                            </g>
                        </svg>
                        <img id="calendar" alt="Contribution Calendar"/>
                    </main>
                    <script>
                        const load = ()=>{
                            const img = document.getElementById("calendar");
                            const loader = document.getElementById("loader");
                            const url = 'http://localhost:3000/api/calendar?username=${username}&colorTheme=${colorTheme}';

                            img.onload = ()=>{
                                img.style.display = "block";
                                loader.style.display = "none";    
                            };
                            img.src=url;
                        };
                        load();
                    </script>    
                </body>
            </html>
        `;
    
    res.setHeader("Content-Type", "text/html");
    res.send(html);
};