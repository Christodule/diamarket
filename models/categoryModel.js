import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    // unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  
  _id: mongoose.Schema.Types.ObjectId, 
});

export default mongoose.model("Category", categorySchema);
