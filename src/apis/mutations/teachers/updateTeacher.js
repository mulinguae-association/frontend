import { useMutation, useQueryClient } from "react-query";
import handleError from "../../../utils/handleError";
import { notifyError, notifySuccess } from "../../../components/Notify";
import logError from "../../../utils/logError";
import { updateTeacher } from "../../apiUtility";

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