const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://admin:nPxSHbXraKBy8cc2@cluster0.v2jnc.mongodb.net/default?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
  } finally {
    await client.close();
  }
}

main().catch(console.error);
