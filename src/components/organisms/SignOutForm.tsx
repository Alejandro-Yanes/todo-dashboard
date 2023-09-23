import { ISignUp, signUpSchema } from "@/server/validation/auth";

import Button from "../atoms/Button";
import React from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { trpc } from "@/utils/trpc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export type AuthFormProps = {};

const RegisterForm: React.FunctionComponent<AuthFormProps> = ({}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
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
    <div className="h-screen dark:bg-dark-main-color bg-light-main-color p-6 flex flex-col gap-5 dark:text-dark-text-primary text-light-text-primary">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-10 flex-wrap ">
          <div className="flex flex-col gap-3 md:w-[40%] w-full ">
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
                required: "Please enter your name.",
              })}
              className="rounded-sm p-2"
            />
          </div>
          <div className="flex flex-col gap-3 md:w-[40%] w-full ">
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
                required: "Please enter your username",
              })}
              className="rounded-sm p-2"
            />
          </div>
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
              placeholder="email"
              {...register("email", { required: "Please enter your email" })}
              className="rounded-sm p-2"
            />
          </div>
          <div className="flex flex-col gap-3 md:w-[40%] w-full ">
            <label
              htmlFor="password"
              className="text-sm uppercase tracking-wider font-bold "
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
              className="rounded-sm p-2"
            />
          </div>
        </div>
        <Button actionLabel="Sign Up" type="submit" disabled={isValid} />
      </form>
      <p>
        Already has an account ,{" "}
        <span
          className="font-bold cursor-pointer"
          onClick={() => router.push("/auth/signin")}
        >
          log in
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
