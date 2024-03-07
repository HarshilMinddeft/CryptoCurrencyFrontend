import React, { useEffect, useState } from "react";
import { Baseurl } from "./baseUrl";
import Loader from "./Loader";
import axios from "axios";
import Header from "./Header";
import { Link } from "react-router-dom";
const Currency = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState("");
  const currencySymbol = currency === "inr" ? "₹" : "$";
  useEffect(() => {
    const getCoinsData = async () => {
      const { data } = await axios.get(
        `${Baseurl}/coins/markets?vs_currency=${currency}`
      );
      console.log(data);
      setCoins(data);
      setLoading(false);
    };
    getCoinsData();
  }, [currency]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="serch-bar">
            <input
              type="text"
              placeholder="serch crypto"
              style={{
                height: "2rem",
                width: "20rem",
                position: "absolute",
                top: "13%",
                left: "41%",
                paddingLeft: "5px",
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <button className="btns" onClick={() => setCurrency("inr")}>
              INR
            </button>
            <button className="btns" onClick={() => setCurrency("usd")}>
              USD
            </button>
          </div>
          {coins
            .filter((data) => {
              if (data === "") {
                return data;
              } else if (
                data.name.toLowerCase().includes(search.toLocaleLowerCase())
              ) {
                return data;
              }
            })
            .map((coindata, i) => {
              return (
                <CoinCard
                  coindata={coindata}
                  id={coindata.id}
                  i={i}
                  currencySymbol={currencySymbol}
                />
              );
            })}
        </>
      )}
    </>
  );
};

const CoinCard = ({ coindata, i, currencySymbol, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;
  return (
    <Link
      to={`/currency/${id}`}
      style={{ color: "white", textDecoration: "none" }}
    >
      <div key={i} className="ex-cards">
        <div className="image">
          <img height={"80px"} src={coindata.image} alt="" />
        </div>
        <div className="name">{coindata.name}</div>
        <div className="price">
          {currencySymbol}
          {coindata.current_price.toFixed(5)}
        </div>
        <div
          style={profit ? { color: "lightgreen" } : { color: "red" }}
          className="rank"
        >
          {profit
            ? "+" + coindata.price_change_percentage_24h.toFixed(2)
            : coindata.price_change_percentage_24h.toFixed(2)}
        </div>
        <div className="name">{coindata.ath}Ath</div>
      </div>
    </Link>
  );
};

export default Currency;
