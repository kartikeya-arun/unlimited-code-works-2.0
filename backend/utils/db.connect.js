const { MongoClient, ServerApiVersion } = require("mongodb");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const uri = process.env.DB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

console.log("69: DB URL from environment->", uri);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    const data = await client
      .db("portfolio-api")
      .collection("projects")
      .find()
      .toArray();
    return data;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = run;
