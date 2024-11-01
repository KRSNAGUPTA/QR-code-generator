import React, { useState } from "react";
import QRCode from "react-qr-code";
import { ToastContainer, toast } from "react-toast";

function App() {
  document.title = "QR Code Generator";

  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isUrl, setIsUrl] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value) {
      toast.error("A value is required");
      return;
    }

    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    if (urlPattern.test(value)) {
      try {
        setIsUrl(true);
        toast.success("QR code generated");
      } catch (error) {
        toast.error("Failed to fetch URL. Please check the link.");
        setIsUrl(false);
        return;
      }
    } else {
      setIsUrl(false);
      toast.error("Please enter a valid URL.");
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-2xl space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">QR Code Generator</h1>

        {submitted && value ? (
          <>
            <div className="text-center space-y-4 flex flex-col items-center">
              <QRCode title="Your QR Code" value={value} size={150} />
              <p className="text-gray-600">
                QR code generated for <strong>{value}</strong>
              </p>
            </div>
            {isUrl && (
              <div className="mt-4 w-full max-w-xs">
                <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={value}
                    title="Webpage Preview"
                    className="absolute inset-0 w-full h-full border-none"
                    sandbox="allow-same-origin allow-scripts"
                    onError={() => toast.error("Failed to load preview.")}
                  />
                  <div className="absolute inset-0 border border-gray-300 rounded-lg pointer-events-none" />
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">Enter a value to generate a QR code.</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <input
            type="text"
            className="w-full px-4 py-2 rounded-full border border-gray-300 shadow-2xl hover:shadow-inner focus:outline-none"
            placeholder="Enter URL here"
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
      <ToastContainer delay={2000} />
    </div>
  );
}

export default App;
