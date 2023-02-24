import React from 'react';
import Plot from 'react-plotly.js';

// info on the below can be found
//https://www.w3schools.com/react/react_class.asp 
class Stock extends React.Component{   // creating a class component called stock

    constructor(props){    // we use a constructor to object called props ( properties) 
        super(props);     // we have to use this because props is a object from class stock that extendes class react.component, so we need it to call parent class cosntructor
       
        // source on the below: https://www.w3schools.com/react/react_state.asp#:~:text=Changing%20the%20state%20Object,state%20object%2C%20use%20the%20this.
        this.state = {    //using this to store property values
            // change this
            stockChartXValues:[],  // array for stock x values
            //change this
            stockChartYValues:[],   // arrat for stock y values

            stockChartXValues2:[],  // array for stock x values
            //change this
            stockChartYValues2:[]   // arrat for stock y values



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

        let StockSymbol2 = 'NASDX'; //Nasdaq-100 index durect
    let API_CALL2 = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol2}&outputsize=compact&apikey=${API_KEY}`;

        let StockSymbol3 = 'DIA'; // SPDR dow Jones Industrial Average
    let API_CALL3 = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol3}&outputsize=compact&apikey=${API_KEY}`;

        let StockSymbol4 ='VTI'; // vanguard total stock market etf
    let API_CALL4 = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol4}&outputsize=compact&apikey=${API_KEY}`;

        let StockSymbol5 ='QQQ'; // INVESCO QQQ TRUST
    let API_CALL5 = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol5}&outputsize=compact&apikey=${API_KEY}`;


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

                /*
            let stockChartXValuesFunction2 = [];
            let stockChartYValuesFunction2 = [];
            fetch(API_CALL2)
            .then(
                function(response2){
                    return response2.json();
                }
            )
            .then(
                function(data2){
                    console.log(data2);

                    for (var key in data2['Time Series (Daily)']) {    // loop gets the key value from each data point, the key  is date
                        stockChartXValuesFunction2.push(key); // pushes key(date) to sotck chart x value
                        // obtained the open price format from hovering over the data format in the console log
                        stockChartYValuesFunction2.push(data2['Time Series (Daily)'][key]['1. open']);  // pushes open price to y value
                      }
                      
                      // below I equal the 'this' variable to the x adn y values, because thos will be the values for the chart
                      pointerToThis.setState({
                        stockChartXValues2: stockChartXValuesFunction2,   
                        stockChartYValues2: stockChartYValuesFunction2
                      });
                }
            ) */
        
            
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