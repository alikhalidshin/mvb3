import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AnalystDashboard = () => {
  const { inspections, properties } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [myInspections, setMyInspections] = useState([]);

  useEffect(() => {
    // Filter for analyst (mock)
    const fetchData = () => {
      setTimeout(() => {
        const data = inspections.filter(i => i.analyst === 'Alice Analyst' || i.status === 'Scheduled');
        setMyInspections(data);
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, [inspections]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-0 animate-fade-in">
      <div className="flex justify-between items-center mb-6 px-1">
        <h1 className="text-2xl font-bold">My Inspections</h1>
        <div className="badge badge-neutral">{myInspections.length} Total</div>
      </div>

      <div className="space-y-4">
        {myInspections.map(inspection => {
          const property = properties.find(p => p.id === inspection.propertyId);
          return (
            <div 
              key={inspection.id} 
              className="card bg-base-100 shadow-md border border-base-200 active:scale-98 transition-transform"
              onClick={() => navigate(`/analyst/inspection/${inspection.id}`)}
            >
              <div className="card-body p-5">
                <div className="flex justify-between items-start">
                   <div>
                     <h3 className="font-bold text-lg">{property?.address.split(',')[0]}</h3>
                     <p className="text-sm opacity-60 flex items-center gap-1 mt-1">
                       <MapPin size={14} /> {property?.address.split(',')[1] || 'City'}
                     </p>
                   </div>
                   <span className={`badge ${
                     inspection.status === 'Scheduled' ? 'badge-info' : 'badge-warning'
                   }`}>
                     {inspection.status}
                   </span>
                </div>
                
                <div className="divider my-3"></div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 opacity-70">
                    <Calendar size={16} />
                    <span>{inspection.date}</span>
                  </div>
                  <button className="btn btn-sm btn-circle btn-ghost">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Floating Action Button for quick add (optional) */}
      <button className="btn btn-circle btn-primary fixed bottom-6 right-6 shadow-xl lg:hidden z-50">
        <ClipboardList />
      </button>
    </div>
  );
};

export default AnalystDashboard;
