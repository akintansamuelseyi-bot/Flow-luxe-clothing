import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentCallback = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState({
    status: 'checking',
    message: 'Please wait while we confirm your payment.',
  });

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const verifyPayment = async () => {
      // Get the payment reference from Paystack's URL
      const params = new URLSearchParams(search);

      const reference = params.get('reference') || params.get('trxref');

      if (!reference) {
        setPaymentStatus({
          status: 'error',
          message: 'No payment reference was found.',
        });
        return;
      }

      // Get the logged-in customer's token
      const token = sessionStorage.getItem('flowLuxeToken');

      if (!token) {
        setPaymentStatus({
          status: 'error',
          message:
            'Your login session has expired. Please sign in before checking your payment.',
        });
        return;
      }

      try {
        const response = await fetch(
          'http://localhost:5000/api/payments/verify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ reference }),
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'We could not confirm your payment.');
        }

        if (isMounted) {
          setPaymentStatus({
            status: 'success',
            message: 'Your payment has been confirmed successfully!',
          });
        }
      } catch (error) {
        if (error.name === 'AbortError') return;

        if (isMounted) {
          setPaymentStatus({
            status: 'error',
            message:
              error.message || 'Something went wrong while verifying payment.',
          });
        }
      }
    };

    verifyPayment();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {paymentStatus.status === 'checking' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-400 border-t-transparent mx-auto mb-5" />

            <h1 className="text-2xl font-semibold mb-3">Verifying Payment</h1>
          </>
        )}

        {paymentStatus.status === 'success' && (
          <>
            <div className="text-5xl mb-5">✓</div>

            <h1 className="text-2xl font-semibold text-green-600 mb-3">
              Payment Successful!
            </h1>
          </>
        )}

        {paymentStatus.status === 'error' && (
          <>
            <div className="text-5xl mb-5">!</div>

            <h1 className="text-2xl font-semibold text-red-600 mb-3">
              Payment Not Confirmed
            </h1>
          </>
        )}

        <p className="text-gray-600 mb-7">{paymentStatus.message}</p>

        {paymentStatus.status === 'success' ? (
          <button
            onClick={() => navigate('/shop')}
            className="bg-pink-400 text-white px-6 py-3 rounded-lg hover:bg-pink-500 transition"
          >
            Continue Shopping
          </button>
        ) : paymentStatus.status === 'error' ? (
          <button
            onClick={() => navigate('/account')}
            className="bg-pink-400 text-white px-6 py-3 rounded-lg hover:bg-pink-500 transition"
          >
            Go to Account
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PaymentCallback;
