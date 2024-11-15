import React, { useState, useEffect } from 'react';

interface Testimonial {
  img: string;
  name: string;
  text: string;
}

interface TestimonialSectionProps {
  isEditing: boolean;
  testimonialsData: Testimonial[]; // Accept testimonials data as prop
  setTestimonialsData: (data: Testimonial[]) => void; // Function to update data
}

const TestimonialSection = ({
  isEditing,
  testimonialsData,
  setTestimonialsData,
}: TestimonialSectionProps) => {
  // Local state to handle editing
  const [localTestimonialsData, setLocalTestimonialsData] = useState<Testimonial[]>(testimonialsData);

  useEffect(() => {
    setLocalTestimonialsData(testimonialsData);
  }, [testimonialsData]);

  // Handle changes in both text and image fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: 'text' | 'img' | 'name'
  ) => {
    const { value } = e.target;
    const updatedTestimonials = [...localTestimonialsData];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value
    };
    setLocalTestimonialsData(updatedTestimonials); // Update local state
  };

  // Add new testimonial
  const handleAddTestimonial = () => {
    const newTestimonial = {
      img: '',
      name: 'New Testimonial',
      text: '',
    };
    const updatedTestimonials = [...localTestimonialsData, newTestimonial];
    setLocalTestimonialsData(updatedTestimonials); // Update local state
  };

  // Remove testimonial
  const handleRemoveTestimonial = (index: number) => {
    const updatedTestimonials = localTestimonialsData.filter((_, i) => i !== index);
    setLocalTestimonialsData(updatedTestimonials); // Update local state
  };

  // Save changes and update parent component
  const handleSaveChanges = () => {
    setTestimonialsData(localTestimonialsData); // Update parent state with the latest data
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Testimonial Section</h2>
      <div className="space-y-4">
        {localTestimonialsData.map((testimonial, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <div>
              <label className="block">Testimonial Image</label>
              <input
                type="text"
                value={testimonial.img}
                onChange={(e) => handleChange(e, index, 'img')}
                disabled={!isEditing}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block">Testimonial Name</label>
              <input
                type="text"
                value={testimonial.name}
                onChange={(e) => handleChange(e, index, 'name')}
                disabled={!isEditing}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block">Testimonial Text</label>
              <textarea
                value={testimonial.text}
                onChange={(e) => handleChange(e, index, 'text')}
                disabled={!isEditing}
                className="w-full border rounded-lg p-2"
              />
            </div>
            {isEditing && (
              <button
                type="button"
                onClick={() => handleRemoveTestimonial(index)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                -
              </button>
            )}
          </div>
        ))}
        {isEditing && (
          <button
            type="button"
            onClick={handleAddTestimonial}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            +
          </button>
        )}
        <div>
        {isEditing && (
          <button
            type="button"
            onClick={handleSaveChanges}
            className="mt-2 bg-green-500 text-white p-2 rounded"
          >
            Save Changes
          </button>
        )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
