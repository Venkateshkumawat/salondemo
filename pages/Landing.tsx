import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/UI';
import { useTheme } from '../components/ThemeContext';
import { Calendar, Users, BarChart3, CheckCircle2, ArrowRight, Star, ShieldCheck, Zap, Quote, Heart, Moon, Sun } from 'lucide-react';

export const Landing: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans scroll-smooth transition-colors duration-200">
      {/* Navbar */}
      <nav className="border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary-600 font-bold text-xl">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center">M</div>
            MintSalon
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hidden sm:block">Sign In</Link>
            <Link to="/login">
              <Button size="md" className="shadow-md shadow-primary-500/20">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 -z-10"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-teal-100/50 dark:bg-primary-900/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-blue-100/40 dark:bg-blue-900/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold uppercase tracking-wide mb-6 border border-primary-100 dark:border-primary-800 animate-fade-in-up">
             <Star className="h-3 w-3 fill-current" /> Voted #1 Salon Management Tool
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
            The modern way to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-400">run your salon.</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            MintSalon gives you everything you need to manage appointments, clients, and payments in one beautiful, easy-to-use platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/login">
              <Button size="lg" className="px-8 py-4 text-lg shadow-xl shadow-primary-600/30 hover:scale-105 transition-transform">
                Start Free Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <button className="px-8 py-4 text-lg font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Watch Video
            </button>
          </div>

          {/* Hero Image / Dashboard Preview */}
          <div className="relative mx-auto max-w-5xl group">
             <div className="rounded-2xl bg-slate-900 dark:bg-black p-2 shadow-2xl shadow-slate-400/50 dark:shadow-black/50 transition-transform duration-500 hover:scale-[1.01]">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop" 
                  alt="Dashboard Preview" 
                  className="rounded-xl w-full h-auto opacity-90 border border-white/10"
                />
                {/* Floating Badge */}
                <div className="absolute -right-8 top-1/3 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl animate-bounce duration-[3000ms] hidden lg:block border border-slate-100 dark:border-slate-700">
                   <div className="flex items-center gap-3">
                     <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg text-green-600 dark:text-green-400">
                       <CheckCircle2 className="h-6 w-6" />
                     </div>
                     <div>
                       <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">New Booking</p>
                       <p className="text-sm font-bold text-gray-900 dark:text-white">Sarah Jenkins</p>
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-slate-50 dark:bg-slate-900 py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Everything you need, nothing you don't.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">We cut the clutter so you can focus on what matters most: your clients.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: "Smart Calendar", desc: "Drag, drop, and organize your day with our intuitive color-coded scheduling system." },
              { icon: Users, title: "Client Profiles", desc: "Keep detailed notes on preferences, allergies, and history to deliver VIP service." },
              { icon: BarChart3, title: "Financial Reports", desc: "Track revenue, tips, and product sales automatically without the spreadsheet headache." },
              { icon: Zap, title: "Instant Booking", desc: "Allow clients to book online 24/7, filling your schedule even while you sleep." },
              { icon: ShieldCheck, title: "Secure Data", desc: "Bank-level encryption keeps your client data and business records safe and sound." },
              { icon: Heart, title: "Client Retention", desc: "Automated reminders and follow-ups keep your clients coming back for more." }
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Simple, transparent pricing</h2>
             <p className="text-lg text-slate-600 dark:text-slate-400">No hidden fees. No credit card required to start.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             {/* Starter */}
             <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800 transition-colors bg-white dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Starter</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Perfect for solo stylists.</p>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-6">$19<span className="text-base font-normal text-slate-500 dark:text-slate-400">/mo</span></div>
                <ul className="space-y-4 mb-8">
                   <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><CheckCircle2 className="h-4 w-4 text-primary-600" /> 1 Staff Member</li>
                   <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><CheckCircle2 className="h-4 w-4 text-primary-600" /> Unlimited Appointments</li>
                   <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><CheckCircle2 className="h-4 w-4 text-primary-600" /> Client Management</li>
                </ul>
                <Link to="/login">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
             </div>

             {/* Growth - Highlighted */}
             <div className="p-8 rounded-2xl border-2 border-primary-500 bg-slate-50 dark:bg-slate-800/50 relative shadow-xl">
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400">Growth</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">For growing salons.</p>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-6">$49<span className="text-base font-normal text-slate-500 dark:text-slate-400">/mo</span></div>
                <ul className="space-y-4 mb-8">
                   <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><CheckCircle2 className="h-4 w-4 text-primary-600" /> Up to 5 Staff</li>
                   <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><CheckCircle2 className="h-4 w-4 text-primary-600" /> Email Reminders</li>
                   <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><CheckCircle2 className="h-4 w-4 text-primary-600" /> Inventory Tracking</li>
                   <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><CheckCircle2 className="h-4 w-4 text-primary-600" /> Advanced Reports</li>
                </ul>
                <Link to="/login">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
             </div>

             {/* Enterprise */}
             <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800 transition-colors bg-white dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Enterprise</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">For multi-location chains.</p>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-6">$99<span className="text-base font-normal text-slate-500 dark:text-slate-400">/mo</span></div>
                <ul className="space-y-4 mb-8">
                   <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><CheckCircle2 className="h-4 w-4 text-primary-600" /> Unlimited Staff</li>
                   <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><CheckCircle2 className="h-4 w-4 text-primary-600" /> Multi-location Support</li>
                   <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"><CheckCircle2 className="h-4 w-4 text-primary-600" /> Dedicated Account Mgr</li>
                </ul>
                <Link to="/login">
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </Link>
             </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 dark:bg-black pt-20 pb-10 text-slate-400 text-sm border-t border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
               <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                     <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center text-xs">M</div>
                     MintSalon
                  </div>
                  <p className="mb-4">Making salon management effortless for modern business owners.</p>
               </div>
               <div>
                  <h4 className="text-white font-bold mb-4">Product</h4>
                  <ul className="space-y-2">
                     <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                     <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                     <li><a href="#" className="hover:text-white transition-colors">Showcase</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-white font-bold mb-4">Company</h4>
                  <ul className="space-y-2">
                     <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                     <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                     <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-white font-bold mb-4">Legal</h4>
                  <ul className="space-y-2">
                     <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                     <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  </ul>
               </div>
            </div>
            
            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
               <p>© 2024 MintSalon MVP. All rights reserved.</p>
               <div className="flex gap-6">
                  <a href="#" className="hover:text-white"><span className="sr-only">Twitter</span>Twitter</a>
                  <a href="#" className="hover:text-white"><span className="sr-only">Instagram</span>Instagram</a>
                  <a href="#" className="hover:text-white"><span className="sr-only">LinkedIn</span>LinkedIn</a>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
