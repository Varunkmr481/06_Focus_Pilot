import { FaCaretDown, FaDownload, FaSearch } from "react-icons/fa";
import styled from "styled-components";
import Status from "./Status";
import { useEffect, useRef, useState } from "react";
import fakeTransactions from "../data/fakeData";
import TransactionViewRestriction from "./TransactionViewRestriction";

const GridContentTransaction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2vh;
`;

const ExportBtn = styled.button`
  width: 8rem;
  gap: 0.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: unset;
  outline: unset;
  border-radius: 0.5rem;
  background-color: #5f00d9;
  color: white;
  padding: 1.5vh 0.5vh;
  font-weight: 700;

  @media (min-width: 425px) {
    width: 10rem;
    gap: 0.7vh;
    padding: 1.8vh 0.8vh;
  }

  @media (min-width: 768px) {
    width: 11rem;
    gap: 0.9vh;
    padding: 1.8vh 3vh;
  }
`;

const Table = styled.div`
  width: 100%;
  height: auto;
  background-color: #5f00d9;
  color: white;
  border-radius: 0.9rem 0.9rem 0.9rem 0.9rem;
`;

const TableType = styled.div`
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  border-radius: 0.9rem 0.9rem 0 0;

  /* For laptop, desktop */
  .inputCell {
    margin-left: auto;
    padding: 1.5vh 1vw;
  }
`;

const TableTypeCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vh;
  padding: 3vh 1.5vw;
  font-weight: 800;
  border-radius: 0.9rem 0.9rem 0 0;

  &:hover {
    background-color: rgb(139, 50, 255);
    cursor: pointer;
  }
`;

const TableTypeInputCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vh;
  padding: 3vh 1.5vw;
  font-weight: 800;
  border-radius: 0.9rem 0.9rem 0 0;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: white;
  gap: 1vw;
`;

const Input = styled.input`
  outline: unset;
  border: ${({ $inputFocus }) =>
    $inputFocus ? "2px solid violet" : "2px solid white"};
  border-radius: 1rem;
  padding: 0.6rem 0.8rem;
  width: 13rem;
  transition: all 0.3s ease-in-out;
  margin-left: auto;
`;

const TableTypeSticker = styled.div`
  color: rgb(0, 0, 0);
  background-color: rgba(206, 204, 204, 0.8);
  border-radius: 0.7rem;
  padding: 0.3rem 0.5rem;
  font-size: 0.6rem;
  font-weight: 700;
`;

const TableHeader = styled.div`
  display: grid;
  padding: 0 2rem;
  /* justify-content: space-between; */
  align-items: center;
  /* padding: 0 auto; */
  /* margin: 0 auto; */
  grid-template-columns: 15vw 20vw 20vw 18vw 12vw;
  border-top: 1px solid rgba(0, 0, 0, 0.3);

  @media (min-width: 1024px) {
    grid-template-columns: 15vw 15vw 15vw 15vw 8vw;
  }
`;

const TableHeaderCell = styled.div`
  display: flex;
  gap: 1vh;
  padding: 2vh 0;
  font-weight: 800;
  border-radius: 0.9rem 0.9rem 0 0;
`;

const TableBody = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.3);
`;

const TableRow = styled.div`
  display: grid;
  /* justify-content: space-between; */
  grid-template-columns: 15vw 20vw 20vw 18vw 12vw;
  padding: 0 2rem;

  &:not(:last-child) > * {
    border-bottom: 0.5px solid rgb(92, 91, 91, 0.3);
  }

  @media (min-width: 1024px) {
    grid-template-columns: 15vw 15vw 15vw 15vw 8vw;
  }
`;

const TableRowCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  padding: 2vh 0;
  font-weight: 800;
`;

const LightShadeSpan = styled.span`
  /* color: rgba(91, 90, 90, 0.4); */
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  font-size: 0.9rem;
`;

const onSearchFocus = function (inputRef) {
  inputRef.current.focus();
};

const Transactions = () => {
  const [inputFocus, setInputFocus] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    function checkScreenSize() {
      // console.log(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    }

    // checkscreensize
    checkScreenSize();

    window.addEventListener("resize", () => checkScreenSize());

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <GridContentTransaction>
      <ExportBtn>
        <FaDownload />
        <span>Export CSV</span>
      </ExportBtn>

      {isMobile ? (
        <TransactionViewRestriction />
      ) : (
        <Table>
          {/* FILTER DATA */}
          <TableType>
            <TableTypeCell className="item_1">
              <span>All</span>
              <TableTypeSticker>349</TableTypeSticker>
            </TableTypeCell>

            <TableTypeCell>
              <span>Deposit</span>
              <TableTypeSticker>349</TableTypeSticker>
            </TableTypeCell>

            <TableTypeCell>
              <span>Withdraw</span>
              <TableTypeSticker>349</TableTypeSticker>
            </TableTypeCell>

            <TableTypeCell>
              <span>Trade</span>
              <TableTypeSticker>349</TableTypeSticker>
            </TableTypeCell>

            <TableTypeInputCell className="inputCell">
              <InputContainer>
                <FaSearch onClick={() => onSearchFocus(inputRef)} />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search by ID or destination"
                  onFocus={() => {
                    setInputFocus(true);
                  }}
                  onBlur={() => setInputFocus(false)}
                  $inputFocus={inputFocus}
                ></Input>
              </InputContainer>
            </TableTypeInputCell>
          </TableType>

          {/* TABLE HEADER */}
          <TableHeader>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>
              <span>Date & Time</span>
              <FaCaretDown />
            </TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>
              <span>Amount</span>
              <FaCaretDown />
            </TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableHeader>

          {/* TABLE DATA */}
          <TableBody>
            {fakeTransactions.map((transaction) => {
              return (
                <TableRow key={transaction.transactionId}>
                  <TableRowCell>
                    <span>{transaction.transactionId}</span>
                    <span></span>
                  </TableRowCell>
                  <TableRowCell>
                    <span>{transaction.date}</span>
                    <LightShadeSpan>{transaction.time}</LightShadeSpan>
                  </TableRowCell>
                  <TableRowCell>
                    <span>{transaction.type}</span>
                    <LightShadeSpan>{transaction.method}</LightShadeSpan>
                  </TableRowCell>
                  <TableRowCell>{transaction.amount}</TableRowCell>
                  <TableRowCell>
                    <Status statustext={transaction.status} />
                  </TableRowCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </GridContentTransaction>
  );
};

export default Transactions;
