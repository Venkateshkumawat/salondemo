import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Button, Card } from '../components/UI';
import { User, ShieldCheck, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (isDemo = false) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin();
      navigate('/dashboard');
      setIsLoading(false);
    }, isDemo ? 500 : 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative">
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-primary-600/20">
            M
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-2">Sign in to your MintSalon dashboard</p>
        </div>

        <Card className="shadow-xl shadow-slate-200/50 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="space-y-1">
              <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end">
                <a href="#" className="text-xs font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Sign In
            </Button>
          </form>
        </Card>

        {/* Demo Accounts Section */}
        <div className="relative mb-6">
           <div className="absolute inset-0 flex items-center" aria-hidden="true">
             <div className="w-full border-t border-gray-300"></div>
           </div>
           <div className="relative flex justify-center">
             <span className="bg-slate-50 px-2 text-sm text-gray-500">Or try a demo account</span>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => { setEmail('admin@mintsalon.com'); setPassword('demo123'); handleLogin(true); }}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:border-primary-300 transition-all text-sm font-medium text-slate-700"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Admin Demo
          </button>
          <button 
             onClick={() => { setEmail('staff@mintsalon.com'); setPassword('demo123'); handleLogin(true); }}
             className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:border-primary-300 transition-all text-sm font-medium text-slate-700"
          >
            <User className="h-4 w-4 text-blue-500" />
            Staff Demo
          </button>
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? <a href="#" className="font-medium text-primary-600 hover:text-primary-500">Start free trial</a>
        </p>
      </div>
    </div>
  );
};