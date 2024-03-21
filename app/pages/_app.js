// pages/_app.js

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'; // Import your Redux store
import 'tailwindcss/tailwind.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { checkUserLoggedIn } from '../utils/api'; // Import the function to check user login status

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   // Check user login status when the component mounts
  //   const checkLoginStatus = async () => {
  //     try {
  //       const loggedIn = await checkUserLoggedIn(); // Implement this function to check if the user is logged in
  //       // Update Redux store with login status
  //       // Dispatch an action to update Redux store with login status
  //       // For example: store.dispatch({ type: 'SET_LOGIN_STATUS', payload: loggedIn });
  //     } catch (error) {
  //       console.error('Error checking login status:', error);
  //     }
  //   };

  //   checkLoginStatus(); // Call the function to check user login status
  // }, []);

  return (
    <Provider store={store}> {/* Wrap your root component with Provider and pass the Redux store */}
      <div className="flex flex-col min-h-screen">
        <Navbar /> {/* You can remove the isLoggedIn prop from Navbar */}
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
        <Footer /> {/* Include the Footer component */}
      </div>
    </Provider>
  );
}

export default MyApp;
