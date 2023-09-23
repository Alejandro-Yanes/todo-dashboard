import Button from "../atoms/Button";
import { ILogin } from "@/server/validation/auth";
import React from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { trpc } from "@/utils/trpc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export type AuthFormProps = {};

const LoginForm: React.FunctionComponent<AuthFormProps> = ({}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ILogin>();

  const onSubmit = async (data: ILogin, e: any) => {
    try {
      const { email, password } = data;

      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
      toast.success("Logged in");
    } catch (err) {
      console.log(err);
      toast.error("Error while creating user");
    }
  };

  return (
    <div className="h-screen   dark:bg-dark-main-color bg-light-main-color p-6 flex flex-col gap-5 dark:text-dark-text-primary text-light-text-primary">
      <h2 className="text-2xl font-bold ">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex gap-10 flex-wrap md:flex-nowrap">
          <div className="flex flex-col gap-3 md:w-[40%] w-full ">
            <label
              htmlFor="email"
              className="text-sm uppercase tracking-wider font-bold "
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Please enter your email" })}
              className="rounded-sm p-2 border-2 border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-3 md:w-[40%] w-full">
            <label
              htmlFor="password"
              className="text-sm uppercase tracking-wider font-bold"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              {...register("password", {
                required: "Please enter your password",
              })}
              className="rounded-sm p-2 border-2 border-gray-300"
            />
          </div>
        </div>
        <Button actionLabel="Sign In" type="submit" disabled={isValid} />
      </form>
      <p className="text-center">
        Already has an account ,{" "}
        <span
          className="font-bold cursor-pointer"
          onClick={() => router.push("/auth/signup")}
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
