import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Baseurl } from "./baseUrl";
import Loader from "./Loader";
import "./Exchanges.css";
const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  useEffect(() => {
    const getExchagesData = async () => {
      const { data } = await axios.get(`${Baseurl}/exchanges`);
      console.log(data);
      setExchanges(data);
      setLoading(false);
    };
    getExchagesData();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div>
            {exchanges.map((item, i) => {
              return (
                <div key={i} className="ex-cards">
                  <div className="image">
                    <img height={"80px"} src={item.image} alt="" />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="price">
                    {item.trade_volume_24h_btc.toFixed(0)}
                  </div>
                  <div className="rank">{item.trust_score_rank}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Exchanges;
