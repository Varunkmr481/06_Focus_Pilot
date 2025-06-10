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

  &:hover {
    cursor: pointer;
  }
`;

const AvatarDropDownMenu = styled.div`
  border: 2px solid black;
  position: absolute;
  right: 11%;
  top: 100%;
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
  font-size: 1.2rem;
`;

const UserDropDown = ({
  avatarMenuItems,
  userAvatar,
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
        {/* {userAvatar} */}
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
                onClick={menuItem.action}
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
