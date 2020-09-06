import React, { useState, useEffect,useContext } from 'react';
import Axios from 'axios';
import Sources from "../components/Sources.js"
import Article from "../components/Article.js"
import SourceContext from "../contexts/SourceContext.js"

const Articles = (props) => {
    const source = useContext(SourceContext).source;

    const [articles, setArticles] = useState([]);

    const fetchDatasFromApi = async (aaa) => {
        console.log("from API");
        const url = 'https://newsapi.org/v2/top-headlines?sources=' + aaa;
        try {
            const resp = await Axios.get( url, {
                headers: { 'Authorization': '0d4d1219b3c94e5d8d7082de4a4c4531' }
            });
            return resp.data;
        } catch (err) { console.error(err); }
    };

    useEffect( () => {
        ( async () => {
            const fromDB = await fetchDatasFromApi(source);
            const newArticles = fromDB.articles;
            setArticles( newArticles);
        })();
        // eslint-disable-next-line
    }, [source]);




    // setTimeout(() => console.log("articles:", articles),2000);
    return(
        <>
            <h1>Route Article {source} {}</h1>
            <Sources />
            <ul>
                {articles.length > 0 && articles.map((el, index) => <li key={index+'_'+el.id}>{el.title}</li>)}
                <Article />
            </ul>
        </>
    );
}

export default Articles;