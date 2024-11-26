import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TopContentSection from '@/components/careers/TopContentSection';
import WhereWeWorkSection from '@/components/careers/WhereWeWorkSection';
import CoreValuesSection from '@/components/careers/CoreValuesSection';
import WorkLifeSection from '@/components/careers/WorkLifeSection';
import OpenPositionSection from '@/components/careers/OpenPositionSection';
import PrinciplesSection from '@/components/careers/PrinciplesSection';
import FunAtWorkSection from '@/components/careers/FunAtWorkSection';
import CareerClient from '../server/client/career';
import { parseCookies } from 'nookies';

const CareersSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [topContentData, setTopContentData] = useState(null);
  const [whereWeWorkData, setWhereWeWorkData] = useState([]);
  const [coreValuesData, setCoreValuesData] = useState(null);
  const [workLifeData, setWorkLifeData] = useState(null);
  const [openPositionData, setOpenPositionData] = useState([]);
  const [principlesData, setPrinciplesData] = useState(null);
  const [funAtWorkData, setFunAtWorkData] = useState(null);

  
    const fetchData = async () => {
      try {
        const data = await CareerClient.fetchCareer('5');
        console.log("career data: ", data);

        setTopContentData(data.topContent || null);
        setWhereWeWorkData(data.whereWeWork || []);
        setCoreValuesData(data.coreValues || null);
        setWorkLifeData(data.worklife || null);
        setOpenPositionData(data.openPosition || []);
        setPrinciplesData(data.principles || null);
        setFunAtWorkData(data.funAtWork || null);

      } catch (error) {
        console.error('Error fetching career data:', error);
      }
    };
    useEffect(()=> {
      fetchData();
    }, []);


  const handleToggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSaveChanges = async () => {
    try {
      console.log('Saving Changes for all components');
      const updatedCareerData = {
        topContent: topContentData,
        whereWeWork: whereWeWorkData,
        coreValues: coreValuesData,
        workLife: workLifeData,
        openPosition: openPositionData,
        principles: principlesData,
        funAtWork: funAtWorkData,
      };

      const response = await CareerClient.updateCareer(updatedCareerData);
      console.log('Updated career data:', response);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <Layout>
      <div className='pl-[17%] p-8 bg-white'>
        <h1 className="text-3xl font-bold mb-6">Edit Careers Page Settings</h1>

        <div className="flex justify-end items-center mb-6">
          <button
            onClick={handleToggleEditMode}
            className={`py-2 px-4 rounded-lg mr-3 text-white ${isEditing ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            {isEditing ? 'Cancel Edit' : 'Edit'}
          </button>

          {isEditing && (
            <button
              onClick={handleSaveChanges}
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Save Changes
            </button>
          )}
        </div>

        <div>
          <TopContentSection
            isEditing={isEditing}
            topContent={topContentData}
            setTopContentData={setTopContentData} 
          />
          <WhereWeWorkSection
            isEditing={isEditing}
            whereWeWorkData={whereWeWorkData}
            setWhereWeWorkData={setWhereWeWorkData}
          />
          <CoreValuesSection
            isEditing={isEditing}
            coreValues={coreValuesData}
            setCoreValuesData={setCoreValuesData}
          />
          <WorkLifeSection
            isEditing={isEditing}
            workLifeData={workLifeData}
            setWorkLifeData={setWorkLifeData}
          />
          <OpenPositionSection
            isEditing={isEditing}
            openPositions={openPositionData}
            setOpenPositionData={setOpenPositionData} 
          />
          <PrinciplesSection
            isEditing={isEditing}
            principles={principlesData}
            setPrinciplesData={setPrinciplesData} 
          />
          <FunAtWorkSection
            isEditing={isEditing}
            funAtWork={funAtWorkData}
            setFunAtWorkData={setFunAtWorkData} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default CareersSettings;

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