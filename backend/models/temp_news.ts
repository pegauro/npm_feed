import mongoose from "mongoose";

const temp_news = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    image: String,
    link: String,
    category: String,
    content: String,
    author: String,
    created: Date,
    university: String
});

const temp_news_model = mongoose.model("temp_news", temp_news);
export {temp_news_model};