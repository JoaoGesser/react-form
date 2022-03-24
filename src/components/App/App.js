import './App.css';
import React, {useReducer, useState} from 'react';

//To capture form data dynamically. Uncontroled compoent
const formReducer = (state, event) => {
  if (event.reset) {
    return {
      apple: '',
      count: 100,
      name: '',
      'gift': false
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {
    count: 100,
  });
  const [submitting, setSubmitting] = useState(false);


  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        reset: true
      })
    }, 3000)
  }

  //The SyntheticEvent cannot be passed to an asynchronous function, in that way we need pull the data that we want before calling the asynchronous function formReducer
  //setFormData is an asynchronous function because of useState, so we cannot call directly
  const handleChange = event => {
    const isCheckBox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckBox ? event.target.checked : event.target.value
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
        <fieldset disabled={submitting}>
          <label>
            <p>Name</p>
            <input name='name' onChange={handleChange} value={formData.name || ''}/>
          </label>

        </fieldset>
        <fieldset disabled={submitting}>
          <label>
            <p>Apples</p>
            <select name="apple" onChange={handleChange} value={formData.apple || ''}>
              <option value="">--- Choose an option ---</option>  
              <option value="fuji">Fuji</option>  
              <option value="green">Green</option>  
              <option value="Red">Red</option>  
            </select>
          </label>
          <label>
            <p>Count</p>
            <input type="number" name="count" onChange={handleChange} step="1" value={formData.count || ''}/>
          </label>
          <label>
            <p>Gift?</p>
            <input type="checkbox" name='gift' onChange={handleChange} checked={formData['gift'] || false} disabled={formData.apple != 'fuji'}/>
          </label>  
        </fieldset>
        <button type='submit' disabled={submitting}>Submit</button>
      </form>
    </div>
  );
}

export default App;
