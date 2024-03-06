import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Baseurl } from "./baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
// import coinImage from "../components/images.png";
import "./coinDetailes.css";

const CoinsDetailes = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/coins/${id}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCoin();
  }, [id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="coin-detail">
            <div className="coin-info">
              <div className="time">{coin.last_updated}</div>
              <div className="coin-image">
                <img height={"120px"} src={coin.image.large} alt="" />
              </div>
              <div className="coinName">{coin.name}</div>
              <div className="coin-price">
                {coin.market_data.current_price[`inr`]}
              </div>
              <div className="coin-profit">
                {coin.market_data.price_change_24h}
              </div>
              <div className="market-rank">
                {coin.market_data.market_cap_rank}
              </div>
              <div className="coin-info">
                <p>{coin.description[`en`].split(".")[0]}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CoinsDetailes;
