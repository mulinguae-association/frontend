import React from "react";
import InputField from "../HelperComponents/InputField";
import Tooltip from "../HelperComponents/toolTip";
import { useState } from "react";
import { useRef } from "react";
import { useGlobal } from "../../contexts/AppContext.jsx";
import { useTranslation } from "react-i18next";

const TeachersController = ({ handleFormSubmit }) => {
  const { isBtnLoading } = useGlobal();
  const { t } = useTranslation("global");
  const fileInputRef = useRef(null);
  const [formState, setFormState] = useState({
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
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxImageSize = 1024 * 1024; // 1 MB

    if (file && file.size <= maxImageSize) {
      setFormState({ ...formState, image: file });
    } else {
      alert(t("app.imageTooLarge"));
      setFormState({ ...formState, image: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <section className="teacher_form">
      <h1>{t("admin.addTeacherInfo")}</h1>
      <form
        className="teacher_form"
        onSubmit={(e) => handleFormSubmit(e, formState, setFormState)}
      >
        <div className="teacher_name block">
          <InputField
            label={t("admin.firstName")}
            type="text"
            placeholder={t("admin.enterFirstName")}
            value={formState.firstName}
            onChange={(e) =>
              setFormState({ ...formState, firstName: e.target.value })
            }
            required
          />
          <InputField
            label={t("admin.lastName")}
            type="text"
            placeholder={t("admin.enterLastName")}
            value={formState.lastName}
            onChange={(e) =>
              setFormState({ ...formState, lastName: e.target.value })
            }
            required
          />
        </div>
        <div className="block">
          <InputField
            label={t("admin.email")}
            type="email"
            placeholder={t("admin.enterEmail")}
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            required
          />
          <InputField
            label={t("admin.jobBrief")}
            type="text"
            placeholder={t("admin.enterJobBrief")}
            value={formState.jobBrief}
            onChange={(e) =>
              setFormState({ ...formState, jobBrief: e.target.value })
            }
            required
          />
        </div>
        <div className="block">
          <label className="visually-hidden" htmlFor="aboutTeacher">
            {t("admin.aboutTeacher")}
          </label>
          <textarea
            id="aboutTeacher"
            placeholder={t("admin.enterAboutTeacher")}
            value={formState.aboutTeacher}
            onChange={(e) =>
              setFormState({ ...formState, aboutTeacher: e.target.value })
            }
            rows={2}
            cols={23}
            required
          />
          <InputField
            label={t("admin.telephone")}
            type="tel" // Use "tel" type for telephone input
            placeholder={t("admin.enterTelephone")}
            value={formState.telephone}
            onChange={(e) =>
              setFormState({ ...formState, telephone: e.target.value })
            }
            required
          />
        </div>
        <label className="upload_image" htmlFor="image">
          {!formState.image ? t("admin.uploadImage") : formState.image.name}
          <Tooltip text={t("admin.chooseImageLess1MB")} />
        </label>
        <input
          id="image"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
        />
        <button type="submit">
          {isBtnLoading["createTeacherBtn"]
            ? t("admin.addingTeacher")
            : t("admin.addTeacher")}
        </button>
      </form>
    </section>
  );
};

export default TeachersController;
