import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable, Image, ScrollView, Linking } from 'react-native';
import { useState } from 'react';
import { getRss } from './components/GetRss';
import { format } from 'date-fns';
import { styles } from './styles/style';
import { saveNews } from './components/SaveNews';
import { getNews } from './components/GetNews';
import { temp_news } from './types/temp_news';

const dir = require('./assets/icon.png');

//colocar o link do rss no input e clicar em salvar para guardar os dados, depois pode colocar qualquer coisa para pesquisar, a string é livre
export default function App() {
  const [text, onChangeText] = useState('');
  const [news, setNews] = useState<temp_news[]>();

  //guarda as noticias do rss no banco de dados
  const guardarDados = async () => {
    if (text) {
      try {
        const data = await getRss(text);
        saveNews(data);
        alert('Dados salvos com sucesso!')
      } catch (e) {
        alert('Insira um link válido!')
      }
    }else{
      alert("Insira um link!")
    }
  };

  //pega os dados do banco de dados
  const pegarDados = async () => {
    if (text) {
      getNews(text)
      .then(data => {
        if(data) {
          setNews(null);
          setNews(data);
          alert("Dados recebidos!")
        }else{
          alert("Sem dados recebidos!")
        }
      })
      .catch(e => {
        console.error('Erro ao pegar noticias: ', e)
      });
    }else{
      alert("Insira um link!")
    }
  };

  return (
    <ScrollView style={{paddingTop:15}}>
      <View style={styles.view1}>
        <TextInput style={styles.input} value={text || ''} placeholder="Link rss(salvar) ou nome da universidade(pesquisar)" onChangeText={onChangeText} />
      </View>

      <View style={styles.view2}>
        <Pressable onPress={pegarDados} style={styles.press}><Text style={{ color: '#fff', textAlign: 'center' }}>Pesquisar</Text></Pressable>
        <Pressable onPress={guardarDados} style={styles.press}><Text style={{ color: '#fff', textAlign: 'center' }}>Salvar</Text></Pressable>
        <Pressable onPress={() => setNews(null)} style={styles.press}><Text style={{ color: '#fff', textAlign: 'center' }}>Limpar Notícias</Text></Pressable>
        <Pressable onPress={() => onChangeText('')} style={styles.press}><Text style={{ color: '#fff', textAlign: 'center' }}>Limpar Campo</Text></Pressable>
      </View>

      {news?.map((t: any) => (
        <Pressable key={t?.id || 'teste'} onPress={() =>{Linking.openURL(t.link)}}>
        <View style={styles.viewCard}>
          <View style={styles.card}>
            {t.image != '' ? (<Image source={{ uri: t.image }} style={styles.imageCard}/>) : (<Text>{t.image}</Text>)}
            <Text style={styles.title}>{t.title}</Text>
            <View style={styles.data}>
            <Text style={styles.text}>{t.description || ''}</Text>
            <Text style={styles.text}>Publicado em: {t.created ? format(new Date(t.created), 'dd/MM/yyyy HH:mm') : ''}</Text>
            <Text style={styles.text}>Por: {t.author || ''}</Text>
            <Text style={styles.text}>Link: {t.link || ''}</Text>
            <Text style={styles.text}>ID: {t.id}</Text>
            </View>
          </View>
        </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}