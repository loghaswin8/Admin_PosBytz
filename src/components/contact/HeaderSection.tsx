import React, { useState, useEffect } from "react";

interface HeaderSectionProps {
  isEditing: boolean;
  header: {
    title: string;
    description: string;
  } | null | undefined;
  setHeaderData: React.Dispatch<React.SetStateAction<any>>; // Pass setter for header data
}

const HeaderSection = ({
  isEditing,
  header,
  setHeaderData,
}: HeaderSectionProps) => {
  // Default state values for the header fields
  const [updatedHeader, setUpdatedHeader] = useState(header || { title: "", description: "" });

  // Set the state initially from props (only on mount)
  useEffect(() => {
    if (header) {
      setUpdatedHeader(header);
    }
  }, [header]); // Ensure this runs only when header prop changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof typeof updatedHeader) => {
    const { value } = e.target;
    setUpdatedHeader((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const updateChanges = () => {
    setHeaderData(updatedHeader);
    console.log("Updated Header Data:", updatedHeader);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Header Section</h2>

      <form className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={updatedHeader.title}
            onChange={(e) => handleChange(e, "title")}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            value={updatedHeader.description}
            onChange={(e) => handleChange(e, "description")}
            className="w-full border rounded-lg p-2"
            rows={4}
            disabled={!isEditing}
          />
        </div>

        {/* Save Changes Button */}
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

export default HeaderSection;
