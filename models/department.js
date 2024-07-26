import mongoose from "mongoose";

const schema = mongoose.Schema({
    deptname: { type: String, required: true,unique: true},
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: "Manager"},
    deptStart: {type: Date, required: true},
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Department", schema);