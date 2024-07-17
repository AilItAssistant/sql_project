//import mariadb from "mariadb";
import "dotenv/config";

import app from "./server.mjs";

app.listen(4000, () => {
    console.log(`Server running at http://localhost:4000`);
    });