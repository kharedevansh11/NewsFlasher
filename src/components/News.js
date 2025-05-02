import React, {useEffect, useState} from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import "./style.css"
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=bb264b32cf3442c59aaaf44422e95331&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true)

        try {
            let data = await fetch(url);
            props.setProgress(70);
            let parsedData = await data.json();
            console.log("API Response:", parsedData);
            
            if (parsedData.status === "ok") {
                setArticles(parsedData.articles);
                setTotalResults(parsedData.totalResults);
            } else {
                console.error("API Error:", parsedData.message);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
        }
        
        props.setProgress(100);
        setLoading(false);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsFlash`;
        updateNews(); 
    }, [props.category])


    const fetchMoreData = async () => {   
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=bb264b32cf3442c59aaaf44422e95331&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            
            if (parsedData.status === "ok") {
                setArticles(articles.concat(parsedData.articles));
                setTotalResults(parsedData.totalResults);
            } else {
                console.error("API Error:", parsedData.message);
            }
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    };
 
        return (
            <>
                <a className='head' href="/"><h1 className="text-center my-3" style={{ fontFamily:"Times New Roman",textDecoration:'none',color:'black' }}>NewsFlash - Top {capitalizeFirstLetter(props.category)} Headlines</h1></a>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
