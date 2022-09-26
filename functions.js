async function createListing(client, newListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newListing);
  console.log(
    `New Listing created with the following id: ${result.insertedId}`
  );
}

module.exports = {
  createListing,
};
