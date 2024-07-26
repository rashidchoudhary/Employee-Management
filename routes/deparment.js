import express from "express";
const router = express.Router();
import deptModel from "../models/department.js";

router.get("/", async (req,res) =>{
    try{
        const data = await deptModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                //finding employees of department
                $lookup: {
                    from: "employees",
                    localField: "_id",
                    foreignField: "deptId",
                    as: "employees",
                },
            },
            {
                // finding managers of department
                $lookup: {
                    from: "managers",
                    localField: "managerId",
                    foreignField: "_id",
                    as: "manager",
                },
            },
        ]);
        res.json({ message: "Data fetched successfully", data });
    } catch({message}){
        res.json({message});
    }
});

router.get("/:id", async (req,res) =>{
    try{
    const data = await deptModel.findById(req.params.id);
    res.json(data);
    } catch({message}){
        res.json({message});
    }
});

router.post("/", async (req,res) =>{
    try{
    const data = await deptModel.create(req.body);
    res.status(200).json({meassage: "Data added successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.patch("/:id",  async (req,res) =>{
    try{
        const data = await deptModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({meassage: "Data updated successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.delete("/:id", async (req,res) =>{
    try{
        const data = await deptModel.findByIdAndUpdate(req.params.id, {isDeleted: true,});
        res.status(200).json({meassage: "Data deleted successfully", data});
    } catch({message}){
        res.json({message});
    }
});

export default router;