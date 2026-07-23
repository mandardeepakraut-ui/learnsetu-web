import React, { useState, useEffect } from 'react';
import { Settings, Phone, DollarSign, User, ShieldCheck, Download, Save, LogOut, RefreshCw, Check, Sparkles, FileSpreadsheet, Megaphone, Clock, HelpCircle, Star, MessageCircle, Plus, Trash2, Edit3, Award } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { supabase, BrochureLead } from '../lib/supabase';
import { LearnSetuLogo } from '../components/LearnSetuLogo';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface FaqItem {
  q: string;
  a: string;
}

interface TestimonialItem {
  name: string;
  role: string;
  hike: string;
  review: string;
  stars: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { settings, updateSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<'pricing' | 'urgency' | 'announcement' | 'faqs' | 'testimonials' | 'contact' | 'founder' | 'leads'>('pricing');
  const [formData, setFormData] = useState(settings);
  const [leads, setLeads] = useState<BrochureLead[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // Dynamic FAQ list state inside admin
  const [faqList, setFaqList] = useState<FaqItem[]>(() => {
    if (settings.custom_faqs) {
      try {
        const parsed = JSON.parse(settings.custom_faqs);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [
      { q: "What is the total fee for the Master Program in Data Science & AI?", a: "The complete program fee is ₹14,999 with no hidden charges." },
      { q: "What are the criteria for placement assistance?", a: "Maintain 60%+ assessment score and 80%+ attendance." }
    ];
  });

  // Dynamic Testimonial list state inside admin
  const [testimonialList, setTestimonialList] = useState<TestimonialItem[]>(() => {
    if (settings.custom_testimonials) {
      try {
        const parsed = JSON.parse(settings.custom_testimonials);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [
      { name: "Riya Sharma", role: "Data Analyst @ TCS", hike: "+65% Hike", review: "LearnSetu transformed my career.", stars: 5 }
    ];
  });

  useEffect(() => {
    setFormData(settings);
    if (settings.custom_faqs) {
      try { setFaqList(JSON.parse(settings.custom_faqs)); } catch (e) {}
    }
    if (settings.custom_testimonials) {
      try { setTestimonialList(JSON.parse(settings.custom_testimonials)); } catch (e) {}
    }
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
    const toSave = {
      ...formData,
      custom_faqs: JSON.stringify(faqList),
      custom_testimonials: JSON.stringify(testimonialList)
    };
    const success = await updateSettings(toSave);
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

  // FAQ handlers
  const handleAddFaq = () => {
    setFaqList([...faqList, { q: "New Question Title", a: "Answer text goes here..." }]);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqList(faqList.filter((_, i) => i !== index));
  };

  const handleUpdateFaq = (index: number, field: 'q' | 'a', value: string) => {
    const updated = [...faqList];
    updated[index][field] = value;
    setFaqList(updated);
  };

  // Testimonial handlers
  const handleAddTestimonial = () => {
    setTestimonialList([...testimonialList, { name: "Student Name", role: "Role @ Company", hike: "+50% Hike", review: "Write student review...", stars: 5 }]);
  };

  const handleRemoveTestimonial = (index: number) => {
    setTestimonialList(testimonialList.filter((_, i) => i !== index));
  };

  const handleUpdateTestimonial = (index: number, field: keyof TestimonialItem, value: any) => {
    const updated = [...testimonialList];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonialList(updated);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 font-body">
      
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LearnSetuLogo showTagline={false} size="sm" />
          <div className="h-6 w-px bg-slate-200" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>REAL-TIME MULTI-TAB SYNC ACTIVE</span>
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
              <span>Real-time changes saved! Website visitors will see updated details instantly.</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-emerald-200/60 px-2 py-0.5 rounded-full">SYNCHRONIZED</span>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'pricing'
                ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Pricing & Fee</span>
          </button>

          <button
            onClick={() => setActiveTab('urgency')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'urgency'
                ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Batch & Urgency</span>
          </button>

          <button
            onClick={() => setActiveTab('announcement')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'announcement'
                ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Megaphone className="w-4 h-4 text-pink-500" />
            <span>Top Offer Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'faqs'
                ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-indigo-500" />
            <span>Manage FAQs</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'testimonials'
                ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span>Testimonials</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'contact'
                ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Phone className="w-4 h-4 text-emerald-500" />
            <span>WhatsApp & Email</span>
          </button>

          <button
            onClick={() => setActiveTab('founder')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'founder'
                ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Leadership Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'leads'
                ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Brochure Leads ({leads.length})</span>
          </button>
        </div>

        {/* Tab 1: Pricing & Fee Settings */}
        {activeTab === 'pricing' && (
          <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 max-w-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#0067FF]" />
              <span>Master Program Pricing & EMI Options</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Program Fee (Full Package)</label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Batch Enrollment Status Badge Text</label>
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

        {/* Tab 2: Batch & Urgency Controls */}
        {activeTab === 'urgency' && (
          <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 max-w-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>Batch Details & Scarcity Urgency Controls</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Batch Identifier Name</label>
                <input
                  type="text"
                  value={formData.batch_name || ''}
                  onChange={(e) => setFormData({ ...formData, batch_name: e.target.value })}
                  placeholder="BATCH #2026-A"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Batch Start Date & Schedule</label>
                <input
                  type="text"
                  value={formData.batch_start_date || ''}
                  onChange={(e) => setFormData({ ...formData, batch_start_date: e.target.value })}
                  placeholder="Weekend Batch • Starts July 28, 2026"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Seats Remaining Scarcity Badge Text</label>
                <input
                  type="text"
                  value={formData.seats_remaining || ''}
                  onChange={(e) => setFormData({ ...formData, seats_remaining: e.target.value })}
                  placeholder="Only 4 Seats Left"
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
              <span>Save & Sync Batch Urgency</span>
            </button>
          </form>
        )}

        {/* Tab 3: Top Announcement Banner Settings */}
        {activeTab === 'announcement' && (
          <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 max-w-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-pink-500" />
              <span>Sitewide Top Offer Announcement Bar</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#FAFAFC] rounded-2xl border border-slate-200">
                <div>
                  <div className="text-xs font-bold text-slate-900">Enable Announcement Banner</div>
                  <div className="text-[11px] text-slate-500">Show promotional offer bar at the very top of the site</div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.announcement_active ?? true}
                  onChange={(e) => setFormData({ ...formData, announcement_active: e.target.checked })}
                  className="w-5 h-5 accent-[#0067FF] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Announcement Message Copy</label>
                <input
                  type="text"
                  value={formData.announcement_text || ''}
                  onChange={(e) => setFormData({ ...formData, announcement_text: e.target.value })}
                  placeholder="⚡ Early Bird Offer: Flat ₹2,000 Off on Batch #2026-A! Use Code: LEARNSETU2000"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={formData.announcement_button_text || ''}
                    onChange={(e) => setFormData({ ...formData, announcement_button_text: e.target.value })}
                    placeholder="Claim Offer"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-xs focus:outline-none focus:border-[#0067FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CTA Target Link</label>
                  <input
                    type="text"
                    value={formData.announcement_button_url || ''}
                    onChange={(e) => setFormData({ ...formData, announcement_button_url: e.target.value })}
                    placeholder="#master-course"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-xs focus:outline-none focus:border-[#0067FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Banner Background Theme Color</label>
                <select
                  value={formData.announcement_theme || 'blue'}
                  onChange={(e) => setFormData({ ...formData, announcement_theme: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-xs focus:outline-none focus:border-[#0067FF]"
                >
                  <option value="blue">Electric Blue (Brand Default)</option>
                  <option value="emerald">Emerald Green (Success / Offer)</option>
                  <option value="violet">Purple Violet (Exclusive)</option>
                  <option value="amber">Warm Amber (Urgent Warning)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-4 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#0067FF]/20 transition-all active:scale-95"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save & Publish Top Banner</span>
            </button>
          </form>
        )}

        {/* Tab 4: FAQ Manager */}
        {activeTab === 'faqs' && (
          <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                  <span>Frequently Asked Questions Editor ({faqList.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Add, edit, or remove FAQs displayed on the home page.</p>
              </div>

              <button
                type="button"
                onClick={handleAddFaq}
                className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold flex items-center gap-1.5 hover:bg-indigo-100 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New FAQ</span>
              </button>
            </div>

            <div className="space-y-4">
              {faqList.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#FAFAFC] border border-slate-200 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#0067FF]">FAQ #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(idx)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Question Title</label>
                    <input
                      type="text"
                      value={item.q}
                      onChange={(e) => handleUpdateFaq(idx, 'q', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold text-xs focus:outline-none focus:border-[#0067FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Detailed Answer</label>
                    <textarea
                      rows={2}
                      value={item.a}
                      onChange={(e) => handleUpdateFaq(idx, 'a', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-medium text-xs focus:outline-none focus:border-[#0067FF]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-4 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#0067FF]/20 transition-all active:scale-95"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save & Publish FAQs</span>
            </button>
          </form>
        )}

        {/* Tab 5: Testimonials Manager */}
        {activeTab === 'testimonials' && (
          <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span>Student Success Stories Editor ({testimonialList.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Manage placement reviews and salary hikes featured on the website.</p>
              </div>

              <button
                type="button"
                onClick={handleAddTestimonial}
                className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Story</span>
              </button>
            </div>

            <div className="space-y-4">
              {testimonialList.map((rev, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#FAFAFC] border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-600">Review #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTestimonial(idx)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Student Name</label>
                      <input
                        type="text"
                        value={rev.name}
                        onChange={(e) => handleUpdateTestimonial(idx, 'name', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Role & Company</label>
                      <input
                        type="text"
                        value={rev.role}
                        onChange={(e) => handleUpdateTestimonial(idx, 'role', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Salary Hike Tag</label>
                      <input
                        type="text"
                        value={rev.hike}
                        onChange={(e) => handleUpdateTestimonial(idx, 'hike', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-bold text-xs text-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Review Statement</label>
                    <textarea
                      rows={2}
                      value={rev.review}
                      onChange={(e) => handleUpdateTestimonial(idx, 'review', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-4 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#0067FF]/20 transition-all active:scale-95"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Student Testimonials</span>
            </button>
          </form>
        )}

        {/* Tab 6: Contact & WhatsApp Settings */}
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
              <span>Save WhatsApp & Contact Details</span>
            </button>
          </form>
        )}

        {/* Tab 7: Leadership Settings */}
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

        {/* Tab 8: Brochure Leads Table & 1-Click WhatsApp CRM */}
        {activeTab === 'leads' && (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Download className="w-5 h-5 text-[#0067FF]" />
                  <span>Student Brochure Leads ({leads.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Real-time submissions from Brochure Download forms with 1-Click WhatsApp CRM.</p>
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
                      <th className="p-3.5">Phone Number</th>
                      <th className="p-3.5">Selected Program</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5 text-right">Quick Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {leads.map((lead, idx) => {
                      const cleanPhone = lead.phone ? lead.phone.replace(/\D/g, '') : '';
                      const waLink = `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=Hi%20${encodeURIComponent(lead.first_name)}%2C%20thanks%20for%20downloading%20the%20LearnSetu%20Data%20Science%20Brochure!%20Do%20you%20have%20any%20questions%20about%20our%20next%20batch%3F`;

                      return (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-bold text-slate-900">{lead.first_name} {lead.last_name}</td>
                          <td className="p-3.5 text-[#0067FF] font-mono">{lead.email}</td>
                          <td className="p-3.5 font-mono text-slate-800">{lead.phone}</td>
                          <td className="p-3.5 text-slate-700">{lead.program}</td>
                          <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                            {lead.created_at ? new Date(lead.created_at).toLocaleString() : 'Just now'}
                          </td>
                          <td className="p-3.5 text-right">
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-bold text-[11px] transition-all"
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
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
