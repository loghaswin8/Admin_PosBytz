import React, { useState, useEffect } from "react";

interface ContactFormProps {
  isEditing: boolean;
  formPlaceholders: {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone: string;
  };
  submitButton: string;
  setSubmitButton: React.Dispatch<React.SetStateAction<string>>; // setter for submit button text
}

const ContactForm = ({
  isEditing,
  formPlaceholders,
  submitButton,
  setSubmitButton,
}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    ...formPlaceholders,
    submitButton,
  });

  // Update form data whenever formPlaceholders or submitButton props change
  useEffect(() => {
    setFormData({
      ...formPlaceholders,
      submitButton,
    });
  }, [formPlaceholders, submitButton]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Update the submit button text in the parent component
    setSubmitButton(formData.submitButton);

    console.log("Form Data Submitted:", formData);
    // Add any additional logic for form submission (API calls, etc.)
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Form Placeholders and Submit Button</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full border rounded-lg p-2"
            rows={4}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Submit Button Text</label>
          <input
            type="text"
            name="submitButton"
            value={formData.submitButton}
            onChange={handleChange}
            placeholder="Submit Details"
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              Update Changes
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default ContactForm;
