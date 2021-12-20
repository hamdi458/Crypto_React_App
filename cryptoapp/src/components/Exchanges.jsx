import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
console.log(exchangesList)
  if (isFetching) return 'loading...';

  return (
    <>
   <br/>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel 
                key={exchange.rank}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={24}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                  
                  </Row>
                  )}
              >
        <Col span={24}><strong>24h Trade Volume : </strong>${millify(exchange.volume)}</Col>
        <Col span={24}><strong>Markets :  </strong>{millify(exchange.numberOfMarkets)}</Col>
        <Col span={24}><strong>Change :  </strong>{millify(exchange.marketShare)}%</Col>
         

                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;