import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import NavbarSection from '@/components/contact/NavbarSection';
import HeroSection from '@/components/contact/HeroSection';
import HeaderSection from '@/components/contact/HeaderSection';
import ContactForm from '@/components/contact/ContactForm';
import ContactClient from '../server/client/contact';
import { parseCookies } from 'nookies';

const ContactSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [navbarData, setNavbarData] = useState(null);
  const [heroSectionData, setHeroSectionData] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [formPlaceholders, setFormPlaceholders] = useState(null);
  const [submitButton, setSubmitButton] = useState('');

    const fetchData = async () => {
      try {
        const data = await ContactClient.fetchContact('3');
        console.log("contact data: ", data);
  
        if (data && data.navbar) {
          setNavbarData(data.navbar);
          setHeroSectionData(data.heroSection || null);
          setHeaderData(data.header || null);
          setFormPlaceholders(data.formPlaceholders || null);
          setSubmitButton(data.submitButton || '');
        } else {
          console.error('Received data is malformed:', data);
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
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
      const updatedContactData = {
        navbar: navbarData,
        heroSection: heroSectionData,
        header: headerData,
        submitButton: submitButton,
      };

      const response = await ContactClient.updateContact(updatedContactData);
      console.log('Contact data updated successfully:', response);
      setIsEditing(false); 
    } catch (error) {
      console.error('Error updating contact data:', error);
    }
  };

  return (
    <Layout>
      <div className='pl-[17%] p-8 bg-white'>
        <h1 className="text-3xl font-bold mb-6">Edit Contact Page Settings</h1>

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
          <HeaderSection
            isEditing={isEditing}
            header={headerData}
            setHeaderData={setHeaderData}
          />
          <ContactForm 
            isEditing={isEditing} 
            formPlaceholders={formPlaceholders} 
            submitButton={submitButton} 
            setSubmitButton={setSubmitButton}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ContactSettings;

export const getServerSideProps = async (context) => {
  const { req, res } = context;  

  const cookies = req.headers.cookie; 

  const parsedCookies = cookies
    ? Object.fromEntries(cookies.split('; ').map(c => c.split('=')))
    : {};

  console.log('Parsed cookies:', parsedCookies);

  const token = parsedCookies.token;  

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
    props: {
      token,  
    },
  };
};