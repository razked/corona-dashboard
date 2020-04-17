import React, { Component } from 'react'
import './Result.scss';

export default class Result extends Component {


    state = {
        loader: 'אוסף נתונים מהשר ליצמן...'
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState ({ loader: 'אוסף נתונים מהשר ליצמן...' })
        }, 1400);
        setTimeout(() => {
            this.setState ({ loader: 'יוצר עם קשר עם ביבי...' })
        }, 3800);
        setTimeout(() => {
            this.setState ({ loader: 'מפעיל אלגוריתם משה בר סימן טוב...' })
        }, 5800);
        setTimeout(() => {
            this.setState ({ loader: '' })
        }, 7800);
    }


    render() {

        let content = null
        if(this.state.loader === '') {
            content = <h2>{`תודה שהשתתפתם בחידון שלנו, לצערנו אין תקציב לפרסים :)`}</h2>
        }
        return (
            <div className="resultBG" onClick={this.props.close}>
                <div className="dialog" onClick={e => { e.stopPropagation() }}>
                    <div className="loader">
                        <h3>{this.state.loader}</h3>
                        {content}
                    </div>  
                </div>
            </div>
        )
    }
}
