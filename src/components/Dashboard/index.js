import React, { useState, useRef } from 'react';
import "./Dashboard.scss"
import "../pages/Teachers"
import { createTeacher } from '../../utils/apiUtility';
import { notifySuccess, notifyError } from '../Notify';
import InputField from '../HelperComponents/InputField';
import Tooltip from '../HelperComponents/toolTip';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobBrief: '',
    aboutTeacher: '',
    telephone: '', // Add telephone state
    teaching_philosophy: '',
    career_summary: '',
    teaching_methods: '',
    qualification_cert: '',
    teacher_collaboration: '',
    classroom_management: '',
    behavior_management: '',
    additional_info: '',
    selectedImage: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxImageSize = 1024 * 1024; // 1 MB

    if (file && file.size <= maxImageSize) {
      setFormState({ ...formState, selectedImage: file });
    } else {
      alert('Image size exceeds the maximum allowed limit.');
      setFormState({ ...formState, selectedImage: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('firstName', formState.firstName);
    formData.append('lastName', formState.lastName);
    formData.append('email', formState.email);
    formData.append('jobBrief', formState.jobBrief);
    formData.append('aboutTeacher', formState.aboutTeacher);
    formData.append('telephone', formState.telephone); // Add telephone to formData
    formData.append('teaching_philosophy', formState.teaching_philosophy);
    formData.append('career_summary', formState.career_summary);
    formData.append('teaching_methods', formState.teaching_methods);
    formData.append('qualification_cert', formState.qualification_cert);
    formData.append('teacher_collaboration', formState.teacher_collaboration);
    formData.append('classroom_management', formState.classroom_management);
    formData.append('behavior_management', formState.behavior_management);
    formData.append('additional_info', formState.additional_info);
    formData.append('image', formState.selectedImage);

    try {
      const res = await createTeacher(formData);
      if (res.success) {
        notifySuccess("Successfully added teacher");
        setFormState({
          firstName: '',
          lastName: '',
          email: '',
          jobBrief: '',
          aboutTeacher: '',
          telephone: '', // Clear telephone field
          teaching_philosophy: '',
          career_summary: '',
          teaching_methods: '',
          qualification_cert: '',
          teacher_collaboration: '',
          classroom_management: '',
          behavior_management: '',
          additional_info: '',
          selectedImage: null,
        });
      } else {
        notifyError("Error adding teacher. Please try again.");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page_content dashboard">
      <div className='container'>
        <section className='teacher_form' >
          <h1>Add Teacher Information</h1>
          <form className="teacher_form" onSubmit={handleFormSubmit}>
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
              {!formState.selectedImage ? 'Upload Image' : formState.selectedImage.name}
              <Tooltip text="choose image less than 1MB" />
            </label>
            <input
              id="image"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <button type="submit">
              {isLoading ? 'Adding Teacher...' : 'Add Teacher'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
