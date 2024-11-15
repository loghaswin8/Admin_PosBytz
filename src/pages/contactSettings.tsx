import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import NavbarSection from '@/components/contact/NavbarSection';
import HeroSection from '@/components/contact/HeroSection';
import HeaderSection from '@/components/contact/HeaderSection';
import ContactForm from '@/components/contact/ContactForm';
import ContactClient from '../server/client/contact';

const ContactSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [navbarData, setNavbarData] = useState(null);
  const [heroSectionData, setHeroSectionData] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [formPlaceholders, setFormPlaceholders] = useState(null);
  const [submitButton, setSubmitButton] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ContactClient.fetchContact('3'); // Use the correct ID or handle dynamically
        console.log("contact data: ", data);

        setNavbarData(data.data.navbar);
        setHeroSectionData(data.data.heroSection);
        setHeaderData(data.data.header);
        setFormPlaceholders(data.data.formPlaceholders);
        setSubmitButton(data.data.submitButton);
      } catch (error) {
        console.error('Error fetching contact data:', error);
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
      const updatedContactData = {
        navbar: navbarData,
        heroSection: heroSectionData,
        header: headerData,
        submitButton: submitButton,
      };

      const response = await ContactClient.updateContact(updatedContactData);
      console.log('Contact data updated successfully:', response);
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error updating contact data:', error);
    }
  };

  return (
    <Layout>
      <div className='pl-[17%] p-8 bg-white'>
        <h1 className="text-3xl font-bold mb-6">Edit Contact Page Settings</h1>

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
          <HeaderSection
            isEditing={isEditing}
            header={headerData}
            setHeaderData={setHeaderData} // Pass setter to child
          />
          <ContactForm 
            isEditing={isEditing} 
            formPlaceholders={formPlaceholders} 
            submitButton={submitButton} 
            setSubmitButton={setSubmitButton} // Pass setter to child
          />
        </div>
      </div>
    </Layout>
  );
};

export default ContactSettings;
