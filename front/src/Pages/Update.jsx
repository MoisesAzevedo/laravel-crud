import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
const Update = () => {
  //navigate
  const navigate = useNavigate();
  //route params
  const { id, currentName, currentEmail } = useParams();

  //update params
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //flag and alert
  const [flagUseEffect, setFlagUseEffect] = useState(0);
  var [formAlert, setFormAlert] = useState("");
  var [flagSuccefully, setFlagSuccefully] = useState(null);

  //get update parameters
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle event:", event);

    setName(event.target[0].value);
    setEmail(event.target[1].value);
    setPassword(event.target[2].value);
    setPasswordConfirm(event.target[3].value);

    //to run useEffect
    if (flagUseEffect == 0) {
      setFlagUseEffect(1);
    } else {
      setFlagUseEffect(0);
    }

    //to view alert succefully
    setFlagSuccefully(1);
  };

  useEffect(() => {
    axios
      .put("http://127.0.0.1:8000/api/update/" + id + "?", {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirm
      })
      .then((response) => {
        console.log("then response");
        console.log(response);
        console.log("Params " + id + name + email + password);

        setFormAlert(null);
        console.log(flagSuccefully);
        if (flagSuccefully) {
          console.log(flagSuccefully);
          setFormAlert(
            <div class="alert alert-success mt-3" role="alert">
              User updated!
            </div>
          );
        }
      })
      .catch((err) => {
        console.log("catch err");
        console.log(err);

        console.log("Params " + id + name + email + password);

        setFormAlert(
          <div class="alert alert-danger mt-3" role="alert">
            {err.response.data.message}
          </div>
        );
      });
  }, [flagUseEffect]);

  return (
    <>
      <Navbar />
      <form
        class="ccol-12 col-md-5 col-lg-6 col-xl-4   mx-auto mt-5 "
        onSubmit={handleSubmit}
      >
        <div class="mb-3">
          <label for="InputName" class="form-label">
            Editar nome
          </label>
          <input
            type="text"
            class="form-control"
            id="InputName"
            defaultValue={currentName}
          />
        </div>

        <div class="mb-3">
          <label for="InputEmail1" class="form-label">
            Editar email
          </label>
          <input
            type="email"
            class="form-control"
            id="InputEmail1"
            aria-describedby="emailHelp"
            defaultValue={currentEmail}
          />
        </div>

        <div class="mb-3">
          <label for="InputPassword1" class="form-label">
            Editar senha
          </label>
          <input type="password" class="form-control" id="InputPassword1" />
        </div>

        <div class="mb-3">
          <label for="InputPassword2" class="form-label">
            Confirme a senha
          </label>
          <input type="password" class="form-control" id="InputPassword2" />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>

        <button
          onClick={() => {
            navigate("/users");
          }}
          class="btn btn-secondary m-2"
        >
          Return to users
        </button>

        {formAlert}
      </form>
    </>
  );
};

export default Update;
