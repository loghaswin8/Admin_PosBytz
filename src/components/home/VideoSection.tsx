import React, { useState, useEffect } from 'react';

interface VideoSectionProps {
  isEditing: boolean;
  videoData: {
    title: string;
    subtitle: string;
    description: string;
    videoUrl: string;
  };
  onUpdate: (updatedData: object) => void;
}

const VideoSection = ({ isEditing, videoData, onUpdate }: VideoSectionProps) => {
  const [video, setVideo] = useState(videoData);

  // Sync video state with videoData prop whenever it changes
  useEffect(() => {
    setVideo(videoData);
  }, [videoData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVideo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(video);
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Video Section</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title Field */}
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={video.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        {/* Subtitle Field */}
        <div>
          <label className="block font-medium text-gray-700">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={video.subtitle}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={video.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            rows={4}
            disabled={!isEditing}
          ></textarea>
        </div>

        {/* Video URL Field */}
        <div>
          <label className="block font-medium text-gray-700">Video URL</label>
          <input
            type="text"
            name="videoUrl"
            value={video.videoUrl}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            disabled={!isEditing}
          />
        </div>

        {/* Submit Button */}
        {isEditing && (
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md mt-4"
            >
              Update Changes
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default VideoSection;
