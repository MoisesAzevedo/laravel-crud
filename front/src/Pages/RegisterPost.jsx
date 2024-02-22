import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

const RegisterPost = () => {
  //test componnent
  console.log("componnent executed - initial");

  //flags and standard consts
  const [flagUseEffect, setFlagUseEffect] = useState(0);
  const [flagAxios, setFlagAxios] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //alert
  var [formAlert, setFormAlert] = useState("");

  //function of submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle event:", event);

    //to run useEffect
    if (flagUseEffect == 0) {
      setFlagUseEffect(1);
    } else {
      setFlagUseEffect(0);
    }

    //to run axios
    setFlagAxios(true);

    setName(event.target[0].value);
    setEmail(event.target[1].value);
    setPassword(event.target[2].value);
    setPasswordConfirm(event.target[3].value);

    //previous handleSubmit test
    console.log("Handle Submit anterior:", name);
  };
  //current handleSubmit test
  console.log("Handle Submit atual:", name);

  useEffect(() => {
    console.log("useEffect executed");

    if (flagAxios) {
      axios
        .post("http://127.0.0.1:8000/api/auth/register", {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirm
        })
        .then((response) => {
          setFormAlert(
            <div class="alert alert-success mt-3" role="alert">
              User created successfully!
            </div>
          );
          console.log("axios post then", response);
        })
        .catch((error) => {
          console.error("Axios post error", error);
          console.log("error status", error.response.status);
          setFormAlert(
            <div class="alert alert-danger mt-3" role="alert">
              {error.response.data.message}
            </div>
          );

          if (error.response.status == 422) {
            setFormAlert(
              <div class="alert alert-danger mt-3" role="alert">
                {error.response.data.message}
              </div>
            );
          }
        });
    }
  }, [flagUseEffect]);

  //test componnent
  console.log("componnent executed - final");

  return (
    <>
      <Navbar />
      <form
        class="ccol-12 col-md-5 col-lg-6 col-xl-4   mx-auto mt-5 "
        onSubmit={handleSubmit}
      >
        <div class="mb-3">
          <label for="InputName" class="form-label">
            Nome do novo usuário
          </label>
          <input type="text" class="form-control" id="InputName" />
        </div>

        <div class="mb-3">
          <label for="InputEmail1" class="form-label">
            Email do novo usuário
          </label>
          <input
            type="email"
            class="form-control"
            id="InputEmail1"
            aria-describedby="emailHelp"
          />
        </div>

        <div class="mb-3">
          <label for="InputPassword1" class="form-label">
            Senha do novo usuário
          </label>
          <input type="password" class="form-control" id="InputPassword1" />
        </div>

        <div class="mb-3">
          <label for="InputPassword2" class="form-label">
            Confirme a senha
          </label>
          <input type="password" class="form-control" id="InputPassword2" />
        </div>

        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>

        {formAlert}
      </form>
    </>
  );
};

export default RegisterPost;
