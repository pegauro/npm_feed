import axios from "axios";
import { temp_news } from "../types/temp_news";
import { removeHtmlTags } from "./removeHtmlTags";
import {limitString} from './limitString';

export const saveNews = (news: any) => {

    const temp_n: temp_news[] = [];

    news.items.map(n => {
        temp_n.push({
            id: n.id,
            title: n.title,
            description: limitString(removeHtmlTags(n.description), 100),
            image: n.media.thumbnail?.url || '',
            link: n.link,
            category: n.cathegory || '',
            content: removeHtmlTags(n.content) || '',
            author: n.author,
            created: n.created,
            university: news.link
        });
    });

    temp_n.map(n => {
        axios
            .post('http://localhost:3000/', n)
            .then(res => {
                console.log("Notícias Salvas!")
            })
            .catch(e => {
                console.log("Erro ao salvar!")
            })
    });

};