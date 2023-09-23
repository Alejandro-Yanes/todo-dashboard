import Button from "../atoms/Button";
import { ILogin } from "@/server/validation/auth";
import React from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { trpc } from "@/utils/trpc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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

const SignInForm: React.FunctionComponent<AuthFormProps> = ({}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ILogin>();

  const onSubmit = async (data: ILogin, e: any) => {
    await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    }).then((signInResponse) => {
      if (signInResponse?.ok) {
        toast.success("Logged in");
        router.push("/");
      } else {
        toast.error(signInResponse?.error || "Error logging in");
      }
    });
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
        Sign In
      </motion.h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 flex-col  ">
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
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                })}
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-700"
              />
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
            <Button actionLabel="Sign In" type="submit" />
          </motion.div>
          <motion.div
            variants={fadeInAnimationVariants}
            initial="initial"
            animate="animate"
            custom={6}
            className="text-center"
          >
            No account ?
            <span
              className="font-bold cursor-pointer "
              onClick={() => router.push("/auth/signup")}
            >
              Register
            </span>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
