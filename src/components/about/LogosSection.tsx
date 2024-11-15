import React, { useState, useEffect } from "react";

interface Logo {
  src: string;
  alt: string;
}

interface LogosSectionProps {
  isEditing: boolean;
  logos: {
    posBytz: Logo;
    bytize: Logo;
  } | null | undefined;
  productText: string; // Added productText prop
  setLogosData: React.Dispatch<React.SetStateAction<any>>; // Pass setter for logos data
  setProductTextData: React.Dispatch<React.SetStateAction<string>>; // Pass setter for product text data
}

const LogosSection = ({
  isEditing,
  logos,
  productText,
  setLogosData,
  setProductTextData,
}: LogosSectionProps) => {
  // Use a default value for logos if it's null or undefined
  const [updatedLogos, setUpdatedLogos] = useState(logos || {
    posBytz: { src: "", alt: "" },
    bytize: { src: "", alt: "" },
  });
  const [updatedProductText, setUpdatedProductText] = useState(productText || ""); // Default value for productText

  // Set the state initially from props (only on mount)
  useEffect(() => {
    if (logos) {
      setUpdatedLogos(logos);
    }
    if (productText) {
      setUpdatedProductText(productText);
    }
  }, [logos, productText]); // Ensure this runs only when logos or productText prop changes

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    logoName: "posBytz" | "bytize",
    field?: keyof Logo
  ) => {
    const { value } = e.target;

    if (field) {
      setUpdatedLogos((prevState) => ({
        ...prevState,
        [logoName]: {
          ...prevState[logoName],
          [field]: value,
        },
      }));
    }
  };

  const handleProductTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProductText(e.target.value);
  };

  const updateChanges = () => {
    setLogosData(updatedLogos);
    setProductTextData(updatedProductText);
    console.log("Updated Logos Data:", updatedLogos);
    console.log("Updated Product Text:", updatedProductText);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Logos Section</h2>

      <form className="space-y-4">
        {/* Logos Fields (1x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PosBytz Logo */}
          <div>
            <h3 className="font-medium text-xl mb-2">PosBytz Logo</h3>
            <div>
              <label className="block font-medium text-gray-700">Logo Image Source (URL)</label>
              <input
                type="text"
                value={updatedLogos.posBytz.src}
                onChange={(e) => handleChange(e, "posBytz", "src")}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Logo Alt Text</label>
              <input
                type="text"
                value={updatedLogos.posBytz.alt}
                onChange={(e) => handleChange(e, "posBytz", "alt")}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Bytize Logo */}
          <div>
            <h3 className="font-medium text-xl mb-2">Bytize Logo</h3>
            <div>
              <label className="block font-medium text-gray-700">Logo Image Source (URL)</label>
              <input
                type="text"
                value={updatedLogos.bytize.src}
                onChange={(e) => handleChange(e, "bytize", "src")}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Logo Alt Text</label>
              <input
                type="text"
                value={updatedLogos.bytize.alt}
                onChange={(e) => handleChange(e, "bytize", "alt")}
                className="w-full border rounded-lg p-2"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Product Text */}
          <div className="col-span-1 md:col-span-2">
            <label className="block font-medium text-gray-700">Product Text</label>
            <input
              type="text"
              value={updatedProductText}
              onChange={handleProductTextChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
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

export default LogosSection;
