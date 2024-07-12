"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import { redirect } from "next/navigation";
import { signupAction } from "#/action/signupAction";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface Errors {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let tempErrors: Errors = { ...errors };
    let isValid = true;

    if (!formData.name) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.password_confirmation) {
      tempErrors.password_confirmation = "Password confirmation is required";
      isValid = false;
    } else if (formData.password !== formData.password_confirmation) {
      tempErrors.password_confirmation = "Passwords must match";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append(
        "password_confirmation",
        formData.password_confirmation
      );

      try {
        await signupAction(formDataToSend);
        redirect("/success");
      } catch (error) {
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
    }
  };

  return (
    <>
      <div>
        {" "}
        <ToastContainer />
      </div>
      <div>
        <Card className="w-[500px]">
          <CardHeader className="flex justify-center">
            <div>Register to Currency Transfer App</div>
          </CardHeader>
          <CardBody>
            <form
              className="flex flex-col items-center justify-center gap-5 p-2"
              onSubmit={handleSubmit}
            >
              <div>
                <Input
                  name="name"
                  type="text"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-96 p-0"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <Input
                  name="email"
                  type="text"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-96 p-0"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-96 p-0"
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              <div>
                <Input
                  name="password_confirmation"
                  type="password"
                  label="Password Confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="w-96 p-0"
                />
                {errors.password_confirmation && (
                  <p className="text-sm text-red-600">
                    {errors.password_confirmation}
                  </p>
                )}
              </div>
              <Button type="submit" color="primary">
                Register
              </Button>
            </form>
          </CardBody>
          <CardFooter className="text-white/50 text-sm">
            or already have an account?&nbsp;{" "}
            <Link href="/login" className="text-primary-400">
              Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SignUpPage;
