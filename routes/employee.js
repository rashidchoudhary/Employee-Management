import express from "express";
const router = express.Router();
import empModel from "../models/employee.js";
import department from "../models/department.js";

router.get("/", async (req,res) =>{
    try{
        const data = await empModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                //joining department with employee to get department
                $lookup: {
                    from: "departments",
                    localField: "deptId",
                    foreignField: "_id",
                    as: "department",
                    pipeline: [
                        {
                            $project: {
                                isDeleted: 0,
                                __v: 0,
                            },
                        },
                        {
                            //finding manager of employee using the department
                            $lookup: {
                                from: "managers",
                                localField: "managerId",
                                foreignField: "_id",
                                as: "manager",
                                pipeline:[
                                    {
                                        $project: {
                                            isDeleted: 0,
                                            __v: 0,
                                        },
                                    },
                                ]
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    isDeleted: 0,
                    __v: 0,
                    deptId: 0,
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
    const data = await empModel.findById(req.params.id);
    res.json(data);
    } catch({message}){
        res.json({message});
    }
});

router.post("/", async (req,res) =>{
    try{
    const data = await empModel.create(req.body);
    res.status(200).json({meassage: "Data added successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.patch("/:id",  async (req,res) =>{
    try{
        const data = await empModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({meassage: "Data updated successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.delete("/:id", async (req,res) =>{
    try{
        const data = await empModel.findByIdAndUpdate(req.params.id, {isDeleted: true,});
        res.status(200).json({meassage: "Data deleted successfully", data});
    } catch({message}){
        res.json({message});
    }
});

export default router;