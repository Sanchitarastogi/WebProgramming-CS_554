import * as express from "express";
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { Tasks } from './taskController';

// const app = express();
// app.use(cors());

var totalNumberOfRequests: number = 0;
var pathsAccessed: object = {};

class App {
  public app: express.Application;
  public taskRoutes: Tasks = new Tasks();

  constructor() {
    this.app = express();
    this.config();
    this.taskRoutes.routes(this.app);
  }
  Logger = (req: express.Request, res: express.Response, next: Function) => {
    totalNumberOfRequests++;
    var urlCount = 1;
    console.log("**************************************************** Logger 1 ******************************************************");
    console.log("Request Type:", req.method);
    console.log("Request URL:", + req.protocol + '://' + req.get('host') + req.originalUrl);
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
  }
  private config(): void {

    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    this.app.use(cors());
    this.app.use(this.Logger);
   
  }
}

export default new App().app;
