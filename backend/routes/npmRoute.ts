import Router from 'express';
import { parse } from 'rss-to-json';
import { temp_news_model as temp_news } from '../models/temp_news';

const router = Router();

router.get("/npm/:text", (req, res) => {
    parse(req.params.text)
        .then(rss => {
            res.json(rss);
        })
});

router.get("/:text", (req, res) => {
    let decode = decodeURIComponent(req.params.text);
    let regex = new RegExp(decode);

    temp_news.find({ university: { $regex: regex } })
        .then(news => news.length != 0 ? (res.json(news)):(res.json(null)))
        .catch(e => res.json({ error: "Not possible to open! " + e }))
});

router.post("/", (req, res) => {
    temp_news.create(req.body)
        .then(news => res.json({ msg: "news added!" }))
        .catch(e => res.json({ error: "Not possible to add! " + e }))
});

export { router };