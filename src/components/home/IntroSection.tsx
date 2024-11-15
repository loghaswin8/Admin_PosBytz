import React, { useState, useEffect } from 'react';

interface IntroSectionProps {
  isEditing: boolean;
  introData: {
    heading: string;
    paragraph: string;
    buttonText: string;
    image: {
      src: string;
      alt: string;
    };
  };
  onUpdate: (updatedData: any) => void;
}

const IntroSection = ({ isEditing, introData, onUpdate }: IntroSectionProps) => {
  // Set default values for introData and image
  const [localIntro, setLocalIntro] = useState({
    heading: introData?.heading || '',
    paragraph: introData?.paragraph || '',
    buttonText: introData?.buttonText || '',
    image: {
      src: introData?.image?.src || '', // Default to empty string if undefined
      alt: introData?.image?.alt || '', // Default to empty string if undefined
    },
  });

  useEffect(() => {
    // Sync with parent data on update
    setLocalIntro({
      heading: introData?.heading || '',
      paragraph: introData?.paragraph || '',
      buttonText: introData?.buttonText || '',
      image: {
        src: introData?.image?.src || '',
        alt: introData?.image?.alt || '',
      },
    });
  }, [introData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setLocalIntro((prevState) => {
      if (name === 'imageSrc') {
        return {
          ...prevState,
          image: {
            ...prevState.image,
            src: value,
          },
        };
      } else if (name === 'imageAlt') {
        return {
          ...prevState,
          image: {
            ...prevState.image,
            alt: value,
          },
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const handleSave = () => {
    // Pass updated data back to the parent component
    onUpdate(localIntro);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Intro Section</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Heading</label>
            <input
              type="text"
              name="heading"
              value={localIntro.heading}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Paragraph</label>
            <textarea
              name="paragraph"
              value={localIntro.paragraph}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Button Text</label>
            <input
              type="text"
              name="buttonText"
              value={localIntro.buttonText}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Image Source</label>
            <input
              type="text"
              name="imageSrc"
              value={localIntro.image.src}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Image Alt</label>
            <input
              type="text"
              name="imageAlt"
              value={localIntro.image.alt}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
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

export default IntroSection;
