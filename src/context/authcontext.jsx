import { useState, useEffect } from 'react';
import { AuthContext } from './authcontext';

const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);

  const [isCheckingAuth, setIsCheckingAuth] = useState(() =>
    Boolean(sessionStorage.getItem('flowLuxeToken'))
  );

  // Restore the customer's session when the application loads.
  useEffect(() => {
    const token = sessionStorage.getItem('flowLuxeToken');

    if (!token) {
      return;
    }

    let isMounted = true;

    const restoreSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            sessionStorage.removeItem('flowLuxeToken');
          }

          throw new Error(data.message || 'Unable to restore your session.');
        }

        if (isMounted) {
          setCustomer(data.customer);
        }
      } catch (error) {
        console.error('Session restoration error:', error);
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        customer,
        setCustomer,
        isCheckingAuth,
        setIsCheckingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
