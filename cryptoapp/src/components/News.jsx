import React from 'react'
import  { useState } from 'react';
import { useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;


const News = ({simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const [cryptos, setCryptos] = useState();

    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 20 });
    
    useEffect(() => {
        fetch( `https://coinranking1.p.rapidapi.com/coins?limit=100`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coinranking1.p.rapidapi.com",
                "x-rapidapi-key": "150296bf25mshc541d3cb9230a9dp19b361jsn011b1c18635b"
            }
        })
          .then(res => res.json())
          .then(
            (result) => {
              setCryptos(result?.data?.coins);
            },
        
            (error) => {
            }
          )
      }, [])
    if (!cryptoNews?.value) return 'loading...'
    return (
        <Row gutter={[24, 24]}>
            {!simplified &&(
                <Col span={24}>
                    <Select showSearch className='select-news' placeholder="select a Crypto" optionFilterProp='children'
                    onChange={(value)=>setNewsCategory(value)}
                    filterOption= {(input, option )=> option.children.toLowerCase().indexOf(input.toLowerCase())>=0}>
                    <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {cryptos?.map((coin) => <Option value={coin.name}>{coin.name}</Option> )}
                    
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((item, i)=>(
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="new_card">
                        <a href={item.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>{item.name}</Title>
                                <img src={item?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                            </div>
                            <p>
                                {item.description > 100 ? `${item.description.substring(0,100)}...`
                                : item.description
                                }
                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src={item.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                    <Text className="provider-name">{item.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(item.datePublished).startOf('ss').fromNow()}</Text>

                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
            
        </Row>
    )
}

export default News
