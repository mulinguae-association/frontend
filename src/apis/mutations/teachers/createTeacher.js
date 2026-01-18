import { useMutation, useQueryClient } from "react-query";
import handleError from "../../../utils/handleError";
import { notifyError, notifySuccess } from "../../../components/Notify";
import logError from "../../../utils/logError";
import { useGlobal } from "../../../contexts/AppContext.jsx";
import { createTeacher } from "../../apiUtility";

export const useCreateTeacherMutation = (defaultFormState) => {
  const { setButtonLoading } = useGlobal();
  const queryClient = useQueryClient();
  return useMutation(({ formState }) => createTeacher(formState), {
    onMutate: async ({ formState }) => {
      await queryClient.cancelQueries(["getTeachers"]);
      const previousTeachers = queryClient.getQueryData(["getTeachers"]);
      setButtonLoading("createTeacherBtn", true);
      queryClient.setQueryData(["getTeachers"], (oldTeachers = []) => {
        return [...oldTeachers, { ...formState, _id: String(Date.now()) }];
      });
      return { previousTeachers };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["getTeachers"], context.previousTeachers);
      notifyError(handleError(error));
      logError(error);
    },
    onSuccess: (_, { setFormState }) => {
      notifySuccess("Successfully added a new teacher");
      setFormState({ ...defaultFormState });
    },
    onSettled: () => {
      setButtonLoading("createTeacherBtn", false);
    },
  });
};
