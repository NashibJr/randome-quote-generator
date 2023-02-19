import React, { Component } from "react";
import axios from "axios";

export default class ShowQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "Click the New Quote button to genrate the quote",
      author: "---Authr---",
      client: axios.create({
        baseURL: "http://api.quotable.io/random",
      }),
      error: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = async () => {
    try {
      const response = await this.state.client.get();
      const data = response.data;
      this.setState({
        quote: data.content,
        author: data.author,
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
      return this.state.error;
    }
  };
  render() {
    return (
      <div className="card">
        <div className="content">
          <div className="content-width">
            <h1>Random quote generator</h1>
            <button type="button" onClick={this.handleClick}>
              New Quote
            </button>
          </div>
          <div className="content-width">
            <q>{this.state.quote}</q>
            <p>
              <em>---{this.state.author}---</em>
            </p>
            <h2>{this.state.error}</h2>
          </div>
        </div>
      </div>
    );
  }
}
