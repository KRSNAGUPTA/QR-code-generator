import React, { useState } from "react";
import QRCode from "react-qr-code";

function App() {
  document.title = "QR Code Generator";

  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">QR Code Generator</h1>

        {submitted && value ? (
          <div className="text-center space-y-4 flex flex-col items-center">
            <QRCode title="Your QR Code" value={value} size={150} />
            <p className="text-gray-600">
              QR code generated for <strong>{value}</strong>
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Enter a value to generate a QR code.</p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col items-center space-y-4"
        >
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
    </div>
  );
}

export default App;
