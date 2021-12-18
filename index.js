const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://portfolio:vQVr8gYFJUuzUfDl@cluster0.weuxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db('portfolioDB');
        const projectsCollection = database.collection('projects');
        console.log('connected to the db');
        // const options = { ordered: true };
        // const result = await projectsCollection.insertMany(myProjects, options);
        // console.log(`${result.insertedCount} documents were inserted`);
        app.get('/projects', async (req, res) => {
            const cursor = projectsCollection.find({});
            const projects = await cursor.toArray();
            res.json(projects);
        });
    } finally {
        // Ensures that the client will close when you finish/error
        //   await client.close();
    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('hellow world');
})
app.listen(port, () => {
    console.log('listennin from port', port);
})