import React, { useState, useEffect } from 'react';

interface Faq {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  isEditing: boolean;
  faqData: Faq[]; // Accepting faqData as prop
  setFaqData: (updatedFaqs: Faq[]) => void; // Setter function to update the FAQ data
}

const FaqSection = ({ isEditing, faqData, setFaqData }: FaqSectionProps) => {
  const [localFaqData, setLocalFaqData] = useState<Faq[]>(faqData);

  // Debugging the faqData to ensure it's passed correctly
  useEffect(() => {
    console.log('Received FAQ Data:', faqData);
    setLocalFaqData(faqData); // Update local state whenever faqData changes
  }, [faqData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setLocalFaqData((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, [name]: value } : faq
      )
    );
  };

  const handleAddFaq = () => {
    setLocalFaqData([
      ...localFaqData,
      { question: '', answer: '' },
    ]);
  };

  const handleRemoveFaq = (index: number) => {
    const updatedFaqs = localFaqData.filter((_, i) => i !== index);
    setLocalFaqData(updatedFaqs);
  };

  const handleSave = () => {
    // Pass updated data back to the parent component
    setFaqData(localFaqData);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">FAQ Section</h2>
      <form className="space-y-4">
        {localFaqData.map((faq, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Question</label>
              <input
                type="text"
                name="question"
                value={faq.question}
                onChange={(e) => handleChange(e, index)}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Answer</label>
              <textarea
                name="answer"
                value={faq.answer}
                onChange={(e) => handleChange(e, index)}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>

            {/* Remove FAQ Button */}
            {isEditing && (
              <div>
              <button
                type="button"
                onClick={() => handleRemoveFaq(index)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                -
              </button>
              </div>
            )}
          </div>
        ))}

        {/* Add FAQ Button */}
        {isEditing && (
          <button
            type="button"
            onClick={handleAddFaq}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            +
          </button>
        )}

        {/* Save Changes Button */}
        {isEditing && (
          <div>
          <button
            type="button"
            onClick={handleSave}
            className="mt-2 bg-green-500 text-white p-2 rounded"
          >
            Save Changes
          </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default FaqSection;
