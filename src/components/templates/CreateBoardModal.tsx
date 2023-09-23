import { IaddBoard, addBoard } from "@/server/validation/todo";
import React, { useEffect } from "react";

import Button from "../atoms/Button";
import { toast } from "react-hot-toast";
import { trpc } from "@/utils/trpc";
import { useCreateBoardModal } from "@/hooks/zustand/useCreateBoardModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type TestModalProps = {};

const CreateBoardModal: React.FunctionComponent<TestModalProps> = (props) => {
  const { mutate } = trpc.todo.addBoard.useMutation();
  const { isOpen, setClose } = useCreateBoardModal();
  const {
    register,
    handleSubmit,
    formState,
    reset,
    formState: { isValid, errors },
  } = useForm<IaddBoard>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(addBoard),
  });

  const onSubmit = (formData: IaddBoard) => {
    try {
      mutate(formData.title);
      setClose();
      reset();
      toast.success("Board created");
    } catch (err) {
      console.log(err);
      toast.error("Board Creation error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="h-full w-full absolute inset-0 bg-black/30 z-[999] flex items-center justify-center">
      <div className="dark:bg-dark-main-color p-7 rounded-lg relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
        <h2 className="dark:text-dark-text-primary text-lg font-bold">
          Add Board
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-sm dark:text-dark-text-primary font-bold tracking-wide"
            >
              Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="e. g. Take coffee break "
              {...register("title", { required: "Please enter a title" })}
              className="border-2 dark:border-gray-200/10 bg-transparent rounded-md px-5 py-1"
            />
          </div>
          <Button type="submit" actionLabel="Create Task" disabled={!isValid} />
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
