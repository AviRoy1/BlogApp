import mongoose, { Document } from "mongoose";

export interface IArticle extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  title: String;
  description: String;
  author : mongoose.Schema.Types.ObjectId;
}

const articleSchema = new mongoose.Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }
  }
);


const Article = mongoose.model<IArticle>(
  "Article",
  articleSchema
);

export default Article;