import React, { useState, useEffect } from 'react';

interface ErpSectionProps {
  isEditing: boolean;
  erpData: {
    heading: string;
    buttonText: string;
    buttonLink: string;
    imageSrc: string;
    imageAlt: string;
  };
  onUpdate: (updatedData: any) => void;
}

const ErpSection = ({ isEditing, erpData, onUpdate }: ErpSectionProps) => {
  // Set default values for erpData and image
  const [localErp, setLocalErp] = useState({
    heading: erpData?.heading || '',
    buttonText: erpData?.buttonText || '',
    buttonLink: erpData?.buttonLink || '',
    imageSrc: erpData?.imageSrc || '',
    imageAlt: erpData?.imageAlt || '',
  });

  useEffect(() => {
    // Sync with parent data on update
    setLocalErp({
      heading: erpData?.heading || '',
      buttonText: erpData?.buttonText || '',
      buttonLink: erpData?.buttonLink || '',
      imageSrc: erpData?.imageSrc || '',
      imageAlt: erpData?.imageAlt || '', // Default to empty string if undefined
    });
  }, [erpData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setLocalErp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Pass updated data back to the parent component
    onUpdate(localErp);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">ERP Section</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Heading */}
          <div>
            <label className="block font-medium text-gray-700">Heading</label>
            <input
              type="text"
              name="heading"
              value={localErp.heading}
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
              value={localErp.buttonText}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          {/* Button Link */}
          <div>
            <label className="block font-medium text-gray-700">Button Link</label>
            <input
              type="text"
              name="buttonLink"
              value={localErp.buttonLink}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          {/* Image Source */}
          <div>
            <label className="block font-medium text-gray-700">Image Source</label>
            <input
              type="text"
              name="imageSrc"
              value={localErp.imageSrc}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          {/* Image Alt Text */}
          <div>
            <label className="block font-medium text-gray-700">Image Alt</label>
            <input
              type="text"
              name="imageAlt"
              value={localErp.imageAlt}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
        </div>

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

export default ErpSection;
