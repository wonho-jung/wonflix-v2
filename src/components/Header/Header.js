import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import avatar from "../../assets/netflix-avatar.png";
import logo from "../../assets/netflix-logo2.png";
function Header(props) {
  const [show, handleShow] = useState(true);
  const pathname = props.location.pathname;
  console.log(pathname);
  const transitionNavBar = () => {
    if (window.scrollY < 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);
  return (
    <HeaderContainer current={show}>
      <HeaderContent>
        <HeaderLeft>
          <img src={logo} alt="" />
          <Nav>
            <Item current={pathname === "/"}>
              <Link to="/">Movie</Link>
            </Item>
            <Item current={pathname === "/tv"}>
              <Link to="/tv">TV</Link>
            </Item>
            <Item current={pathname === "/search"}>
              <Link to="/search">Search</Link>
            </Item>
          </Nav>
        </HeaderLeft>
        <HedaerRight>
          <img src={avatar} alt="" />
        </HedaerRight>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default withRouter(Header);

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  padding: 10px 20px;
  width: 100%;
  height: 60px;
  z-index: 1;
  transition-timing-function: ease-in;
  transition: all 0.5s;
  background-color: #111;
  opacity: ${(props) => (props.current ? "1" : "0.7")};
`;

const HeaderContent = styled.div`
  opacity: 1 !important;
  display: flex;
  justify-content: space-around;
`;
const HeaderLeft = styled.div`
  img {
    opacity: 1 !important;

    position: fixed;
    top: 15px;
    left: 0;
    width: 80px;
    object-fit: contain;
    padding-left: 20px;
    cursor: pointer;
  }
`;
const Nav = styled.ul`
  position: fixed;
  top: 0;
  left: 150px;
  display: flex;
  list-style: none;
  align-items: center;
  transform: translate(0, 45%);
`;
const Item = styled.li`
  /* margin: 0 10px; */
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 5px solid
    ${(props) => (props.current ? "#E71C23" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;

  a {
    text-decoration: none;

    color: #fff;
  }
`;
const HedaerRight = styled.div`
  display: flex;
  align-items: center;
  img {
    position: fixed;
    top: 0;
    transform: translate(0, 75%);
    right: 20px;
    width: 30px;
  }
`;
