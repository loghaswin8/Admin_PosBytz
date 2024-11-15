import React, { useState, useEffect } from "react";

interface WhatsAppData {
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

interface WhatsAppSectionProps {
  isEditing: boolean;
  whatsappData: WhatsAppData | null; // Accept whatsappData as prop
  setWhatsAppData: React.Dispatch<React.SetStateAction<WhatsAppData>>; // Pass setter for WhatsApp data
}

const WhatsAppSection = ({ isEditing, whatsappData, setWhatsAppData }: WhatsAppSectionProps) => {
  const [whatsapp, setWhatsApp] = useState<WhatsAppData>({
    title: "",
    description: "",
    link: "",
    buttonText: "",
  });

  useEffect(() => {
    if (whatsappData) {
      setWhatsApp(whatsappData);
    }
  }, [whatsappData]); // Update state when prop changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWhatsApp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateChanges = () => {
    setWhatsAppData(whatsapp); // Save the updated WhatsApp data via setter function
    console.log("Updated WhatsApp Data:", whatsapp);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">WhatsApp Section</h2>

      <form className="space-y-4">
        {/* Title and Description in 1x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={whatsapp.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={whatsapp.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              rows={3}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Link and Button Text in 1x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Link */}
          <div>
            <label className="block font-medium text-gray-700">WhatsApp Link</label>
            <input
              type="text"
              name="link"
              value={whatsapp.link}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          {/* Button Text */}
          <div>
            <label className="block font-medium text-gray-700">Button Text</label>
            <input
              type="text"
              name="buttonText"
              value={whatsapp.buttonText}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Update Button */}
        {isEditing && (
          <div className="flex justify">
            <button
              type="button"
              onClick={updateChanges}
              className="bg-green-500 text-white p-2 rounded"
            >
              Update Changes
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default WhatsAppSection;
