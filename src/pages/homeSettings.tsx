import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import IntroSection from '../components/home/IntroSection';
import FeatureSection from '../components/home/FeatureSection';
import VideoSection from '@/components/home/VideoSection';
import ReasonsSection from '@/components/home/ReasonsSection';
import Integration from '@/components/home/Integration';
import BrandsSection from '@/components/home/BrandsSection';
import TaglineSection from '@/components/home/TaglineSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import ErpSection from '@/components/home/ErpSection';
import FaqSection from '@/components/home/FaqSection';
import BusinessSection from '@/components/home/BusinessSection';
import IntroClient from '../server/client/home';
import nookies, { parseCookies } from 'nookies';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';  // Import the type



const HomeSettings = () => {
  const router = useRouter();

  

  const [introData, setIntroData] = useState({
    heading: '',
    paragraph: '',
    buttonText: '',
    image: {
      src: '',
      alt: '',
    },
  });
  const [videoData, setVideoData] = useState({
    title: '',
    subtitle: '',
    description: '',
    videoUrl: '',
  });
  const [reasonsData, setReasonsData] = useState({
    mainTitle: '',
    subtitle: '',
    highlight: '',
    reasons: [],
  });
  const [integrationData, setIntegrationData] = useState({
    title: '',
    description: '',
    logos: [{ src: '', alt: '' }],
  });
  const [brandsData, setBrandsData] = useState({
    row1: [],
    row2: [],
    row3: [],
  });
  const [featuresData, setFeaturesData] = useState([]);
  const [taglineData, setTaglineData] = useState({
    title1: '', title2: '', description: '', buttonText: ''
  });
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [erpData, setErpData] = useState({
    heading: '',
    buttonText: '',
    buttonLink: '',
    imageSrc: '',
    imageAlt: '',
  });
  const [faqData, setFaqData] = useState([]);
  const [businessData, setBusinessData] = useState({
    heading: '',
    buttonText: '',
  });
  const [isEditing, setIsEditing] = useState(false);

    const fetchData = async () => {
      try {
        const data = await IntroClient.fetchIntro('1'); 
        setIntroData(data.intro);
        setFeaturesData(data.features);
        setVideoData(data.videoSection);
        setReasonsData(data.reasonsSection);
        setIntegrationData(data.integrations);
        setBrandsData(data.brands);
        setTaglineData(data.tagline);
        setTestimonialsData(data.testimonials);
        setErpData(data.erpSection);
        setFaqData(data.faqData);
        setBusinessData(data.businessSection);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // useEffect(() => {
    //   const cookies = sessionStorage.getItem('token');
    //   if (!cookies) {
    //     router.push('/'); // Redirect to login if no token is found
    //   } else {
    //     fetchData(); // Fetch data if token exists
    //   }
    // }, [router]);

  const handleUpdateChanges = async () => {
    try {
      const updatedData = {
        intro: introData,
        videoSection: videoData,
        reasonsSection: reasonsData,
        integrations: integrationData,
        brands: brandsData,
        features: featuresData,
        tagline: taglineData,
        testimonials: testimonialsData,
        erpSection: erpData,
        faqData: faqData,
        businessSection: businessData,
      };

      const response = await IntroClient.updateIntro(updatedData);
      console.log('Home page updated successfully:', response);
      setIsEditing(false);
      alert('Home Page Updated Successfully!');
    } catch (error) {
      console.error('Error updating home page:', error);
      alert('Failed to update Home Page.');
    }
  };

  useEffect(() => {
    fetchData();
  },[])

  const handleToggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Layout>
      <div className="pl-[17%] p-8 bg-white">
        <h1 className="text-3xl font-bold mb-6">Edit Home Page Settings</h1>

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
          <IntroSection
            introData={introData}
            isEditing={isEditing}
            onUpdate={setIntroData} 
          />
          <FeatureSection
            features={featuresData}
            isEditing={isEditing}
            setFeaturesData={setFeaturesData} 
          />
          <VideoSection
            isEditing={isEditing}
            videoData={videoData}
            onUpdate={setVideoData} 
          />
          <ReasonsSection
            isEditing={isEditing}
            reasonsSectionData={reasonsData}
            setReasonsData={setReasonsData}
          />
          <Integration
            isEditing={isEditing} 
            integrationData={integrationData}
            setIntegrationData={setIntegrationData} 
          />
          <BrandsSection
            isEditing={isEditing}
            brandsData={brandsData}
            setBrandsData={setBrandsData}
          />  
          <TaglineSection
            isEditing={isEditing}
            taglineData={taglineData}
            setTaglineData={setTaglineData} 
          />
          <TestimonialSection
            isEditing={isEditing}
            testimonialsData={testimonialsData}
            setTestimonialsData={setTestimonialsData} 
          />
          <ErpSection
            erpData={erpData}
            isEditing={isEditing}
            onUpdate={setErpData} 
          />
          <FaqSection
            isEditing={isEditing}
            faqData={faqData}
            setFaqData={setFaqData} 
          />
          <BusinessSection
            businessData={businessData}
            isEditing={isEditing}
            setBusinessData={setBusinessData} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default HomeSettings;

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





