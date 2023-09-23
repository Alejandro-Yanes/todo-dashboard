import Image from "next/image";
import LoginForm from "@/components/organisms/SignInForm";
import React from "react";
import SignUpForm from "@/components/organisms/SignUpForm";
import { motion } from "framer-motion";

export type SignInProps = {};

const SignIn: React.FunctionComponent<SignInProps> = (props) => {
  return (
    <div className="flex items-center min-h-screen bg-light-background dark:bg-dark-background relative">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl"
      >
        <div className="flex flex-col md:flex-row">
          <div className="h-72 md:h-auto md:w-1/2">
            <Image
              alt="random pic"
              src="https://images.unsplash.com/photo-1535376472810-5d229c65da09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
              className="w-full h-full"
              width={600}
              height={100}
              quality={100}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2 dark:bg-dark-main-color bg-light-main-color ">
            <SignUpForm />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
