import React, { useState, useEffect } from "react";

interface CoreValue {
  icon: string;
  Text: string;
}

interface CoreValuesData {
  about: string[]; // Ensure this is an array
  icon: CoreValue[];
  image: string;
}

interface CoreValuesSectionProps {
  isEditing: boolean;
  coreValues: CoreValuesData | null; // Allow coreValues to be null initially
  setCoreValuesData: React.Dispatch<React.SetStateAction<any>>; // Pass setter function to update core values
}

const CoreValuesSection = ({ isEditing, coreValues, setCoreValuesData }: CoreValuesSectionProps) => {
  // Set initial state to coreValues if available, otherwise use empty values
  const [updatedCoreValues, setUpdatedCoreValues] = useState<CoreValuesData | null>(
    coreValues ?? { about: [], icon: [], image: "" }
  );

  useEffect(() => {
    // If coreValues is available, update the local state
    if (coreValues) {
      setUpdatedCoreValues(coreValues);
    }
  }, [coreValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    // Handling changes for "about" field
    if (name === "about" && updatedCoreValues) {
      // Ensure 'about' is an array and update it
      setUpdatedCoreValues((prevState) => ({
        ...prevState!,
        about: [value, ...prevState!.about], // Update only the first element in the array
      }));
    }

    // Handling changes for "icon" fields
    if (name.startsWith("icon") && index !== undefined && updatedCoreValues) {
      const updatedIcons = [...updatedCoreValues.icon];
      const field = name.split(".")[1]; // either 'icon' or 'Text'

      updatedIcons[index] = { ...updatedIcons[index], [field]: value };

      setUpdatedCoreValues((prevState) => ({
        ...prevState!,
        icon: updatedIcons,
      }));
    } else if (updatedCoreValues) {
      setUpdatedCoreValues((prevState) => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };

  const addIcon = () => {
    if (updatedCoreValues) {
      setUpdatedCoreValues((prevState) => ({
        ...prevState!,
        icon: [
          ...prevState!.icon,
          { icon: "", Text: "" }, // Add new empty icon entry
        ],
      }));
    }
  };

  const removeIcon = (index: number) => {
    if (updatedCoreValues) {
      const updatedIcons = [...updatedCoreValues.icon];
      updatedIcons.splice(index, 1);

      setUpdatedCoreValues((prevState) => ({
        ...prevState!,
        icon: updatedIcons,
      }));
    }
  };

  const updateChanges = () => {
    setCoreValuesData(updatedCoreValues);
    console.log("Updated Core Values:", updatedCoreValues);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Core Values Section</h2>

      <form className="space-y-4">
        {/* About Field */}
        <div>
          <label className="block font-medium text-gray-700">About Core Values</label>
          <input
            type="text"
            name="about"
            value={updatedCoreValues?.about} // Default to empty string if undefined
            onChange={(e) => handleChange(e)}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        {/* Core Values Icons Fields */}
        <div className="space-y-4">
          {updatedCoreValues?.icon.map((coreValue, index) => (
            <div key={index} className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700">Icon {index + 1}</label>
                <input
                  type="text"
                  name={`icon.icon`}
                  value={coreValue.icon}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Text for Icon {index + 1}</label>
                <input
                  type="text"
                  name={`icon.Text`}
                  value={coreValue.Text}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditing}
                />
              </div>
              {isEditing && (
                <div className="ml-3 mt-2">
                  <button
                    type="button"
                    onClick={() => removeIcon(index)}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    -
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add New Icon Button */}
        {isEditing && (
          <div className="ml-3">
            <button
              type="button"
              onClick={addIcon}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              +
            </button>
          </div>
        )}

        {/* Image Field */}
        <div>
          <label className="block font-medium text-gray-700">Core Values Image</label>
          <input
            type="text"
            name="image"
            value={updatedCoreValues?.image || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        {/* Save Changes Button */}
        {isEditing && (
          <div className="ml-3 flex justify mt-4">
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

export default CoreValuesSection;
