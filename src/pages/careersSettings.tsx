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

const CareersSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [topContentData, setTopContentData] = useState(null);
  const [whereWeWorkData, setWhereWeWorkData] = useState([]);
  const [coreValuesData, setCoreValuesData] = useState(null);
  const [workLifeData, setWorkLifeData] = useState(null);
  const [openPositionData, setOpenPositionData] = useState([]);
  const [principlesData, setPrinciplesData] = useState(null);
  const [funAtWorkData, setFunAtWorkData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CareerClient.fetchCareer('5'); // Use the correct ID or handle dynamically
        console.log("career data: ",data);  

        setTopContentData(data.data.topContent);
        setWhereWeWorkData(data.data.whereWeWork);
        setCoreValuesData(data.data.coreValues);
        setWorkLifeData(data.data.worklife);
        setOpenPositionData(data.data.openPosition);
        setPrinciplesData(data.data.principles);
        setFunAtWorkData(data.data.funAtWork);

      } catch (error) {
        console.error('Error fetching career data:', error);
      }
    };

    fetchData();
  }, []);

  // Toggle Edit Mode
  const handleToggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  // Save Changes and Exit Edit Mode
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

      // Call the update function from the client to update data in the server
      const response = await CareerClient.updateCareer(updatedCareerData);
      console.log('Updated career data:', response);
      setIsEditing(false); // Exit edit mode after successful update
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <Layout>
      <div className='pl-[17%] p-8 bg-white'>
        <h1 className="text-3xl font-bold mb-6">Edit Careers Page Settings</h1>

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
              onClick={handleSaveChanges}
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Save Changes
            </button>
          )}
        </div>

        {/* Content Components in Grid Layout */}
        <div>
          <TopContentSection
            isEditing={isEditing}
            topContent={topContentData}
            setTopContentData={setTopContentData} // Pass setter to child
          />
          <WhereWeWorkSection
            isEditing={isEditing}
            whereWeWorkData={whereWeWorkData}
            setWhereWeWorkData={setWhereWeWorkData} // Pass setter to child
          />
          <CoreValuesSection
            isEditing={isEditing}
            coreValues={coreValuesData}
            setCoreValuesData={setCoreValuesData} // Pass setter to child
          />
          <WorkLifeSection
            isEditing={isEditing}
            workLifeData={workLifeData}
            setWorkLifeData={setWorkLifeData} // Pass setter to child
          />
          <OpenPositionSection
            isEditing={isEditing}
            openPositions={openPositionData}
            setOpenPositionData={setOpenPositionData} // Pass setter to child
          />
          <PrinciplesSection
            isEditing={isEditing}
            principles={principlesData}
            setPrinciplesData={setPrinciplesData} // Pass setter to child
          />
          <FunAtWorkSection
            isEditing={isEditing}
            funAtWork={funAtWorkData}
            setFunAtWorkData={setFunAtWorkData} // Pass setter to child
          />
        </div>
      </div>
    </Layout>
  );
};

export default CareersSettings;
