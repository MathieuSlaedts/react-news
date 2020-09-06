import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Articles from "./components/Articles";

const App = () => {

  // Get datas from API
  const fetchArticlesFromApi = async () => {
//FROM API
    const sources = 'https://newsapi.org/v2/sources';
    const topHeadlines = 'https://newsapi.org/v2/everything&language=en'
    try {
      const resp = await Axios.get(sources, {
        headers: { 'Authorization': '0d4d1219b3c94e5d8d7082de4a4c4531'}
      });
      console.log(resp.data);
      return resp.data;
    } catch (err) { console.error(err); }
  };

  const updateLocalStorage = (datas) => {
    window.localStorage.setItem( "newAppDatas", JSON.stringify(datas) );
    //window.localStorage.setItem( "newAppTime", JSON.stringify(Date.now()) );
  };

  // Get articles from Local Storage
  const fetchArticlesFromLocalStorage = () => {
    //console.log("from Storage");
    const datas = JSON.parse(
      window.localStorage.getItem("newAppDatas")
    );
    return datas;
  };


  const[articles, setArticles] = useState([]);

  //

  useEffect( () => {

   const fetchData = async () => {
      let datas = fetchArticlesFromLocalStorage();
      if( datas !== null ) {
        console.log("?????");
        datas = await fetchArticlesFromApi();
        updateLocalStorage(datas);
      }
      setArticles([...datas.sources]);
    }
    fetchData();
  }, []);

  //setTimeout(() => console.log("articles", articles),2000);
  return (
    <div className="App">
      <p>React</p>
      <Articles articles={articles} />
    </div>
  );
}

export default App;
