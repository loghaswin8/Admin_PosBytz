import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import HeroSection from '@/components/about/HeroSection';
import NavbarSection from '@/components/about/NavbarSection';
import AboutSection from '@/components/about/AboutSection';
import LogosSection from '@/components/about/LogosSection';
import HowToReachSection from '@/components/about/HowToReachSection';
import AboutClient from '../server/client/about';

const AboutSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [heroData, setHeroData] = useState(null);
  const [navbarData, setNavbarData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [logosData, setLogosData] = useState(null);
  const [productTextData, setProductTextData] = useState('');
  const [howToReachData, setHowToReachData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AboutClient.fetchAbout('2'); // Use the correct ID or handle dynamically
        console.log("About data: ", data);

        setHeroData(data.data.heroSection);
        setNavbarData(data.data.navbar);
        setAboutData(data.data.aboutSection[0]);
        setLogosData(data.data.logos);
        setProductTextData(data.data.productText);
        setHowToReachData(data.data.howToReach);
      } catch (error) {
        console.error('Error fetching about data:', error);
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
      setIsEditing(false); // Exit edit mode after saving

    } catch (error) {
      console.error('Error updating about data:', error);
    }
  };

  return (
    <Layout>
      <div className='pl-[17%] p-8 bg-white'>
        <h1 className="text-3xl font-bold mb-6">Edit About Page Settings</h1>

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
          {heroData ? (
            <HeroSection 
              isEditing={isEditing} 
              hero={heroData} 
              onUpdate={setHeroData} // Pass setter
            />
          ) : (
            <p>Loading hero section...</p>
          )}
          <NavbarSection 
            isEditing={isEditing} 
            navbar={navbarData} 
            setNavbarData={setNavbarData} // Pass setter
          />
          <AboutSection 
            isEditing={isEditing} 
            about={aboutData} 
            onUpdate={setAboutData} // Pass setter
          />
          <LogosSection 
            isEditing={isEditing} 
            logos={logosData} 
            setLogosData={setLogosData} // Pass setter
            productText={productTextData} 
            setProductTextData={setProductTextData} // Pass setter
          />
          <HowToReachSection 
            isEditing={isEditing} 
            howToReach={howToReachData} 
            setHowToReachData={setHowToReachData} // Pass setter
          />
        </div>
      </div>
    </Layout>
  );
};

export default AboutSettings;
