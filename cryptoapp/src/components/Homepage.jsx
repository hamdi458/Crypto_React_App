import React from 'react'
import millify from "millify"
import { SMTPClient } from 'emailjs';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { News, Cryptocurrencies } from '.';

/** Typography.Title */
const {Title} = Typography;

const HomePage = () => {
    const [surveyData, setSurveyData] = useState({})
  

    const fetchcoins = async() =>{
        var axios = require("axios").default;

        var options = {
          method: 'GET',
          url: 'https://coinranking1.p.rapidapi.com/coins',
          headers: {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': '150296bf25mshc541d3cb9230a9dp19b361jsn011b1c18635b'
          }
        };
        
        axios.request(options).then(function (response) {
            const globalStats = response.data?.data?.stats;
            
            setSurveyData(globalStats)
            
        
        }).catch(function (error) {
            console.error(error);
        });
    }
 
    useEffect(() => {

        fetchcoins();
        
    }, [])
    console.log(surveyData)
    if (!surveyData?.total) return 'loading...';
    return (
        <>
         <Title level={2} className='heading'>Global Crypto Stats </Title>   
         <Row gutter={[32, 32]}>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={surveyData.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={(surveyData.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap:" value={`$${millify(surveyData.totalMarketCap)}`} /></Col>
        
        <Col span={12}><Statistic title="Total 24h Volume" value={`$${millify(surveyData.total24hVolume)}`} /></Col>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={millify(surveyData.total)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={(surveyData.totalMarkets)} /></Col>
      </Row>
         <div className="home-heading-container">
            <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
            <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
         </div>
         <Cryptocurrencies simplified />

         <div className="home-heading-container">
            <Title level={2} className="home-title">Latest Crypto News</Title>
            <Title level={3}><Link to="/news">Show more</Link></Title>
         </div>
         <News simplified />
        </>
    )
}

export default HomePage
