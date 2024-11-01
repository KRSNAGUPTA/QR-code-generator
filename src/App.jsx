import React, { useState } from "react";
import QRCode from "react-qr-code";
import { ToastContainer, toast } from "react-toastify"; // Corrected import from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"; // Ensure toast styles are included

function App() {
  document.title = "QR Code Generator";

  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      toast.error("A value is required");
      return; // Early return to prevent further execution
    }
    setSubmitted(true);
    toast.success("QR code generated");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg space-y-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800">QR Code Generator</h1>

        {submitted && value ? (
          <div className="text-center space-y-4 flex flex-col items-center">
            <QRCode title="Your QR Code" value={value} size={200} />
            <p className="text-gray-600">
              QR code generated for <strong>{value}</strong>
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Enter a value to generate a QR code.</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-full border border-gray-300 shadow-2xl hover:shadow-inner focus:outline-none"
            placeholder="Enter value here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="bg-black text-white p-2 rounded-full border m-2 hover:bg-gray-200 hover:text-black hover:border-black transition transform duration-500 w-full"
            type="submit"
          >
            Get QR
          </button>
        </form>
      </div>
      <ToastContainer autoClose={2000} position="top-center" />
    </div>
  );
}

export default App;
