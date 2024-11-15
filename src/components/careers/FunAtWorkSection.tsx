import React, { useState, useEffect } from "react";

interface FunAtWorkDescription {
  title: string;
  description: string;
  backgroundImage: string;
}

interface FunAtWorkSectionProps {
  isEditing: boolean;
  funAtWork: FunAtWorkDescription | null; // Ensure the prop is nullable
  setFunAtWorkData: React.Dispatch<React.SetStateAction<FunAtWorkDescription | null>>;
}

const FunAtWorkSection = ({
  isEditing,
  funAtWork,
  setFunAtWorkData,
}: FunAtWorkSectionProps) => {
  // Use a fallback value if funAtWork is null or undefined
  const [funAtWorkState, setFunAtWorkState] = useState<FunAtWorkDescription>({
    title: funAtWork?.title || "FUN @ WORK",
    description:
      funAtWork?.description || "Our HR Team Works To Bring Joy And Happiness At Work By Enabling",
    backgroundImage:
      funAtWork?.backgroundImage ||
      "https://posbytz.com/wp-content/uploads/2024/02/FUN-@-WORK.png",
  });

  useEffect(() => {
    if (funAtWork) {
      setFunAtWorkState(funAtWork);
    }
  }, [funAtWork]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFunAtWorkState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateChanges = () => {
    setFunAtWorkData(funAtWorkState); // Update parent state
    console.log("Updated Fun At Work Data:", funAtWorkState);
  };

  if (!funAtWork) {
    return <p>Loading Fun at Work data...</p>; // Handle loading state
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Fun @ Work Section</h2>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title Field */}
          <div>
            <label className="block font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={funAtWorkState.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          {/* Background Image Field */}
          <div>
            <label className="block font-medium text-gray-700">Background Image URL</label>
            <input
              type="text"
              name="backgroundImage"
              value={funAtWorkState.backgroundImage}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={funAtWorkState.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            rows={4}
            disabled={!isEditing}
          />
        </div>

        {/* Save Changes Button */}
        {isEditing && (
          <div className="ml-3 flex justify">
            <button
              type="button"
              onClick={updateChanges}
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Update Changes
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default FunAtWorkSection;
