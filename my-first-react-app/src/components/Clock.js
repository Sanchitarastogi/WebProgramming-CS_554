import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            timeDiff:this.props.timeDiff,
            place: this.props.place,
            temperature: undefined
        };
    }
 
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        this.temperature()
    
    }

   
  
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    async temperature(){
        let x = this.state.place
        x = x.replace(" ", "%20")
        let temper = await axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + x + "&appid=be774283a52b738b82accccbc8529006&units=metric")
        console.log(temper.data.main.temp)
        this.setState({temperature: temper.data.main.temp})
    }

    
    tick() {

        var diff = new Date();

        // console.log( diff.getHours() + " "+ this.state.timeDiff);

        diff.setHours(diff.getHours() + this.state.timeDiff);

        

        this.setState({

        date : new Date(diff)
         
        });
      }

    render() {
        return (
            <div>
                <h2>It is {this.state.date.toLocaleTimeString()}  {this.state.place}</h2>
                <h2>The temperature in {this.state.place} is {this.state.temperature} °C</h2>
            </div>
        );
    }
}

export default Clock;