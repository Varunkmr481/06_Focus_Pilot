import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router";

const AvatarWrapper = styled.div`
  position: relative;
`;

const AvatarImage = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const AvatarDropDownMenu = styled.div`
  border: 2px solid black;
  position: absolute;
  right: 48%;
  top: 80%;
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
const UserDropDown = ({ avatarMenuItems, userAvatar }) => {
  const [isAvatarClick, setIsAvatarClick] = useState(false);
  const avatarRef = useRef(null);
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

  return (
    <AvatarWrapper
      ref={avatarRef}
      onClick={() => {
        setIsAvatarClick((prev) => !prev);
      }}
    >
      <AvatarImage>{userAvatar}</AvatarImage>

      {/* <AvatarTriangle /> */}
      {isAvatarClick && (
        <AvatarDropDownMenu>
          {avatarMenuItems.map((menuItem, index) => {
            return (
              <AvatarDropDownItem key={index} to={menuItem.to || "/"}>
                <span>{menuItem.icon}</span>
                <span>{menuItem.label}</span>
              </AvatarDropDownItem>
            );
          })}

          {/* <AvatarDropDownItem>
            <span>
              <FaUser />
            </span>
            <span>Profile</span>
          </AvatarDropDownItem>

          <AvatarDropDownItem>
            <span>
              <IoSettings />
            </span>
            <span>Settings</span>
          </AvatarDropDownItem>

          <AvatarDropDownItem>
            <span>
              <RiLogoutBoxRFill />
            </span>
            <span>Logout</span>
          </AvatarDropDownItem> */}
        </AvatarDropDownMenu>
      )}
    </AvatarWrapper>
  );
};

export default UserDropDown;
