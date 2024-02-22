import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  UserItem,
  UserTitle,
  UserPhoto,
  Wrapper,
  M_Button
} from "../Components/MyStyle.jsx";
import Navbar from "../Components/Navbar.jsx";
import { useNavigate } from "react-router";
import UserDelete from "./UserDelete.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Users = () => {
  //list of users
  const [allUsers, setAllUsers] = useState([]);

  //redirect to update url
  const navigate = useNavigate();

  //modal alert and delete user
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState(null);

  //useEffect
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

  function UserUpdate(id, currentName, currentEmail) {
    console.log("index");
    console.log(id);

    navigate("/update/" + id + "/" + currentName + "/" + currentEmail);
  }

  function UserDeleteAlert(id, name) {
    console.log("user delete alert");
    setDeleteId(id);
    setDeleteName(name);

    setModalOpen(true);
  }

  function closeModal() {
    console.log("da um closeee");
    setModalOpen(false);
  }

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

                <UserItem position="absolute" right="0">
                  <M_Button
                    backgroundColor="#0d6efd"
                    color="white"
                    backgroundHover="#0a58ca"
                    backgroundActive="#0848a9"
                    onClick={() =>
                      UserUpdate(users.id, users.name, users.email)
                    }
                  >
                    Edit
                  </M_Button>

                  <M_Button
                    backgroundColor="#fd3333"
                    color="white"
                    backgroundHover="#cb2626"
                    backgroundActive="#ab2121"
                    onClick={() => UserDeleteAlert(users.id, users.name)}
                  >
                    Delete
                  </M_Button>
                </UserItem>
              </Container>
            </>
          );
        })}

        <Modal show={modalOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Excluir {deleteName}? </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ⚠ O usuário {deleteName} será excluido permanentemente!
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => UserDelete(deleteId, deleteName)}
            >
              {" "}
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      </Wrapper>
    </>
  );
};

export default Users;
