import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Calendar, CheckCircle, Clock, AlertTriangle, FileText, ChevronRight } from 'lucide-react';

const TenantDashboard = () => {
  const { properties, inspections } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [tenantData, setTenantData] = useState({ myProperty: null, myInspections: [] });
  
  const tenantName = "John Doe"; 

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        const myProperty = properties.find(p => p.tenant === tenantName);
        const myInspections = inspections.filter(i => i.propertyId === myProperty?.id);
        setTenantData({ myProperty, myInspections });
        setIsLoading(false);
      }, 1200);
    };
    fetchData();
  }, [properties, inspections]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const { myProperty, myInspections } = tenantData;

  if (!myProperty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
        <p className="text-base-content/70">No property record found.</p>
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-6 space-y-6 animate-fade-in max-w-lg mx-auto md:max-w-none">
      {/* Mobile Header */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">My Home</h1>
           <div className="badge badge-primary badge-outline gap-1">
            <CheckCircle size={12} /> Active
          </div>
        </div>
        <p className="text-sm text-base-content/70">Welcome back, {tenantName}</p>
      </div>

      {/* Main Property Card - Mobile Optimized */}
      <div className="card bg-base-100 shadow-lg overflow-hidden border border-base-200">
        <div className="relative h-56 w-full">
          <img 
            src={myProperty.image} 
            alt={myProperty.address} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white w-full">
            <h2 className="text-xl font-bold leading-tight">{myProperty.address}</h2>
            <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
              <MapPin size={14} />
              <span>{myProperty.type}</span>
            </div>
          </div>
        </div>
        
        <div className="card-body p-4 gap-4">
          <div className="grid grid-cols-2 gap-3">
             <div className="bg-base-200/50 p-3 rounded-xl text-center">
                <div className="text-xs text-base-content/60 uppercase font-bold tracking-wider">Rent</div>
                <div className="text-lg font-bold text-primary">$1,200</div>
                <div className="text-[10px] opacity-70">Due Oct 1st</div>
             </div>
             <div className="bg-base-200/50 p-3 rounded-xl text-center">
                <div className="text-xs text-base-content/60 uppercase font-bold tracking-wider">Lease</div>
                <div className="text-lg font-bold">Aug '25</div>
                <div className="text-[10px] opacity-70">10 mo left</div>
             </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <button className="btn btn-primary w-full shadow-md shadow-primary/20">
              <FileText size={18} /> Pay Rent Now
            </button>
            <button className="btn btn-outline border-base-300 w-full">
                <AlertTriangle size={18} /> Report Issue
            </button>
          </div>
        </div>
      </div>

      {/* Recent Inspections List */}
      <div>
        <h3 className="font-bold text-lg mb-3 px-1 flex justify-between items-center">
          Recent Activity
          <span className="text-xs font-normal text-primary">View All</span>
        </h3>
        
        <div className="flex flex-col gap-3">
          {myInspections.length === 0 ? (
             <div className="p-4 text-center bg-base-100 rounded-xl border border-dashed border-base-300 text-sm opacity-60">
               No recent activity
             </div>
          ) : (
            myInspections.slice(0, 3).map(inspection => (
              <div key={inspection.id} className="card bg-base-100 shadow-sm border border-base-200 active:scale-[0.99] transition-transform">
                <div className="card-body p-4 flex-row items-center gap-3">
                   {/* Status Indicator Icon */}
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      inspection.status === 'Approved' ? 'bg-success/10 text-success' : 
                      inspection.status === 'Scheduled' ? 'bg-info/10 text-info' : 'bg-warning/10 text-warning'
                    }`}>
                      {inspection.status === 'Approved' ? <CheckCircle size={20} /> : <Clock size={20} />}
                   </div>
                   
                   <div className="flex-1 min-w-0">
                     <h4 className="font-semibold text-sm truncate">{inspection.type} Inspection</h4>
                     <p className="text-xs text-base-content/60 flex items-center gap-1 mt-0.5">
                       <Calendar size={12} /> {new Date(inspection.date).toLocaleDateString()}
                     </p>
                   </div>

                   <div className="flex flex-col items-end gap-1">
                     <span className={`badge badge-xs py-2 ${
                        inspection.status === 'Approved' ? 'badge-success' : 
                        inspection.status === 'Scheduled' ? 'badge-info' : 'badge-warning'
                      }`}>{inspection.status}</span>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
