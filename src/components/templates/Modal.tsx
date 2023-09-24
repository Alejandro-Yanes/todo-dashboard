import { IaddTodoForm, addTodoForm } from "@/server/validation/todo";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { AiOutlineClose } from "react-icons/ai";
import Button from "../atoms/Button";
import { toast } from "react-hot-toast";
import { trpc } from "@/utils/trpc";
import { useCreateTodoModal } from "@/hooks/zustand/useCreateTodoModal";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";

export type ModalProps = {};

const Modal: React.FunctionComponent<ModalProps> = (props) => {
  const { isOpen, setClose } = useCreateTodoModal();
  const router = useRouter();

  const { boardId } = router.query;
  const { mutate } = trpc.todo.addTodo.useMutation({});
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<IaddTodoForm>({
    defaultValues: {
      title: "",
      description: "",
      substacks: [{ name: "" }, { name: "" }],
      status: "DOING",
    },
    resolver: zodResolver(addTodoForm),
  });

  const { fields, append, remove } = useFieldArray({
    name: "substacks",
    control,
  });

  const onSubmit = async (formData: IaddTodoForm) => {
    try {
      if (!boardId || typeof boardId !== "string") {
        toast.error("boardId needs to be a string");
        throw new Error("boardId needs to be a string");
      }
      mutate({ ...formData, boardId });
      setClose();
      toast.success("created todo");
    } catch (err) {
      toast.error("error creating todo");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="h-full w-full absolute inset-0 bg-black/30 z-[999] flex items-center justify-center">
      <div className="dark:bg-dark-main-color p-7 rounded-lg relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
        <h2 className="dark:text-dark-text-primary text-lg font-bold">
          Add New Task
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
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm dark:text-dark-text-primary font-bold tracking-wide"
            >
              Description
            </label>
            <textarea
              id="description"
              cols={30}
              rows={5}
              placeholder="e. g. it's always goot to take a break. this 15 minute break will recharge the batteries a little"
              className="border-2 dark:border-gray-200/10 bg-transparent rounded-md px-5 py-1"
              {...register("description", {
                required: "Please enter a description",
              })}
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="substacks"
              className="text-sm dark:text-dark-text-primary font-bold tracking-wide"
            >
              Substacks
            </label>

            <div className="flex-col flex gap-3">
              {fields &&
                fields.map((substack, i) => (
                  <div
                    className="flex items-center gap-3 form-control"
                    key={substack.id}
                  >
                    <input
                      id="title"
                      type="text"
                      placeholder="e. g. Take coffee break "
                      className="border-2 dark:border-gray-200/10 bg-transparent rounded-md px-5 py-1 flex-grow"
                      {...register(`substacks.${i}.name` as const)}
                    />
                    <button onClick={() => remove(i)}>
                      <AiOutlineClose
                        className="dark:text-dark-grey cursor-pointer"
                        size={25}
                      />
                    </button>
                  </div>
                ))}
              <Button
                type="button"
                actionLabel="+ Add New Substack"
                onClick={() => append({ name: "" })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="status"
              className="text-sm dark:text-dark-text-primary font-bold tracking-wide"
            >
              Status
            </label>

            <select
              id="status"
              className="border-2 dark:border-gray-200/10 bg-transparent rounded-md px-5 py-1 flex-grow dark:text-dark-grey "
              {...register("status")}
            >
              <option value="TODO">Todo</option>
              <option value="DOING">Doing</option>
              <option value="DONE">Done</option>
            </select>
          </div>
          <Button type="submit" actionLabel="Create Task" disabled={!isValid} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
