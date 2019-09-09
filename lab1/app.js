const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const configRoutes = require("./routes");

let totalNumberOfRequests = 0;
const pathsAccessed = {};
app.use( function (req, res, next) {
  totalNumberOfRequests ++;
  var urlCount =1;
  console.log("**************************************************** Logger 1 ******************************************************");
  console.log("Request Type:", req.method,); 
  console.log("Request URL:", + req.protocol + '://' + req.get('host') + req.originalUrl);  
  console.log(" ");
  console.log("**************************************************** Logger 2 ******************************************************");
  console.log("Total number of request:" + totalNumberOfRequests);
  console.log(" ");
  
  if (pathsAccessed[req.protocol + '://' + req.get('host') + req.originalUrl] === undefined){
    pathsAccessed[req.protocol + '://' + req.get('host') + req.originalUrl] = 1;
  }
  else{
    pathsAccessed[req.protocol + '://' + req.get('host') + req.originalUrl]++;
  }
 
  for(var key in pathsAccessed){
      if(pathsAccessed.hasOwnProperty(key))
      {
        console.log("URL: " + key, "Count: " + pathsAccessed[key]);
      }
  }
  console.log("**************************************************** Logger 2 ******************************************************");

  next();
} 
);
app.use(bodyParser.json());
configRoutes(app);



app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});


