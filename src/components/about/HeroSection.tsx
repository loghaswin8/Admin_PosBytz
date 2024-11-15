import React, { useState, useEffect } from 'react';

interface Breadcrumb {
  name: string;
  link: string;
}

interface HeroSectionProps {
  isEditing: boolean;
  hero: {
    title: string;
    breadcrumbs: Breadcrumb[];
  };
  onUpdate: (updatedData: any) => void;
}

const HeroSection = ({ isEditing, hero, onUpdate }: HeroSectionProps) => {
  const [localHero, setLocalHero] = useState({
    title: hero?.title || '',
    breadcrumbs: hero?.breadcrumbs || [],
  });

  useEffect(() => {
    // Sync with parent data on update
    setLocalHero({
      title: hero?.title || '',
      breadcrumbs: hero?.breadcrumbs || [],
    });
  }, [hero]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name.startsWith('breadcrumb') && index !== undefined) {
      const updatedBreadcrumbs = [...localHero.breadcrumbs];
      const key = name.split('.')[1] as keyof Breadcrumb;

      updatedBreadcrumbs[index] = {
        ...updatedBreadcrumbs[index],
        [key]: value,
      };

      setLocalHero((prevState) => ({
        ...prevState,
        breadcrumbs: updatedBreadcrumbs,
      }));
    } else {
      setLocalHero((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    // Pass updated data back to parent component
    onUpdate(localHero);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Hero Section</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={localHero.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Breadcrumbs</label>
          {localHero.breadcrumbs.map((breadcrumb, index) => (
            <div key={index} className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm">Name</label>
                  <input
                    type="text"
                    name={`breadcrumb.name`}
                    value={breadcrumb.name}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full border rounded-lg p-2"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm">Link</label>
                  <input
                    type="text"
                    name={`breadcrumb.link`}
                    value={breadcrumb.link}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full border rounded-lg p-2"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleSave}
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default HeroSection;
