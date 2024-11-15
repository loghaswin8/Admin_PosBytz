import React, { useState, useEffect } from 'react';

interface IntegrationProps {
  isEditing: boolean;
  integrationData: {
    title: string;
    description: string;
    logos: { src: string; alt: string }[];
  };
  setIntegrationData: React.Dispatch<React.SetStateAction<any>>; // This is for updating the parent state
}

const Integration = ({ isEditing, integrationData, setIntegrationData }: IntegrationProps) => {
  const [integrations, setIntegrations] = useState(integrationData);

  useEffect(() => {
    setIntegrations(integrationData); // Update state when new data is passed
  }, [integrationData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      const updatedLogos = [...integrations.logos];
      updatedLogos[index] = {
        ...updatedLogos[index],
        [name]: value,
      };
      setIntegrations((prevState) => ({
        ...prevState,
        logos: updatedLogos,
      }));
    } else {
      setIntegrations((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddLogo = () => {
    setIntegrations((prevState) => ({
      ...prevState,
      logos: [...prevState.logos, { src: '', alt: '' }], // Add a new empty logo form
    }));
  };

  const handleRemoveLogo = (index: number) => {
    const updatedLogos = integrations.logos.filter((_, i) => i !== index);
    setIntegrations((prevState) => ({
      ...prevState,
      logos: updatedLogos,
    }));
  };

  const handleSave = () => {
    // Pass updated data back to the parent component
    setIntegrationData(integrations);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Integration Section</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={integrations.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={integrations.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Logos</label>
          {integrations.logos.map((logo, index) => (
            <div key={index} className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label className="block font-medium text-gray-700">Logo Source</label>
                <input
                  type="text"
                  name="src"
                  value={logo.src}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditing}
                />
              </div>

              <div className="w-1/2">
                <label className="block font-medium text-gray-700">Logo Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={logo.alt}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="mt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => handleRemoveLogo(index)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                  -
                </button>
                </div>
              )}
            </div>
          ))}

          {isEditing && (
            <button
              type="button"
              onClick={handleAddLogo}
              className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
              +
            </button>
          )}
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={handleSave}
            className="mt-4 bg-green-500 text-white p-2 rounded"
          >
            Save Changes
          </button>
        )}
      </form>
    </section>
  );
};

export default Integration;
