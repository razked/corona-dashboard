import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import "chartjs-plugin-lineheight-annotation";

export default class IsraelChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: this.props.date,
                datasets: [
                    {
                        label: 'נדבקים חדשים',
                        data: this.props.new_cases,
                        borderColor: "rgba(103, 78, 234, 1)",
                        borderWidth: 2,
                        pointRadius: 2,
                        backgroundColor: "rgba(104, 78, 234, 0.147)"
                    }
                    // {
                    //     label: 'במצב קשה',
                    //     data: this.props.hard,
                    //     borderColor: "rgba(232, 69, 69, 1)",
                    //     borderWidth: 2,
                    //     pointRadius: 1,
                    //     // backgroundColor: "rgba(232, 69, 69, 0.55)"
                    // },
                    // {
                    //     label: 'החלימו',
                    //     data: this.props.heal,
                    //     borderColor: "rgba(83, 192, 121, 1)",
                    //     borderWidth: 2,
                    //     pointRadius: 1,
                    //     // backgroundColor: "rgba(83, 192, 121, 0.35)"
                    // },
                ]   
            }
        }
    }


    render() {
        let chart = null;
        if(this.props.new_cases) {
            chart = <Line 
            options={{
                scales: {
                    xAxes: [{
                        display: false
                        // ticks: {
                        //     autoSkip: true,
                        //     maxTicksLimit: 1,
                        //     maxRotation: 5,
                        //     // minRotation: 0,
                        //     paddingLeft: 5
                        // }
                    }]
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 5,
                        top: 0,
                        bottom: 0
                    }
                },
                responsive: true,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 15,
                        padding: 20
                    },
                    
                },
                lineHeightAnnotation: {
                    color: "#4B4B62",
                    always: false,
                    hover: true,
                    noDash: true,
                    lineWeight: 1,

                    // shadow: true
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {

                        labelTextColor: function(tooltipItem, chart) {
                            return 'rgb(103, 78, 234)';
                        }
                    }
                }                
                
            }}
            data={this.state.data}
          />
        }
        
    return (
        <div>

          {chart}

        </div>
    )
}
}
