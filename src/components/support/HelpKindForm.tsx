import React from 'react';

interface HelpKindItem {
  title: string;
  about: string;
  buttonText: string;
}

interface HelpKindFormProps {
  isEditing: boolean;
  helpKindData: {
    heading: string;
    paragraph: string;
    Kindofhelp: HelpKindItem[];
  };
  setHelpKindData: React.Dispatch<React.SetStateAction<any>>; // Pass setter to update state in parent
}

const HelpKindForm = ({ isEditing, helpKindData, setHelpKindData }: HelpKindFormProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      const updatedKindofhelp = [...helpKindData.Kindofhelp];
      updatedKindofhelp[index] = {
        ...updatedKindofhelp[index],
        [name]: value,
      };
      setHelpKindData((prevState: any) => ({
        ...prevState,
        Kindofhelp: updatedKindofhelp,
      }));
    } else {
      setHelpKindData((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Help Kind Section</h2>
      <form className="space-y-4">
        {/* Heading and Paragraph */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Heading</label>
            <input
              type="text"
              name="heading"
              value={helpKindData.heading}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Paragraph</label>
            <textarea
              name="paragraph"
              value={helpKindData.paragraph}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Kind of Help Section */}
        <div>
          <label className="block font-medium text-gray-700">Kind of Help</label>
          {helpKindData.Kindofhelp.map((help, index) => (
            <div key={index} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={help.title}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full border rounded-lg p-2"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm">About</label>
                  <input
                    type="text"
                    name="about"
                    value={help.about}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full border rounded-lg p-2"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm">Button Text</label>
                  <input
                    type="text"
                    name="buttonText"
                    value={help.buttonText}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full border rounded-lg p-2"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Changes Button */}
        {isEditing && (
          <div className="flex justify">
            <button
              type="button"
              onClick={() => setHelpKindData(helpKindData)} // Trigger save for updated data
              className="bg-green-500 text-white p-2 rounded"
            >
              Update Changes
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default HelpKindForm;
