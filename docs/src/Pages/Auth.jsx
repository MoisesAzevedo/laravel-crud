import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useNavigate } from "react-router";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flagUseEffect, setFlagUseEffect] = useState(0);
  const [flagAxios, setFlagAxios] = useState(false);
  const [FormAlert, setFormAlert] = useState("");

  const navigate = useNavigate();

  const LoginSubmit = (event) => {
    event.preventDefault();
    console.log("LoginSubmit executed", event);

    //to run UseEffect
    if (flagUseEffect == 0) {
      setFlagUseEffect(1);
    } else {
      setFlagUseEffect(0);
    }

    //to run axios
    setFlagAxios(true);

    setEmail(event.target[0].value);
    setPassword(event.target[1].value);
  };

  useEffect(() => {
    if (flagAxios) {
      axios
        .post("http://127.0.0.1:8000/api/auth", {
          email: email,
          password: password
        })
        .then((response) => {
          console.log("Then response", response.data);

          if (response.data.success == true) {
            console.log("logado:", response.data.message);

            navigate("/users");
          } else {
            console.log("nao logado:", response.data.message);

            setFormAlert(
              <div class="alert alert-danger mt-3" role="alert">
                {response.data.message}
              </div>
            );
          }
        })
        .catch((err) => {
          console.log("Cath error", err);
        });
    }
  }, [flagUseEffect]);

  return (
    <>
      <Navbar />{" "}
      <form
        class="col-12 col-md-5 col-lg-6 col-xl-4   mx-auto mt-5 "
        onSubmit={LoginSubmit}
      >
        <div class="mb-3">
          <label for="InputEmail1" class="form-label" aria-required>
            Email do usuário
          </label>
          <input
            type="email"
            class="form-control"
            id="InputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div class="mb-3">
          <label for="InputPassword1" class="form-label" aria-required>
            Senha do usuário
          </label>
          <input
            type="password"
            class="form-control"
            id="InputPassword1"
            required
          />
        </div>

        <div class="d-grid gap-2">
          <button class="btn btn-primary" type="submit">
            Submit
          </button>
          <label for="button1" class="buttom-label mt-5" aria-required>
            Não possui uma conta?
          </label>
          <button
            class="btn btn-dark"
            type="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Criar nova conta
          </button>
        </div>

        {FormAlert}
      </form>
    </>
  );
};

export default Auth;
