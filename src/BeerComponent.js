// import React from "react"
import { Component } from "react";

// import "../App.css";
// import { nanoid } from "nanoid";

export default class Beers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: [],
      likes: {},
    };
  }
  componentDidMount() {
    console.log("component mounted");
    fetch("https://api.punkapi.com/v2/beers")
      .then((response) => response.json())
      .then((data) => {
        // Initialize likes for each beer
        const initialLikes = {};
        data.forEach((beer) => {
          initialLikes[beer.id] = 0;
        });

        this.setState({
          beers: [...data],
          likes: initialLikes,
        });
      });
  }

  handleIncrement = (id) => {
    console.log(id);
    this.setState((prevState) => {
      return {
        likes: {
          ...prevState.likes,
          [id]: prevState.likes[id] + 1,
        },
      };
    });
  };
  render() {
    console.log("render");
    return (
      <div>
        <h1>Beers</h1>
        <ul className="beers-list">
          {this.state.beers.map((beer) => {
            return (
              <li key={beer.id}>
                {beer.name}: {beer.description}
                <br />
                {beer.id}
                <button onClick={() => this.handleIncrement(beer.id)}>
                  like
                </button>
                {this.state.likes[beer.id]} {/* Display the likes count */}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
