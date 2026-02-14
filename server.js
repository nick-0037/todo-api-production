import express from "express";
import mongoose from "mongoose";
import Todo from "./models/Todo.js";

const app = express();

app.use(express.json());

app.get("/todos", async (req, res) => {
	const todos = await Todo.find();
	res.json(todos);
});

app.post("/todos", async (req, res) => {
	const todo = new Todo({
		title: req.body.title,
		completed: req.body.completed,
	});
	await todo.save();
	res.json(todo);
});

app.get("/todos/:id", async (req, res) => {
	const { id } = req.params;
	const todo = await Todo.findById(id);
	res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
	const { id } = req.params;
	const { title, completed } = req.body;
	const todo = await Todo.findByIdAndUpdate(
		id,
		{ title, completed },
		{ new: true },
	);
	res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
	const { id } = req.params;
	await Todo.findByIdAndDelete(id);
	res.json({ message: "Todo deleted" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((e) => {
		console.error(e);
	});
