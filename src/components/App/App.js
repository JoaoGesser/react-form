import './App.css';
import React, {useReducer, useState} from 'react';

//To capture form data dynamically. Uncontroled compoent
const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);


  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000)
  }

  //The SyntheticEvent cannot be passed to an asynchronous function, in that way we need pull the data that we want before calling the asynchronous function formReducer
  //setFormData is an asynchronous function because of useState, so we cannot call directly
  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value
    });
  }



  return (
    <div className="wrapper">
      <h1>How about Them Apples</h1>
      
      {submitting && 
        <div>Submitting Form...
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}><strong>{name}</strong>:{value.toString()}</li>
            ))}
          </ul>
        </div>
      }
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input name='name' onChange={handleChange}/>
          </label>  
        </fieldset>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
