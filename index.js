import express from "express";
import mongoose from "mongoose";
import deptRouter from "./routes/deparment.js";
import empRouter from "./routes/employee.js";
import managerRouter from "./routes/manager.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/employee_management_dev");

const connection = mongoose.connection;

connection.once("connected", () => console.log("Database Connected..."));

connection.on("error", (error) => console.log("Database Error: ", error));

app.use("/department", deptRouter);
app.use("/employee", empRouter);
app.use("/manager", managerRouter);

app.listen(2020, () =>{
    console.log("Server is running on port 2020...")
});
