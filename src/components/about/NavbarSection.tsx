import React, { useState, useEffect } from "react";

interface Logo {
  src: string;
  alt: string;
}

interface NavbarData {
  backgroundColorDefault: string;
  backgroundColorScrolled: string;
  linkColorDefault: string;
  linkColorScrolled: string;
  mainLogo: Logo;
  stickyLogo: Logo;
}

interface NavbarSectionProps {
  isEditing: boolean;
  navbar: NavbarData | null; // Allow navbar to be null
  setNavbarData: (data: NavbarData) => void; // Function to update navbar data in parent
}

const NavbarSection = ({ isEditing, navbar, setNavbarData }: NavbarSectionProps) => {
  const [navbarState, setNavbarState] = useState<NavbarData>(
    navbar || {
      backgroundColorDefault: "",
      backgroundColorScrolled: "",
      linkColorDefault: "",
      linkColorScrolled: "",
      mainLogo: { src: "", alt: "" },
      stickyLogo: { src: "", alt: "" },
    }
  );

  useEffect(() => {
    if (navbar) {
      setNavbarState(navbar); // Sync with parent data
    }
  }, [navbar]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section?: keyof NavbarData // Explicitly narrow down to keys of NavbarData
  ) => {
    const { name, value } = e.target;
  
    if (section) {
      setNavbarState((prevState) => ({
        ...prevState,
        [section]: {
          ...prevState[section as keyof NavbarData] as Logo, // Explicitly assert type as Logo
          [name]: value,
        },
      }));
    } else {
      setNavbarState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const handleSave = () => {
    setNavbarData(navbarState); // Update parent component state
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Navbar Section</h2>

      <form className="space-y-4">
        {/* Background Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">
              Default Background Color
            </label>
            <input
              type="text"
              name="backgroundColorDefault"
              value={navbarState.backgroundColorDefault}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Scrolled Background Color
            </label>
            <input
              type="text"
              name="backgroundColorScrolled"
              value={navbarState.backgroundColorScrolled}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Link Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">
              Default Link Color
            </label>
            <input
              type="text"
              name="linkColorDefault"
              value={navbarState.linkColorDefault}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Scrolled Link Color
            </label>
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

        {/* Main Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Main Logo</label>
            <input
              type="text"
              name="src"
              value={navbarState.mainLogo.src}
              onChange={(e) => handleChange(e, "mainLogo")}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Alt Text</label>
            <input
              type="text"
              name="alt"
              value={navbarState.mainLogo.alt}
              onChange={(e) => handleChange(e, "mainLogo")}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Sticky Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Sticky Logo</label>
            <input
              type="text"
              name="src"
              value={navbarState.stickyLogo.src}
              onChange={(e) => handleChange(e, "stickyLogo")}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Alt Text</label>
            <input
              type="text"
              name="alt"
              value={navbarState.stickyLogo.alt}
              onChange={(e) => handleChange(e, "stickyLogo")}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div>
            <button
              type="button"
              onClick={handleSave}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default NavbarSection;
