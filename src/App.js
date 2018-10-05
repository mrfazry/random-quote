import React, { Component } from 'react';
import './App.css';
import logo from './twitter.svg';

const quote = [
  ["Apa urusan Anda menanyakan itu? Bukan hak Anda juga bertanya kepada saya." , "Edy Rahmayadi"],
  ["Jangan lupa menu ikan untuk Sahur & Buka Puasa. Makan ikan menjadikan kita sehat, pintar. Tidak makan ikan saya tenggelamkan.", "Susi Pudjiastuti"],
  ["Kenapa kamu tanya begitu? Heh? Kenapa? Sampai tanya begitu? Heh? Siapa yang suruh? Siapa? Heh? Karena hanya ingin tahu saja?", "Soeharto"],
  ["Tidak ada kesalahan yang disebut kesalahan. Kesalahan adalah apa yang jika kita lakukan salah.", "Pevita Pearce"],
  ["Despite the constant negative press covfefe.", "Donald Trump"],
  ["Ya sekarang kan emang anak kos. Sekarang kan rakyat jelata. Makannya sama-sama.", "Setya Novanto"],
  ["Jangan panggil aku anak kecil, Paman. Namaku Shiva.", "Shiva"]
];

class Quote extends Component {
  render() {
    return (
      <div>
        <h2 className="quote">
          {`"${quote[this.props.index][0]}"`}
        </h2>
        <h4 className="author">
          -- {quote[this.props.index][1]}
        </h4>
      </div>
    );
  }
}

class ButtonGroup extends Component {
  generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    //Math.floor(Math.random() * (max - min + 1)) + min;
  }
  handleClick() {
    let randomNumber, randomColor;
    let oldNumber = this.props.oldNumber;
    let test = this.generateRandom(0, quote.length-1);
    let coinToss = this.generateRandom(0, 1);
    if(coinToss > 0.5 || oldNumber === 0)
    //let randomNumber = Math.floor(Math.random() * (quote.length-1));
    if(test === oldNumber) {
      let coinToss = this.generateRandom(0, 1);
      if(coinToss > 0.5 || test === 0) {
        randomNumber = this.generateRandom(oldNumber+1, quote.length-1);
      } else {
        randomNumber = this.generateRandom(0, oldNumber-1);
      }
    }
    randomNumber = test;
    randomColor = `hsl(${this.generateRandom(0,360)}, 100%, 80%)`;
    this.props.onGetRandomNumber(randomNumber);
    this.props.onGetRandomColor(randomColor);
  }
  render() {
    return (
      <div className="buttons">
        <button
          className="random-button" style={{color: this.props.color}}
          onClick={this.handleClick.bind(this)}
          >
          Get Quote
        </button>
      </div>
    );
  }
}

class ShareGroup extends Component {
  render() {
    return (
      <div className="twitter-share-container" style={{backgroundColor: this.props.color}}>
        <a className="twitter-share" href={`https://twitter.com/intent/tweet?text="${quote[this.props.index][0]}" -- ${quote[this.props.index][1]}`} 
          >
          <img border="0" src={logo} alt="twitter logo" width="50" height="50"/>
        </a>
      </div>
    );
  }
}

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: Math.floor(Math.random() * quote.length),
      color: "hsl(360, 100%, 75%)"
    };
    this.handleRandomNumber = this.handleRandomNumber.bind(this);
    this.handleRandomColor = this.handleRandomColor.bind(this);
  }
  handleRandomNumber(randomNumber) {
    this.setState({
      index: randomNumber
    });
  }
  handleRandomColor(randomColor) {
    this.setState({
      color: randomColor
    });
  }
  render() {
    return (
      <div className="main-container" style={{backgroundColor: this.state.color}}>
        <Quote index={this.state.index}/>
        <ButtonGroup onGetRandomNumber={this.handleRandomNumber} onGetRandomColor={this.handleRandomColor} oldNumber={this.state.index} color={this.state.color}/>
        <ShareGroup index={this.state.index} color={this.state.color}/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainContainer />
      </div>
    );
  }
}

export default App;
