import Image from "next/image";
import LoginForm from "@/components/organisms/SignInForm";
import React from "react";
import RegisterForm from "@/components/organisms/SignOutForm";

export type SignInProps = {};

const SignIn: React.FunctionComponent<SignInProps> = (props) => {
  return (
    <div className="flex h-screen w-full bg-light-background dark:bg-dark-background relative">
      <div className="relative w-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1535376472810-5d229c65da09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          fill
          sizes="100vh"
          style={{ objectFit: "cover" }}
          alt="test"
        />
      </div>

      <div className="flex-grow h-screen">
        <RegisterForm />
      </div>
    </div>
  );
};

export default SignIn;
