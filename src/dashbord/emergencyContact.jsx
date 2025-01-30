import { useState } from "react";

export default function EmergencyContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    relationship: "",
    phone: "",
    email: "",
  });

  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Emergency contact details:", formData);
    setShowPopup(true); // Show popup when form is submitted

    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const inputFields = [
    { id: "fullName", label: "Full Name", type: "text", placeholder: "Enter contact person's full name" },
    {
      id: "relationship",
      label: "Relationship",
      type: "text",
      placeholder: "Enter your relationship (e.g., Spouse, Parent)",
    },
    { id: "phone", label: "Phone Number", type: "tel", placeholder: "Enter emergency contact number" },
    { id: "email", label: "Email Address", type: "email", placeholder: "Enter contact person's email" },
  ];

  return (
    <section className="h-auto w-full bg-pink-200 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-pink-700 mb-4">Emergency Contact Details</h1>
          <p className="text-black text-lg">Please provide contact information for your emergency contact person.</p>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {inputFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label htmlFor={field.id} className="block text-black font-semibold text-lg">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full border-0 border-b-2 border-pink-300 bg-transparent text-pink-800 placeholder:text-pink-400 focus:border-pink-500 focus:outline-none p-2 text-lg"
                value={formData[field.id]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
          <div className="md:col-span-2 mt-8 flex justify-center">
            <button
              type="submit"
              className="w-auto bg-pink-400 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center text-lg font-semibold"
            >
              Save
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
        {showPopup && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300">
            Emergency contact saved
          </div>
        )}
      </div>
    </section>
  );
}



