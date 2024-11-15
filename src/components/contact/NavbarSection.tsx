import React, { useState, useEffect } from 'react';

interface Navbar {
  backgroundColorDefault: string;
  backgroundColorScrolled: string;
  linkColorDefault: string;
  linkColorScrolled: string;
}

interface NavbarSectionProps {
  isEditing: boolean;
  navbar: Navbar | null; // Accept navbar data as a prop, allow null as default
  setNavbarData: React.Dispatch<React.SetStateAction<Navbar | null>>; // Setter to pass updated data back to the parent
}

const NavbarSection = ({ isEditing, navbar, setNavbarData }: NavbarSectionProps) => {
  // Set default values for navbarState in case navbar is null
  const [navbarState, setNavbarState] = useState<Navbar>({
    backgroundColorDefault: '',
    backgroundColorScrolled: '',
    linkColorDefault: '',
    linkColorScrolled: '',
  });

  useEffect(() => {
    if (navbar) {
      setNavbarState(navbar); // Update state when the prop changes and navbar is not null
    }
  }, [navbar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNavbarState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateChanges = () => {
    console.log("Updated Navbar Data:", navbarState);
    setNavbarData(navbarState); // Pass the updated navbar data back to the parent component
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Navbar Section</h2>

      <form className="space-y-4">
        {/* Grid for Navbar fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Background Color Default */}
          <div>
            <label className="block font-medium text-gray-700">Background Color (Default)</label>
            <input
              type="text"
              name="backgroundColorDefault"
              value={navbarState.backgroundColorDefault}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          {/* Background Color Scrolled */}
          <div>
            <label className="block font-medium text-gray-700">Background Color (Scrolled)</label>
            <input
              type="text"
              name="backgroundColorScrolled"
              value={navbarState.backgroundColorScrolled}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          {/* Link Color Default */}
          <div>
            <label className="block font-medium text-gray-700">Link Color (Default)</label>
            <input
              type="text"
              name="linkColorDefault"
              value={navbarState.linkColorDefault}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>

          {/* Link Color Scrolled */}
          <div>
            <label className="block font-medium text-gray-700">Link Color (Scrolled)</label>
            <input
              type="text"
              name="linkColorScrolled"
              value={navbarState.linkColorScrolled}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Update Button */}
        {isEditing && (
          <button
            type="button"
            onClick={updateChanges}
            className="mt-4 bg-green-500 text-white p-2 rounded"
          >
            Update Changes
          </button>
        )}
      </form>
    </section>
  );
};

export default NavbarSection;
