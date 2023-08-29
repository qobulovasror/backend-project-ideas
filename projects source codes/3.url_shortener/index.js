import express from "express";
import dotenv from "dotenv";
import url from "./routes/url.js";
import connectDB from "./utils/db.js";
import options from "./utils/options.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

dotenv.config({ path: "./config/.env" });
const app = express();



const specs = swaggerJSDoc(options);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCssUrl:
      // "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
      "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css",
  })
);


connectDB();

app.use("/", url);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



