const { MongoClient } = require("mongodb");
const {
  createListing,
  createMultipleListings,
  findOneListingByName,
} = require("./functions");

async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(
  client,
  {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER,
  } = {}
) {
  const cursor = client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find({
      bedrooms: { $gte: minimumNumberOfBedrooms },
      bathrooms: { $gte: minimumNumberOfBathrooms },
    })
    .sort({ last_review: -1 })
    .limit(maximumNumberOfResults);

  const results = await cursor.toArray();

  if (results.length > 0) {
    console.log(
      `Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`
    );
    results.forEach((result, i) => {
      date = new Date(result.last_review).toDateString();

      console.log();
      console.log(`${i + 1}. name: ${result.name}`);
      console.log(` _id: ${result._id}`);
      console.log(` bedrooms: ${result.bedrooms}`);
      console.log(` bathrooms: ${result.bathrooms}`);
      console.log(
        ` most recent review date: ${new Date(
          result.last_review
        ).toDateString()}`
      );
    });
  } else {
    console.log(
      `No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`
    );
  }
}

async function updateListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne({ name: nameOfListing }, { $set: updatedListing });

  console.log(result);
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function main() {
  const uri =
    "mongodb+srv://admin:@cluster0.v2jnc.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    // await createListing(client, {
    //   name: "Lovely loft 2",
    //   summary: "A charming loft in Paris",
    //   bedrooms: 1,
    //   bathrooms: 1,
    // });
    await createMultipleListings(client, [
      {
        name: "Infinite Views 4",
        summary: "Modern home with infinite views from the infinity pool",
        property_type: "House",
        bedrooms: 5,
        bathrooms: 4.5,
        beds: 5,
      },
      {
        name: "Private room in London 4",
        property_type: "Apartment",
        bedrooms: 1,
        bathrooms: 1,
      },
      {
        name: "Beautiful Beach House 4",
        summary:
          "Enjoy relaxed beach living in this house with a private beach",
        bedrooms: 4,
        bathrooms: 2.5,
        beds: 7,
        last_review: new Date(),
      },
    ]);
    // await findOneListingByName(client, "Infinite Views 3");
    // await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    //   minimumNumberOfBedrooms: 4,
    //   minimumNumberOfBathrooms: 2,
    //   maximumNumberOfResults: 5,
    // });
    // await updateListingByName(client, "Infinite Views 3", {
    //   bedrooms: 6,
    //   beds: 8,
    // });
  } finally {
    await client.close();
  }
}

main().catch(console.error);
