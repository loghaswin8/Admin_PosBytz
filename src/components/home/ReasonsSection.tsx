import React, { useState, useEffect } from 'react';

interface Reason {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  borderColor: string;
}

interface ReasonsSectionProps {
  isEditing: boolean;
  reasonsSectionData: {
    mainTitle: string;
    subtitle: string;
    highlight: string;
    reasons: Reason[];
  } | null;
  setReasonsData: (updatedData: any) => void; // Function to pass updated data back to parent
}

const ReasonsSection = ({ isEditing, reasonsSectionData, setReasonsData }: ReasonsSectionProps) => {
  const [localReasonsData, setLocalReasonsData] = useState({
    mainTitle: '',
    subtitle: '',
    highlight: '',
    reasons: [] as Reason[],
  });

  // Sync with parent data when it changes
  useEffect(() => {
    if (reasonsSectionData) {
      setLocalReasonsData(reasonsSectionData);
    }
  }, [reasonsSectionData]);

  // Handle input changes for main fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalReasonsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle changes in individual reason items
  const handleReasonChange = (index: number, field: string, value: string) => {
    const updatedReasons = localReasonsData.reasons.map((reason, i) =>
      i === index ? { ...reason, [field]: value } : reason
    );
    setLocalReasonsData((prevState) => ({
      ...prevState,
      reasons: updatedReasons,
    }));
  };

  // Handle save changes
  const handleSave = () => {
    setReasonsData(localReasonsData);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Reasons Section</h2>
      <form className="space-y-6">
        {/* Main Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Main Title</label>
            <input
              type="text"
              name="mainTitle"
              value={localReasonsData.mainTitle}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={localReasonsData.subtitle}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Highlight</label>
            <input
              type="text"
              name="highlight"
              value={localReasonsData.highlight}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Reasons List */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Reasons</h3>
          {localReasonsData.reasons.map((reason, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={reason.title}
                    onChange={(e) => handleReasonChange(index, 'title', e.target.value)}
                    className="w-full border rounded-lg p-2"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Subtitle</label>
                  <input
                    type="text"
                    value={reason.subtitle}
                    onChange={(e) => handleReasonChange(index, 'subtitle', e.target.value)}
                    className="w-full border rounded-lg p-2"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Description</label>
                  <textarea
                    value={reason.description}
                    onChange={(e) => handleReasonChange(index, 'description', e.target.value)}
                    className="w-full border rounded-lg p-2"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={reason.image}
                    onChange={(e) => handleReasonChange(index, 'image', e.target.value)}
                    className="w-full border rounded-lg p-2"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Border Color</label>
                  <input
                    type="text"
                    value={reason.borderColor}
                    onChange={(e) => handleReasonChange(index, 'borderColor', e.target.value)}
                    className="w-full border rounded-lg p-2"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
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

export default ReasonsSection;
