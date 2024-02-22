import "bootstrap/dist/css/bootstrap.min.css";

const UserDelete = (id, name) => {
  console.log("DELETANDOO ");
  console.log(id);
  console.log(name);

  const url = "http://127.0.0.1:8000/api/destroy/" + id;
  console.log("url: " + url);

  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then((response) => {
      console.log("Status da resposta:", response.status);

      //recarregar pg
      window.location.reload();
      return response.json();
    })
    .then((data) => {
      console.log("Resposta JSON:", data);
      console.log("usuário " + name + " deletado");
    })
    .catch((error) => console.error("Catch error:" + error));
};

export default UserDelete;
