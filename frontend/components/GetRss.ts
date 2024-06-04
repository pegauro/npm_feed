import axios from 'axios';

export const getRss = async (text: string) => {
    try {
        text = encodeURIComponent(text);
        const res = await axios.get(`http://localhost:3000/npm/${text}`)
        const rss = res.data;
        return rss;
    }catch(e) {
        alert('insira um link válido!')
        return null;
    };
};