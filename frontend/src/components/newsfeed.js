import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './newsfeed.css'

function NewsFeed() {
  const [news, setNews] = useState([]);
  const [showNews, setShowNews] = useState(false);
//  useEffect(() => {
//     setShowNews(false); // set the showNews state to false while the news is updating
//     axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=7b7e138524fd43fbaa90e29e2318674f&pageSize=8')
//       .then(response => {
//         setNews(response.data.articles);
//         setShowNews(true); // set the showNews state to true when the news update is completed
//       })
//       .catch(error => console.log(error));
//   }, []);
useEffect(() => {
  axios.get('http://localhost:6080/fetchallfeed')
  .then((response) => {
    console.log("res==========>",response.data.data)
    setNews(response.data.data)
    console.log("News====>",news)
    setShowNews(true)
  }).catch((error) => {
    console.log("Error=--->",error)
  })
},[])
return (
  <div>
          <div  style={{marginLeft:'0px'}}>
                  <div className="card">
                          <div className="card-header">
                            <h5 style={{color: "red"}} className="card-title animated">Latest News!!!</h5>
                          </div>
                          <div className="card-body">
                                  {showNews ? (
                                    <ul className="list-group">
                                      {news.map(article => (
                                        <li key={article._id} className="list-group-item">
                                          <a href={article.newsfeedurl} target="_blank" rel="noopener noreferrer">{article.title}</a>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <h6><l>Updating news...Wait</l> </h6>
                                  )}
                          </div>
                  </div>
          </div>
  </div>
);
}

export default NewsFeed;