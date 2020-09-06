import React, { useState, useEffect, useContext, useRef } from 'react';
import Axios from 'axios';
import CountryContext from "../contexts/CountryContext.js"
import SourceContext from "../contexts/SourceContext.js"

const Sources = (props) => {

    const fetchDatasFromLocalStorage = () => {
        const datas = window.localStorage.getItem("newsAppSources");
        return datas !== undefined ? JSON.parse(datas) : null;
    };

    const fetchDatasFromApi = async () => {
        console.log("from API");
        const url = 'https://newsapi.org/v2/sources';
        try {
            const resp = await Axios.get( url, {
                headers: { 'Authorization': '0d4d1219b3c94e5d8d7082de4a4c4531' }
            });
            return resp.data;
        } catch (err) { console.error(err); }
    };

    const StoreDatasInLocalStorage = (datas) => {
      window.localStorage.setItem( "newsAppSources", JSON.stringify(datas) );
    };

    const updateDatasInStage = async () => {
        let newDatas = fetchDatasFromLocalStorage();
        if( newDatas === null ) {
            newDatas = await fetchDatasFromApi();
          StoreDatasInLocalStorage(newDatas);
        }
        setDatas([...newDatas.sources]);
    };

    const updateSource = (e) => {
        e.preventDefault();
        setSource(sourceFld.current.value);
    };

    const [datas, setDatas] = useState([]);
    
    const country = useContext(CountryContext);
    // eslint-disable-next-line
    const { source, setSource } = useContext(SourceContext);

    const sourceFld = useRef();

    useEffect( () => {
        updateDatasInStage();
    // eslint-disable-next-line
    }, []);

    //setTimeout(() => console.log("datas:", datas),2000);
    //console.log(source);
    return(
        <select onChange={updateSource} ref={sourceFld} value={source}>
            <option value="">Choose a source</option>
            {datas.map(el => el.country === country && 
                <option key={el.id} value={el.id}>
                    {el.country} / {el.name}
                </option>
            )}
        </select>
    );
}

export default Sources;