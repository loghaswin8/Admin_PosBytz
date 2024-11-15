import React, { useState, useEffect } from 'react';

interface BusinessSectionProps {
  businessData: {
    heading: string;
    buttonText: string;
  };
  isEditing: boolean;
  setBusinessData: (data: { heading: string; buttonText: string }) => void;
}

const BusinessSection = ({ businessData, isEditing, setBusinessData }: BusinessSectionProps) => {
  const [business, setBusiness] = useState(businessData);

  useEffect(() => {
    setBusiness(businessData);  // Update state when prop changes
  }, [businessData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusiness((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Call parent function to save the updated business data
    setBusinessData(business);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Business Section</h2>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Heading */}
          <div>
            <label className="block font-medium text-gray-700">Heading</label>
            <textarea
              name="heading"
              value={business.heading}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              rows={4}
              disabled={!isEditing}
            ></textarea>
          </div>

          {/* Button Text */}
          <div>
            <label className="block font-medium text-gray-700">Button Text</label>
            <input
              type="text"
              name="buttonText"
              value={business.buttonText}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Save Changes Button */}
        {isEditing && (
          <button
            type="button"
            onClick={handleSave}
            className="mt-4 bg-green-500 text-white p-2 rounded"
          >
            Save Changes
          </button>
        )}
      </form>
    </section>
  );
};

export default BusinessSection;
