import React from 'react'
import { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100;

    const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');
 
  const fetchcoins = async() =>{
    var axios = require("axios").default;

    var options = {
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coins?limit=${count}`,
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '150296bf25mshc541d3cb9230a9dp19b361jsn011b1c18635b'
      }
    };
    
    axios.request(options).then(function (response) {
        const globalStats = response.data?.data?.coins;
        
        
        setCryptos(globalStats)
    
    }).catch(function (error) {
        console.error(error);
    });
}

useEffect(() => {

    fetchcoins();
    
}, [])
useEffect(() => {
    const filtredData = cryptos?.data?.coins 
    setCryptos(filtredData)


}, [searchTerm])
useEffect(() => {
    fetch( `https://coinranking1.p.rapidapi.com/coins?limit=${count}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key": "150296bf25mshc541d3cb9230a9dp19b361jsn011b1c18635b"
        }
    })
      .then(res => res.json())
      .then(
        (result) => {
          setCryptos(result?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm)));
        },
    
        (error) => {
        }
      )
  }, [searchTerm])

    return (
        <>
        {!simplified && (
          <div className="search-crypto">
            <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
          </div>
        )}
        <Row gutter={[32, 32]} className="crypto-card-container">
          {cryptos?.map((currency) => (
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
              <Link key={currency.id} to={`/crypto/${currency.id}`}>
                <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} />} hoverable>
                  <p>Price: {millify(currency.price, {
  precision: 3,
  lowercase: true
})}$</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {currency.change}%</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </> 
    )
}

export default Cryptocurrencies
