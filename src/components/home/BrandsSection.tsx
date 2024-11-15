import React from 'react';

interface Brand {
  image: string;
}

interface BrandsData {
  row1: Brand[];
  row2: Brand[];
  row3: Brand[];
}

interface BrandsSectionProps {
  isEditing: boolean;
  brandsData: BrandsData; // Accept brandsData as prop
  setBrandsData: React.Dispatch<React.SetStateAction<BrandsData>>; // Setter for updating data in the parent component
}

const BrandsSection = ({ isEditing, brandsData, setBrandsData }: BrandsSectionProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowKey: keyof BrandsData,
    index: number
  ) => {
    // Handle the image URL change for editing
    const { value } = e.target;
    const updatedRow = [...brandsData[rowKey]];
    updatedRow[index] = { image: value };

    // Update the brandsData in the parent component via setter
    setBrandsData((prevData) => ({
      ...prevData,
      [rowKey]: updatedRow,
    }));
  };

  const handleAddBrand = (rowKey: keyof BrandsData) => {
    // Handle adding a new brand to a row by pushing an empty image URL
    const updatedRow = [...brandsData[rowKey], { image: '' }];
    setBrandsData((prevData) => ({
      ...prevData,
      [rowKey]: updatedRow,
    }));
  };

  const handleRemoveBrand = (rowKey: keyof BrandsData, index: number) => {
    // Handle removing a brand from a row
    const updatedRow = brandsData[rowKey].filter((_, i) => i !== index);
    setBrandsData((prevData) => ({
      ...prevData,
      [rowKey]: updatedRow,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic here
    console.log('Updated Brands Data:', brandsData);
    // Optionally, you could call a function to send the updated data back to the server
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Brands Section</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Render Brand rows */}
        {['row1', 'row2', 'row3'].map((rowKey) => (
          <div key={rowKey} className="mb-4">
            <h3 className="text-xl font-semibold">{rowKey}</h3>
            <div className="space-y-2">
              {brandsData[rowKey as keyof BrandsData].map((brand, index) => (
                <div key={index} className="flex items-center gap-4">
                  <input
                    type="text"
                    value={brand.image}
                    onChange={(e) => handleChange(e, rowKey as keyof BrandsData, index)}
                    className="w-full border rounded-lg p-2"
                    placeholder="Enter image URL"
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <div className="mt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => handleRemoveBrand(rowKey as keyof BrandsData, index)}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                    >
                      -
                    </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <button
                type="button"
                onClick={() => handleAddBrand(rowKey as keyof BrandsData)}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                +
              </button>
            )}
          </div>
        ))}

        {/* Save Changes Button */}
        {isEditing && (
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            Save Changes
          </button>
        )}
      </form>
    </section>
  );
};

export default BrandsSection;
