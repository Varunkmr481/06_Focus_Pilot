import { useLocation } from "react-router";
import SuccessNotification from "./SuccessNotification";

const VerifyEmail = () => {
  const location = useLocation();
  const userEmail = location.state?.email || "your email address";

  return (
    <SuccessNotification
      icon={<img src="./mail.png" />}
      title="Email Verification"
      subtitle={`We have sent you an email verification to  ${userEmail}. If you didn’t receive it, click the button below.`}
      btntext="Re-Send Email"
    ></SuccessNotification>
  );
};

export default VerifyEmail;
