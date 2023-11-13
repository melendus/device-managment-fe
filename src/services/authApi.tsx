import { LoginDto } from "../types/types";

export async function signIn(requestBody: LoginDto) {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(requestBody),
  }).then((res) => res.json());

  if (!response.status) {
    localStorage.setItem("token", response.access_token);
    localStorage.setItem("loggedIn", "true");
  } else {
    localStorage.setItem("loggedIn", "false");
  }
  return await response;
}
