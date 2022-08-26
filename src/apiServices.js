import store from "./store";
import { singleData } from "./dataReducer";
import { serviceFailed } from "./dataReducer";
import { serviceData } from "./dataReducer";

export default function postData(data) {
  fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (JSON.stringify(res.error) !== "undefined") {
        alert("email already exist");
      }
    });
}

export function login(data) {
  fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      localStorage.setItem("token", JSON.stringify(result.token));
    });
}

export function deleteUserData(id) {
  fetch(`http://localhost:3001/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token")),
    },
  });
}

export function updateData(data, id) {
  fetch(`http://localhost:3001/users/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("token")),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export function fetchSingleUserData(email) {
  fetch(`http://localhost:3001/users/?email=${email}`, {
    method: "GET",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token")),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(singleData(res.users[0]));
    })
    .catch(() => store.dispatch(serviceFailed()));
}

export function fetchAllUserData() {
  fetch(`http://localhost:3001/users`, {
    method: "GET",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token")),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(serviceData(res.users));
    })
    .catch(() => store.dispatch(serviceFailed()));
}

export function fetchFilterData(service) {
  fetch(`http://localhost:3001/users/?role=${service}`, {
    method: "GET",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token")),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(serviceData(res.users));
    })
    .catch(() => store.dispatch(serviceFailed()));
}
