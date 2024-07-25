import React, { createContext, useContext, useState } from 'react';

// Create the UserContext
const UserContext = createContext();

// Create a custom hook to consume the UserContext
export const useUser = () => useContext(UserContext);

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  // Define your user state and any related functions
  const [user, setUser] = useState([]);

  // Example function to update user state
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  // Provide the user state and functions through the context
  return (
    <UserContext.Provider value ={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
