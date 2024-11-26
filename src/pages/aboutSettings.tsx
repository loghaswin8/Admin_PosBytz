import React, { useState, useEffect, use } from 'react';
import Layout from '../components/Layout';
import HeroSection from '@/components/about/HeroSection';
import NavbarSection from '@/components/about/NavbarSection';
import AboutSection from '@/components/about/AboutSection';
import LogosSection from '@/components/about/LogosSection';
import HowToReachSection from '@/components/about/HowToReachSection';
import AboutClient from '../server/client/about';
import { parseCookies } from 'nookies';

const AboutSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [heroData, setHeroData] = useState(null);
  const [navbarData, setNavbarData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [logosData, setLogosData] = useState(null);
  const [productTextData, setProductTextData] = useState('');
  const [howToReachData, setHowToReachData] = useState(null);

  const fetchData = async () => {
    try {
      const data = await AboutClient.fetchAbout('2');
      console.log("About data: ", data);

      if (data && data.heroSection && data.navbar && data.aboutSection && Array.isArray(data.aboutSection)) {
        setHeroData(data.heroSection || null); 
        setNavbarData(data.navbar || null);
        setAboutData(data.aboutSection[0] || null);
        setLogosData(data.logos || null);
        setProductTextData(data.productText || '');
        setHowToReachData(data.howToReach || null);
      } else {
        console.error('Invalid data structure', data);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
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
      const updatedAboutData = {
        heroSection: heroData,
        navbar: navbarData,
        aboutSection: [aboutData],
        logos: logosData,
        productText: productTextData,
        howToReach: howToReachData,
      };

      const response = await AboutClient.updateAbout(updatedAboutData);
      console.log('About data updated successfully:', response);
      setIsEditing(false);

    } catch (error) {
      console.error('Error updating about data:', error);
    }
  };

  return (
    <Layout>
      <div className='pl-[17%] p-8 bg-white'>
        <h1 className="text-3xl font-bold mb-6">Edit About Page Settings</h1>

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
          {heroData ? (
            <HeroSection
              isEditing={isEditing}
              hero={heroData}
              onUpdate={setHeroData}
            />
          ) : (
            <p>Loading hero section...</p>
          )}
          <NavbarSection
            isEditing={isEditing}
            navbar={navbarData}
            setNavbarData={setNavbarData}
          />
          <AboutSection
            isEditing={isEditing}
            about={aboutData}
            onUpdate={setAboutData}
          />
          <LogosSection
            isEditing={isEditing}
            logos={logosData}
            setLogosData={setLogosData}
            productText={productTextData}
            setProductTextData={setProductTextData}
          />
          <HowToReachSection
            isEditing={isEditing}
            howToReach={howToReachData}
            setHowToReachData={setHowToReachData}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AboutSettings;

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
