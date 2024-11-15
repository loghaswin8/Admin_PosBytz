import React, { useState, useEffect } from "react";

interface HelpButton {
  text: string;
  link: string;
}

interface HelpItem {
  icon: string;
  title: string;
  description: string;
  button: HelpButton;
}

interface HelpSectionProps {
  isEditing: boolean;
  helpItems?: HelpItem[]; // Mark helpItems as optional
  setHelpSectionData: React.Dispatch<React.SetStateAction<HelpItem[]>>; // Setter to update helpItems in parent
}

const HelpSection = ({ isEditing, helpItems = [], setHelpSectionData }: HelpSectionProps) => {
  const [updatedHelpItems, setUpdatedHelpItems] = useState<HelpItem[]>(helpItems);

  useEffect(() => {
    setUpdatedHelpItems(helpItems || []); // Ensure it updates with valid data or an empty array
  }, [helpItems]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
  
    const updatedItems = [...updatedHelpItems];
    const fieldParts = name.split(".");
  
    if (fieldParts.length > 1) {
      const [parentField, childField] = fieldParts;
  
      // Ensure that parentField is specifically 'button' in this case
      if (parentField === "button") {
        updatedItems[index] = {
          ...updatedItems[index],
          button: {
            ...(updatedItems[index].button as HelpButton),
            [childField]: value,
          },
        };
      }
    } else {
      updatedItems[index] = {
        ...updatedItems[index],
        [name]: value,
      };
    }
    
    setUpdatedHelpItems(updatedItems);
  };
  

  const updateChanges = () => {
    setHelpSectionData(updatedHelpItems); // Pass updated data back to parent
    console.log("Updated Help Data:", updatedHelpItems);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Help Section</h2>

      <form className="space-y-8">
        {updatedHelpItems.map((helpItem, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Icon</label>
              <input
                type="text"
                name="icon"
                value={helpItem.icon}
                onChange={(e) => handleChange(e, index)}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={helpItem.title}
                onChange={(e) => handleChange(e, index)}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={helpItem.description}
                onChange={(e) => handleChange(e, index)}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Button Text</label>
              <input
                type="text"
                name="button.text"
                value={helpItem.button.text}
                onChange={(e) => handleChange(e, index)}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Button Link</label>
              <input
                type="text"
                name="button.link"
                value={helpItem.button.link}
                onChange={(e) => handleChange(e, index)}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>
          </div>
        ))}

        {/* Save Changes Button */}
        {isEditing && (
          <div className="flex justify mt-4">
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

export default HelpSection;
