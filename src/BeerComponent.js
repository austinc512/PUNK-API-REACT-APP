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
      disabled: false,
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
    if (this.state.likes[id] > 0) {
      this.setState((prevState) => {
        return {
          likes: {
            ...prevState.likes,
            [id]: prevState.likes[id] - 1,
          },
        };
      });

      return;
    } else if (this.state.likes[id] === 0) {
      this.setState((prevState) => {
        return {
          likes: {
            ...prevState.likes,
            [id]: prevState.likes[id] + 1,
          },
          disabled: true,
        };
      });
    }
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
                <h2>{beer.name}</h2>
                {beer.description}
                <img src={beer.image_url} alt={beer.name} />
                <br />
                {/* {beer.id} */}
                <button
                  onClick={() => this.handleIncrement(beer.id)}
                  className={
                    this.state.likes[beer.id] > 0 ? `liked` : `unliked`
                  }
                >
                  like
                </button>
                Like Counter: {this.state.likes[beer.id]}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
