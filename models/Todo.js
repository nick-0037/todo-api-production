import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	completed: {
		type: String,
		required: true,
		default: false,
	},
});

export default mongoose.model("Todo", todoSchema);
