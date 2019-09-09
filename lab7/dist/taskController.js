"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taskData = require("./taskData");
class Tasks {
    routes(app) {
        app.route('/api/tasks/:id').get(async (req, res) => {
            try {
                let task = await taskData.getTask(req.params.id);
                res.json(task);
            }
            catch (e) {
                res.status(404).json({ error: "task not found" });
            }
        });
        app.route('/api/tasks/').get(async (req, res) => {
            var taskList = await taskData.getAllTasks();
            var tasks = [];
            try {
                if (!(req.query.skip) && !(req.query.take)) {
                    tasks = [];
                    for (var i = 0; (i < taskList.length && i < 20); i++) {
                        tasks[i] = taskList[i];
                    }
                    taskList = [];
                    taskList = tasks;
                }
                var skip, take, i = 0, j = 0;
                if (skip = req.query.skip) {
                    if (skip <= taskList.length && skip >= 0) {
                        if (typeof skip !== "number" && skip >= taskList.length)
                            throw "Enter a valid number";
                        for (i = skip, j = 0; (i < taskList.length && i < 20); i++, j++) {
                            tasks[j] = taskList[i];
                        }
                        taskList = [];
                        taskList = tasks;
                    }
                }
                if (take = req.query.take) {
                    if (take >= 0 && take <= 100) {
                        if (typeof take !== "number" && take >= taskList.length)
                            throw "Enter a valid number";
                        tasks = [];
                        for (var i = 0; (i < taskList.length && i < take); i++) {
                            tasks[i] = taskList[i];
                        }
                        taskList = [];
                        taskList = tasks;
                    }
                }
                res.json(taskList);
            }
            catch (e) {
                res.status(500).json({
                    error: e
                });
            }
        });
        app.route('/api/tasks/').post(async (req, res) => {
            let blogtaskData = req.body;
            try {
                let newTask = await taskData.createTask(blogtaskData.title, blogtaskData.description, blogtaskData.hoursEstimated, blogtaskData.completed, blogtaskData.comments);
                res.json(newTask);
            }
            catch (e) {
                res.status(500).json({ error: e });
            }
        });
        app.route('/api/tasks/:id').put(async (req, res) => {
            let updatedData = req.body;
            try {
                await taskData.getTask(req.params.id);
            }
            catch (e) {
                res.status(404).json({ error: "Task not found" });
                return;
            }
            try {
                let updatedTask = await taskData.updateTask(req.params.id, updatedData);
                res.json(updatedTask);
            }
            catch (e) {
                res.status(500).json({ error: e });
            }
        });
        app.route('/api/tasks/:id').patch(async (req, res) => {
            let updatedData = req.body;
            try {
                await taskData.getTask(req.params.id);
            }
            catch (e) {
                res.status(404).json({ error: "task not found" });
            }
            try {
                let updatedTask = await taskData.updateTask(req.params.id, updatedData);
                res.json(updatedTask);
            }
            catch (e) {
                res.status(500).json({ error: e });
            }
        });
        app.route('/api/tasks/:id/comments').post(async (req, res) => {
            let blogPostData = req.body;
            let taskId = req.params.id;
            console.log(taskId);
            try {
                let newPost = await taskData.addCommentToTask(taskId, blogPostData.comment.name, blogPostData.comment.comment);
                res.json(newPost);
                console.log(newPost);
            }
            catch (e) {
                res.status(500).json({ error: e });
            }
        });
        app.route('/api/tasks/:taskId/:commentId').delete(async (req, res) => {
            try {
                await taskData.getTask(req.params.taskId);
            }
            catch (e) {
                res.status(404).json({ error: "Task not found" });
                return;
            }
            try {
                let remove = await taskData.removeCommentFromTask(req.params.taskId, req.params.commentId);
                res.json(remove);
                console.log("Deleted Successfully");
            }
            catch (e) {
                res.status(500).json({ error: e });
                return;
            }
        });
    }
}
exports.Tasks = Tasks;
