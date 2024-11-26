import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import NavbarSection from '@/components/support/NavbarSection';
import HeroSection from '@/components/support/HeroSection';
import HelpSection from '@/components/support/HelpSection';
import HelpKindForm from '@/components/support/HelpKindForm';
import WhatsAppSection from '@/components/support/WhatsAppSection';
import SupportClient from '../server/client/support';
import { parseCookies } from 'nookies';

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

    const fetchData = async () => {
      try {
        const data = await SupportClient.fetchSupport('4');
        console.log("support data: ", data);  

        if (data && data.navbar && data.heroSection && data.help) {
          setNavbarData(data.navbar || {});
          setHeroSectionData(data.heroSection || {});
          setHelpSectionData(data.help || []);
          setHelpKindData(data.helpKindData || { heading: "", paragraph: "", Kindofhelp: [] });
          setWhatsAppData(data.whatsapp || null);  
        } else {
          console.error('Invalid or missing properties in data:', data);
        }
      } catch (error) {
        console.error('Error fetching support data:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [])

  const handleToggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

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
      setIsEditing(false);

    } catch (error) {
      console.error('Error updating support data:', error);
    }
  };

  return (
    <Layout>
      <div className="pl-[17%] p-8 bg-white">
        <h1 className="text-3xl font-bold mb-6">Edit Support Page Settings</h1>

        <div className="flex justify-end items-center mb-6">
          <button
            onClick={handleToggleEditMode}
            className={`py-2 px-4 rounded-lg mr-3 text-white ${isEditing ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            {isEditing ? 'Cancel Edit' : 'Edit'}
          </button>

          {isEditing && (
            <button
              onClick={handleUpdateChanges}
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Save Changes
            </button>
          )}
        </div>

        <div>
          <NavbarSection
            isEditing={isEditing}
            navbar={navbarData}
            setNavbarData={setNavbarData}
          />
          <HeroSection
            isEditing={isEditing}
            hero={heroSectionData}
            onUpdate={setHeroSectionData} 
          />
          <HelpSection
            isEditing={isEditing}
            helpItems={helpSectionData}
            setHelpSectionData={setHelpSectionData}
          />
          <HelpKindForm
            isEditing={isEditing}
            helpKindData={helpKindData}
            setHelpKindData={setHelpKindData}
          />
          <WhatsAppSection
            isEditing={isEditing}
            whatsappData={whatsappData}
            setWhatsAppData={setWhatsAppData}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SupportSettings;

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);

  console.log('All cookies:', cookies);

  const token = cookies.token;

  if (!token || token.trim() === '') {
    console.log("Redirecting to login due to missing or empty token...");
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, 
  };
};
