import mongoose from "mongoose";

const linkSchema = mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Link = mongoose.models.Link || mongoose.model("Link", linkSchema);
export default Link;
