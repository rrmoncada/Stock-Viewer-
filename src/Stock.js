import React from 'react';
import Plot from 'react-plotly.js';

// info on the below can be found
//https://www.w3schools.com/react/react_class.asp 
class Stock extends React.Component{   // creating a class component called stock

    constructor(props){    // we use a constrocor to object called props ( properties) 
        super(props);     // we have to use this because props is a object from class stock that extendes class react.component, so we need it to call parent class cosntructor
       
        // source on the below: https://www.w3schools.com/react/react_state.asp#:~:text=Changing%20the%20state%20Object,state%20object%2C%20use%20the%20this.
        this.state = {    //using this to store property values
            // change this
            stockChartXValues:[],  // array for stock x values
            //change this
            stockChartYValues:[]   // arrat for stock y values
        }
    }

    componentDidMount(){
        this.fetchStock();
    }

    fetchStock(){    // function for finding a stock, we conect this function to the api

        const pointerToThis = this;
        
       const API_KEY = 'IU9IBVWBJL8NOIKI';
        let StockSymbol = 'SPY';  // S&P 500
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;

        let symbol2 = 'NASDX'; //Nasdaq-100 index durect
        
        let symbol3 = 'DIA'; // SPDR dow Jones Industrial Average

        let symbol4 ='VTI'; // vanguard total stock market etf

        let symbol5 ='QQQ'; // INVESCO QQQ TRUST


        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(API_CALL)
            .then(
                function(response){
                    return response.json();
                }
            )
            .then(
                function(data){
                    console.log(data);

                    for (var key in data['Time Series (Daily)']) {    // loop gets the key value from each data point, the key  is date
                        stockChartXValuesFunction.push(key); // pushes key(date) to sotck chart x value
                        // obtained the open price format from hovering over the data format in the console log
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);  // pushes open price to y value
                      }
                      
                      // below I equal the 'this' variable to the x adn y values, because thos will be the values for the chart
                      pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,   
                        stockChartYValues: stockChartYValuesFunction
                      });
                }
            )
    }


    render() {
        return (

            <div>
                <h1>Stock Market Viewer</h1>

                <Plot
                    data={[
                        {
                        x: this.state.stockChartXValues,
                        y: this.state.stockChartYValues,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                        }
                    ]}
                    layout={{width: 720, height: 440, title: 'S&P 500'}}
                />
            </div>

        )

    }


}

export default Stock;