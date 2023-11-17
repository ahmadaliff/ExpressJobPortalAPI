const express = require("express");
const env = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const router = require("./routers/index");
const cors = require("cors");
const { options, swaggerFile } = require("./swaggerJson/useSwagger");
env.config();

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile, options));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Listening to Port : ${PORT}`);
});
