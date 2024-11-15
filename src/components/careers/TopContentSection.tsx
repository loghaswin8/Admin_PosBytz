import React, { useState, useEffect } from "react";

interface TopContentData {
  title: string;
  headline: string;
  description: string;
  buttonText: string;
  imageUrl: string;
}

interface TopContentSectionProps {
  isEditing: boolean;
  topContent: TopContentData; // Receive topContent data
  setTopContentData: React.Dispatch<React.SetStateAction<TopContentData>>; // Receive setter for state
}

const TopContentSection = ({ isEditing, topContent, setTopContentData }: TopContentSectionProps) => {
  const defaultTopContent = {
    title: '',
    headline: '',
    description: '',
    buttonText: '',
    imageUrl: ''
  };

  const [localTopContent, setLocalTopContent] = useState<TopContentData>(
    topContent || defaultTopContent
  );

  // Handle change for each input and pass it to the parent using the setter
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedTopContent = { ...localTopContent, [name]: value };
    setLocalTopContent(updatedTopContent);
    setTopContentData(updatedTopContent); // Update the parent state directly
  };

  useEffect(() => {
    if (topContent) {
      setLocalTopContent(topContent);
    }
  }, [topContent]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Top Content Section</h2>

      <form className="space-y-4">
        {/* Title and Headline in 1x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={localTopContent.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          {/* Headline */}
          <div>
            <label className="block font-medium text-gray-700">Headline</label>
            <input
              type="text"
              name="headline"
              value={localTopContent.headline}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={localTopContent.description}
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
            value={localTopContent.buttonText}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={localTopContent.imageUrl}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        {/* Update Changes Button */}
        {isEditing && (
          <div>
            <button
              type="button"
              onClick={() => setTopContentData(localTopContent)} // Handle the update action
              className="mt-4 w-full sm:w-auto bg-green-500 text-white rounded-lg px-4 py-2"
            >
              Update Changes
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default TopContentSection;
