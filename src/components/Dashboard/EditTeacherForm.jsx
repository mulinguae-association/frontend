import React, { useState, useEffect } from 'react';
import { notifyError } from '../Notify';
import InputField from '../HelperComponents/InputField';
import Tooltip from '../HelperComponents/toolTip';
import { useUpdateTeacherMutation } from '../../apis/mutations/teachers/updateTeacher';

const EditTeacherForm = ({ teacher, onEdit }) => {
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
      alert('Image size exceeds the maximum allowed limit.')
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
      notifyError("No changes were made.");
      return;
    }
    updateTeacherMutation({ teacherId: teacher._id, updatedTeacher });
  }

  return (
    <form className="edit_form" onSubmit={handleUpdate}>
      <label className="upload_image" htmlFor="image">
        {!formData.image ? 'Change Image' : formData.image.name || 'Change Image'}
        <Tooltip text="choose an image less than 1MB" />
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
            First Name
          </label>
          <InputField
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className='block'>
          <label className="visually-hidden" htmlFor="lastName">
            Last Name
          </label>
          <InputField
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <label className="visually-hidden" htmlFor="jobBrief">
        Job Brief
      </label>
      <InputField
        type="text"
        name="jobBrief"
        id="jobBrief"
        value={formData.jobBrief}
        onChange={handleInputChange}
        placeholder="Job Brief"
      />
      <label className="visually-hidden" htmlFor="telephone">
        Telephone
      </label>
      <InputField
        type="tel"
        name="telephone"
        id="telephone"
        value={formData.telephone}
        onChange={handleInputChange}
        placeholder="Telephone"
      />
      <label className="visually-hidden" htmlFor="email">
        Email
      </label>
      <InputField
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <label className="visually-hidden" htmlFor="aboutTeacher">
        About Teacher
      </label>
      <textarea
        rows={4}
        cols={100}
        name="aboutTeacher"
        id="aboutTeacher"
        value={formData.aboutTeacher}
        onChange={handleInputChange}
        placeholder="About Teacher"
      />
      <InputField className="updateBtn" type="submit" value="Update" />
    </form>
  );
};

export default EditTeacherForm;
