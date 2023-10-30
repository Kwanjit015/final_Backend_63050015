const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    title: { type: String, required: true },
    expense: { type: String, required: true },
    income: { type: String, required: true },
  },
  {
    collection: "todos",
    timestamps: true,
  }
);

const model = mongoose.model("Todo", schema);

module.exports = model;
