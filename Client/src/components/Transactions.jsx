import { FaCaretDown, FaDownload } from "react-icons/fa";
import styled from "styled-components";
import Status from "./Status";

const GridContentTransaction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2vh;
`;

const ExportBtn = styled.button`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5vh;
  border: unset;
  outline: unset;
  border-radius: 0.5rem;
  background-color: #4942e4;
  color: white;
  padding: 1.8vh 3vh;
`;

const Table = styled.div`
  width: 100%;
  height: auto;
  background-color: cornflowerblue;
  border-radius: 0.9rem 0.9rem 0.9rem 0.9rem;
`;

const TableType = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0.9rem 0.9rem 0 0;

  .input {
    background-color: red;
    margin-left: auto;
  }
`;

const TableTypeCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vh;
  padding: 2vh 3vw;
  font-weight: 800;
  border-radius: 0.9rem 0.9rem 0 0;

  &:hover {
    background-color: darkorchid;
    cursor: pointer;
  }
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
  justify-content: center;
  align-items: center;
  grid-template-columns: 10vw 20vw 15vw 15vw 6vw;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
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
  justify-content: center;
  grid-template-columns: 10vw 20vw 15vw 15vw 6vw;
`;

const TableRowCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  padding: 2vh 0;
  font-weight: 800;
  border-bottom: 0.5px solid rgb(92, 91, 91, 0.3);
`;

const LightShadeSpan = styled.span`
  color: rgba(91, 90, 90, 0.4);
  font-weight: 300;
  font-size: 0.9rem;
`;

const Transactions = () => {
  return (
    <GridContentTransaction>
      <ExportBtn>
        <FaDownload />
        <span>Export CSV</span>
      </ExportBtn>

      <Table>
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

          <TableTypeCell className="input">INput</TableTypeCell>
        </TableType>

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

        <TableBody>
          <TableRow>
            <TableRowCell>
              <span>HD82NA2H</span>
              <span></span>
            </TableRowCell>
            <TableRowCell>
              <span>2022-06-29</span>
              <LightShadeSpan>11:06 AM</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>
              <span>INR Withdraw</span>
              <LightShadeSpan>Wire Transfer</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>- ₹81,123.10</TableRowCell>
            <TableRowCell>
              <Status
                statustext="Pending"
                statusbgcolor="rgba(154,156,159,0.8)"
              />
            </TableRowCell>
          </TableRow>

          <TableRow>
            <TableRowCell>
              <span>HD82NA2H</span>
              <span></span>
            </TableRowCell>
            <TableRowCell>
              <span>2022-06-09</span>
              <LightShadeSpan>07:06 PM</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>
              <span>INR Deposit</span>
              <LightShadeSpan>E-Transfer</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>+ ₹81,123.10</TableRowCell>
            <TableRowCell>
              <Status
                statustext="Processing"
                statusbgcolor="rgba(245,164,12,0.8)"
              />
            </TableRowCell>
          </TableRow>

          <TableRow>
            <TableRowCell>
              <span>HD82NA2H</span>
              <span></span>
            </TableRowCell>
            <TableRowCell>
              <span>2022-06-09</span>
              <LightShadeSpan>07:06 PM</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>
              <span>INR Deposit</span>
              <LightShadeSpan>E-Transfer</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>+ ₹81,123.10</TableRowCell>
            <TableRowCell>
              <Status
                statustext="Cancelled"
                statusbgcolor="rgba(221, 26, 26, 0.8)"
              />
            </TableRowCell>
          </TableRow>

          <TableRow>
            <TableRowCell>
              <span>HD82NA2H</span>
              <span></span>
            </TableRowCell>
            <TableRowCell>
              <span>2022-06-09</span>
              <LightShadeSpan>07:06 PM</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>
              <span>INR Deposit</span>
              <LightShadeSpan>E-Transfer</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>+ ₹81,123.10</TableRowCell>
            <TableRowCell>
              <Status
                statustext="Completed"
                statusbgcolor="rgba(6, 156, 111, 0.8)"
              />
            </TableRowCell>
          </TableRow>

          <TableRow>
            <TableRowCell>
              <span>HD82NA2H</span>
              <span></span>
            </TableRowCell>
            <TableRowCell>
              <span>2022-06-09</span>
              <LightShadeSpan>07:06 PM</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>
              <span>INR Deposit</span>
              <LightShadeSpan>E-Transfer</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>+ ₹81,123.10</TableRowCell>
            <TableRowCell>
              <Status
                statustext="Completed"
                statusbgcolor="rgba(6, 156, 111, 0.8)"
              />
            </TableRowCell>
          </TableRow>

          <TableRow>
            <TableRowCell>
              <span>HD82NA2H</span>
              <span></span>
            </TableRowCell>
            <TableRowCell>
              <span>2022-06-09</span>
              <LightShadeSpan>07:06 PM</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>
              <span>INR Deposit</span>
              <LightShadeSpan>E-Transfer</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>+ ₹81,123.10</TableRowCell>
            <TableRowCell>
              <Status
                statustext="Cancelled"
                statusbgcolor="rgba(221, 26, 26, 0.8)"
              />
            </TableRowCell>
          </TableRow>

          <TableRow>
            <TableRowCell>
              <span>HD82NA2H</span>
              <span></span>
            </TableRowCell>
            <TableRowCell>
              <span>2022-06-09</span>
              <LightShadeSpan>07:06 PM</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>
              <span>INR Deposit</span>
              <LightShadeSpan>E-Transfer</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>+ ₹81,123.10</TableRowCell>
            <TableRowCell>
              <Status
                statustext="Completed"
                statusbgcolor="rgba(6, 156, 111, 0.8)"
              />
            </TableRowCell>
          </TableRow>

          <TableRow>
            <TableRowCell>
              <span>HD82NA2H</span>
              <span></span>
            </TableRowCell>
            <TableRowCell>
              <span>2022-06-09</span>
              <LightShadeSpan>07:06 PM</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>
              <span>INR Deposit</span>
              <LightShadeSpan>E-Transfer</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>+ ₹81,123.10</TableRowCell>
            <TableRowCell>
              <Status
                statustext="Completed"
                statusbgcolor="rgba(6, 156, 111, 0.8)"
              />
            </TableRowCell>
          </TableRow>

          <TableRow>
            <TableRowCell>
              <span>HD82NA2H</span>
              <span></span>
            </TableRowCell>
            <TableRowCell>
              <span>2022-06-09</span>
              <LightShadeSpan>07:06 PM</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>
              <span>INR Deposit</span>
              <LightShadeSpan>E-Transfer</LightShadeSpan>
            </TableRowCell>
            <TableRowCell>+ ₹81,123.10</TableRowCell>
            <TableRowCell>
              <Status
                statustext="Completed"
                statusbgcolor="rgba(6, 156, 111, 0.8)"
              />
            </TableRowCell>
          </TableRow>
        </TableBody>
      </Table>
    </GridContentTransaction>
  );
};

export default Transactions;
