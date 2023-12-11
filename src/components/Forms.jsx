import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contacts: '',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const field in formData) {
      if (!formData[field]) {
        newErrors[field] = `Please enter your ${field}!`;
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setRegistrationSuccess(true);
    }
  };

  return (
    <div className="container">
      {registrationSuccess && <p className="success">Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <label style={{fontSize: '25px'}} key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            {field === 'contacts' ? (
              <textarea value={formData[field]} name={field} onChange={handleChange} />
            ) : (
              <input type={field === 'email' ? 'email' : 'text'} value={formData[field]} name={field} onChange={handleChange} />
            )}
            {errors[field] && <p className="error">{errors[field]}</p>}
          </label>
        ))}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Form;