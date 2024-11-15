import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import NavbarSection from '@/components/support/NavbarSection';
import HeroSection from '@/components/support/HeroSection';
import HelpSection from '@/components/support/HelpSection';
import HelpKindForm from '@/components/support/HelpKindForm';
import WhatsAppSection from '@/components/support/WhatsAppSection';
import SupportClient from '../server/client/support';

const SupportSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [navbarData, setNavbarData] = useState(null);
  const [heroSectionData, setHeroSectionData] = useState(null);
  const [helpSectionData, setHelpSectionData] = useState([]);
  const [helpKindData, setHelpKindData] = useState({
    heading: "",
    paragraph: "",
    Kindofhelp: [],
  });
  const [whatsappData, setWhatsAppData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await SupportClient.fetchSupport('4'); // Use the correct ID or handle dynamically
        console.log("support data: ", data);

        setNavbarData(data.data.navbar);
        setHeroSectionData(data.data.heroSection);
        setHelpSectionData(data.data.help || []);
        setHelpKindData(data.data.helpKindData);
        setWhatsAppData(data.data.whatsapp);

      } catch (error) {
        console.error('Error fetching support data:', error);
      }
    };

    fetchData();
  }, []);

  // Toggle Edit Mode
  const handleToggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  // Handle Update Changes
  const handleUpdateChanges = async () => {
    try {
      const updatedSupportData = {
        navbar: navbarData,
        heroSection: heroSectionData,
        help: helpSectionData,
        helpKindData: helpKindData,
        whatsapp: whatsappData,
      };

      const response = await SupportClient.updateSupport(updatedSupportData);
      console.log('Support data updated successfully:', response);
      setIsEditing(false); // Exit edit mode after saving

    } catch (error) {
      console.error('Error updating support data:', error);
    }
  };

  return (
    <Layout>
      <div className="pl-[17%] p-8 bg-white">
        <h1 className="text-3xl font-bold mb-6">Edit Support Page Settings</h1>

        {/* Edit/Cancel Button */}
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={handleToggleEditMode}
            className={`py-2 px-4 rounded-lg mr-3 text-white ${isEditing ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            {isEditing ? 'Cancel Edit' : 'Edit'}
          </button>

          {/* Save Changes Button */}
          {isEditing && (
            <button
              onClick={handleUpdateChanges}
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Save Changes
            </button>
          )}
        </div>

        {/* Content Components in Grid Layout */}
        <div>
          <NavbarSection
            isEditing={isEditing}
            navbar={navbarData}
            setNavbarData={setNavbarData} // Pass setter to child
          />
          <HeroSection
            isEditing={isEditing}
            hero={heroSectionData}
            onUpdate={setHeroSectionData} // Pass setter to child
          />
          <HelpSection
            isEditing={isEditing}
            helpItems={helpSectionData}
            setHelpSectionData={setHelpSectionData} // Pass setter to child
          />
          <HelpKindForm
            isEditing={isEditing}
            helpKindData={helpKindData}
            setHelpKindData={setHelpKindData} // Pass setter to child
          />
          <WhatsAppSection
            isEditing={isEditing}
            whatsappData={whatsappData}
            setWhatsAppData={setWhatsAppData} // Pass setter to child
          />
        </div>
      </div>
    </Layout>
  );
};

export default SupportSettings;
