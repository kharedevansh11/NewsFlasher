import React from 'react'
import "./style.css"
const NewsItem = (props)=> {
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
           <>
           <a href={newsUrl} style={{textDecoration:'none'}}>
                    <div className="my-3 mx-2" >
                        <div className="card" >
                              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '50%',zIndex:'1'}}> {source} </span>
                            <img src={imageUrl===null ? "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg" : imageUrl} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title" >{title}</h5>
                                <p className="card-text">{description}</p>
                                <p className="card-text" ><small className="text" style={{color:"red"}} >By {author===null?"Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
                                {/* <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a> */}
                                <button type="button" className="btn btn-dark">Read More</button>

                            </div>
                        </div>
                    </div>
           </a>
           </>
        )
     
}

export default NewsItem
