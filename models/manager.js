import mongoose from "mongoose";

const schema = mongoose.Schema({
    mamngername: { type: String, required: true},
    manageremail: {type: String, required: true},
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Manager", schema);