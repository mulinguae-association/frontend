import { useMutation, useQueryClient } from "react-query";
import handleError from "../../../utils/handleError";
import { notifyError, notifySuccess } from "../../../components/Notify";
import logError from "../../../utils/logError";
import { deleteTeacher } from "../../apiUtility"

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