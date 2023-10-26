import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../firebase";

const NavBar = () => {
  const [show, handleShow] = useState(false);
  const { pathname } = useLocation();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const handleAuth = () => {
    // 비동기 프로그램이기에 .then 을 작성
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
    });
  };
  const listener = () => {
    if (window.scrollY > 50) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);

    // unmount 될 때 동장
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);
  return (
    <NavWrapper show={show}>
      <Logo>
        <Image
          alt="Poke logo"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          onClick={() => (window.location.href = "/")}
        ></Image>
      </Logo>
      {pathname === "/login" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <></>
      )}
    </NavWrapper>
  );
};

const Login = styled.a`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Image = styled.img`
  cursor: pointer;
  width: 100%;
`;

const Logo = styled.a`
  padding: 0px;
  width: 50px;
  margin-top: 4px;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;

  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;

  letter-spacing: 16px;
  z-index: 100;
`;

export default NavBar;
