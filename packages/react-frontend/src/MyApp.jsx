import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:3000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

 function removeOneCharacter(index) {
  const id = characters[index]._id;
  fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status === 204) {
        const updated = characters.filter((character, i) => i !== index);
        setCharacters(updated);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

  function postUser(person) {
    const promise = fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  function updateList(person) {
  postUser(person)
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      }
    })
    .then((newUser) => {
      setCharacters([...characters, newUser]);
    })
    .catch((error) => {
      console.log(error);
    });
}

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;