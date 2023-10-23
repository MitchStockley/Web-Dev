/* This Mongoose Model represents tutorials
 collection in MongoDB database. These fields will be generated automatically
  for each Tutorial document: _id, title, 
description, published, createdAt, updatedAt, __v.*/

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
    },
    { timestamps: true }
    //adds createdAt and updatedAt fields to the documents
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};