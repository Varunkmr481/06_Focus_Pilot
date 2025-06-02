import { IoMdInformationCircle } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuArrowDownToLine, LuArrowUpToLine } from "react-icons/lu";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import styled from "styled-components";
import CurrencyTag from "./CurrencyTag";
import IconButton from "./IconButton";
import TransactionCard from "./TransactionCard";
import { useState } from "react";
import { NavLink } from "react-router";

const filterOptions = [
  { label: "1H", value: "1h" },
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
];

const timeSlots = [
  { label: "7:15 PM", value: "19:15" },
  { label: "12:55 AM", value: "00:55" },
  { label: "6:35 AM", value: "06:35" },
  { label: "12:15 PM", value: "12:15" },
  { label: "5:55 PM", value: "17:55" },
];

// eslint-disable-next-line no-unused-vars
const recentTransactions = [
  {
    title: "INR Deposit",
    amount: "+ ₹81,123.10",
    date: "2022-06-09",
    time: "7:06 PM",
    type: "deposit",
    currency: "INR",
  },
  {
    title: "BTC Sell",
    amount: "- 12.48513391 BTC",
    date: "2022-05-27",
    time: "12:32 PM",
    type: "sell",
    currency: "BTC",
    convertedAmount: "+ $81,123.10",
  },
  {
    title: "INR Deposit",
    amount: "+ ₹81,123.10",
    date: "2022-06-09",
    time: "7:06 PM",
    type: "deposit",
    currency: "INR",
  },
];

const GridContent = styled.div`
  display: grid;
  /* for laptops */
  grid-template-rows: 35vh 45vh 40vh 35vh 35vh;
  gap: 3vh;
  background-color: blue;

  .item_1 {
    background-color: aqua;
    display: flex;
    padding: 0.8rem 0;
    /* justify-content: space-around; */
    justify-content: space-between;
    flex-direction: column;
  }

  .portfolio_wallet_wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .portfolio_box {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    gap: 0.5vh;
    /* height: 100%; */
  }

  .portfolio_label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: #5a5959;
    font-weight: 700;
  }

  .portfolio_value {
    /* font-size: 1.5rem; */
    font-size: 1.2rem;
    font-weight: 800;
  }

  .wallet_box {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    gap: 0.5vh;
    /* height: 100%; */
  }

  .wallet_label {
    color: #5a5959;
    font-weight: 700;
  }

  .wallet_value {
    display: flex;
    flex-direction: column;
    font-weight: 800;
    font-size: 1.2rem;
  }

  .w_v_1,
  .w_v_2 {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .btn_box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .item_2 {
    display: flex;
    padding: 0.8rem 0;
    flex-direction: column;
    /* justify-content: space-between; */
    gap: 1.5rem;
    background-color: blueviolet;
    height: 100%;
  }

  .price_box {
    display: flex;
    flex-direction: column;
    gap: 1vh;
  }

  .price_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5vh;
  }

  .price_label {
    color: #5a5959;
    font-weight: 700;
  }

  .price_value {
    font-weight: 800;
    font-size: 1.2rem;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    gap: 0.8rem;
  }

  .price_increment {
    color: seagreen;
    font-weight: 800;
    font-size: 0.7rem;
    display: flex;
    align-items: flex-end;
    gap: 0.2rem;
  }

  .price_btn_box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .graph_box {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 0.5rem;
  }

  .filter_box {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    width: fit-content;
    padding: 0.3rem 0.4rem;
    margin: 0 0 0 auto;
    gap: 0.7rem;
    border: 1px solid black;
    border-radius: 0.6rem;
  }

  .filter_item {
    border: unset;
    padding: 0.4rem 0.5rem;
    border-radius: 0.4rem;
  }

  .active {
    background-color: red;
  }

  .time_slots {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
  }

  .graph_img {
    background-color: red;
    width: 100%;
    height: 5rem;
  }

  .item_3 {
    background-color: cadetblue;
    display: flex;
    padding: 0.8rem 0;
    justify-content: space-between;
    flex-direction: column;
  }

  .transact_label {
    color: #5a5959;
    font-weight: 700;
  }

  .transact_value > div:not(:last-child) {
    border-bottom: 0.01px solid rgb(125, 125, 125);
  }

  .transact_view_btn {
    border: unset;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.4rem;
    padding: 0.5rem 0;
    background-color: rgb(197, 193, 193);
    text-decoration: none;
    color: black;
    text-align: center;
  }

  .item_4 {
    background-color: coral;
  }

  .item_5 {
    background-color: violet;
  }

  @media (min-width: 320px) {
    grid-template-rows: 35vh 47vh 40vh 35vh 35vh;

    .graph_img {
      height: 6rem;
    }
  }

  @media (min-width: 425px) {
    grid-template-rows: 35vh 50vh 45vh 35vh 35vh;

    .graph_img {
      height: 7rem;
    }
  }

  @media (min-width: 525px) {
    grid-template-rows: 35vh 55vh 45vh 35vh 35vh;

    .graph_img {
      height: 8rem;
    }
  }

  @media (min-width: 625px) {
    grid-template-rows: 25vh 50vh 45vh 35vh 35vh;

    .item_1 {
      flex-direction: row;
      align-items: flex-start;
    }

    .item_2 .price_box {
      flex-direction: row;
      justify-content: space-between;
    }

    .graph_img {
      height: 9rem;
    }
  }

  @media (min-width: 768px) {
    grid-template-rows: 30vh 55vh 55vh 40vh 40vh;

    .portfolio_wallet_wrapper {
      gap: 1.5rem;
    }

    .graph_img {
      height: 12rem;
    }

    .portfolio_value,
    .wallet_value {
      font-size: 1.4rem;
    }
  }

  @media (min-width: 1024px) {
    gap: 3vh;
    grid-template-columns: 49% 49%;
    grid-template-rows: 10vh 45vh 15vh;

    .item_1 {
      grid-column: 1/3;
      padding: 0.8rem;
      flex-direction: row;
    }

    .portfolio_wallet_wrapper {
      flex-direction: row;
    }

    .portfolio_value,
    .wallet_value {
      font-size: 1.2rem;
    }

    .wallet_value {
      gap: 1rem;
      flex-direction: row;
    }

    .btn_box {
      gap: 1rem;
    }

    .item_2 {
      /* gap: 1rem; */
      grid-column: 1/2;
      padding: 0.8rem;
    }

    .graph_img {
      height: 8.3rem;
    }

    .price_btn_box {
      gap: 1rem;
    }

    .price_box {
      flex-direction: row;
      justify-content: space-between;
    }

    .item_3 {
      grid-column: 2/3;
      padding: 0.8rem;
    }

    .item_4 {
      grid-column: 1/2;
    }

    .item_5 {
      grid-column: 2/3;
    }
  }

  @media (min-width: 1440px) {
    .graph_img {
      /* height: 9.5rem; */
    }

    .portfolio_value,
    .wallet_value {
      font-size: 1.4rem;
    }
  }
`;

const Home = () => {
  const [currFilter, setCurrFilter] = useState(null);

  return (
    <GridContent>
      <div className="item_1">
        <div className="portfolio_wallet_wrapper">
          <div className="portfolio_box">
            <div className="portfolio_label">
              <span>Total Portfolio Value</span>
              <IoMdInformationCircle />
            </div>
            <div className="portfolio_value">₹ 112,312.24</div>
          </div>

          <div className="wallet_box">
            <div className="wallet_label">Wallet Balances</div>

            <div className="wallet_value">
              <div className="w_v_1">
                <span>22.39401000</span>
                <CurrencyTag>BTC</CurrencyTag>
              </div>
              <div className="w_v_2">
                <span>22.39401000</span>
                <CurrencyTag>BTC</CurrencyTag>
              </div>
            </div>
          </div>
        </div>

        <div className="btn_box">
          <IconButton icon={<LuArrowDownToLine />}>Deposit</IconButton>
          <IconButton icon={<LuArrowUpToLine />}>Withdraw</IconButton>
        </div>
      </div>

      <div className="item_2">
        <div className="price_box">
          <div className="price_info">
            <div className="price_label">Current Price</div>

            <div className="price_value">
              <div>₹26,670.25</div>
              <div className="price_increment">
                <FaArrowTrendUp />
                <div>0.04%</div>
              </div>
            </div>
          </div>

          <div className="price_btn_box">
            <IconButton icon={<FaPlusCircle />}>Buy</IconButton>
            <IconButton icon={<FaMinusCircle />}>Sell</IconButton>
          </div>
        </div>

        <div className="graph_box">
          <div className="filter_box">
            {filterOptions.map((opt, index) => (
              <button
                key={opt.label}
                className={`filter_item ${
                  index === currFilter ? "active" : null
                }`}
                onClick={() => {
                  setCurrFilter(index);
                  console.log("clicked index : ", index);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <img className="graph_img" src="./graph.png" alt="crypto graph" />
          <div className="time_slots">
            {timeSlots.map((time) => {
              return <div>{time.label}</div>;
            })}
          </div>
        </div>
      </div>

      <div className="item_3">
        <div className="transact_label">Recent Transactions</div>

        <div className="transact_value">
          {recentTransactions.map((transaction, index) => {
            return (
              <TransactionCard
                key={index}
                title={transaction.title}
                currency={transaction.currency}
                amount={transaction.amount}
                convertedAmount={transaction?.convertedAmount}
                time={transaction.time}
                date={transaction.date}
              />
            );
          })}
        </div>

        <NavLink className="transact_view_btn" to="./transactions">
          View All
        </NavLink>
      </div>

      <div className="item_4">FOOTER 1</div>
      <div className="item_5">FOOTER 2</div>
    </GridContent>
  );
};

export default Home;
