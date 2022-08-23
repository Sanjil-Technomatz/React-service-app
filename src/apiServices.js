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
  }).then((res) => res.json());
}

export function deleteUserData(id) {
  fetch(`http://localhost:3001/users/${id}`, {
    method: "DELETE",
  });
}

export function updateData(data, id) {
  fetch(`http://localhost:3001/users/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export function fetchSingleUserData() {
  fetch("http://localhost:3001/users")
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(singleData(res.users[res.users.length - 1]));
    })
    .catch(() => store.dispatch(serviceFailed()));
}

export function fetchAllUserData() {
  fetch(`http://localhost:3001/users`)
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(serviceData(res.users));
    })
    .catch(() => store.dispatch(serviceFailed()));
}

export function fetchFilterData(service) {
  fetch(`http://localhost:3001/users/?role=${service}`)
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(serviceData(res.users));
    })
    .catch(() => store.dispatch(serviceFailed()));
}
