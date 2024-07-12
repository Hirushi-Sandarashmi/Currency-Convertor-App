"use server";
import { auth } from "#/app/auth";
import { redirect } from "next/navigation";
import { Bounce, toast } from "react-toastify";

export const signupAction = async (formData: FormData) => {
  const jsonData = Object.fromEntries(formData);
  const apiurl = process.env.API_URL || "http://127.0.0.1:3001/api/";

  const raw = JSON.stringify({
    name: jsonData.name,
    email: jsonData.email,
    password: jsonData.password,
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
  };

  const res = await fetch(apiurl + "auth/register", requestOptions);

  if (res.ok) {
    const data = await res.json();
    redirect("/login");
  } else {
    toast.error("Error: Api not responding!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  }
};
