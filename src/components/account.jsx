import { useState } from 'react';
import useAuth from '../context/useAuth';
import logo from '../assets/flow new design.png';

const Account = () => {
  const { customer, setCustomer, isCheckingAuth } = useAuth();
  // Controls whether Login or Register is displayed
  const [activeTab, setActiveTab] = useState('register');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Keep a reference to the form before the async request
    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    // Prepare the correct data for each operation
    const customerData = isRegister
      ? {
          full_name: formData.get('full_name'),
          email,
          phone: formData.get('phone') || null,
          password,
        }
      : {
          email,
          password,
        };

    // Choose the correct backend endpoint
    const endpoint = isRegister
      ? 'http://localhost:5000/api/customers'
      : 'http://localhost:5000/api/auth/login';

    try {
      setIsSubmitting(true);
      setMessage({ type: '', text: '' });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      // Save token and retrieve customer profile after login
      if (!isRegister && data.token) {
        sessionStorage.setItem('flowLuxeToken', data.token);

        const profileResponse = await fetch(
          'http://localhost:5000/api/auth/me',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          }
        );

        const profileData = await profileResponse.json();

        if (!profileResponse.ok) {
          throw new Error(
            profileData.message || 'Unable to retrieve customer profile.'
          );
        }

        setCustomer(profileData.customer);
      }

      setMessage({
        type: 'success',
        text: data.message,
      });

      // Clear the form after successful submission
      form.reset();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Controls password visibility
  const [showPassword, setShowPassword] = useState(false);
  // Stores success and error messages
  const [message, setMessage] = useState({
    type: '',
    text: '',
  });

  // Controls the submit button while registration is processing
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegister = activeTab === 'register';
  // Restore customer session when the account page loads

  const handleLogout = () => {
    sessionStorage.removeItem('flowLuxeToken');
    setCustomer(null);
    setActiveTab('login');
    setMessage({ type: 'success', text: 'You have logged out.' });
  };

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-violet-50">
        <p className="text-lg font-medium text-gray-600">
          Checking your account...
        </p>
      </div>
    );
  }

  if (customer) {
    return (
      <div className="min-h-screen bg-violet-50 px-4 py-12">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl">
          <img
            src={logo}
            alt="FLOW LUXE"
            className="mx-auto mb-6 h-16 w-auto"
          />

          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, {customer.full_name}!
          </h1>

          <p className="mt-3 text-gray-500">{customer.email}</p>

          <p className="mt-2 text-sm text-gray-500">
            Phone: {customer.phone || 'Not provided'}
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 w-full rounded-xl bg-pink-400 py-3 font-semibold text-white hover:bg-pink-500"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-violet-50 px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-md">
        {/* Logo and welcome message */}
        <div className="mb-8 text-center">
          <a href="/">
            <img
              src={logo}
              alt="FLOW LUXE"
              className="mx-auto mb-5 h-16 w-auto object-contain"
            />
          </a>

          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome to FLOW LUXE
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Your Style. Your Confidence. Your FLOW.
          </p>
        </div>

        {/* Account card */}
        <div className="rounded-3xl border border-white bg-white p-6 shadow-xl shadow-violet-100 sm:p-8">
          {/* Login and Register toggle */}
          <div className="mb-8 grid grid-cols-2 rounded-xl bg-violet-50 p-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setShowPassword(false);
              }}
              className={`rounded-lg py-3 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'login'
                  ? 'bg-white text-pink-400 shadow'
                  : 'text-gray-500 hover:text-pink-500'
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setShowPassword(false);
              }}
              className={`rounded-lg py-3 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'register'
                  ? 'bg-white text-pink-400 shadow'
                  : 'text-gray-500 hover:text-pink-500'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form heading */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {isRegister ? 'Create your account' : 'Welcome back'}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {isRegister
                ? 'Join FLOW LUXE and discover your style.'
                : 'Log in to access your FLOW LUXE account.'}
            </p>
          </div>

          {/* Account form */}
          <form onSubmit={handleSubmit}>
            {message.text && (
              <div
                role="alert"
                className={`mb-5 rounded-xl p-3 text-sm ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {message.text}
              </div>
            )}
            {/* Registration-only fields */}
            {isRegister && (
              <>
                <div className="mb-5">
                  <label
                    htmlFor="full_name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-violet-100"
                  />
                </div>
              </>
            )}

            {/* Email field */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            {/* Password field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete={
                    isRegister ? 'new-password' : 'current-password'
                  }
                  minLength={8}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-20 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-violet-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-pink-400 hover:text-pink-500"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Forgot password - login only */}
            {!isRegister && (
              <div className="mb-6 text-right">
                <button
                  type="button"
                  className="text-sm font-medium text-pink-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-pink-400 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Please wait...'
                : isRegister
                  ? 'Create Account'
                  : 'Login'}
            </button>
          </form>

          {/* Switch account option */}
          <p className="mt-7 text-center text-sm text-gray-500">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}

            <button
              type="button"
              onClick={() => setActiveTab(isRegister ? 'login' : 'register')}
              className="ml-1 font-semibold text-pink-500 hover:underline"
            >
              {isRegister ? 'Login' : 'Create Account'}
            </button>
          </p>
        </div>

        {/* Return to shopping */}
        <p className="mt-7 text-center text-sm text-gray-500">
          <a href="/shop" className="font-medium text-pink-500 hover:underline">
            ← Continue Shopping
          </a>
        </p>
      </div>
    </div>
  );
};

export default Account;
