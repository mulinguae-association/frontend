import React from "react";
import TeachersController from "../../Dashboard/TeachersController";
import { useCreateTeacherMutation } from "../../../apis/mutations/teachers/createTeacher";
import "./NewTeacher.scss";
const NewTeacher = () => {
  const defaultFormState = {
    firstName: "",
    lastName: "",
    email: "",
    jobBrief: "",
    aboutTeacher: "",
    telephone: "",
    teaching_philosophy: "",
    career_summary: "",
    teaching_methods: "",
    qualification_cert: "",
    teacher_collaboration: "",
    classroom_management: "",
    behavior_management: "",
    additional_info: "",
    image: null,
  };
  const { mutate: createTeacherMutation } =
    useCreateTeacherMutation(defaultFormState);
  const handleFormSubmit = async (e, formState, setFormState) => {
    e.preventDefault();
    const formData = new FormData();
    // Iterate over keys of formState and append to formData
    Object.entries(formState).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value);
      }
    });
    formData.append("image", formState.image);
    createTeacherMutation({ formState, setFormState });
  };
  return (
    <>
      <TeachersController handleFormSubmit={handleFormSubmit} />
    </>
  );
};

export default NewTeacher;
