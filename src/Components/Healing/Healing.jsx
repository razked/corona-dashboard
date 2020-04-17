import React, { Component } from 'react';
import axios from 'axios';
import './Healing.scss'
import Loader from './../UI/Loader/Loader';
import IsraelChart from './../IsraelChart/IsraelChart';
import moment from 'moment';

export default class TopBad extends Component {

    state = {
        date: '',
        new_cases: '',
    }

    componentDidMount = () => {
        axios("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=israel", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "4f84e75160msh4b644447e410bb9p10c31fjsn89c7b5525a62"
            }
        })
            .then(response => {
                console.log(response)
                this.getUnique(response.data.stat_by_country, 'total_cases')
            })
            .catch(err => {
                console.log(err);
            });
    }

    // remove duplicated heal cases from each object
    getUnique = (arr, comp) => {

        const unique = arr
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);

            this.sortArraysForChart(unique)
        return unique;
    }


    sortArraysForChart = (array) => {
        console.log(array)
        let labels = [];
        let new_cases = [];

        array.forEach(day => {
            labels.push(moment(day.record_date).format('DD/MM/YYYY HH:mm'))
            new_cases.push(this.formatNum(day.total_cases));
        });       
        console.log(new_cases) 
        this.setState({
            date: labels,
            new_cases: new_cases,
        })
    }

    // format to number if 0 or if has comma
    formatNum = (number) => {
       return parseFloat(number.replace(/,/g, ''));
    }




    render() {

        let loader = <Loader />
        let chart = null;
        console.log(this.state.new_cases)

        if (this.state.new_cases) {
            chart = <IsraelChart 
            new_cases={this.state.new_cases}
                date={this.state.date}
                />
            loader = null
        }
        return (
            <div className="healing">
                <h2>היסטוריית נדבקים בישראל</h2>
                <div className="graph">
                    {loader}
                    {chart}
                </div>
            </div>
        )
    }
}
