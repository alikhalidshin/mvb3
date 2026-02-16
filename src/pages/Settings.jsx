import React from 'react';
import { User, Mail, Bell, Shield, Key } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Settings = () => {
  const { currentUser } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-20">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-base-content/70 mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="card bg-base-100 shadow-md border border-base-200">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4 flex items-center gap-2">
            <User size={20} /> Profile
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={currentUser.avatar || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
              </div>
            </div>
            <div className="flex-1 w-full space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" defaultValue={currentUser.name || "User"} />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" defaultValue="user@example.com" />
              </div>
            </div>
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="card bg-base-100 shadow-md border border-base-200">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4 flex items-center gap-2">
            <Bell size={20} /> Notifications
          </h2>
          
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Email on new inspection</span>
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Email on report approval</span>
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </label>
          </div>
           <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Marketing emails</span>
              <input type="checkbox" className="toggle toggle-secondary" />
            </label>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md border border-base-200">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4 flex items-center gap-2">
            <Shield size={20} /> Security
          </h2>
           <button className="btn btn-outline gap-2 w-fit">
            <Key size={16} /> Change Password
           </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
