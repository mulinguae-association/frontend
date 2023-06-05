import React, { useReducer } from 'react';

const initialState = {
  name: '',
  email: '',
  age: '',
  address: '',
};
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...state, name: action.payload };
    case 'UPDATE_EMAIL':
      return { ...state, email: action.payload };
    case 'UPDATE_AGE':
      return { ...state, age: action.payload };
    case 'UPDATE_ADDRESS':
      return { ...state, address: action.payload };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

const Register = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  console.log(state)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: `UPDATE_${name.toUpperCase()}`, payload: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Prepare the data to send to the backend
    const formData = {
      name: state.name,
      email: state.email,
      age: state.age,
      address: state.address,
    };

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json()
      console.log(data)
      // Check if the request was successful
      // if (response.ok) {
      //   // Handle successful response from the backend
      //   console.log('Data sent successfully!');
      //   // Optionally, you can reset the form inputs here
      //   dispatch({ type: 'RESET_FORM' });
      // } else {
      //   // Handle error response from the backend
      //   console.error('Failed to send data to the backend.');
      // }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred:', error);
    }


    // Process form submission using state fields
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleInputChange}
        placeholder="Enter your name"
        className="form-input"
      />
      <input
        type="email"
        name="email"
        value={state.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        className="form-input"
      />
      <input
        type="number"
        name="age"
        value={state.age}
        onChange={handleInputChange}
        placeholder="Enter your age"
        className="form-input"
      />
      <input
        type="text"
        name="address"
        value={state.address}
        onChange={handleInputChange}
        placeholder="Enter your address"
        className="form-input"
      />
      <button type="submit" className="form-button">Submit</button>
    </form>
  );
};
export default Register