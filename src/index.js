import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    // console.log("Devvart");
    app.on("error", (error) => {
      console.log("ERRR: ", error);
      throw error;
    });
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.log("MongoDB connection failed !", err);
  });
