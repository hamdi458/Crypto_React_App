import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
const LineChart = ({coinHistory,currentPrice,coinname }) => {
    const coinPrice = [];
    const coinTime = [];

    for (let i = 0; i< coinHistory?.data?.history?.length; i+=1)
    {
        coinPrice.push(coinHistory?.data?.history[i].price)
        if(coinHistory?.data?.history?.length == 283)
        coinTime.push( new Date(coinHistory?.data?.history[i].timestamp).toLocaleTimeString())
       else
        coinTime.push( new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString())
        
    }
    const data = {
        labels: coinTime,
        datasets : [
            {
                label: 'Price in USD',
                data : coinPrice,
                fill: false,
                backgroundColor : '#0071bd',
                borderColor : '#0071bd'
            }
        ]
    }
    const options = {
        scaleShowLabelBackdrop : true,
      //Boolean - Whether to show labels on the scale
      scaleShowLabels : true,
      multiTooltipTemplate :"<%=datasetLabel%> : <%= value %>",
        scales: {
            yAxes:[
                {
                    ticks:{
                        callback: function(value, index, values) {
                            return '$' + value;
                    }
                }}
            ]
        }
    }
    return (
        <>
        <Row className='chart-header'>
           <Typography.Title level={2} className='chart-title'>{coinname} Price Chart</Typography.Title>
           <Col className='price-container'>
               <Typography.Title level={5} className='price-change'>{coinHistory?.data?.change}%</Typography.Title>
               <Typography.Title level={5} className='current-price'>Current {coinname} Price: $ {currentPrice}</Typography.Title>

           </Col> 
        </Row>
        <Line data={data} options={options}/>
        </>
        
    )
}

export default LineChart
