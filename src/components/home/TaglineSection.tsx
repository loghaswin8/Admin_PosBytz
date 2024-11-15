import React, { useState, useEffect } from 'react';

interface TaglineSectionProps {
  isEditing: boolean;
  taglineData: {
    title1: string;
    title2: string;
    description: string;
    buttonText: string;
  };
  setTaglineData: (updatedData: any) => void;
}

const TaglineSection = ({ isEditing, taglineData, setTaglineData }: TaglineSectionProps) => {
  const [localTagline, setLocalTagline] = useState(taglineData);

  useEffect(() => {
    setLocalTagline(taglineData);  // Reset tagline state when props change
  }, [taglineData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLocalTagline((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Pass updated data back to the parent component
    setTaglineData(localTagline);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Tagline Section</h2>

      <form className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Title 1</label>
            <input
              type="text"
              name="title1"
              value={localTagline.title1}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Title 2</label>
            <input
              type="text"
              name="title2"
              value={localTagline.title2}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={localTagline.description}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Button Text</label>
          <input
            type="text"
            name="buttonText"
            value={localTagline.buttonText}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white p-2 rounded"
          >
            Save Changes
          </button>
        )}
      </form>
    </section>
  );
};

export default TaglineSection;
