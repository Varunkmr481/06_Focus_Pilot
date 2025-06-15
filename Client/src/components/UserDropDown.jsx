import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router";

const AvatarWrapper = styled.div`
  position: relative;
`;

const AvatarImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 596px) {
    font-size: 1.6rem;
  }

  @media (min-width: 780px) {
    font-size: 2rem;
  }
`;

const AvatarDropDownMenu = styled.div`
  border: 2px solid black;
  position: absolute;
  right: 11%;
  top: 100%;
  z-index: 9999;
`;

const AvatarDropDownItem = styled(NavLink)`
  color: black;
  background-color: white;
  padding: 0.6rem 0.9rem;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 999;
  text-decoration: none;

  &:hover {
    background-color: #5f00d9;
    color: white;
    cursor: pointer;
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

const UserDropDown = ({
  avatarMenuItems,
  userAvatar,
  setHeaderText,
  // loggedInUser = "user",
}) => {
  const [isAvatarClick, setIsAvatarClick] = useState(false);
  const avatarRef = useRef(null);
  const [loggedInUser, setLoggedInUser] = useState("user");
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
    const loggedUser = localStorage.getItem("user");
    // console.log(loggedUser);

    if (loggedUser) {
      setLoggedInUser(
        loggedUser.charAt(0).toUpperCase() + loggedUser.slice(1).toLowerCase()
      );
    }
  }, []);

  return (
    <AvatarWrapper>
      <AvatarInfo>
        <AvatarName>Hello, {loggedInUser}</AvatarName>
        <AvatarImage
          ref={avatarRef}
          onClick={() => {
            setIsAvatarClick((prev) => !prev);
          }}
        >
          {userAvatar}
        </AvatarImage>
      </AvatarInfo>

      {/* <AvatarTriangle /> */}
      {isAvatarClick && (
        <AvatarDropDownMenu>
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
        </AvatarDropDownMenu>
      )}
    </AvatarWrapper>
  );
};

export default UserDropDown;
