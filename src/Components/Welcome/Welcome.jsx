import React, { Component } from 'react';
import './Welcome.scss';
import Result from './Result';

export default class Welcome extends Component {

    state = {
        days: '',
        daysError: '',
        openResult: false
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // form validation
    validate = () => {
        let daysError;

        if (this.state.days === '') {
            daysError = 'חובה להקליד מספר מסויים'
        }

        if (isNaN(this.state.days)) {
            daysError = 'יש להקליד מספר בלבד'
        }

        if (this.state.days > 400) {
            daysError = 'קצת יותר אופטימיות..'
        }

        if (daysError) {
            this.setState({ daysError })
            return false;
        }
        return true
    }


    handleSubmit = () => {

        const isValid = this.validate()
        if (isValid) {
            this.setState({ openResult: true, daysError: '' })
        }
    }


    // if enter key is pressed when on accoundID input
    onEnterPress = (e) => {
        if (e.which === 13) {
            this.handleSubmit()
        }
    }

    closeResult = () => {
        this.setState ({ openResult: false })
    }

    

    render() {

        let form =  <div className="text">
        <h2>נסו לנחש מתי זה יגמר?</h2>
        <div className="search">
            <input
                placeholder="הקלידו מספר ימים.."
                value={this.state.days}
                name="days"
                onChange={this.handleChange}
                onKeyPress={this.onEnterPress}
            />

            <button onClick={this.handleSubmit}>
                <i className="fas fa-search"></i>
            </button>

            <span className={this.state.daysError ? 'error' : 'empty'}>
                {this.state.daysError}
            </span>
        </div>

    </div>

        return (
            <div className="welcome">
               {form}
               {this.state.openResult ? <Result days={this.state.days} close={this.closeResult}/> : null}
            </div>
        )
    }
}
