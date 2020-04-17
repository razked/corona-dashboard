import React, { Component } from 'react';
import './TopFive.scss';
import axios from 'axios';
import Loader from './../UI/Loader/Loader';
import ReactCountryFlag from "react-country-flag"

export default class TopFive extends Component {

    state = {
        countries: null,
        topFive: null
    }

    componentDidMount = () => {
        this.getWorldStat()
    }



    getWorldStat = () => {
        axios("https://api.covid19api.com/summary")
            .then(response => {
                this.setState({ countries: response.data.Countries })
                this.sortData(this.state.countries)
            })
            .catch(err => {
                console.log(err);
            });
    }

    // sort the data for top 5 new infected
    sortData = (data) => {
        let sortedData = data.sort((a, b) =>
            (a.NewConfirmed > b.NewConfirmed) ? 1 :
                ((b.NewConfirmed > a.NewConfirmed) ? -1 : 0));

        let topFive = sortedData.slice(Math.max(sortedData.length - 7, 1)).reverse()
        this.setState({ topFive: topFive })
        return topFive;
    }


    // transalte countryName Options..
    translateName = (name) => {
        switch (name) {
            case 'united-states':
                return 'ארה"ב'
            case 'united-kingdom':
                return 'אנגליה'
            case 'spain':
                return 'ספרד'
            case 'italy':
                return 'איטליה'
            case 'germany':
                return 'גרמניה'
            case 'turkey':
                return 'טורקיה'
            case 'france':
                return 'צרפת'
            case 'canada':
                return 'קנדה'
            case 'iran':
                return 'איראן'
            case 'india':
                return 'הודו'
            case 'belgium':
                return 'בלגיה'
            case 'brazil':
                return 'ברזיל'
            case 'netherlands':
                return 'הולנד'
            case 'russia':
                return 'רוסיה'
            case 'pakistan':
                return 'פקיסטן'
            case 'switzerland':
                return 'שוויץ'
            case 'japan':
                return 'יפן'
            case 'israel':
                return 'ישראל'
            case 'portugal':
                return 'פורטוגל'
            case 'philippines':
                return 'פיליפינים'
            default:
                break;
        }
    }

       //add comma for a number over 1k
       formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }



    render() {

        let loader = <Loader />

        let topFiveList = null;
        if (this.state.topFive) {
            topFiveList = this.state.topFive.map((item, idx) => {
                return (
                    <div className="country" key={idx}>
                        <div className="num">{`${idx + 1}. `}</div>
                        <div className="flag">
                            <ReactCountryFlag
                                countryCode={item.CountryCode}
                                svg
                                style={{
                                    width: '2.2em',
                                    height: '2.2em',
                                }}
                            />
                        </div>
                        <div className="name">
                            {this.translateName(item.Slug)}
                        </div>
                        <div className="confirmed">
                            {this.formatNumber(item.NewConfirmed)}
                        </div>
                    </div>
                )
            });

            loader = false
        }

        return (
            <div className="topFive">
                <div className="title">
                    <h2> נדבקים חדשים בעולם</h2>
                </div>
                {loader}
                <div className="list">
                    {topFiveList}
                </div>
            </div>
        )
    }
}
