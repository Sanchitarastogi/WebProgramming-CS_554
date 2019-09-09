const mongoCollections = require("../config/mongoCollections");
const uuidv3 = require("uuid/v4");
const items1 = mongoCollections.todotask;

async function getTask(id) {
    if (!id) throw "You must provide an id";

    const taskCollection = await items1();
    const unique_id = await taskCollection.findOne({ _id: id });
    
    if (unique_id == null) throw "No task with that id";
    return unique_id;
}

async function getAllTasks() {
    const taskCollection = await items1();
    const item = await taskCollection.find({}).toArray();
    return item;
}

async function createTask(title, description, hoursEstimated, completed, comments) {

    if (typeof title !== 'string'|| title == '' || title == undefined) throw "No title provided";
    if (typeof description !== 'string'|| description == '' || description == undefined) throw "No description provided";
    if (typeof hoursEstimated !== 'number' || hoursEstimated == undefined || hoursEstimated <= 0) throw "No hoursEstimated provided";
    if (typeof completed !== 'boolean'|| completed == undefined) throw "Completed must be boolean. ";
    if (typeof comments !== 'object') throw "Comments must be object. ";
    

    const taskCollection = await items1();

    let newList = {
        _id: uuidv3(),
        title: title,
        description: description,
        hoursEstimated: hoursEstimated,
        completed: completed,
        comments : comments
    };

    const insertTask = await taskCollection.insertOne(newList);
    
    if (insertTask.insertedCount === 0) throw "Could not add task";
    const newId = insertTask.insertedId;
    return getTask(newId);  
 
};

async function updateTask(id, updatedTask) {

    if (!id) throw "You must provide an id";

    const taskCollection = await items1();

    /* Updating task*/
    const updatedTaskData = {};

    if (updatedTask.title) {
        updatedTaskData.title = updatedTask.title;
      }
  
      if (updatedTask.description) {
        updatedTaskData.description = updatedTask.description;
      }
  
      if (updatedTask.hoursEstimated) {
        updatedTaskData.hoursEstimated = updatedTask.hoursEstimated;
      }

      if (updatedTask.completed) {
        updatedTaskData.completed = updatedTask.completed;
      }

      if (updatedTask.comments){
          throw "Comments can not be updated here";
          
      }

      let updateCommand = {
        $set: updatedTaskData
      }

      const query = {
        _id: id
      };

      const updateInfo = await taskCollection.updateOne(query, updateCommand);
      
      if (updateInfo.modifiedCount === 0) {
        throw "could not update task successfully";
    }
      return await getTask(id);
    }

 async function addCommentToTask(taskId, name, comment)
 {
    if (!taskId) throw "You must provide a task id";
    if (typeof name !== "string") throw "You must provide a name";
    if (typeof comment !== "string") throw "No comment provided";
    
    const taskCollection = await items1(); 
           
    const commentCheck = 
             {
                 _id:uuidv3(),
                name: name,
                comment: comment
            };

            const addComment = await taskCollection.updateOne(
                { _id: taskId }, 
                {$push: 
                    {comments: commentCheck}
                });
                const variable = await this.getTask(taskId);
            return  variable;
       }
async function removeCommentFromTask(taskId, commentId)
{
    if (!taskId) throw "You must provide an task id";
    if (!commentId) throw "You must provide an comment id";

    const taskCollection = await items1();
    const removeComment = await taskCollection.updateOne(
        {_id: taskId},
          { 
            $pull: {
                    comments:{
                               _id:commentId,
                    }
                }
            }
    );
        const rem = await this.getTask(taskId);
    return rem;
}

async function removeTask(id) {
    if (!id) throw "You must provide an id";

    const taskCollection = await items1();

    const deletionInfo = await taskCollection.removeOne({ id: id });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete task with id of ${id}`;

    }

    return deletionInfo;
}


module.exports = { createTask, getAllTasks, getTask, updateTask, removeTask, addCommentToTask, removeCommentFromTask}