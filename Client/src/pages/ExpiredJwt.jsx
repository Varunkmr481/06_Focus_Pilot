import { MdGeneratingTokens } from "react-icons/md";
import SuccessNotification from "../components/SuccessNotification";

const ExpiredJwt = ({ title, btntext, to }) => {
  return (
    <SuccessNotification
      title={title}
      btntext={btntext}
      to={to}
    ></SuccessNotification>
  );
};

export default ExpiredJwt;
