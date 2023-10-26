import React, { useEffect, useState } from "react";
import styled from "styled-components";

const NavBar = () => {
  const [show, setShow] = useState(false);
  console.log(show);
  const listener = () => {
    if (window.scrollY >= 50) {
      setShow(true);
    } else {
      setShow(false);
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
    </NavWrapper>
  );
};

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
