import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, MapPin, User, Search, Filter, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const PropertiesList = () => {
  const { properties } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [propertiesData, setPropertiesData] = useState([]);

  useEffect(() => {
    // Simulate API Fetch
    const fetchData = () => {
      setTimeout(() => {
        setPropertiesData(properties); // In real app, fetch from API
        setIsLoading(false);
      }, 800);
    };
    fetchData();
  }, [properties]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Properties</h1>
          <p className="text-base-content/70 mt-1">Manage your portfolio</p>
        </div>
        <button className="btn btn-primary gap-2">
          <Plus size={18} /> Add Property
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <label className="input input-bordered flex items-center gap-2 flex-1 min-w-[200px]">
          <Search size={16} className="opacity-50" />
          <input type="text" className="grow" placeholder="Search address, tenant..." />
        </label>
        <button className="btn btn-outline gap-2">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {propertiesData.map(property => (
          <div key={property.id} className="card bg-base-100 shadow-md border border-base-200/50 hover:shadow-xl transition-all group">
            <figure className="aspect-video relative overflow-hidden">
              <img 
                src={property.image} 
                alt={property.address} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 badge badge-neutral bg-black/50 border-none text-white backdrop-blur-sm">
                {property.type}
              </div>
            </figure>
            <div className="card-body p-5">
              <h2 className="card-title text-lg">{property.address.split(',')[0]}</h2>
              <div className="flex items-center gap-1 text-sm text-base-content/60 mb-2">
                <MapPin size={14} /> 
                {property.address.split(',')[1] || 'City'}
              </div>
              
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-base-200">
                <div className="flex items-center gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                      <span className="text-xs">{property.tenant.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold">{property.tenant}</p>
                    <p className="opacity-50">Tenant</p>
                  </div>
                </div>
                <div className={`badge ${property.status === 'Occupied' ? 'badge-success badge-outline' : 'badge-ghost'}`}>
                  {property.status}
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm btn-ghost">Details</button>
                <button className="btn btn-sm btn-primary btn-outline">History</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesList;
