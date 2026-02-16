import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Shield, CheckCircle, MapPin, Calendar, User, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { checklistCategories } from '../data/mockData';

const ReportView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inspections, properties } = useApp();
  
  const inspection = inspections.find(i => i.id === parseInt(id));
  const property = properties.find(p => p.id === inspection?.propertyId);

  if (!inspection || !property) return (
    <div className="flex items-center justify-center min-h-screen text-base-content/60">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-base-100 md:bg-base-200 min-h-screen p-0 md:p-8 font-sans">
      {/* Mobile Navbar / Desktop Controls */}
      <div className="bg-base-100 sticky top-0 z-20 border-b border-base-200 px-4 py-3 flex justify-between items-center md:rounded-xl md:mb-6 md:static print:hidden shadow-sm md:shadow-none">
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm gap-2">
          <ArrowLeft size={18} /> <span className="hidden md:inline">Back</span>
        </button>
        <h1 className="text-sm font-bold md:hidden">Report #{inspection.id}</h1>
        <button onClick={handlePrint} className="btn btn-primary btn-sm gap-2">
          <Printer size={16} /> <span className="hidden md:inline">Print Report</span>
        </button>
      </div>

      {/* Report Paper */}
      <div className="max-w-4xl mx-auto bg-white text-gray-900 md:p-12 md:shadow-xl md:rounded-xl print:shadow-none print:p-0 print:max-w-none">
        
        {/* Header Section */}
        <div className="p-6 pb-2 md:p-0 border-b border-gray-100 md:border-b-2 md:pb-8 md:mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
             <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">PropInspect</h1>
                  <div className="badge badge-success badge-sm gap-1 mt-1">
                    <CheckCircle size={10} /> Approved
                  </div>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl md:bg-transparent md:p-0 md:text-right">
                <div>
                   <p className="text-xs text-gray-500 uppercase font-bold">Inspection ID</p>
                   <p className="font-mono font-medium">#{inspection.id}</p>
                </div>
                <div>
                   <p className="text-xs text-gray-500 uppercase font-bold">Date</p>
                   <p>{inspection.date}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Property & Inspector Details */}
        <div className="p-6 pt-2 md:p-0 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Property</h3>
              <div className="flex items-start gap-2">
                 <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                 <div>
                    <p className="font-bold text-lg leading-tight">{property.address.split(',')[0]}</p>
                    <p className="text-gray-500">{property.address.split(',')[1]}</p>
                 </div>
              </div>
           </div>
           
           <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Inspector</h3>
              <div className="flex items-center gap-2">
                 <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-8 bg-gray-200 text-gray-600">
                       <span className="text-xs">{inspection.analyst.charAt(0)}</span>
                    </div>
                 </div>
                 <p className="font-medium">{inspection.analyst}</p>
              </div>
           </div>
        </div>

        {/* Inspection Items - Mobile: Cards, Desktop: Table */}
        <div className="p-0 md:px-0">
          <div className="px-6 py-2 bg-gray-50 border-y border-gray-100 flex items-center justify-between mb-4 md:rounded-lg md:border">
             <h2 className="font-bold text-gray-800">Inspection Items</h2>
             <span className="text-xs font-mono text-gray-500">{checklistCategories.length} Items</span>
          </div>

          {/* Desktop Table - Hidden on Mobile */}
          <div className="hidden md:block overflow-hidden border border-gray-200 rounded-lg">
             <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Condition</th>
                  <th className="px-4 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {checklistCategories.map((cat, index) => (
                  <tr key={cat} className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">{cat}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <CheckCircle size={10} /> Good
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 italic">No major issues.</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards - Visible only on Mobile */}
          <div className="md:hidden divide-y divide-gray-100">
             {checklistCategories.map((cat) => (
                <div key={cat} className="px-6 py-4 flex flex-col gap-2">
                   <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{cat}</span>
                       <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <CheckCircle size={10} /> Good
                      </span>
                   </div>
                   <p className="text-sm text-gray-500 italic">No major issues observed.</p>
                </div>
             ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 md:p-0 md:mt-12 md:pt-8 md:border-t md:border-gray-100 text-center md:text-left">
           <p className="text-xs text-gray-400">Generated by PropInspect • Page 1 of 1</p>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
