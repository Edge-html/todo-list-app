//mongodb-connection.js
import mongoose from "mongoose";

export default function connect() {
  const database =
    "mongodb+srv://icsolana:password0214@todocluster.87itc.mongodb.net/?retryWrites=true&w=majority&appName=TodoCluster";
  mongoose
    .connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "todos",
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
    });
}