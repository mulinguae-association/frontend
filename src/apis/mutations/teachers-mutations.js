import { useMutation, useQueryClient } from "react-query";
import { createTeacher, deleteTeacher, updateTeacher } from "../apiUtility";
import handleError from "../../utils/handleError";
import { notifyError, notifySuccess } from "../../components/Notify";
import logError from "../../utils/logError";
import { useGlobal } from "../../contexts/AppContext";

export const useUpdateTeacherMutation = (onEdit) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ teacherId, updatedTeacher }) => updateTeacher(teacherId, updatedTeacher),
    {
      onMutate: async ({ teacherId, updatedTeacher }) => {
        await queryClient.cancelQueries(['getTeachers']);
        const previousTeachers = queryClient.getQueryData(['getTeachers']);
        queryClient.setQueryData(['getTeachers'], (teachers) => {
          return teachers.map((teacher) =>
            (teacher._id === teacherId ? { ...teacher, ...updatedTeacher } : teacher)
          );
        });
        onEdit(null);
        return { previousTeachers };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData(['getTeachers'], context.previousTeachers);
        notifyError(handleError(error));
        logError(error);
      },
      onSuccess: () => {
        notifySuccess('Successfully updated a teacher');
      }
    }
  );
};

export const useDeleteTeacherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (teacherId) => deleteTeacher(teacherId),
    {
      onMutate: async (teacherId) => {
        await queryClient.cancelQueries(['getTeachers']);
        const previousTeachers = queryClient.getQueryData(['getTeachers']);
        queryClient.setQueryData(['getTeachers'], (teachers) => {
          return teachers.filter((teacher) => teacher._id !== teacherId)
        });
        return { previousTeachers };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData(['getTeachers'], context.previousTeachers);
        notifyError(handleError(error));
        logError(error);
      },
      onSuccess: () => {
        notifySuccess("Successfully deleted a teacher")
      }
    }
  );
};

export const useCreateTeacherMutation = (defaultFormState) => {
  const { setButtonLoading } = useGlobal();
  const queryClient = useQueryClient();
  return useMutation(({ formState }) => createTeacher(formState), {
    onMutate: async ({ formState }) => {
      await queryClient.cancelQueries(['getTeachers']);
      const previousTeachers = queryClient.getQueryData(['getTeachers']);
      setButtonLoading("createTeacherBtn", true);
      queryClient.setQueryData(["getTeachers"], (old) => [...old, { ...formState, _id: String(Date.now()) }]);
      return { previousTeachers }
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["getTeachers"], context.previousTeachers);
      notifyError(handleError(error));
      logError(error);
    },
    onSuccess: (_, { setFormState }) => {
      notifySuccess("Successfully added a new teacher")
      setFormState({ ...defaultFormState });
    },
    onSettled: () => {
      setButtonLoading("createTeacherBtn", false)
    }
  })
};