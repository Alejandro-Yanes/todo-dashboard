import { BsMoon, BsSun } from "react-icons/bs";
import { ISignUp, signUpSchema } from "@/server/validation/auth";

import ThemeSwitcher from "@/component/themeSwitcher";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { trpc } from "@/utils/trpc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ISignUp>({
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
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-2 bg-gray-200 rounded-sm text-black"
      >
        <input
          type="text"
          placeholder="name"
          {...register("name", {
            required: "Please enter your name.",
          })}
        />
        <input
          type="text"
          placeholder="username"
          {...register("username", { required: "Please enter your username" })}
        />
        <input
          type="email"
          placeholder="email"
          {...register("email", { required: "Please enter your email" })}
        />
        <input
          type="password"
          {...register("password", { required: "Please enter your password" })}
        />
        <button type="submit" className="text-black">
          create user
        </button>
      </form>

      <ThemeSwitcher />
    </main>
  );
}
