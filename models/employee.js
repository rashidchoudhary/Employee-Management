import mongoose from "mongoose";

const schema = mongoose.Schema({
    empname: { type: String, required: true},
    salary: { type: Number, required: true},
    position: {type: String, required: true},
    DOB: { type: Date, required: true},
    address: { type: String, required: true},
    deptId: { type: mongoose.Schema.Types.ObjectId, ref: "Department"},
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Employee", schema);