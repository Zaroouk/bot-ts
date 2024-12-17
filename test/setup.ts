// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');
// const app = require('../src/app'); // Path to your Express app

// let mongoServer;
// let server;

// beforeAll(async () => {
//     mongoServer = await MongoMemoryServer.create();
//     const uri = mongoServer.getUri();

//     // Connect mongoose to the in-memory MongoDB
//     await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     // Start your Express server
//     server = app.listen(4000);
// });

// afterAll(async () => {
//     await mongoose.connection.close();
//     await mongoServer.stop();
//     server.close();
// });
