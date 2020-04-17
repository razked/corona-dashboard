import React, { Component } from 'react';
import axios from 'axios';
import './Info.scss';
import israel from '../../images/israel.svg';
import Loader from './../UI/Loader/Loader';

export default class Info extends Component {

    state = {
        chinaStart: 0,
        isarelStart: 0,
        startQuarentine: 0,
        infectedWorld: 0,
        healWorld: 0,
    }

    componentDidMount = () => {
        this.daysPassedChinaConfirmed()
        this.daysPassedIsraelConfirmed()
        this.daysPassedIsraelQuarentine()
        this.getWorldData()
    }

    // how many days passed from china first confirmed
    daysPassedChinaConfirmed = () => {
        const today = new Date();
        const startInChina = new Date('2019-12-01');
        const timeinmilisec = today.getTime() - startInChina.getTime();
        let daysPassed = (Math.floor(timeinmilisec / (1000 * 60 * 60 * 24)));
        this.setState({ chinaStart: daysPassed })
    }

    // how many days passed from israel confirmed
    daysPassedIsraelConfirmed = () => {
        const today = new Date();
        const startInIsrael = new Date('2020-02-27');
        const timeinmilisec = today.getTime() - startInIsrael.getTime();
        let daysPassed = (Math.floor(timeinmilisec / (1000 * 60 * 60 * 24)));
        this.setState({ isarelStart: daysPassed })
    }

    // how many days passaed from quarantine starts in israel
    daysPassedIsraelQuarentine = () => {
        const today = new Date();
        const startIsraelQuarentine = new Date('2020-03-19');
        const timeinmilisec = today.getTime() - startIsraelQuarentine.getTime();
        let daysPassed = (Math.floor(timeinmilisec / (1000 * 60 * 60 * 24)));
        this.setState({ startQuarentine: daysPassed })
    }

    // get total world infected and healed
    getWorldData = () => {
        axios("https://covid-19-data.p.rapidapi.com/totals?format=undefined", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                "x-rapidapi-key": "4f84e75160msh4b644447e410bb9p10c31fjsn89c7b5525a62"
            }
        })
            .then(response => {
                this.setState({ infectedWorld: response.data[0].confirmed, healWorld: response.data[0].recovered })
            })
            .catch(err => {
                console.log(err);
            });
    }

    //add comma for a number over 1k
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }



    render() {
        const { chinaStart, isarelStart, startQuarentine, infectedWorld, healWorld } = this.state

        let loader = <Loader />
        let content = null;

        if (this.state.infectedWorld) {
            content = <div className="content">
                <div className="text">
                    <p>
                        <span className="bullet"></span>
                        <span className="number">{this.formatNumber(chinaStart)}</span>
                        ימים מאז התגלה בסין
                    </p>
                    <p>
                        <span className="bullet"></span>
                        <span className="number">{this.formatNumber(isarelStart)}</span>
                        ימים מאז הגיעה לישראל
                     </p>
                    <p>
                        <span className="bullet"></span>
                        <span className="number">{this.formatNumber(startQuarentine)}</span>
                        ימים לבידוד החברתי
                     </p>
                    <p>
                        <span className="bullet"></span>
                        <span className="number">{this.formatNumber(infectedWorld)}</span>
                        נדבקו בכל העולם
                     </p>
                    <p>
                        <span className="bullet"></span>
                        <span className="number">{this.formatNumber(healWorld)}</span>
                        החלימו בכל העולם
                     </p>

                </div>
                <div className="pic">
                    <img src={israel} alt="israel map" />
                </div>
            </div>

            loader = null;
        }

        return (
            <div className="info">
                <h2>נתונים על המגיפה</h2>
                {loader}
                {content}
            </div>
        )
    }
}
