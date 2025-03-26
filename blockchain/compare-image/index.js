import express from "express";
import cors from "cors";
import compareLandImageService from "./controllers/compare-image.js";

const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();
router.post("/compare-images", compareLandImageService);

app.use("/api/v1", router);

app.listen(4000, () => {
  console.log("Server is running at port http://localhost:4000");
});
