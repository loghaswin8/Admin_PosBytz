import React from "react";

interface PrinciplesDescription {
  title: string;
  description: string[];
  buttonText: string;
}

interface PrinciplesSectionProps {
  isEditing: boolean;
  principles: PrinciplesDescription | null;
  setPrinciplesData: React.Dispatch<React.SetStateAction<PrinciplesDescription | null>>; // Added setter prop
}

const PrinciplesSection = ({
  isEditing,
  principles,
  setPrinciplesData,
}: PrinciplesSectionProps) => {
  if (!principles) {
    return <div>Loading Principles...</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("description") && index !== undefined) {
      const updatedDescription = [...principles.description];
      updatedDescription[index] = value;

      setPrinciplesData({
        ...principles,
        description: updatedDescription,
      });
    } else {
      setPrinciplesData({
        ...principles,
        [name]: value,
      });
    }
  };

  const addDescriptionLine = () => {
    setPrinciplesData({
      ...principles,
      description: [...principles.description, ""],
    });
  };

  const removeDescriptionLine = (index: number) => {
    const updatedDescription = principles.description.filter(
      (_, descIndex) => descIndex !== index
    );

    setPrinciplesData({
      ...principles,
      description: updatedDescription,
    });
  };

  const updateChanges = () => {
    console.log("Updated Principles Data:", principles);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Principles Section</h2>

      <form className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={principles.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          {principles.description.map((desc, index) => (
            <div key={index} className="flex items-center mb-2">
              <textarea
                name={`description-${index}`}
                value={desc}
                onChange={(e) => handleChange(e, index)}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
              {isEditing && (
                <button
                  type="button"
                  onClick={() => removeDescriptionLine(index)}
                  className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  -
                </button>
              )}
            </div>
          ))}
          {isEditing && (
            <button
              type="button"
              onClick={addDescriptionLine}
              className="ml-3 mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              +
            </button>
          )}
        </div>

        {/* Button Text */}
        <div>
          <label className="block font-medium text-gray-700">Button Text</label>
          <input
            type="text"
            name="buttonText"
            value={principles.buttonText}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        {/* Save Changes Button */}
        {isEditing && (
          <div className="flex justify ml-3">
            <button
              type="button"
              onClick={updateChanges}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update Changes
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default PrinciplesSection;
