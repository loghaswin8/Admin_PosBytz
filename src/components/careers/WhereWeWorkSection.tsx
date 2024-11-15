import React, { useState, useEffect } from "react";

interface WhereWeWorkItem {
  img: string;
  title: string;
  about: string;
}

interface WhereWeWorkSectionProps {
  isEditing: boolean;
  whereWeWorkData: WhereWeWorkItem[]; // Add this prop to receive the data
  setWhereWeWorkData: React.Dispatch<React.SetStateAction<WhereWeWorkItem[]>>; // Pass setter for whereWeWork data
}

const WhereWeWorkSection = ({
  isEditing,
  whereWeWorkData,
  setWhereWeWorkData,
}: WhereWeWorkSectionProps) => {
  const [whereWeWork, setWhereWeWork] = useState<WhereWeWorkItem[]>(whereWeWorkData);

  // Sync state with props when data is fetched
  useEffect(() => {
    setWhereWeWork(whereWeWorkData);
  }, [whereWeWorkData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedItems = [...whereWeWork];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setWhereWeWork(updatedItems);
  };

  const addNewItem = () => {
    setWhereWeWork((prev) => [
      ...prev,
      {
        img: "",
        title: "",
        about: "",
      },
    ]);
  };

  const removeItem = (index: number) => {
    const updatedItems = whereWeWork.filter((_, i) => i !== index);
    setWhereWeWork(updatedItems);
  };

  const updateChanges = () => {
    setWhereWeWorkData(whereWeWork);
    console.log("Updated Where We Work Data:", whereWeWork);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Where We Work Section</h2>

      <form className="space-y-6">
        {whereWeWork.map((item, index) => (
          <div key={index} className="space-y-4 border-b pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Image URL */}
              <div>
                <label className="block font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="img"
                  value={item.img}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditing}
                />
              </div>

              {/* Title */}
              <div>
                <label className="block font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={item.title}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700">About</label>
              <textarea
                name="about"
                value={item.about}
                onChange={(e) => handleChange(e, index)}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>

            {/* Remove Item Button */}
            {whereWeWork.length > 1 && isEditing && (
              <div className="ml-3 flex justify">
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  -
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add New Item Button */}
        {isEditing && (
          <div className="ml-3 flex justify">
            <button
              type="button"
              onClick={addNewItem}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              +
            </button>
          </div>
        )}

        {/* Save Changes Button */}
        {isEditing && (
          <div className="ml-3 flex justify mt-4">
            <button
              type="button"
              onClick={updateChanges}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Update Changes
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default WhereWeWorkSection;
