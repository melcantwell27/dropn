// Define the base URL of your Django API
const BASE_URL = 'http://localhost:8000';

export async function fetchClassList() {
  // const endpoint = '/classes'
  // const url = BASE_URL + endpoint
  console.log("Fetching all classes")
  try {
    const response = await fetch(`${BASE_URL}/classes/`, {
      credentials: 'include', // Include cookies for authentication
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching class list:', error);
    throw error;
  }
}

// Function to fetch classes for the currently authenticated user from the API
export async function fetchStudentClasses() {
  return []
  // try {
  //   // Make a GET request to the endpoint for fetching classes for the logged-in user
  //   const response = await fetch(`${BASE_URL}/my/classes/`, {
  //     credentials: 'include', // Include cookies for authentication
  //   });
  //   // Parse the response as JSON
  //   const data = await response.json();
  //   // Return the fetched student classes
  //   return data;
  // } catch (error) {
  //   // Log and throw an error if fetching student classes fails
  //   console.error('Error fetching student classes:', error);
  //   throw error;
  // }
}


// Function to make a POST request to the /register/ endpoint
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Throw the error for handling in the component
  }
};

// Function to make a POST request to the /login/ endpoint
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include', // Include cookies for authentication
    });
    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error; // Throw the error for handling in the component
  }
};

// Function to make a POST request to create a new class
export const createNewClass = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/classes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include', // Include cookies for authentication
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error creating class:', error);
  }
};

export async function fetchEnrolledClasses() {
  try {
    // Make a GET request to the endpoint for fetching enrolled classes for the logged-in user
    const response = await fetch(`${BASE_URL}/my/classes/`, {
      credentials: 'include', // Include cookies for authentication
    });
    // Parse the response as JSON
    const data = await response.json();
    // Return the fetched enrolled classes
    return data;
  } catch (error) {
    // Log and throw an error if fetching enrolled classes fails
    console.error('Error fetching enrolled classes:', error);
    throw error;
  }
}

export async function enrollUserInClass(classId) {
  try {
    const response = await fetch(`${BASE_URL}/enroll/${classId}`, {
      method: 'GET',
      credentials: 'include',
    });
    return response.ok;
  } catch (error) {
    console.error('Error enrolling user in class:', error);
    throw error;
  }
}

export async function unenrollUserFromClass(classId) {
  try {
    const response = await fetch(`${BASE_URL}/unenroll/${classId}`, {
      method: 'GET',
      credentials: 'include',
    });
    return response.ok;
  } catch (error) {
    console.error('Error unenrolling user from class:', error);
    throw error;
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Fetch request to logout the user
// export async function logoutUser() {
//   try {
//     // Fetch the CSRF token from cookies
//     const csrfToken = getCookie('csrftoken'); // Implement getCookie function

//     // Make the logout request with the CSRF token included in the headers
//     const response = await fetch(`${BASE_URL}/logout/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRFToken': csrfToken,
//       },
//       credentials: 'include', // Include cookies for authentication
//     });
    
//     return response.ok; // Return true if logout was successful
//   } catch (error) {
//     console.error('Error logging out user:', error);
//     throw error; // Throw the error for handling in the component
//   }
// }

export async function logoutUser() {
  try {
    // const csrftoken = getCookie('csrftoken'); // Implement getCookie function to retrieve the CSRF token
    const response = await fetch(`http://localhost:8000/logout/`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.ok;
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
}


export async function checkUserLoggedIn() {
  try {
    const response = await fetch(`${BASE_URL}/check-user-logged-in/`, {
      credentials: 'include', // Include cookies for authentication
    });
    const data = await response.json();
    return data.loggedIn;
  } catch (error) {
    console.error('Error checking login status:', error);
    throw error;
  }
}
