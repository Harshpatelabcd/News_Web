import React, { Component } from 'react'
//for creating javascript object {{}} is used.
//8f0e8a030b7149cab845ec046d68a5b4
export class NewsItem extends Component {
 
  render() {
    let {title, description, imageurl, newsurl,author,date} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "20rem"}}>
  <img src={!imageurl?"https://www.reuters.com/resizer/DHbZBbXaOeA7hrAw0Zah5pHDmgE=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/LVKL3IR52ZOF3NZ5OBV5A3MT5A.jpg":imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className='card-text'><small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toUTCString()}</small></p>
    <a href={newsurl} target='_black' className="btn btn-primary">Read More</a>
  </div>
     </div>

      </div>
    )
  }
}

export default NewsItem
