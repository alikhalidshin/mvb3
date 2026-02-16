import React, { createContext, useContext, useState, useEffect } from 'react';
import { properties as initialProperties, inspections as initialInspections } from '../data/mockData';
import { users } from '../data/users';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [properties, setProperties] = useState(initialProperties);
  const [inspections, setInspections] = useState(initialInspections);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for persisted user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          const { password, ...safeUser } = user; // Exclude password
          setCurrentUser(safeUser);
          localStorage.setItem('user', JSON.stringify(safeUser));
          resolve(safeUser);
        } else {
          reject(new Error('Invalid username or password'));
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    // window.location.href = '/login'; // Optional: force redirect or let router handle it
  };

  const addInspection = (inspection) => {
    setInspections(prev => [...prev, { ...inspection, id: Date.now() }]);
  };

  const updateInspectionStatus = (id, status) => {
    setInspections(prev => prev.map(insp => 
      insp.id === id ? { ...insp, status } : insp
    ));
  };

  return (
    <AppContext.Provider value={{ 
      properties, 
      inspections, 
      currentUser,
      isLoading,
      login,
      logout,
      addInspection,
      updateInspectionStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
