import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, ChevronRight, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TenantReports = () => {
  const { inspections, properties } = useApp();
  const navigate = useNavigate();

  // Mock: Filter for current tenant's inspections
  // In a real app, this would be filtered by the logged-in user's lease
  const tenantName = "John Doe";
  const myProperty = properties.find(p => p.tenant === tenantName);
  const myReports = inspections.filter(i => 
    i.propertyId === myProperty?.id && 
    (i.status === 'Approved' || i.status === 'Closed')
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Inspection Reports</h1>
        <p className="text-base-content/70">Access your official property inspection documents.</p>
      </div>

      {myReports.length === 0 ? (
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body items-center text-center py-10 opacity-60">
            <FileText size={48} className="mb-4" />
            <p>No reports available yet.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {myReports.map(report => (
            <div 
              key={report.id} 
              className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => navigate(`/report/${report.id}`)}
            >
              <div className="card-body p-4 flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate">
                    {report.type} Inspection
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-base-content/60">
                    <Calendar size={14} />
                    <span>{report.date}</span>
                    <span>•</span>
                    <span>#{report.id}</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <button className="btn btn-ghost btn-sm btn-circle" title="Download">
                    <Download size={18} />
                  </button>
                  <ChevronRight size={20} className="text-base-content/30" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenantReports;
