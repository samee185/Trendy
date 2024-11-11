import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
const PaymentContext = createContext();

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [reference, setReference] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  

  const { user, token } = useAuth()
  const initiatePayment = async (userId, items, amount, ) => {
    
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/payment/initiate`, {
        userId,
        items,
        amount,
        email: user.email,
      }, {
        headers:{
          authorization: `Bearer ${token}`
        }
      });
      setPaymentUrl(response.data.payment_url);
      setReference(response.data.reference);
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (reference) => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/verify?reference=${reference}`);
      if (response.data.success) {
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        loading,
        paymentUrl,
        reference,
        paymentSuccess,
        initiatePayment,
        verifyPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
