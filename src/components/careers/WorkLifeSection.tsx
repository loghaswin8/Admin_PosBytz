import React, { useState, useEffect } from "react";

interface WorkLifeActivity {
  Activity: string;
}

interface WorkLifeSectionProps {
  isEditing: boolean;
  workLifeData: {
    about: string;
    activities: WorkLifeActivity[];
    image: string;
  } | null;
  setWorkLifeData: React.Dispatch<React.SetStateAction<{
    about: string;
    activities: WorkLifeActivity[];
    image: string;
  } | null>>; // Explicitly define the expected shape of state here
}

const WorkLifeSection = ({ isEditing, workLifeData, setWorkLifeData }: WorkLifeSectionProps) => {
  // Initialize state using the workLifeData prop, or use default values
  const [updatedWorkLife, setUpdatedWorkLife] = useState<{ about: string; activities: WorkLifeActivity[]; image: string }>({
    about: "",
    activities: [],
    image: ""
  });

  useEffect(() => {
    // If workLifeData is available, update the local state
    if (workLifeData) {
      setUpdatedWorkLife(workLifeData);
    }
  }, [workLifeData]);

  // Handle changes to input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = e.target;

    // Handle changes for activities
    if (name.startsWith("activity") && index !== undefined) {
      const updatedActivities = [...updatedWorkLife.activities];
      updatedActivities[index].Activity = value;

      // Update the state with the new activities array
      setUpdatedWorkLife({
        ...updatedWorkLife,
        activities: updatedActivities,
      });
    } else {
      // For other fields (about, image)
      setUpdatedWorkLife({
        ...updatedWorkLife,
        [name]: value,
      });
    }
  };

  // Add a new activity to the state
  const addActivity = () => {
    setUpdatedWorkLife((prevState) => ({
      ...prevState,
      activities: [...prevState.activities, { Activity: "" }],
    }));
  };

  // Remove an activity from the state
  const removeActivity = (index: number) => {
    const updatedActivities = updatedWorkLife.activities.filter((_, i) => i !== index);

    setUpdatedWorkLife((prevState) => ({
      ...prevState,
      activities: updatedActivities,
    }));
  };

  // Update the changes and send the data back to the parent component
  const updateChanges = () => {
    setWorkLifeData(updatedWorkLife); // Pass updated data to the parent component
    console.log("Updated Work Life Data:", updatedWorkLife);
  };

  if (!workLifeData) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Work Life Section</h2>

      <form className="space-y-4">
        {/* About Field */}
        <div>
          <label className="block font-medium text-gray-700">About</label>
          <div className="space-y-2">
            <textarea
              name="about"
              value={updatedWorkLife.about}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              disabled={!isEditing}
              placeholder="Enter about section content"
            />
          </div>
        </div>

        {/* Activities Section */}
        <div>
          <label className="block font-medium text-gray-700">Activities</label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {updatedWorkLife.activities && updatedWorkLife.activities.length > 0 ? (
              updatedWorkLife.activities.map((activity, index) => (
                <div key={index} className="space-y-2 border rounded-lg p-4 shadow">
                  <textarea
                    name={`activity-${index}`}
                    value={activity.Activity}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full border rounded-lg p-2"
                    disabled={!isEditing}
                    placeholder="Enter activity details"
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeActivity(index)}
                      className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
                    >
                      -
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No activities added</p>
            )}
          </div>
        </div>

        {/* Add Activity Button */}
        {isEditing && (
          <button
            type="button"
            onClick={addActivity}
            className="ml-3 mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            +
          </button>
        )}

        {/* Image Field */}
        <div>
          <label className="block font-medium text-gray-700">Image</label>
          <input
            type="text"
            name="image"
            value={updatedWorkLife.image}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Enter image URL"
            disabled={!isEditing}
          />
        </div>

        {/* Save Changes Button */}
        {isEditing && (
          <button
            type="button"
            onClick={updateChanges}
            className="ml-3 mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            Update Changes
          </button>
        )}
      </form>
    </section>
  );
};

export default WorkLifeSection;
