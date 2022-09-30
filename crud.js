const { MongoClient } = require("mongodb");
const {
  createListing,
  createMultipleListings,
  findOneListingByName,
  findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews,
  updateListingByName,
} = require("./functions");

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
    // await createMultipleListings(client, [
    //   {
    //     name: "Infinite Views 4",
    //     summary: "Modern home with infinite views from the infinity pool",
    //     property_type: "House",
    //     bedrooms: 5,
    //     bathrooms: 4.5,
    //     beds: 5,
    //   },
    //   {
    //     name: "Private room in London 4",
    //     property_type: "Apartment",
    //     bedrooms: 1,
    //     bathrooms: 1,
    //   },
    //   {
    //     name: "Beautiful Beach House 4",
    //     summary:
    //       "Enjoy relaxed beach living in this house with a private beach",
    //     bedrooms: 4,
    //     bathrooms: 2.5,
    //     beds: 7,
    //     last_review: new Date(),
    //   },
    // ]);
    // await findOneListingByName(client, "Infinite Views 3");
    // await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    //   minimumNumberOfBedrooms: 4,
    //   minimumNumberOfBathrooms: 2,
    //   maximumNumberOfResults: 5,
    // });
    await updateListingByName(client, "Infinite Views 3", {
      bedrooms: 6, //6
      beds: 8, //8
    });
  } finally {
    await client.close();
  }
}

main().catch(console.error);
