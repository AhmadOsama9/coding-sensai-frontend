import React from 'react'

const PaymentCallback = () => {
  
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async (paymentUrl) => {
    window.location.href = paymentUrl;
    }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentUrl = params.get("url");
    const error = params.get("error");

    if (paymentUrl) {
      try {
        setStatus("success");
        setTimeout(() => handlePayment(paymentUrl), 2000);
      } catch (err) {
        console.error("Error setting token:", err);
        setStatus("error");
        setErrorMessage("Failed to set the token.");
        setTimeout(() => navigate("/"), 3000);
      }
    } else if (error) {
        console.error("Authentication failed:", error);
        setStatus("error");
        setErrorMessage("Authentication failed. Please try again.");
        setTimeout(() => navigate("/"), 3000);
    }
  }, [])

  return (
    <div>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'success' && <p>Authentication successful! Redirecting to your dashboard...</p>}
        {status === 'error' && <p>Error: {errorMessage}</p>}
    </div>
  )
}

export default PaymentCallback;
