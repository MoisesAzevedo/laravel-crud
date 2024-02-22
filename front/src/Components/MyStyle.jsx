import React from "react";
import styled from "styled-components";

export const desktopDisplay = ["1291px", "1440px"];
export const tabletDisplay = ["1280px"];
export const mobileDisplay = ["1024px"];

export const Wrapper = styled.div`
  position: absolute;
  background-color: #f1fbff;
  width: 800px;
  border-radius: 10px;
  left: 50%;
  transform: translate(-50%, 30px);
  padding: 30px;
`;

export const Container = styled.div`
  display: flex;
  margin: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  align-items: center;
  height: 80px;
  position: relative;
`;

export const UserItem = styled.div`
  margin-right: 15px;
  position: ${(props) => props.position};
  right: ${(props) => props.right};
`;

export const UserPhoto = styled.img`
  width: 50px;
  height: 50px;
`;

export const UserTitle = styled.h3``;

export const M_Button = styled.button`
  margin: 5px;
  width: 76px;
  width: ${(props) => props.width};
  height: 38px;
  height: ${(props) => props.height};
  background-color: #0d6efd;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 6px;
  border: none;
  /* position: absolute;
  right: 0px; */
  color: ${(props) => props.color};
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => props.backgroundHover};
    transition: 0.3s;
  }

  &:active {
    background-color: ${(props) => props.backgroundActive};
    transition: 0.3s;
  }
`;
