import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { NavLink, useNavigate } from "react-router";
import { IoLogOut, IoLogOutOutline, IoMoonOutline } from "react-icons/io5";
import { MdDarkMode, MdLightMode, MdSupportAgent } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import toast from "react-hot-toast";
import AvatarDropDown from "./AvatarDropDown";

const AvatarWrapper = styled.div`
  position: relative;
`;

const AvatarImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
    transform: scale(1.15);
    transition: all 0.3s ease-in-out;
  }

  @media (min-width: 596px) {
    font-size: 1.6rem;
  }

  @media (min-width: 780px) {
    font-size: 2rem;
  }
`;

// const AvatarDropDownMenu = styled.div`
//   border: 2px solid black;
//   position: absolute;
//   right: 11%;
//   top: 100%;
//   z-index: 9999;
// `;

// const AvatarDropDownItem = styled(NavLink)`
//   color: black;
//   background-color: white;
//   padding: 0.6rem 0.9rem;
//   font-size: 1.2rem;
//   font-weight: 600;
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   z-index: 999;
//   text-decoration: none;

//   &:hover {
//     background-color: #5f00d9;
//     color: white;
//     cursor: pointer;
//   }
// `;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AvatarDropDownMenu = styled.div`
  position: absolute;
  right: 11%;
  top: 100%;
  z-index: 9999;
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(220, 220, 220, 0.5);
  min-width: 15rem;
  animation: ${fadeIn} 0.2s ease-out forwards;
`;

const AvatarDropDownItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: #333;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  svg {
    font-size: 1.4rem;
    color: #6c6c6c;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    background: linear-gradient(90deg, #f5e9ff 0%, rgba(255, 255, 255, 0) 100%);
    color: #5f00d9;
    cursor: pointer;
    font-weight: 600;

    svg {
      color: #5f00d9;
    }
  }

  &.active {
    background-color: #f5e9ff;
    color: #5f00d9;
    font-weight: 600;
  }
`;

const AvatarInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;

const AvatarName = styled.div`
  font-size: 0.9rem;
  display: none;

  @media (min-width: 425px) {
    display: block;
  }

  @media (min-width: 596px) {
    font-size: 1rem;
  }

  @media (min-width: 780px) {
    font-size: 1.1rem;
  }
`;

const ColumnFlexDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;

  @media (min-width: 768px) {
    gap: 1.2rem;
  }
`;

const LogoutBtn = styled(IoLogOutOutline)`
  font-size: 1.3rem;

  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    transform: scale(1.15);
  }

  @media (min-width: 768px) {
    font-size: 2.1rem;
  }
`;

const CustomerCare = styled(MdSupportAgent)`
  font-size: 1.3rem;

  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    transform: scale(1.15);
  }

  @media (min-width: 768px) {
    font-size: 2.1rem;
  }
`;

const DarkModeBtn = styled(IoMoonOutline)`
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    transform: scale(1.15);
  }

  @media (min-width: 768px) {
    font-size: 1.7rem;
  }
`;

const UserDropDown = ({
  avatarMenuItems,
  userAvatar,
  setHeaderText,
  // loggedInUser = "user",
}) => {
  const [isAvatarClick, setIsAvatarClick] = useState(false);
  const avatarRef = useRef(null);
  const [loggedInUser, setLoggedInUser] = useState({
    name: "user",
    email: "user@gmail.com",
  });
  const navigate = useNavigate();
  console.log("avatarMenuItems", avatarMenuItems);

  useEffect(() => {
    function checkClickOutside(event) {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsAvatarClick(false);
      }
    }

    document.addEventListener("click", checkClickOutside);

    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
  }, []);

  useEffect(() => {
    const loggedUserName = localStorage.getItem("user");
    const loggedUserEmail = localStorage.getItem("email");

    if (loggedUserName) {
      setLoggedInUser({
        name:
          loggedUserName.charAt(0).toUpperCase() +
          loggedUserName.slice(1).toLowerCase(),
        email: loggedUserEmail,
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Successfully logged out!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleCustomerCare = () => {
    navigate("/support");
  };

  return (
    <AvatarWrapper>
      <ColumnFlexDiv>
        <AvatarInfo>
          <AvatarName>{loggedInUser.name}</AvatarName>

          <AvatarImage
            ref={avatarRef}
            onClick={() => {
              setIsAvatarClick((prev) => !prev);
            }}
          >
            {userAvatar}
          </AvatarImage>
        </AvatarInfo>

        <DarkModeBtn />
        <CustomerCare onClick={handleCustomerCare} />
        <LogoutBtn onClick={logout} />

        {/* <MdLightMode /> */}
      </ColumnFlexDiv>
      {/* <AvatarTriangle /> */}
      {isAvatarClick && (
        <AvatarDropDown
          setHeaderText={setHeaderText}
          handleLogout={logout}
          avatarMenuItems={avatarMenuItems}
          loggedInUser={loggedInUser}
        />
      )}

      {/* <AvatarDropDownMenu>
        {avatarMenuItems.map((menuItem, index) => {
          return (
            <AvatarDropDownItem
              key={index}
              to={menuItem?.to}
              onClick={() => {
                menuItem.action();
                setHeaderText(menuItem.label);
              }}
            >
              <span>{menuItem.icon}</span>
              <span>{menuItem.label}</span>
            </AvatarDropDownItem>
          );
        })}
      </AvatarDropDownMenu>{" "} */}
    </AvatarWrapper>
  );
};

export default UserDropDown;
