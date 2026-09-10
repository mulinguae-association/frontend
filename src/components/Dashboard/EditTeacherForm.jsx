import React, { useState, useEffect } from 'react';
import { notifyError } from '../Notify';
import InputField from '../HelperComponents/InputField';
import Tooltip from '../HelperComponents/toolTip';
import { useTranslation } from 'react-i18next';
import { useUpdateTeacherMutation } from '../../apis/mutations/teachers/updateTeacher';

const EditTeacherForm = ({ teacher, onEdit }) => {
  const { t } = useTranslation('global');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobBrief: '',
    aboutTeacher: '',
    email: '',
    telephone: '',
    image: null
  });

  useEffect(() => {
    if (teacher) {
      setFormData({
        firstName: teacher.firstName || '',
        lastName: teacher.lastName || '',
        jobBrief: teacher.jobBrief || '',
        aboutTeacher: teacher.aboutTeacher || '',
        email: teacher.email || '',
        telephone: teacher.telephone || '',
        image: teacher.image || ''
      });
    }
  }, [teacher]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxImageSize = 1024 * 1024; // 1 MB

    if (file && file.size <= maxImageSize) {
      setFormData({ ...formData, image: file });
    } else {
      alert(t('app.imageTooLarge'))
    }
  };

  const { mutate: updateTeacherMutation } = useUpdateTeacherMutation(onEdit);
  const isFormDataChanged = () => {
    if (formData.firstName !== teacher.firstName) return true;
    if (formData.lastName !== teacher.lastName) return true;
    if (formData.jobBrief !== teacher.jobBrief) return true;
    if (formData.aboutTeacher !== teacher.aboutTeacher) return true;
    if (formData.email !== teacher.email) return true;
    if (formData.telephone !== teacher.telephone) return true;
    if (formData.image && formData.image.name !== (teacher.image && teacher.image.name)) return true;
    return false;
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedTeacher = {
      ...teacher,
      ...formData
    };
    if (!isFormDataChanged()) {
      notifyError(t("app.noChangesMade"));
      return;
    }
    updateTeacherMutation({ teacherId: teacher._id, updatedTeacher });
  }

  return (
    <form className="edit_form" onSubmit={handleUpdate}>
      <label className="upload_image" htmlFor="image">
        {!formData.image ? t('admin.changeImage') : formData.image.name || t('admin.changeImage')}
        <Tooltip text={t('admin.chooseImageLessThan1MB')} />
      </label>
      <input
        id="image"
        className="input_image"
        type="file"
        accept="image/*"
        name='image'
        onChange={handleImageChange}
      />
      <div className="teacher_name block">
        <div className='block'>
          <label className="visually-hidden" htmlFor="firstName">
            {t('admin.firstName')}
          </label>
          <InputField
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder={t('admin.firstName')}
            required
          />
        </div>
        <div className='block'>
          <label className="visually-hidden" htmlFor="lastName">
            {t('admin.lastName')}
          </label>
          <InputField
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder={t('admin.lastName')}
            required
          />
        </div>
      </div>
      <label className="visually-hidden" htmlFor="jobBrief">
        {t('admin.jobBrief')}
      </label>
      <InputField
        type="text"
        name="jobBrief"
        id="jobBrief"
        value={formData.jobBrief}
        onChange={handleInputChange}
        placeholder={t('admin.jobBrief')}
      />
      <label className="visually-hidden" htmlFor="telephone">
        {t('admin.telephone')}
      </label>
      <InputField
        type="tel"
        name="telephone"
        id="telephone"
        value={formData.telephone}
        onChange={handleInputChange}
        placeholder={t('admin.telephone')}
      />
      <label className="visually-hidden" htmlFor="email">
        {t('admin.email')}
      </label>
      <InputField
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder={t('admin.email')}
      />
      <label className="visually-hidden" htmlFor="aboutTeacher">
        {t('admin.aboutTeacher')}
      </label>
      <textarea
        rows={4}
        cols={100}
        name="aboutTeacher"
        id="aboutTeacher"
        value={formData.aboutTeacher}
        onChange={handleInputChange}
        placeholder={t('admin.aboutTeacher')}
      />
      <InputField className="updateBtn" type="submit" value={t('admin.update')} />
    </form>
  );
};

export default EditTeacherForm;
