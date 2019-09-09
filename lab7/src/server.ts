import  app  from './app';
import * as http from 'http';
import { MongoHelper } from './mongoHelper'
const port = 3000;
const server = http.createServer(app);
server.listen(port)
server.on('listening', async () => {
    console.log(`listening to port ${port}`);
    try {
        await MongoHelper.connect('mongodb://127.0.0.1:27017');
        console.log("Connected to Mongo");
    } catch (err) {
        console.log(err);
    }
});