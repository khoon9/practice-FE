import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  User,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "../firebase";
import storage from "../utils/storage";

const initialUserData = storage.get<User>("userData");

const NavBar = () => {
  const [show, handleShow] = useState(false);
  const { pathname } = useLocation();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(initialUserData);
  const handleAuth = () => {
    // 비동기 프로그램이기에 .then 을 작성
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        storage.set("userData", result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    // 유저의 sign-in state 가 변할 때 이 호출을 불러온다
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        navigate("/login");
      } else if (user && pathname === "/login") {
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [pathname]);

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

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserData(null);
        storage.remove("userData");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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
        <SignOut>
          {userData?.photoURL && (
            <UserImg src={userData.photoURL} alt="user photo" />
          )}

          <Dropdown>
            <span onClick={handleLogout}>Sign out</span>
          </Dropdown>
        </SignOut>
      )}
    </NavWrapper>
  );
};

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  color: white;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    ${Dropdown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

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

const NavWrapper = styled.nav<{ show: boolean }>`
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
