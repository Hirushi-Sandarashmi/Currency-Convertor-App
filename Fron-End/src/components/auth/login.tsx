"use client";
import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      color="primary"
      type="submit"
      isLoading={pending}
      disabled={pending}
      className="w-24"
    >
      Login
    </Button>
  );
};

export default LoginButton;
