import axios from "axios";
import { temp_news } from "../types/temp_news";

export const getNews = (url: string): Promise<temp_news[] | null> => {
    let encoded = encodeURIComponent(url);

    return axios
        .get(`http://localhost:3000/${encoded}`)
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            alert("Sem dados para esse link!")
            return null;
        })
};