const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://revi:forinipurposeonly@atlascluster.mjqn2av.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensure that the client will close when you finish/error
    // Note: You may choose to handle this differently based on your application requirements
    await client.close();
  }
}

// Export the MongoDB client instance
module.exports = { client, run };
