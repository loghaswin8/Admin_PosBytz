import React, { useState, useEffect } from "react";

interface OpenPosition {
  img: string;
  title: string;
}

interface OpenPositionSectionProps {
  isEditing: boolean;
  openPositions: OpenPosition[]; // Receive open positions as prop
  setOpenPositionData: React.Dispatch<React.SetStateAction<OpenPosition[]>>; // Pass setter to update parent state
}

const OpenPositionSection = ({ 
  isEditing, 
  openPositions, 
  setOpenPositionData 
}: OpenPositionSectionProps) => {
  const [positions, setPositions] = useState<OpenPosition[]>(openPositions);

  // Sync positions state when openPositions prop changes
  useEffect(() => {
    setPositions(openPositions);
  }, [openPositions]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedPositions = [...positions];
    updatedPositions[index][name as keyof OpenPosition] = value;
    setPositions(updatedPositions);
  };

  const addPosition = () => {
    setPositions([...positions, { img: "fab fa-black-tie", title: "" }]);
  };

  const removePosition = (index: number) => {
    const updatedPositions = positions.filter((_, i) => i !== index);
    setPositions(updatedPositions);
  };

  const updateChanges = () => {
    setOpenPositionData(positions);
    console.log("Updated Open Position Data:", positions);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Open Position Section</h2>

      <form className="space-y-4">
        {positions.map((position, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg p-4 shadow space-y-2 sm:space-y-0"
          >
            <div>
              <label className="block font-medium text-gray-700">Position Image (Icon)</label>
              <input
                type="text"
                name="img"
                value={position.img}
                onChange={(e) => handleChange(e, index)}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Position Title</label>
              <input
                type="text"
                name="title"
                value={position.title}
                onChange={(e) => handleChange(e, index)}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>

            {isEditing && (
              <div className="flex justify col-span-2">
                <button
                  type="button"
                  onClick={() => removePosition(index)}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  -
                </button>
              </div>
            )}
          </div>
        ))}

        {isEditing && (
          <div className="justify">
            <button
              type="button"
              onClick={addPosition}
              className="ml-3 mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              +
            </button>

            <div className="mt-4 ml-3">
              <button
                type="button"
                onClick={updateChanges}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Update Changes
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default OpenPositionSection;
