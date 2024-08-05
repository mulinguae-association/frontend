import React from 'react'
import InputField from "../HelperComponents/InputField";
import Tooltip from '../HelperComponents/toolTip';
import { useState } from 'react';
import { useRef } from 'react';
import { useGlobal } from '../../contexts/AppContext';

const TeachersController = ({ handleFormSubmit }) => {
  const { isBtnLoading } = useGlobal();
  const fileInputRef = useRef(null);
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobBrief: '',
    aboutTeacher: '',
    telephone: '',
    teaching_philosophy: '',
    career_summary: '',
    teaching_methods: '',
    qualification_cert: '',
    teacher_collaboration: '',
    classroom_management: '',
    behavior_management: '',
    additional_info: '',
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxImageSize = 1024 * 1024; // 1 MB

    if (file && file.size <= maxImageSize) {
      setFormState({ ...formState, image: file });
    } else {
      alert('Image size exceeds the maximum allowed limit.');
      setFormState({ ...formState, image: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <section className='teacher_form' >
      <h1>Add Teacher Information</h1>
      <form className="teacher_form" onSubmit={(e) => handleFormSubmit(e, formState, setFormState)}>
        <div className="teacher_name block">
          <InputField
            label="First Name"
            type="text"
            placeholder="Enter First Name"
            value={formState.firstName}
            onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
            required
          />
          <InputField
            label="Last Name"
            type="text"
            placeholder="Enter Last Name"
            value={formState.lastName}
            onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
            required
          />
        </div>
        <div className="block">
          <InputField
            label="Email"
            type="email"
            placeholder="Enter Email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            required
          />
          <InputField
            label="Job Brief"
            type="text"
            placeholder="Enter Job Brief"
            value={formState.jobBrief}
            onChange={(e) => setFormState({ ...formState, jobBrief: e.target.value })}
            required
          />
        </div>
        <div className='block'>
          <label className='visually-hidden' htmlFor="aboutTeacher">About Teacher</label>
          <textarea
            id="aboutTeacher"
            placeholder="Enter About Teacher"
            value={formState.aboutTeacher}
            onChange={(e) => setFormState({ ...formState, aboutTeacher: e.target.value })}
            rows={2}
            cols={23}
            required
          />
          <InputField
            label="Telephone"
            type="tel" // Use "tel" type for telephone input
            placeholder="Enter Telephone / Cellphone"
            value={formState.telephone}
            onChange={(e) => setFormState({ ...formState, telephone: e.target.value })}
            required
          />
        </div>
        <label className="upload_image" htmlFor="image">
          {!formState.image ? 'Upload Image' : formState.image.name}
          <Tooltip text="choose image less than 1MB" />
        </label>
        <input
          id="image"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          name='image'
          onChange={handleImageChange}
        />
        <button type="submit">
          {isBtnLoading['createTeacherBtn'] ? 'Adding Teacher...' : 'Add Teacher'}
        </button>
      </form>
    </section>
  )
}

export default TeachersController