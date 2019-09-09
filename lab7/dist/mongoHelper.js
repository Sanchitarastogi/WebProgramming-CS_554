"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
class MongoHelper {
    static connect(url) {
        return new Promise((resolve, reject) => {
            mongodb.MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    reject(err);
                }
                else {
                    MongoHelper.client = client;
                    resolve(client);
                }
            });
        });
    }
}
exports.MongoHelper = MongoHelper;
