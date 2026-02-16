import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Shield, Lock, User, Loader2 } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('owner'); // Default for demo
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await login(username, password);
      // Role-based redirect
      switch (user.role) {
        case 'owner':
          navigate('/owner');
          break;
        case 'analyst':
          navigate('/analyst');
          break;
        case 'tenant':
          navigate('/tenant');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 animate-fade-in">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-3">
              <Shield size={32} />
            </div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-base-content/60 text-sm">Sign in to PropInspect</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="alert alert-error text-sm py-2 rounded-lg">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Username</span>
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <input 
                  type="text" 
                  className="input input-bordered w-full pl-10" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="owner, analyst, or tenant"
                  required 
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <input 
                  type="password" 
                  className="input input-bordered w-full pl-10" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required 
                />
              </div>
              <label className="label">
                <span className="label-text-alt link link-hover">Forgot password?</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 size={18} className="animate-spin" />}
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="divide-y divide-base-200 mt-4 pt-4 text-center">
            <div className="text-xs text-base-content/50 space-y-1">
              <p>Demo Credentials (password: password123):</p>
              <div className="flex justify-center gap-3 font-mono text-primary">
                <span>owner</span>
                <span>analyst</span>
                <span>tenant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
