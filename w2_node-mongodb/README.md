Node and MongoDB
=======

**Part 1**
- Install and use the Node MongoDB driver
- Interact with the MongoDB database from a Node application

**Part 2**
- Develop a Node module containing some common MongoDB operations
- Use the Node module in your application and communicate with the MongoDB server

**Mongo Useful commands**
```
mongod --dbpath=data
mongo

db
use conFusion
db.help()

db.dishes.insert({ name: "Uthapizza", description: "Test" });
db.dishes.find().pretty();

var id = new ObjectId();
id.getTimestamp();
```
