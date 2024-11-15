import React, { useState, useEffect } from "react";

interface AboutDescription {
  title: string;
  description: string[];
}

interface AboutSectionProps {
  isEditing: boolean;
  about: AboutDescription | null;
  onUpdate: (updatedData: AboutDescription) => void; // Prop for updating data
}

const AboutSection = ({ isEditing, about, onUpdate }: AboutSectionProps) => {
  const [localAbout, setLocalAbout] = useState<AboutDescription>({
    title: "",
    description: [],
  });

  useEffect(() => {
    if (about) {
      setLocalAbout(about);
    }
  }, [about]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("description") && index !== undefined) {
      const updatedDescription = [...localAbout.description];
      updatedDescription[index] = value;

      setLocalAbout((prevState) => ({
        ...prevState,
        description: updatedDescription,
      }));
    } else {
      setLocalAbout((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addDescriptionLine = () => {
    setLocalAbout((prevState) => ({
      ...prevState,
      description: [...prevState.description, ""],
    }));
  };

  const removeDescriptionLine = (index: number) => {
    const updatedDescription = localAbout.description.filter((_, i) => i !== index);
    setLocalAbout((prevState) => ({
      ...prevState,
      description: updatedDescription,
    }));
  };

  const handleSave = () => {
    onUpdate(localAbout); // Pass updated data to parent
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">About Section</h2>

      <form className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={localAbout.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localAbout.description.map((desc, index) => (
              <div key={index} className="w-full">
                <label className="block text-sm">{`Line ${index + 1}`}</label>
                <textarea
                  name="description"
                  value={desc}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditing}
                />
                {isEditing && localAbout.description.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDescriptionLine(index)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={addDescriptionLine}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            +
          </button>
        )}

        {isEditing && (
          <div>
            <button
              type="button"
              onClick={handleSave}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default AboutSection;
