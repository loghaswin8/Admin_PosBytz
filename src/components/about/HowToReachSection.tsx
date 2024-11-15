import React, { useState, useEffect } from "react";

interface Card {
  icon: string;
  title: string;
  description: string;
  link: string;
}

interface HowToReachSectionProps {
  isEditing: boolean;
  howToReach: {
    title: string;
    description: string;
    cards: Card[];
  } | null; // Make the prop nullable
  setHowToReachData: React.Dispatch<React.SetStateAction<any>>; // Pass setter function for howToReach data
}

const HowToReachSection = ({ isEditing, howToReach, setHowToReachData }: HowToReachSectionProps) => {
  const [howToReachData, setLocalHowToReachData] = useState(howToReach);

  useEffect(() => {
    setLocalHowToReachData(howToReach); // Update state when prop changes
  }, [howToReach]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number,
    field?: keyof Card
  ) => {
    const { name, value } = e.target;

    // Handle changes for cards
    if (index !== undefined && field) {
      const updatedCards = [...howToReachData!.cards];
      updatedCards[index] = {
        ...updatedCards[index],
        [field]: value,
      };

      setLocalHowToReachData((prevState) => ({
        ...prevState!,
        cards: updatedCards,
      }));
    } else {
      setLocalHowToReachData((prevState) => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };

  const updateChanges = () => {
    setHowToReachData(howToReachData); // Pass the updated data back to parent component
    console.log("Updated How to Reach Data:", howToReachData);
  };

  if (!howToReachData) {
    return <p>Loading How to Reach section...</p>; // Render loading state while fetching data
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">How to Reach Section</h2>

      <form className="space-y-4">
        {/* Title and Description in 1x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={howToReachData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={howToReachData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Cards Section in 1x2 Grid */}
        <div className="space-y-4">
          <label className="block font-medium text-gray-700">Cards</label>
          {howToReachData.cards.map((card, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card Icon */}
              <div>
                <label className="block font-medium text-gray-700">Icon</label>
                <input
                  type="text"
                  value={card.icon}
                  onChange={(e) => handleChange(e, index, "icon")}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditing}
                />
              </div>

              {/* Card Title */}
              <div>
                <label className="block font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => handleChange(e, index, "title")}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditing}
                />
              </div>

              {/* Card Description */}
              <div>
                <label className="block font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={card.description}
                  onChange={(e) => handleChange(e, index, "description")}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditing}
                />
              </div>

              {/* Card Link */}
              <div>
                <label className="block font-medium text-gray-700">Link</label>
                <input
                  type="text"
                  value={card.link}
                  onChange={(e) => handleChange(e, index, "link")}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditing}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Save Changes Button */}
        {isEditing && (
          <div className="flex justify">
            <button
              type="button"
              onClick={updateChanges}
              className="bg-green-500 text-white p-2 rounded"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default HowToReachSection;
