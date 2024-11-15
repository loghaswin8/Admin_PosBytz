import React, { useState, useEffect } from 'react';

interface FeatureSectionProps {
  features: Array<{
    id: string;
    name: string;
    text: string[];
    color: string;
    buttonImgSrc: string;
    contentImgSrc: string;
  }>;
  isEditing: boolean;
  setFeaturesData: React.Dispatch<React.SetStateAction<any>>; // Function to update the features data in the parent
}

const FeatureSection = ({ features, isEditing, setFeaturesData }: FeatureSectionProps) => {
  const [featuresState, setFeaturesState] = useState(features);

  // Syncing the features prop with state when it changes
  useEffect(() => {
    setFeaturesState(features);
  }, [features]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    const { name, value } = e.target;

    // Update the feature state when text or any other field is changed
    if (name === 'text') {
      const updatedFeatures = featuresState.map((feature) =>
        feature.id === id
          ? { ...feature, [name]: value.split("\n") }
          : feature
      );
      setFeaturesState(updatedFeatures);
    } else {
      const updatedFeatures = featuresState.map((feature) =>
        feature.id === id
          ? { ...feature, [name]: value }
          : feature
      );
      setFeaturesState(updatedFeatures);
    }
  };

  const handleAddFeature = () => {
    const newFeature = {
      id: `js-rev-${featuresState.length + 1}`,
      name: '',
      text: [''],
      color: '#000000',
      buttonImgSrc: '',
      contentImgSrc: '',
    };
    setFeaturesState([...featuresState, newFeature]);
  };

  const handleRemoveFeature = (id: string) => {
    setFeaturesState(featuresState.filter((feature) => feature.id !== id));
  };

  const handleUpdateChanges = () => {
    // Pass updated data back to the parent
    setFeaturesData(featuresState);
    console.log('Updated Features Data:', featuresState);
  };

  return (
    <section className="p-8 bg-white">
      <h2 className="text-2xl font-bold mb-4">Features</h2>
      <form className="space-y-4">
        {featuresState.map((feature) => (
          <div key={feature.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg">
            {/* Feature Name */}
            <div>
              <label className="block font-medium text-gray-700">Feature Name</label>
              <input
                type="text"
                name="name"
                value={feature.name}
                onChange={(e) => handleChange(e, feature.id)}
                className="border p-2 w-full"
                disabled={!isEditing}
              />
            </div>

            {/* Feature Text */}
            <div>
              <label className="block font-medium text-gray-700">Feature Text</label>
              <textarea
                name="text"
                value={feature.text.join("\n")}
                onChange={(e) => handleChange(e, feature.id)}
                className="border p-2 w-full"
                rows={4}
                disabled={!isEditing}
              />
            </div>

            {/* Button Image Source */}
            <div>
              <label className="block font-medium text-gray-700">Button Image URL</label>
              <input
                type="text"
                name="buttonImgSrc"
                value={feature.buttonImgSrc}
                onChange={(e) => handleChange(e, feature.id)}
                className="border p-2 w-full"
                disabled={!isEditing}
              />
            </div>

            {/* Content Image Source */}
            <div>
              <label className="block font-medium text-gray-700">Content Image URL</label>
              <input
                type="text"
                name="contentImgSrc"
                value={feature.contentImgSrc}
                onChange={(e) => handleChange(e, feature.id)}
                className="border p-2 w-full"
                disabled={!isEditing}
              />
            </div>

            {/* Remove Button */}
            {isEditing && featuresState.length > 1 && (
              <div className="mt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(feature.id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                  -
                </button>
              </div>
            )}
          </div>
        ))}
      </form>

      {/* Button to Add More Features */}
      {isEditing && (
        <button
          type="button"
          onClick={handleAddFeature}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          +
        </button>
      )}

      {/* Button to Save Changes */}
      {isEditing && (
        <div className="mt-4 flex justify">
          <button
            type="button"
            onClick={handleUpdateChanges}
            className="px-6 py-2 bg-green-500 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      )}
    </section>
  );
};

export default FeatureSection;
