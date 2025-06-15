import { IoMdInformationCircle } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuArrowDownToLine, LuArrowUpToLine } from "react-icons/lu";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import styled from "styled-components";
import CurrencyTag from "../components/CurrencyTag";
import IconButton from "../components/IconButton";
import TransactionCard from "../components/TransactionCard";
import { useState } from "react";
import { NavLink } from "react-router";
import StickerOverlayCard from "../components/StickerOverlayCard";

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
  grid-template-rows: 35vh 45vh 42vh 20vh 20vh;
  gap: 3vh;
  background-color: transparent;

  .item_1,
  .item_2,
  .item_3 {
    border-radius: 1rem;
  }

  .item_1 {
    background-color: white;
    display: flex;
    padding: 0.8rem 0.8rem;
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
    padding: 0.8rem 0.8rem;
    flex-direction: column;
    /* justify-content: space-between; */
    gap: 1.5rem;
    /* background-color: blueviolet; */
    background-color: white;
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
    gap: 0.4rem;
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
    /* padding: 0 0.5rem; */
  }

  .filter_box {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    background-color: rgb(236, 236, 236);
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
    background-color: white;

    &:hover {
      cursor: pointer;
      font-weight: 700;
    }
  }

  .active {
    background-color: #5f00d9;
    color: white;
    font-weight: 700;
  }

  .time_slots {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
  }

  .graph_img {
    height: 5.5rem;
    width: 100%;
    /* background-color: red; */
    background-image: url("./graph.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: block;
  }

  .item_3 {
    /* background-color: cadetblue; */
    background-color: white;
    display: flex;
    padding: 0.8rem 0.8rem;
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
    background-color: rgb(236, 236, 236);
    text-decoration: none;
    color: black;
    text-align: center;
  }

  .item_5 {
    background-color: violet;
  }

  @media (min-width: 320px) {
    grid-template-rows: 35vh 47vh 42vh 20vh 20vh;

    .graph_img {
      height: 6rem;
    }
  }

  @media (min-width: 425px) {
    grid-template-rows: 35vh 50vh 45vh 20vh 20vh;

    .graph_img {
      height: 7rem;
    }
  }

  @media (min-width: 525px) {
    grid-template-rows: 35vh 55vh 45vh 20vh 20vh;

    .graph_img {
      height: 8rem;
    }
  }

  @media (min-width: 625px) {
    grid-template-rows: 25vh 50vh 45vh 20vh 20vh;

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
    grid-template-rows: 30vh 55vh 47vh 20vh 20vh;

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
    grid-template-columns: 50% auto;
    grid-template-rows: 10.5vh 45.5vh 15vh;

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
      gap: 0.5rem;
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
      gap: 0.5rem;
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

          {/* <img className="graph_img" src="./graph.svg" alt="crypto graph" /> */}
          <div className="graph_img"></div>

          <div className="time_slots">
            {timeSlots.map((time, index) => {
              return <div key={index}>{time.label}</div>;
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

      {/* <div className="item_4">
        <div className="f_overlay"></div>
        <div className="f_sticker">Loans</div>
        <div className="f_content">
          Learn more about Loans – Keep your Bitcoin, access it’s value without
          selling it
        </div>
      </div> */}

      <StickerOverlayCard
        className="item_4"
        sticker_bg="rgb(95, 0, 217)"
        title="Loans"
        content="Learn more about Loans – Keep your Bitcoin, access it’s value without
          selling it"
        bg_color="orange"
        overlayImg="./dot_bg.svg"
      />

      <StickerOverlayCard
        className="item_5"
        sticker_bg="#ffffff"
        sticker_color="rgb(95, 0, 217)"
        title="Contact"
        content="Learn more about our real estate, mortgage, and  corporate account services"
        content_color="white"
        bg_color="rgb(95, 0, 217)"
        overlayImg="./grid_bg.svg"
      />

      {/* <div className="item_5">FOOTER 2</div> */}
    </GridContent>
  );
};

export default Home;
