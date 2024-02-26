import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        country:'in',
        category:'science'
    }
    static PropsTypes = {
        country:PropTypes.string,
        category:PropTypes.string
    }

    constructor(){
        super();
        console.log("Constructor");
        this.state={
                articles:[],
                loading: false,
                page:1
        }
    }

    async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8f0e8a030b7149cab845ec046d68a5b4&page=1&pageSize=6`;
      this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    }
    //componentDidMount method is used to  we can execute the React code when the component has already been placed in the DOM (Document Object Model). It is used for handling for handling all network requests and setting up subscriptions.

    handleNextClick = async ()=>{
        console.log("next");
        if(!(this.state.page +1 > Math.ceil(this.state.totalResults/6))){
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8f0e8a030b7149cab845ec046d68a5b4&page=${this.state.page - 1}&pageSize=6`;
          this.setState({loading:true});
        
        let data = await fetch(url);
        //await function used to before a call to a function that returns a promise. This makes the code wait at that point until the promise is settled, at which point the fulfilled value of the promise is treated as a return value, or the rejected value is thrown.
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,page: this.state.page+1,
            loading: false})
        
     }}
     //next button click event

    handlePrevClick = async ()=>{
        console.log("Prev");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8f0e8a030b7149cab845ec046d68a5b4&page=${this.state.page - 1}&pageSize=6`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, page: this.state.page-1,
            loading: false }) 
    }
    //prev button click event

  render() {
    return (
      <div className='container my-3'>
        <h2>Top Headlines</h2>
        <div className='text-center my-10 mx-10'>{this.state.loading && <Spinner/>}</div>        
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} />
            </div> 
        }
        )}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/6)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
export default News


