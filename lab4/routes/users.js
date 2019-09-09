const express = require("express");
const bluebird = require("bluebird");
const router = express.Router();  
const data = require('../data');     
const redis = require("redis");   
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype); 
bluebird.promisifyAll(redis.Multi.prototype);


router.get('/history', async(req, res) => {
  let history =[];
  let cachedData;
  if(await client.llenAsync('Visitor')<19){
  cachedData = await client.llenAsync('Visitor');
    client.llen
}else{
    cachedData = 19;
}
history = await client.lrangeAsync('Visitor',0,cachedData);
for(var i=0;i<history.length;i++){
    history[i] = JSON.parse(history[i]);
}
res.status(200).json(history);
});


router.get('/:id', async(req, res) =>{
let userExists = await client.existsAsync(req.params.id);
console.log(userExists);
if(userExists) {
    let cacheDataUser = await client.getAsync(req.params.id);
    await client.lpushAsync("Visitor", cacheDataUser);
    res.json(JSON.parse(cacheDataUser));
}
else {
    try{
        let user = await data.getById(req.params.id);
        await client.lpushAsync("Visitor", JSON.stringify(user));
        res.json(user);
    }
    catch(error){
        res.status(404).json({error: "user not found"});
    }
}
});

module.exports = router;    

