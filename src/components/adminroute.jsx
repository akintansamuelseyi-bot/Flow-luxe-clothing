import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../context/useAuth';

const AdminRoute = () => {
  const { customer, isCheckingAuth } = useAuth();

  const [verification, setVerification] = useState({
    customerId: null,
    status: 'checking',
  });

  useEffect(() => {
    // Wait until the normal login check is complete.
    // If there is no customer, the component will redirect below.
    if (isCheckingAuth || !customer) return;

    let isMounted = true;

    const verifyAdmin = async () => {
      try {
        const token = sessionStorage.getItem('flowLuxeToken');

        const response = await fetch('http://localhost:5000/api/admin/me', {
          headers: {
            Authorization: `Bearer ${token || ''}`,
          },
        });

        const data = await response.json();

        if (isMounted) {
          setVerification({
            customerId: customer.id,
            status:
              response.ok && data.isAdmin === true
                ? 'authorized'
                : 'unauthorized',
          });
        }
      } catch (error) {
        console.error('Admin verification failed:', error);

        if (isMounted) {
          setVerification({
            customerId: customer.id,
            status: 'unauthorized',
          });
        }
      }
    };

    verifyAdmin();

    return () => {
      isMounted = false;
    };
  }, [customer, isCheckingAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">Checking your account...</p>
      </div>
    );
  }

  if (!customer) {
    return <Navigate to="/account" replace />;
  }

  if (
    verification.customerId !== customer.id ||
    verification.status === 'checking'
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">Verifying admin access...</p>
      </div>
    );
  }

  if (verification.status !== 'authorized') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
