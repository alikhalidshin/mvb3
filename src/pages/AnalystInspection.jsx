import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Check, ChevronLeft, Save, Upload } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { checklistCategories } from '../data/mockData';

const AnalystInspection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inspections, properties } = useApp();
  
  const inspection = inspections.find(i => i.id === parseInt(id));
  const property = properties.find(p => p.id === inspection?.propertyId);
  
  const [activeCategory, setActiveCategory] = useState(0);
  const [formData, setFormData] = useState({});

  if (!inspection) return <div>Loading...</div>;

  const handleScoreChange = (category, score) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...prev[category], score }
    }));
  };

  const nextCategory = () => {
    if (activeCategory < checklistCategories.length - 1) {
      setActiveCategory(prev => prev + 1);
    }
  };

  const prevCategory = () => {
    if (activeCategory > 0) {
      setActiveCategory(prev => prev - 1);
    }
  };
  
  const currentCategory = checklistCategories[activeCategory];
  const progress = ((activeCategory + 1) / checklistCategories.length) * 100;

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] md:h-auto animate-fade-in relative">
      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="btn btn-sm btn-circle btn-ghost">
          <ChevronLeft />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-lg leading-tight">{property.address.split(',')[0]}</h1>
          <p className="text-xs opacity-60">Inspection #{inspection.id}</p>
        </div>
        <div className="radial-progress text-primary text-xs font-bold" style={{"--value":progress, "--size": "2.5rem"}} role="progressbar">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="card bg-base-100 shadow-lg border border-base-200">
          <div className="card-body p-6">
            <h2 className="card-title text-xl mb-4">{currentCategory}</h2>
            
            {/* Condition Score */}
            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text font-medium">Condition Score</span>
                <span className="label-text-alt">{formData[currentCategory]?.score || 0}/5</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="5" 
                value={formData[currentCategory]?.score || 0} 
                onChange={(e) => handleScoreChange(currentCategory, e.target.value)}
                className="range range-primary range-sm" 
                step="1" 
              />
              <div className="w-full flex justify-between text-xs px-2 mt-2 opacity-50">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Excel</span>
              </div>
            </div>

            {/* Notes */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-medium">Notes & Observations</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-24" 
                placeholder={`Describe the condition of ${currentCategory.toLowerCase()}...`}
              ></textarea>
            </div>

            {/* Photos */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Photos</span>
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button className="btn btn-square btn-outline border-dashed border-2">
                  <Camera size={24} />
                </button>
                {/* Mock Photos */}
                <div className="w-12 h-12 rounded-lg bg-base-300 flex-none bg-cover bg-center" style={{backgroundImage: 'url(https://source.unsplash.com/random/100x100?wall)'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-base-100 border-t border-base-200 lg:static lg:bg-transparent lg:border-0 lg:p-0 lg:mt-6 flex gap-3 z-20">
         <button 
           className="btn flex-1" 
           disabled={activeCategory === 0}
           onClick={prevCategory}
         >
           Back
         </button>
         {activeCategory === checklistCategories.length - 1 ? (
           <button className="btn btn-primary flex-1 gap-2" onClick={() => navigate('/analyst')}>
             Complete <Check size={18} />
           </button>
         ) : (
           <button className="btn btn-primary flex-1" onClick={nextCategory}>
             Next
           </button>
         )}
      </div>
    </div>
  );
};

export default AnalystInspection;
