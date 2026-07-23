import React, { useState, useEffect } from 'react';
import { Settings, Phone, DollarSign, User, ShieldCheck, Download, Save, LogOut, RefreshCw, Check, Sparkles, FileSpreadsheet } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { supabase, BrochureLead } from '../lib/supabase';
import { LearnSetuLogo } from '../components/LearnSetuLogo';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { settings, updateSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<'pricing' | 'contact' | 'founder' | 'leads'>('pricing');
  const [formData, setFormData] = useState(settings);
  const [leads, setLeads] = useState<BrochureLead[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const { data, error } = await supabase
        .from('brochure_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setLeads(data);
      }
    } catch (err) {
      console.log('Error fetching leads:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads();
    }
  }, [activeTab]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await updateSettings(formData);
    setIsSaving(false);
    if (success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const exportLeadsToCSV = () => {
    if (leads.length === 0) return;
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Program', 'Date'];
    const rows = leads.map(l => [
      l.first_name,
      l.last_name,
      l.email,
      l.phone,
      l.program,
      l.created_at ? new Date(l.created_at).toLocaleString() : ''
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LearnSetu_Brochure_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 font-body">
      
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LearnSetuLogo showTagline={false} size="sm" />
          <div className="h-6 w-px bg-slate-200" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0067FF]/10 text-[#0067FF] text-xs font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>REAL-TIME ADMIN DASHBOARD</span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin</span>
        </button>
      </header>

      {/* Main Admin Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Save Success Banner */}
        {savedSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Real-time changes saved! All visitors see updated details instantly.</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-emerald-200/60 px-2 py-0.5 rounded-full">SYNCHRONIZED</span>
          </div>
        )}

        {/* Dashboard Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'pricing'
                ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Pricing & EMI</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'contact'
                ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Contact & WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('founder')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'founder'
                ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Leadership & Bios</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'leads'
                ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Brochure Leads ({leads.length})</span>
          </button>
        </div>

        {/* Tab 1: Pricing & EMI Settings */}
        {activeTab === 'pricing' && (
          <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 max-w-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#0067FF]" />
              <span>Manage Course Pricing & EMI Options</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Master Program Fee</label>
                <input
                  type="text"
                  value={formData.course_fee}
                  onChange={(e) => setFormData({ ...formData, course_fee: e.target.value })}
                  placeholder="₹14,999"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">12-Month EMI Breakdown Text</label>
                <input
                  type="text"
                  value={formData.emi_monthly}
                  onChange={(e) => setFormData({ ...formData, emi_monthly: e.target.value })}
                  placeholder="₹1,250/mo"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Batch Enrollment Status Tag</label>
                <input
                  type="text"
                  value={formData.batch_status}
                  onChange={(e) => setFormData({ ...formData, batch_status: e.target.value })}
                  placeholder="Live Weekend Sessions Enrolling"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-4 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#0067FF]/20 transition-all active:scale-95"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save & Sync Real-Time Pricing</span>
            </button>
          </form>
        )}

        {/* Tab 2: Contact & WhatsApp Settings */}
        {activeTab === 'contact' && (
          <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 max-w-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-emerald-600" />
              <span>WhatsApp & Support Contact Details</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone Number (Country Code + Digits)</label>
                <input
                  type="text"
                  value={formData.whatsapp_number}
                  onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                  placeholder="918591928362"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Support Email</label>
                <input
                  type="email"
                  value={formData.support_email}
                  onChange={(e) => setFormData({ ...formData, support_email: e.target.value })}
                  placeholder="mandarra71@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-4 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#0067FF]/20 transition-all active:scale-95"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save & Sync WhatsApp Details</span>
            </button>
          </form>
        )}

        {/* Tab 3: Leadership Settings */}
        {activeTab === 'founder' && (
          <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 max-w-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              <span>Leadership & Founder Profiles</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Founder Full Name</label>
                <input
                  type="text"
                  value={formData.founder_name}
                  onChange={(e) => setFormData({ ...formData, founder_name: e.target.value })}
                  placeholder="Sagar Parmar"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Founder Role / Title</label>
                <input
                  type="text"
                  value={formData.founder_title}
                  onChange={(e) => setFormData({ ...formData, founder_title: e.target.value })}
                  placeholder="Founder & CEO"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Founder Quote Statement</label>
                <textarea
                  rows={3}
                  value={formData.founder_quote}
                  onChange={(e) => setFormData({ ...formData, founder_quote: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-medium text-xs focus:outline-none focus:border-[#0067FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-4 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#0067FF]/20 transition-all active:scale-95"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Leadership Details</span>
            </button>
          </form>
        )}

        {/* Tab 4: Brochure Leads Table */}
        {activeTab === 'leads' && (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Download className="w-5 h-5 text-[#0067FF]" />
                  <span>Student Brochure Leads ({leads.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Real-time submissions from Brochure Download forms.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchLeads}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Refresh Leads Table"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingLeads ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={exportLeadsToCSV}
                  disabled={leads.length === 0}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export to Excel / CSV</span>
                </button>
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="text-center py-12 bg-[#FAFAFC] rounded-2xl border border-dashed border-slate-300">
                <p className="text-xs text-slate-500 font-medium">No student lead submissions captured yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#FAFAFC] border-b border-slate-200 font-mono font-bold text-slate-600 uppercase">
                    <tr>
                      <th className="p-3.5">Student Name</th>
                      <th className="p-3.5">Email Address</th>
                      <th className="p-3.5">WhatsApp Phone</th>
                      <th className="p-3.5">Selected Program</th>
                      <th className="p-3.5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {leads.map((lead, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">{lead.first_name} {lead.last_name}</td>
                        <td className="p-3.5 text-[#0067FF] font-mono">{lead.email}</td>
                        <td className="p-3.5 font-mono text-emerald-700">{lead.phone}</td>
                        <td className="p-3.5 text-slate-700">{lead.program}</td>
                        <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                          {lead.created_at ? new Date(lead.created_at).toLocaleString() : 'Just now'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
