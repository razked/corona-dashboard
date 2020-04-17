import React, { Component } from 'react';
import './Israel.scss'
import axios from 'axios';
import CountryBox from './../CountryBox/CountryBox';
import Loader from './../UI/Loader/Loader';

export default class Israel extends Component {

state = {
    dataIsrael: null
}

componentDidMount = () => {
    this.getIsraelData()
  }


  getIsraelData = () => {
    axios("https://covid-19-data.p.rapidapi.com/country?format=undefined&name=israel", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key": "4f84e75160msh4b644447e410bb9p10c31fjsn89c7b5525a62"
        }
      })
        .then(response => {
          this.setState({ dataIsrael: response.data })
        })
        .catch(err => {
          console.log(err);
        });
  }

    render() {

        let loader = <Loader />
        let israelInfo = null;
        if(this.state.dataIsrael) {
            israelInfo = <CountryBox data={this.state.dataIsrael}/>
            loader = false
        }

        return (
            <div className="israel">
                <h2>ישראל</h2>
                {loader}
                {israelInfo}
            </div>
        )
    }
}
