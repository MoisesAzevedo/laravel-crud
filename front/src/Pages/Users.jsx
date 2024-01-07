import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  UserItem,
  UserTitle,
  UserPhoto,
  Wrapper,
  Button
} from "../Components/UsersStyled.jsx";
import Navbar from "../Components/Navbar.jsx";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);

  let thenExecuted = false;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users")
      .then((data) => {
        if (!thenExecuted) {
          thenExecuted = true;
          console.log("useEffect then", data);
          setAllUsers(data.data);
        }
      })
      .catch((err) => console.log("useEffect catch", err));
  }, []);

  //view result
  console.log("view result", allUsers);

  return (
    <>
      <Navbar />
      <Wrapper>
        {allUsers.map((users, index) => {
          return (
            <>
              <Container>
                <UserItem>
                  <UserPhoto
                    src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                    alt=""
                  />
                </UserItem>
                <UserItem>
                  <UserTitle>{users.name}</UserTitle>
                  <UserItem>{users.email}</UserItem>
                </UserItem>
                <Button
                  backgroundColor="#0d6efd"
                  color="white"
                  backgroundHover="#0a58ca"
                  backgroundActive="#0848a9"
                >
                  Edit
                </Button>
              </Container>
            </>
          );
        })}
      </Wrapper>
    </>
  );
};

export default Users;
