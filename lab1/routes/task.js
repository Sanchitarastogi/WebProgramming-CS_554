const express = require("express");
const router = express.Router();
const data = require("../data");
const taskData = data.task;

router.get("/:id", async (req, res) => {
  try {
    const task = await taskData.getTask(req.params.id);
    res.json(task);
  } catch (e) {
    res.status(404).json({ error: "task not found" });
  }
});

router.get("/", async (req, res) => {
  var taskList = await taskData.getAllTasks();
  var tasks = [];
  try{
    if (!(req.query.skip)  && !(req.query.take)) {
      tasks = [];
      for (var i = 0;
          (i < taskList.length && i < 20); i++) {
            tasks[i] = taskList[i];
      }
      taskList = [];
      taskList = tasks;
  }
  if (skip = req.query.skip) {
     
      if (skip <= taskList.length && skip >= 0) {
        if(typeof skip !== "number" && skip >= taskList.length) throw "Enter a valid number";
          for (var i = skip, j = 0;
              (i < taskList.length && i < 20); i++, j++) {
                tasks[j] = taskList[i];
          }
          taskList = [];
          taskList = tasks;
      } 
  }
  if (take = req.query.take) {
      
      if ( take >= 0 && take <= 100) {
        if(typeof take !== "number" && take >= taskList.length) throw "Enter a valid number";
        tasks = [];
          for (var i = 0;
              (i < taskList.length && i < take); i++) {
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

  router.post("/", async (req, res) => {
    const blogtaskData = req.body;

    try {
  
      const newTask = await taskData.createTask(
        blogtaskData.title, 
        blogtaskData.description, 
        blogtaskData.hoursEstimated, 
        blogtaskData.completed, 
        blogtaskData.comments);
        res.json(newTask); 
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

  router.put("/:id", async (req, res) => {
    const updatedData = req.body; 
    try {
      await taskData.getTask(req.params.id);
    } catch (e) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
  
    try {
      const updatedTask = await taskData.updateTask(req.params.id, updatedData); 
      res.json(updatedTask);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

  router.patch("/:id", async (req, res) => {
    const updatedData = req.body;
    try {
      await taskData.getTask(req.params.id);
    } catch (e) {
      res.status(404).json({ error: "task not found" });
    }
  
    try {
      const updatedTask = await taskData.updateTask(req.params.id, updatedData);
      res.json(updatedTask);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });
  

  // routes for comments
  router.post("/:id/comments", async (req, res) => {
    
    const blogPostData = req.body;
    const taskId = req.params.id;
    try {
      const newPost = await taskData.addCommentToTask(
        taskId,
        blogPostData.comments.name,
        blogPostData.comments.comment
      );
      res.json(newPost);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

  router.delete("/:taskId/:commentId", async (req, res) => {
    
     try {
           await taskData.getTask(req.params.taskId);
        } catch (e) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    try {
      const remove = await taskData.removeCommentFromTask(
        req.params.taskId,
        req.params.commentId);
      res.json(remove);
    } catch (e) {
      res.status(500).json({ error: e });
      return;
    }
  });

  module.exports = router;