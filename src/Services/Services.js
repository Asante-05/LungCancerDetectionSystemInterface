let feedback_fromLogIN = null





export const addResultToDatabase = async (result, remark) => {

  const result_formData = new FormData();

  result_formData.append('scan_id', result.scan_id);
  result_formData.append('patient_id', result.patient_id);
  result_formData.append('remarks', remark);


  try {
    const response = await fetch('http://127.0.0.1:8000/patient/save/', {
      method: 'POST',
      body: result_formData,
    });
    return response.json();
  } catch (error) {
    throw new Error('Error saving remarks:', error);
  }

}




export const getScanInformation = async (scan_id) => {

  const view_formData = new FormData();
  view_formData.append('scan_id', scan_id);

  try {
    const response = await fetch('http://127.0.0.1:8000/patient/viewdetails/', {
      method: 'POST',
      body: view_formData,
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error getting scan information from Database:', error);
  }

};
export const deleteFromDataBase = async (scan_id) => {

  const view_formData = new FormData();
  view_formData.append('scan_id', scan_id);

  try {
    const response = await fetch('http://127.0.0.1:8000/patient/delete-scan/', {
      method: 'DELETE',
      body: view_formData,
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error deleting file in server:', error);
  }

};

export const uploadFile = async (patient_id, image) => {

  const patient_formData = new FormData();
  patient_formData.append('patient_id', patient_id);
  patient_formData.append('image', image);
  
  try {
        const response = await fetch('http://127.0.0.1:8000/patient/analyse/', {
            method: 'POST',
            body: patient_formData,
        });
        return await response.json();
    } catch (error) {
        throw new Error('Error sending file to server (Services):', error);
    }

};




export async function loginUser(user_email, user_password) {
  const loginData = {
    email: user_email,
    password: user_password
  };
  try {
     const response = await fetch('http://127.0.0.1:8000/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    feedback_fromLogIN = response
    if (!response.ok) {
      // return response
    }else{
      window.location.href = '/home'
    }
    const data = await response.json();
    return data; // Return the login response data
  } catch (error) {
    // console.error('Error:', error.message);
    // throw error; 
  }

};
export default feedback_fromLogIN



export async function signupUser (signup_email ,signup_username, signup_password) {

  const signinData = {
    email: signup_email,
    username: signup_username,
    password: signup_password
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/auth/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signinData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.email[0]) 
      throw new Error(errorData.message || 'Signing up failed.'); 
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error:', error.message);
    throw error; 
  }

};





