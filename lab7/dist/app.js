"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const taskController_1 = require("./taskController");
// const app = express();
// app.use(cors());
var totalNumberOfRequests = 0;
var pathsAccessed = {};
class App {
    constructor() {
        this.taskRoutes = new taskController_1.Tasks();
        this.Logger = (req, res, next) => {
            totalNumberOfRequests++;
            var urlCount = 1;
            console.log("**************************************************** Logger 1 ******************************************************");
            console.log("Request Type:", req.method);
            console.log("Request URL:", +req.protocol + '://' + req.get('host') + req.originalUrl);
            console.log(" ");
            console.log("**************************************************** Logger 2 ******************************************************");
            console.log("Total number of request:" + totalNumberOfRequests);
            console.log(" ");
            if (pathsAccessed[req.protocol + '://' + req.get('host') + req.originalUrl] === undefined) {
                pathsAccessed[req.protocol + '://' + req.get('host') + req.originalUrl] = 1;
            }
            else {
                pathsAccessed[req.protocol + '://' + req.get('host') + req.originalUrl]++;
            }
            for (var key in pathsAccessed) {
                if (pathsAccessed.hasOwnProperty(key)) {
                    console.log("URL: " + key, "Count: " + pathsAccessed[key]);
                }
            }
            console.log("**************************************************** Logger 2 ******************************************************");
            next();
        };
        this.app = express();
        this.config();
        this.taskRoutes.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(cors());
        this.app.use(this.Logger);
        //   this.app.use("/api/tasks", Tasks);
        //   this.app.use("*", (req, res) => {
        //     res.sendStatus(404);
        // });
    }
}
exports.default = new App().app;
