import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { SiBitcoinsv } from "react-icons/si";
import styled from "styled-components";

const TransactCard = styled.div`
  /* border: 1px solid black; */
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 0;

  .t_card_label {
    font-size: 0.9rem;
    font-weight: 700;
  }

  .t_card_left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .t_card_icon {
    border: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 0.5rem;
    background-color: rgb(197, 193, 193);
  }

  .t_card_amount {
    font-weight: 700;
    font-size: 0.8rem;
  }

  .t_card_time {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: #5a5959;
    font-size: 0.6rem;
  }
`;

const TransactionCard = ({
  title,
  amount,
  date,
  time,
  currency,
  convertedAmount,
}) => {
  return (
    <TransactCard className="transact_card">
      <div className="t_card_left">
        <div className="t_card_icon">
          {currency?.toLowerCase() === "INR".toLowerCase() && (
            <HiMiniCurrencyDollar />
          )}
          {currency?.toLowerCase() === "BTC".toLowerCase() && <SiBitcoinsv />}
        </div>
        <div className="t_card_info">
          <div className="t_card_label">{title}</div>
          <div className="t_card_time">
            <span>{date}</span>
            <span>{time}</span>
          </div>
        </div>
      </div>

      <div className="t_card_amount">
        <div>{amount}</div>
        <div>{convertedAmount}</div>
      </div>
    </TransactCard>
  );
};

export default TransactionCard;
