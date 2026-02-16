import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, FileText, Camera, ArrowLeft, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { checklistCategories } from '../data/mockData';

const InspectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inspections, properties, updateInspectionStatus } = useApp();
  
  // Find inspection and property (mock logic)
  const inspection = inspections.find(i => i.id === parseInt(id)) || inspections[0]; 
  const property = properties.find(p => p.id === inspection.propertyId);

  const [activeTab, setActiveTab] = useState('details');

  const statusColors = {
    'Draft': 'badge-ghost',
    'Scheduled': 'badge-info',
    'In Progress': 'badge-warning',
    'Report Generated': 'badge-primary',
    'Awaiting Approval': 'badge-warning',
    'Approved': 'badge-success',
    'Disputed': 'badge-error',
    'Closed': 'badge-neutral'
  };

  const handleStatusChange = (newStatus) => {
    updateInspectionStatus(inspection.id, newStatus);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm gap-2 pl-0 hover:bg-transparent">
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">Inspection #{inspection.id}</h1>
            <span className={`badge ${statusColors[inspection.status]} badge-lg`}>{inspection.status}</span>
          </div>
          <p className="text-base-content/70 flex items-center gap-2">
            <span className="font-medium text-base-content">{property?.address}</span> • {inspection.type} • {inspection.date}
          </p>
        </div>
        
        <div className="flex gap-2">
           {inspection.status === 'Awaiting Approval' && (
             <>
               <button className="btn btn-error btn-outline gap-2" onClick={() => handleStatusChange('Disputed')}>
                 <XCircle size={18} /> Reject
               </button>
               <button className="btn btn-success gap-2 text-white" onClick={() => handleStatusChange('Approved')}>
                 <CheckCircle size={18} /> Approve
               </button>
             </>
           )}
           {inspection.status === 'Approved' && (
             <button className="btn btn-primary gap-2" onClick={() => navigate(`/report/${inspection.id}`)}>
               <FileText size={18} /> View Report
             </button>
           )}
        </div>
      </div>

      {/* Content Tabs */}
      <div role="tablist" className="tabs tabs-lifted">
        <a role="tab" className={`tab ${activeTab === 'details' ? 'tab-active' : ''}`} onClick={() => setActiveTab('details')}>Details</a>
        <a role="tab" className={`tab ${activeTab === 'photos' ? 'tab-active' : ''}`} onClick={() => setActiveTab('photos')}>Photos (12)</a>
        <a role="tab" className={`tab ${activeTab === 'issues' ? 'tab-active' : ''}`} onClick={() => setActiveTab('issues')}>Issues Found (3)</a>
      </div>

      {/* Active Tab Content */}
      <div className="bg-base-100 border border-base-200 rounded-b-2xl rounded-tr-2xl p-6 min-h-[400px]">
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <h3 className="font-bold text-lg border-b pb-2">Property Condition</h3>
               <div className="overflow-x-auto">
                 <table className="table table-sm">
                   <tbody>
                     {checklistCategories.map(cat => (
                       <tr key={cat}>
                         <td className="font-medium">{cat}</td>
                         <td>
                           <div className="rating rating-xs disabled">
                             <input type="radio" className="mask mask-star-2 bg-orange-400" checked />
                             <input type="radio" className="mask mask-star-2 bg-orange-400"checked />
                             <input type="radio" className="mask mask-star-2 bg-orange-400"checked />
                             <input type="radio" className="mask mask-star-2 bg-orange-400" checked />
                             <input type="radio" className="mask mask-star-2 bg-orange-400" />
                           </div>
                         </td>
                         <td className="text-right text-xs opacity-50">Good</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-bold text-lg border-b pb-2">Inspection Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-base-200/50 p-4 rounded-xl">
                  <p className="text-xs opacity-50 uppercase font-bold">Analyst</p>
                  <p className="font-medium mt-1">{inspection.analyst}</p>
                </div>
                <div className="bg-base-200/50 p-4 rounded-xl">
                  <p className="text-xs opacity-50 uppercase font-bold">Estimated Repair</p>
                  <p className="font-medium mt-1">$450.00</p>
                </div>
                <div className="bg-base-200/50 p-4 rounded-xl col-span-2">
                  <p className="text-xs opacity-50 uppercase font-bold">Analyst Notes</p>
                  <p className="font-medium mt-1 text-sm">Property is in generally good condition. Some minor wear on the living room hardwood floors and a small leak under the kitchen sink that needs attention.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="aspect-square bg-base-200 rounded-xl overflow-hidden relative group cursor-pointer">
                 <img src={`https://source.unsplash.com/random/400x400?house,room&sig=${i}`} alt="Inspection" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                   <Camera />
                 </div>
               </div>
             ))}
          </div>
        )}

        {activeTab === 'issues' && (
           <div className="space-y-4">
             {[1,2,3].map(i => (
               <div key={i} className="alert shadow-sm border border-error/20 bg-error/5">
                 <div className="flex items-start gap-4">
                   <div className="p-2 bg-white rounded-full text-error shadow-sm">
                      <Clock size={20} />
                   </div>
                   <div>
                     <h3 className="font-bold">Kitchen Sink Leak</h3>
                     <p className="text-sm">Minor dripping observed under the main sink. Seal replacement recommended.</p>
                   </div>
                 </div>
                 <button className="btn btn-sm btn-outline btn-error">Flag</button>
               </div>
             ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default InspectionDetail;
