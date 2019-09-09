const uuid = require("uuid");
import { MongoHelper } from './mongoHelper';
const getCollection = () => {
    return MongoHelper.client.db("Rastogi_sanchita_CS554-lab7").collection('task');
}

async function getTask(id) {
    if (!id) throw "You must provide an id";

    const taskCollection = await getCollection();
    const unique_id = await taskCollection.findOne({ id: id });
    if (unique_id == null) throw "No task with that id";
    return unique_id;
}

async function getAllTasks() {
    const taskCollection = await getCollection();
    const item = await taskCollection.find({}).toArray();
    return item;
}

async function createTask(title, description, hoursEstimated, completed, comments) {

    if (typeof title !== 'string' || title == '' || title == undefined) throw "Provide Title";
    if (typeof description !== 'string' || description == '' || description == undefined) throw "Provide description ";
    if (typeof hoursEstimated !== 'number' || hoursEstimated == undefined || hoursEstimated <= 0) throw "Provide hoursEstimated ";
    if (typeof completed !== 'boolean' || completed == undefined) throw "Completed must be boolean. ";
    var comments_S = [];
    if (!Array.isArray(comments) && ((typeof comments == "object") && (comments != ""))) {
        var temp = comments;
        comments = [];
        comments[0] = temp;
        comments_S = comments;
    } else if (!Array.isArray(comments)) throw "Comments Needed";
    else if ((Array.isArray(comments) && comments.length > 0)) {
        for (var i = 0; i < comments.length; i++) {
            if (typeof comments[i].name !== "string" || comments[i].name == '' || comments[i].name == undefined) throw "Invalid comments";
            else if (typeof comments[i].comment !== "string" || comments[i].comment == '' || comments[i].comment == undefined) throw "Invalid comments";
            else {
                comments_S[i] = {
                    id: uuid(),
                    name: comments[i].name,
                    comment: comments[i].comment
                }
            }
        }
    } else if ((Array.isArray(comments) && comments.length == 0)) {
        comments_S = [];
    } else throw "Invalid comments";
    const taskCollection = getCollection();
    let newTask = {
        id: uuid(),
        title: title,
        description: description,
        hoursEstimated: hoursEstimated,
        completed: completed,
        comments: comments_S
    };

    const newInsert = await taskCollection.insertOne(newTask);
    const newId = newInsert.ops[0].id;
    return getTask(newId);
};

async function updateTask(id, updatedTask) {

    if (!id) throw "You must provide an id";

    const taskCollection = await getCollection();

    /* Updating task*/
    var updatedTaskData = await taskCollection.findOne({ id: id });
    if (updatedTask.title) {
        if (typeof updatedTask.title !== "string" || updatedTask.title == "") throw "No title provided ";
        updatedTaskData.title = updatedTask.title;
    }
    if (updatedTask.description) {
        if (typeof updatedTask.description !== "string" || updatedTask.description == "") throw "No description provided ";
        updatedTaskData.description = updatedTask.description;
    }
    if (updatedTask.hoursEstimated) {
        if (typeof updatedTask.hoursEstimated !== "number" || updatedTask.hoursEstimated <= 0) throw "No estimated time provided ";
        updatedTaskData.hoursEstimated = updatedTask.hoursEstimated;
    }
    if (updatedTask.completed != undefined) {
        if (typeof updatedTask.completed !== "boolean") throw "No status provided ";
        updatedTaskData.completed = updatedTask.completed;
    }
    if (updatedTask.comments) {
        if (!Array.isArray(updatedTask.comments) && ((typeof updatedTask.comments == "object") && (updatedTask.comments != ""))) {
            var temp = updatedTask.comments;
            updatedTask.comments = [];
            updatedTask.comments[0] = temp;
            if (typeof updatedTask.comments[0].name !== "string" || updatedTask.comments[0].name == '' || updatedTask.comments[0].name == undefined) throw "Author is invalid for one or more comments";
            else if (typeof updatedTask.comments[0].comment !== "string" || updatedTask.comments[0].comment == '' || updatedTask.comments[0].comment == undefined) throw "Comment is invalid for one or more comments";
            else {
                updatedTaskData.comments = [];
                updatedTaskData.comments[0] = {
                    id: uuid(),
                    name: updatedTask.comments[0].name,
                    comment: updatedTask.comments[0].comment
                }
            }
        } else if (!updatedTask.comments) throw "Provide Comments";
        else if ((Array.isArray(updatedTask.comments) && updatedTask.comments.length > 0)) {
            updatedTaskData.comments = [];
            for (var i = 0; i < updatedTask.comments.length; i++) {
                if (typeof updatedTask.comments[i].name !== "string" || updatedTask.comments[i].name == '' || updatedTask.comments[i].name == undefined) throw "Invalid comments";
                else if (typeof updatedTask.comments[i].comment !== "string" || updatedTask.comments[i].comment == '' || updatedTask.comments[i].comment == undefined) throw "Invalid comments";
                else {
                    updatedTaskData.comments[i] = {
                        id: uuid(),
                        name: updatedTask.comments[i].name,
                        comment: updatedTask.comments[i].comment
                    }
                }
            }
        } else throw "Provide proper comments";
        var notComments = await this.getTask(id);
        var commentData = notComments.comments.concat(updatedTaskData.comments);
        updatedTaskData.comments = [];
        updatedTaskData.comments = commentData;
    }
    if (!(Object.keys(updatedTaskData).length === 0 && updatedTaskData.constructor === Object)) {

        let updateCommand = {
            $set: updatedTaskData
        };
        const query = {
            id: id
        };
        const updateInfo = await taskCollection.updateOne(query, updateCommand);

        if (updateInfo.modifiedCount === 0) {
            throw "Not updated successfully";
        }
        return await getTask(id);
    }
}

async function addCommentToTask(taskId, name, comment) {
    if (!taskId) throw "You must provide a task id";
    if (typeof name !== "string") throw "You must provide a name";
    if (typeof comment !== "string") throw "No comment provided";
    const taskCollection = await getCollection();
    const commentCheck = 
             {
                 id:uuid(),
                name: name,
                comment: comment
            };

            const addComment = await taskCollection.updateOne(
                { id: taskId }, 
                {$push: 
                    {comments: commentCheck}
                });
                const variable = await this.getTask(taskId);
            return  variable;
       }



async function removeCommentFromTask(taskId, commentId) {
    if (!taskId) throw "You must provide a task id";
    if (!commentId) throw "You must provide a comment id";

    const taskCollection = await getCollection();
    if (taskId && await taskCollection.findOne({ "id": taskId })) {
        var task = await this.getTask(taskId);
        if (commentId && task.comments.find(obj => {
            return obj.id === commentId
        })) {

            taskCollection.update({}, {
                $pull: {
                    "comments": {
                        "id": commentId
                    }
                }
            }, {
                    multi: true
                });
        }
    }
}


async function removeTask(id) {
    if (!id) throw "You must provide an id";

    const taskCollection = await getCollection();

    const deletionInfo = await taskCollection.deleteOne({ id: id });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete task with id of ${id}`;

    }

    return deletionInfo;
}


module.exports = { createTask, getAllTasks, getTask, updateTask, removeTask, addCommentToTask, removeCommentFromTask }