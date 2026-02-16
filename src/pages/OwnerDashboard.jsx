import React, { useState, useEffect } from 'react';
import { Plus, Building, FileCheck, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, desc }) => (
  <div className="card bg-base-100 shadow-lg border border-base-200/50 hover:shadow-xl transition-all">
    <div className="card-body p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="card-title text-sm opacity-70 font-medium uppercase tracking-wide">{title}</h2>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}/10 text-${color}`}>
          <Icon size={28} className={`text-${color}`} />
        </div>
      </div>
      {desc && <p className="text-xs text-base-content/60 mt-2">{desc}</p>}
    </div>
  </div>
);

const OwnerDashboard = () => {
  const { properties, inspections } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({ activeInspections: 0, pendingApprovals: 0 });

  useEffect(() => {
    // Simulate API Fetch
    const fetchData = () => {
      setTimeout(() => {
        setDashboardData({
          activeInspections: inspections.filter(i => i.status !== 'Closed').length,
          pendingApprovals: inspections.filter(i => i.status === 'Awaiting Approval').length
        });
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, [inspections]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-base-content/70 mt-1">Overview of your properties and inspections</p>
        </div>
        <button 
          className="btn btn-primary gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30"
          onClick={() => document.getElementById('new_inspection_modal').showModal()}
        >
          <Plus size={18} />
          New Inspection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Properties" 
          value={properties.length} 
          icon={Building} 
          color="primary" 
          desc="Across 3 regions"
        />
        <StatCard 
          title="Active Inspections" 
          value={dashboardData.activeInspections} 
          icon={FileCheck} 
          color="info" 
          desc="2 scheduled for today"
        />
        <StatCard 
          title="Action Required" 
          value={dashboardData.pendingApprovals} 
          icon={AlertTriangle} 
          color="warning" 
          desc="Reports awaiting approval"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Properties List */}
        <div className="card bg-base-100 shadow-xl border border-base-200/50">
          <div className="card-body p-0">
             <div className="p-6 border-b border-base-200 flex justify-between items-center">
              <h2 className="card-title text-lg">My Properties</h2>
              <button className="btn btn-sm btn-ghost" onClick={() => navigate('/owner/properties')}>View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-base-200/30">
                    <th>Property</th>
                    <th>Status</th>
                    <th>Tenant</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(p => (
                    <tr key={p.id} className="hover">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={p.image} alt="Property" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{p.address.split(',')[0]}</div>
                            <div className="text-xs opacity-50">{p.type}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={`badge ${p.status === 'Occupied' ? 'badge-success badge-outline' : 'badge-ghost'}`}>
                          {p.status}
                        </div>
                      </td>
                      <td className="font-medium opacity-80">{p.tenant}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Inspections */}
        <div className="card bg-base-100 shadow-xl border border-base-200/50">
           <div className="card-body p-0">
             <div className="p-6 border-b border-base-200 flex justify-between items-center">
              <h2 className="card-title text-lg">Recent Activities</h2>
              <button className="btn btn-sm btn-ghost">History</button>
            </div>
            <div className="flex flex-col">
              {inspections.slice(0, 3).map(i => (
                <div key={i.id} className="p-4 hover:bg-base-200/50 transition-colors border-b last:border-0 border-base-200 cursor-pointer" onClick={() => navigate(`/owner/items/${i.id}`)}>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                       <div className={`mt-1 p-2 rounded-lg ${
                         i.status === 'Approved' ? 'bg-success/10 text-success' : 
                         i.status === 'Scheduled' ? 'bg-info/10 text-info' : 'bg-warning/10 text-warning'
                       }`}>
                         <FileCheck size={18} />
                       </div>
                       <div>
                         <p className="font-semibold text-sm">Inspection #{i.id}</p>
                         <p className="text-xs text-base-content/60">{properties.find(p => p.id === i.propertyId)?.address}</p>
                       </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`badge badge-sm ${
                         i.status === 'Approved' ? 'badge-success' : 
                         i.status === 'Scheduled' ? 'badge-info' : 'badge-warning'
                       }`}>{i.status}</span>
                      <span className="text-[10px] opacity-50">{i.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Inspection Modal */}
      <dialog id="new_inspection_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Schedule New Inspection</h3>
          <p className="py-4">Select a property and date for inspection.</p>
          <div className="form-control w-full my-2">
            <label className="label"><span className="label-text">Property</span></label>
            <select className="select select-bordered">
              <option disabled selected>Pick a property</option>
              {properties.map(p => <option key={p.id}>{p.address}</option>)}
            </select>
          </div>
          <div className="form-control w-full my-2">
             <label className="label"><span className="label-text">Date</span></label>
             <input type="date" className="input input-bordered" />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost mr-2">Cancel</button>
              <button className="btn btn-primary">Schedule</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default OwnerDashboard;
