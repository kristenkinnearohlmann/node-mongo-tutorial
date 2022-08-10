const { MongoClient } = require("mongodb");

async function createListing(client, newListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newListing);
  console.log(
    `New Listing created with the following id: ${result.insertedId}`
  );
}

async function main() {
  const uri =
    "mongodb+srv://admin:nPxSHbXraKBy8cc2@cluster0.v2jnc.mongodb.net/default?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await createListing(client, {
      name: "Lovely loft",
      summary: "A charming loft in Paris",
      bedrooms: 1,
      bathrooms: 1,
    });
  } finally {
    await client.close();
  }
}

main().catch(console.error);
