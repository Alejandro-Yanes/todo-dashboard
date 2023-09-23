import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ISignUp, signUpSchema } from "@/server/validation/auth";
import React, { useRef, useState } from "react";

import Button from "../atoms/Button";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { trpc } from "@/utils/trpc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export type AuthFormProps = {};

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
    },
  }),
};

const SignUpForm: React.FunctionComponent<AuthFormProps> = ({}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      username: "",
    },
  });

  const { mutateAsync } = trpc.auth.register.useMutation();

  const onSubmit = async (data: ISignUp) => {
    try {
      const { email, password } = data;
      const result = await mutateAsync(data);

      if (result.status === 201) {
        signIn("credentials", { email, password });
        router.push("/");
        toast.success("User Created");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error while creating user");
    }
  };

  return (
    <div className="w-full dark:text-dark-text-primary text-light-text-primary">
      <motion.h2
        variants={fadeInAnimationVariants}
        initial="initial"
        animate="animate"
        custom={0}
        className="mb-4 text-2xl font-bold text-center "
      >
        Sign Up
      </motion.h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 flex-col  ">
          <motion.div
            variants={fadeInAnimationVariants}
            initial="initial"
            animate="animate"
            custom={1}
            className="flex flex-col gap-3 w-full "
          >
            <label
              htmlFor="name"
              className="text-sm uppercase tracking-wider font-bold "
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="name"
              {...register("name", {
                required: true,
              })}
              className={`w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-700 ${
                errors.name && "focus:border-red-500 focus:ring-red-600"
              }`}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </motion.div>
          <motion.div
            variants={fadeInAnimationVariants}
            initial="initial"
            animate="animate"
            custom={2}
            className="flex flex-col gap-3  w-full "
          >
            <label
              htmlFor="username"
              className="text-sm uppercase tracking-wider font-bold "
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="username"
              {...register("username", {
                required: true,
              })}
              className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-700"
            />
            {errors.username && (
              <p className="text-red-600">{errors.username.message}</p>
            )}
          </motion.div>
          <motion.div
            variants={fadeInAnimationVariants}
            initial="initial"
            animate="animate"
            custom={3}
            className="flex flex-col gap-3 w-full "
          >
            <label
              htmlFor="email"
              className="text-sm uppercase tracking-wider font-bold "
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="email"
              {...register("email", {
                required: true,
              })}
              className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-700"
            />

            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </motion.div>
          <motion.div
            variants={fadeInAnimationVariants}
            initial="initial"
            animate="animate"
            custom={4}
            className="flex flex-col gap-3  w-full "
          >
            <label
              htmlFor="password"
              className="text-sm uppercase tracking-wider font-bold "
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={`${showPassword ? "text" : "password"}`}
                placeholder="password"
                {...register("password", {
                  required: true,
                })}
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-700"
              />
              <div className="absolute right-2 top-2 cursor-pointer hover:scale-110 transition">
                {showPassword ? (
                  <AiFillEyeInvisible
                    className="text-gray-700"
                    size={20}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <AiFillEye
                    className="text-gray-700"
                    size={20}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </motion.div>
          <motion.div
            variants={fadeInAnimationVariants}
            initial="initial"
            animate="animate"
            custom={5}
            className="mt-2"
          >
            <Button actionLabel="Sign Up" type="submit" />
          </motion.div>
          <motion.div
            variants={fadeInAnimationVariants}
            initial="initial"
            animate="animate"
            custom={6}
            className="text-center"
          >
            Already has an account ,{" "}
            <span
              className="font-bold cursor-pointer "
              onClick={() => router.push("/auth/signin")}
            >
              log in
            </span>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
