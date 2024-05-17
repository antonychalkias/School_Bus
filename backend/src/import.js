const { MongoClient } = require('mongodb');
const fs = require('fs');

async function main() {
    const uri = "mongodb://localhost:27017"; // Change to your MongoDB URI if necessary
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('SchoolBus'); // Change to your database name

        // Read the JSON file
        const data = JSON.parse(fs.readFileSync('mydb.json', 'utf8'));

        // Insert data into respective collections
        for (const collectionName in data) {
            if (data.hasOwnProperty(collectionName)) {
                const collection = database.collection(collectionName);
                await collection.insertMany(data[collectionName]);
                console.log(`Inserted data into ${collectionName}`);
            }
        }

        console.log('Data imported successfully.');
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
