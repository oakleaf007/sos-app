import app from "./src/app.js";
import "dotenv/config";

const PORT = process.env.PORT;

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})