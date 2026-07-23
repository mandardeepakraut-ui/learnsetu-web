import React, { useState, useEffect } from 'react';
import { Settings, Phone, DollarSign, User, ShieldCheck, Download, Save, LogOut, RefreshCw, Check, Sparkles, FileSpreadsheet, Megaphone, Clock, HelpCircle, Star, MessageCircle, Plus, Trash2, Edit3, Award, Lock, Building2, Video, KeyRound, Activity, Monitor, Smartphone, Globe, Eye, UserCheck, ShieldAlert, Users, UserPlus } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { supabase, BrochureLead, SiteVisit, AdminAuditLog, logAuditActivity, AdminUser, AdminPermission, ALL_PERMISSIONS, DEFAULT_ADMIN_USERS, fetchAdminUsers, createAdminUser, updateAdminUserPermissions, deleteAdminUser } from '../lib/supabase';
import { LearnSetuLogo } from '../components/LearnSetuLogo';
import { OnlineVisitorState } from '../hooks/useRealtimePresence';
import { useAdminAutoLogout } from '../hooks/useAdminAutoLogout';

interface AdminDashboardProps {
  onLogout: () => void;
  onlineUsers?: OnlineVisitorState[];
  onlineCount?: number;
  currentAdmin?: AdminUser;
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

interface PartnerItem {
  name: string;
  hike: string;
  package: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onlineUsers = [],
  onlineCount = 1,
  currentAdmin = DEFAULT_ADMIN_USERS[0],
}) => {
  const { settings, updateSettings } = useSettings();

  // 30-minute Auto Logout Security Hook
  const { formattedTime, isWarningOpen, extendSession } = useAdminAutoLogout({
    timeoutMinutes: 30,
    warningMinutes: 2,
    onLogout,
  });

  const [activeTab, setActiveTab] = useState<'pricing' | 'urgency' | 'announcement' | 'popup' | 'partners' | 'faqs' | 'testimonials' | 'contact' | 'founder' | 'security' | 'leads' | 'traffic' | 'audit' | 'admins'>('traffic');
  const [formData, setFormData] = useState(settings);
  const [leads, setLeads] = useState<BrochureLead[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);

  const [trafficSubTab, setTrafficSubTab] = useState<'live' | 'history'>('live');
  const [dbVisits, setDbVisits] = useState<SiteVisit[]>([]);
  const [loadingVisits, setLoadingVisits] = useState(false);
  const [visitSearch, setVisitSearch] = useState('');

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);
  const [loadingAudit, setLoadingAudit] = useState(false);
  const [mentorFilter, setMentorFilter] = useState('all');

  // Admin Users & Permission Management State
  const [adminList, setAdminList] = useState<AdminUser[]>(DEFAULT_ADMIN_USERS);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Mentor & Counselor');
  const [newAdminPasscode, setNewAdminPasscode] = useState('');
  const [newAdminPermissions, setNewAdminPermissions] = useState<AdminPermission[]>(['pricing', 'leads', 'traffic', 'content']);
  const [userMsg, setUserMsg] = useState('');

  const loadAdminUsersList = async () => {
    setLoadingAdmins(true);
    const users = await fetchAdminUsers();
    setAdminList(users);
    setLoadingAdmins(false);
  };

  useEffect(() => {
    if (activeTab === 'admins') {
      loadAdminUsersList();
    }
  }, [activeTab]);

  const handleCreateNewAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminUsername.trim() || !newAdminPasscode.trim()) return;

    const newAdminObj: Omit<AdminUser, 'id' | 'created_at'> = {
      name: newAdminName.trim() || newAdminUsername.trim(),
      username: newAdminUsername.trim().toLowerCase(),
      role: newAdminRole.trim() || 'Admin Mentor',
      passcode: newAdminPasscode.trim(),
      permissions: newAdminPermissions,
      is_active: true,
    };

    const success = await createAdminUser(newAdminObj);
    if (success) {
      logAuditActivity(
        currentAdmin.name,
        currentAdmin.role,
        'CREATE_ADMIN',
        `Created new admin account for ${newAdminObj.name} (@${newAdminObj.username})`
      );
      setUserMsg(`Successfully created new admin account for @${newAdminObj.username}!`);
      setNewAdminName('');
      setNewAdminUsername('');
      setNewAdminPasscode('');
      loadAdminUsersList();
      setTimeout(() => setUserMsg(''), 4000);
    } else {
      setUserMsg('Error: Username already exists or database insertion failed.');
    }
  };

  const hasPerm = (p: AdminPermission): boolean => {
    if (currentAdmin.username.toLowerCase() === 'mandar') return true;
    if (currentAdmin.permissions?.includes('admins')) return true;
    return currentAdmin.permissions?.includes(p) || false;
  };

  const handleSaveUserPermissions = async (username: string, permissions: AdminPermission[]) => {
    const ok = await updateAdminUserPermissions(username, permissions);
    if (ok) {
      logAuditActivity(
        currentAdmin.name,
        currentAdmin.role,
        'UPDATE_PERMISSIONS',
        `Saved permissions for @${username}: [${permissions.join(', ')}]`
      );
      setUserMsg(`✓ Permissions for @${username} saved successfully!`);
      setTimeout(() => setUserMsg(''), 4000);
    }
  };

  const handleTogglePermission = async (username: string, perm: AdminPermission) => {
    const targetUser = adminList.find((u) => u.username.toLowerCase() === username.toLowerCase());
    if (!targetUser) return;

    let updatedPerms: AdminPermission[];
    if (targetUser.permissions.includes(perm)) {
      updatedPerms = targetUser.permissions.filter((p) => p !== perm);
    } else {
      updatedPerms = [...targetUser.permissions, perm];
    }

    // Optimistic UI update
    setAdminList((prev) =>
      prev.map((u) => (u.username.toLowerCase() === username.toLowerCase() ? { ...u, permissions: updatedPerms } : u))
    );

    // Save changes
    await updateAdminUserPermissions(username, updatedPerms);
  };

  const handleDeleteAdminAccount = async (username: string) => {
    const targetClean = username.toLowerCase();
    const currentClean = currentAdmin.username.toLowerCase();

    if (targetClean === 'mandar' || targetClean === currentClean) {
      alert("Cannot delete primary founder or currently logged-in account!");
      return;
    }

    if (confirm(`Are you sure you want to delete admin account @${username}?`)) {
      // Optimistic state update
      setAdminList((prev) => prev.filter((u) => u.username.toLowerCase() !== targetClean));

      const ok = await deleteAdminUser(username);
      if (ok) {
        logAuditActivity(
          currentAdmin.name,
          currentAdmin.role,
          'DELETE_ADMIN',
          `Deleted admin account @${username}`
        );
      }
    }
  };

  const fetchAuditLogs = async () => {
    setLoadingAudit(true);
    try {
      const { data, error } = await supabase
        .from('admin_audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!error && data) {
        setAuditLogs(data as AdminAuditLog[]);
      }
    } catch (err) {
      console.warn('Error fetching audit logs:', err);
    } finally {
      setLoadingAudit(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'audit') {
      fetchAuditLogs();
    }
  }, [activeTab]);

  const fetchVisitHistory = async () => {
    setLoadingVisits(true);
    try {
      const { data, error } = await supabase
        .from('site_visits')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (!error && data) {
        setDbVisits(data as SiteVisit[]);
      }
    } catch (e) {
      console.warn('Failed to load visit history:', e);
    } finally {
      setLoadingVisits(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'traffic' && trafficSubTab === 'history') {
      fetchVisitHistory();
    }
  }, [activeTab, trafficSubTab]);


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

  // Dynamic Hiring Partners list state inside admin
  const [partnerList, setPartnerList] = useState<PartnerItem[]>(() => {
    if (settings.custom_hiring_partners) {
      try {
        const parsed = JSON.parse(settings.custom_hiring_partners);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [
      { name: 'TCS', hike: '+65% Hike', package: '₹6.5 - ₹8.0 LPA' },
      { name: 'Infosys', hike: '+70% Hike', package: '₹7.0 - ₹9.5 LPA' },
      { name: 'Wipro', hike: '+68% Hike', package: '₹6.8 - ₹8.5 LPA' },
      { name: 'Accenture', hike: '+75% Hike', package: '₹8.0 - ₹11.0 LPA' }
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
    if (settings.custom_hiring_partners) {
      try { setPartnerList(JSON.parse(settings.custom_hiring_partners)); } catch (e) {}
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
      custom_testimonials: JSON.stringify(testimonialList),
      custom_hiring_partners: JSON.stringify(partnerList)
    };
    const success = await updateSettings(toSave);
    setIsSaving(false);
    if (success) {
      logAuditActivity(currentAdmin.name, currentAdmin.role, 'UPDATE_SETTINGS', 'Saved site settings, pricing & content changes');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const exportLeadsToCSV = () => {
    if (leads.length === 0) return;
    logAuditActivity(currentAdmin.name, currentAdmin.role, 'EXPORT_LEADS', `Exported ${leads.length} student leads to CSV`);
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

  // Partner handlers
  const handleAddPartner = () => {
    setPartnerList([...partnerList, { name: "Company Name", hike: "+70% Hike", package: "₹7.0 - ₹9.0 LPA" }]);
  };

  const handleRemovePartner = (index: number) => {
    setPartnerList(partnerList.filter((_, i) => i !== index));
  };

  const handleUpdatePartner = (index: number, field: keyof PartnerItem, value: string) => {
    const updated = [...partnerList];
    updated[index][field] = value;
    setPartnerList(updated);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 font-body">
      
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LearnSetuLogo showTagline={false} size="sm" />
          <div className="h-6 w-px bg-slate-200" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0067FF]/10 text-[#0067FF] border border-[#0067FF]/20 text-xs font-mono font-bold">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{currentAdmin.name}</span>
            <span className="text-[10px] text-slate-500 font-normal">(@{currentAdmin.username})</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono font-bold"
            title="Auto logout after 30 minutes of inactivity"
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>IDLE TIMEOUT: {formattedTime}</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>SYNC ACTIVE</span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit Admin</span>
          </button>
        </div>
      </header>

      {/* Session Inactivity Warning Modal */}
      {isWarningOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-2xl max-w-md w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 font-display">
              Session Inactivity Warning
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Your admin session will automatically expire in <strong className="text-amber-600 font-mono text-sm">{formattedTime}</strong> due to 30 minutes of inactivity.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={onLogout}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
              >
                Log Out Now
              </button>
              <button
                onClick={extendSession}
                className="flex-1 py-2.5 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white text-xs font-bold transition-all shadow-md shadow-[#0067FF]/20"
              >
                Extend Session
              </button>
            </div>
          </div>
        </div>
      )}

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
          {hasPerm('traffic') && (
            <button
              onClick={() => setActiveTab('traffic')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'traffic'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>Live Traffic & Watchers ({onlineCount})</span>
            </button>
          )}

          {hasPerm('admins') && (
            <>
              <button
                onClick={() => setActiveTab('audit')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'audit'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                    : 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-500" />
                <span>Audit Activity Logs</span>
              </button>

              <button
                onClick={() => setActiveTab('admins')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'admins'
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                    : 'bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100'
                }`}
              >
                <Users className="w-4 h-4 text-cyan-600" />
                <span>Admin Users & Permissions ({adminList.length})</span>
              </button>
            </>
          )}

          {hasPerm('pricing') && (
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
          )}

          {hasPerm('content') && (
            <>
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
                <span>Top Banner Bar</span>
              </button>

              <button
                onClick={() => setActiveTab('popup')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'popup'
                    ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Video className="w-4 h-4 text-purple-500" />
                <span>Webinar Popup Modal</span>
              </button>

              <button
                onClick={() => setActiveTab('partners')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'partners'
                    ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-500" />
                <span>Hiring Partners</span>
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
                    : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
                }`}
              >
                <Phone className="w-4 h-4 text-teal-500" />
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
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'security'
                    ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <KeyRound className="w-4 h-4 text-rose-500" />
                <span>Passcode Security</span>
              </button>
            </>
          )}

          {hasPerm('leads') && (
            <button
              onClick={() => setActiveTab('leads')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'leads'
                  ? 'bg-[#0067FF] text-white shadow-lg shadow-[#0067FF]/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Brochure Leads ({leads.length})</span>
            </button>
          )}
        </div>

        {/* Tab 0: Real-Time Traffic & Live Watchers (ADMIN ONLY) */}
        {activeTab === 'traffic' && (
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    Real-Time Visitor Analytics & Watchers
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ADMIN ONLY VIEW
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Private live stream of currently online website visitors, active pages, and historical database logs.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setTrafficSubTab('live')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    trafficSubTab === 'live'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Live Watchers ({onlineCount})
                </button>
                <button
                  onClick={() => setTrafficSubTab('history')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    trafficSubTab === 'history'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  DB History Logs
                </button>
              </div>
            </div>

            {/* Quick KPI Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Currently Watching Live</div>
                <div className="mt-2 text-3xl font-black text-emerald-400 font-mono flex items-center gap-2">
                  {onlineCount}
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Device Breakdown</div>
                <div className="mt-2 text-sm text-slate-300 flex items-center gap-4">
                  <span className="flex items-center gap-1 font-mono text-cyan-300 font-bold">
                    <Monitor className="w-4 h-4" /> Desktop: {onlineUsers.filter(u => u.device !== 'Mobile').length}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-purple-300 font-bold">
                    <Smartphone className="w-4 h-4" /> Mobile: {onlineUsers.filter(u => u.device === 'Mobile').length}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Presence Channel Status</div>
                <div className="mt-2 text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Connected & Streaming
                </div>
              </div>
            </div>

            {/* Sub-Tab 1: Live Feed */}
            {trafficSubTab === 'live' && (
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Active Connected Users ({onlineUsers.length})
                </h4>
                {onlineUsers.length === 0 ? (
                  <div className="py-12 text-center text-slate-500">
                    <Eye className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">Connecting to live presence channel...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {onlineUsers.map((user, idx) => (
                      <div
                        key={user.sessionId || idx}
                        className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="p-2 rounded-xl bg-slate-800 text-emerald-400">
                              {user.device === 'Mobile' ? (
                                <Smartphone className="w-4 h-4" />
                              ) : (
                                <Monitor className="w-4 h-4" />
                              )}
                            </span>
                            <div>
                              <div className="text-xs font-bold text-white font-mono">
                                Visitor ID: {user.visitorId ? user.visitorId.slice(0, 14) : 'Visitor'}
                              </div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                                <Globe className="w-3 h-3 text-slate-500" />
                                Location: {user.location || 'India'}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Watching Live
                          </span>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 text-xs flex items-center justify-between">
                          <span className="text-slate-400">Active View:</span>
                          <span className="font-mono text-emerald-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {user.currentPath || '/'}
                          </span>
                        </div>

                        <div className="text-[10px] text-slate-500 flex justify-between font-mono">
                          <span>Joined: {new Date(user.joinedAt).toLocaleTimeString()}</span>
                          <span>Session: {user.sessionId ? user.sessionId.slice(0, 10) : ''}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sub-Tab 2: Historical Database Visitor Logs */}
            {trafficSubTab === 'history' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="text"
                    placeholder="Search by Visitor ID, Path, Device, or Referrer..."
                    value={visitSearch}
                    onChange={(e) => setVisitSearch(e.target.value)}
                    className="flex-1 px-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={fetchVisitHistory}
                    disabled={loadingVisits}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingVisits ? 'animate-spin' : ''}`} />
                    Refresh Logs
                  </button>
                </div>

                {loadingVisits ? (
                  <div className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 mx-auto mb-2 animate-spin text-emerald-400" />
                    <p className="text-xs">Fetching visitor log entries from Supabase DB...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-slate-800">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Timestamp</th>
                          <th className="px-4 py-3 font-semibold">Visitor ID</th>
                          <th className="px-4 py-3 font-semibold">Page Path</th>
                          <th className="px-4 py-3 font-semibold">Referrer</th>
                          <th className="px-4 py-3 font-semibold">Device</th>
                          <th className="px-4 py-3 font-semibold">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 font-mono">
                        {dbVisits
                          .filter(
                            (v) =>
                              v.visitor_id?.toLowerCase().includes(visitSearch.toLowerCase()) ||
                              v.page_path?.toLowerCase().includes(visitSearch.toLowerCase()) ||
                              v.device_type?.toLowerCase().includes(visitSearch.toLowerCase()) ||
                              v.referrer?.toLowerCase().includes(visitSearch.toLowerCase())
                          )
                          .map((visit) => (
                            <tr key={visit.id || Math.random()} className="hover:bg-slate-800/40">
                              <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                                {visit.created_at ? new Date(visit.created_at).toLocaleString() : 'Just now'}
                              </td>
                              <td className="px-4 py-3 font-bold text-emerald-400">{visit.visitor_id?.slice(0, 12)}</td>
                              <td className="px-4 py-3 text-cyan-300">{visit.page_path}</td>
                              <td className="px-4 py-3 text-slate-400">{visit.referrer || 'Direct'}</td>
                              <td className="px-4 py-3 text-purple-300">{visit.device_type}</td>
                              <td className="px-4 py-3 text-amber-300">{visit.duration_seconds || 0}s</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 0.5: Multi-Admin Audit Activity Logs */}
        {activeTab === 'audit' && (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    Multi-Admin Audit Activity Logs
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                      SECURE AUDIT TRAIL
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Trace actions taken by mentors (Mandar Raut, Sagar Parmar, Manthan Saindane) across site settings, pricing, and leads.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={mentorFilter}
                  onChange={(e) => setMentorFilter(e.target.value)}
                  className="px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-purple-600"
                >
                  <option value="all">All Mentors Audit Stream</option>
                  <option value="Mandar Raut">Mandar Raut</option>
                  <option value="Sagar Parmar">Sagar Parmar</option>
                  <option value="Manthan Saindane">Manthan Saindane</option>
                </select>

                <button
                  onClick={fetchAuditLogs}
                  disabled={loadingAudit}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingAudit ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>

            {/* Audit Log Table */}
            {loadingAudit ? (
              <div className="py-12 text-center text-slate-500">
                <RefreshCw className="w-6 h-6 mx-auto mb-2 animate-spin text-purple-600" />
                <p className="text-xs font-bold">Fetching latest admin activity logs...</p>
              </div>
            ) : auditLogs.length === 0 ? (
              <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <ShieldCheck className="w-8 h-8 mx-auto mb-2 opacity-50 text-purple-500" />
                <p className="text-sm font-bold text-slate-600">No activity logs recorded yet.</p>
                <p className="text-xs text-slate-500 mt-1">Actions like updating settings, pricing, or exporting leads will automatically log here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-mono text-[11px]">
                    <tr>
                      <th className="px-4 py-3 font-bold">Timestamp</th>
                      <th className="px-4 py-3 font-bold">Admin Mentor</th>
                      <th className="px-4 py-3 font-bold">Role</th>
                      <th className="px-4 py-3 font-bold">Action Type</th>
                      <th className="px-4 py-3 font-bold">Activity Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-medium">
                    {auditLogs
                      .filter((log) => mentorFilter === 'all' || log.mentor_name === mentorFilter)
                      .map((log) => (
                        <tr key={log.id || Math.random()} className="hover:bg-slate-50/80">
                          <td className="px-4 py-3 text-slate-400 font-mono whitespace-nowrap">
                            {log.created_at ? new Date(log.created_at).toLocaleString() : 'Just now'}
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            {log.mentor_name}
                          </td>
                          <td className="px-4 py-3 text-slate-500 text-[11px] font-mono">{log.mentor_role}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                              {log.action_type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-700 font-medium">{log.details}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 0.6: Admin User Management & Permission Control */}
        {activeTab === 'admins' && (
          <div className="space-y-8">
            {/* Create New Admin User Box */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    Create New Admin Account
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800">
                      MULTI-ADMIN MANAGEMENT
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Add new admin credentials (username & password) and assign granular module permissions.
                  </p>
                </div>
              </div>

              {userMsg && (
                <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold animate-fadeIn">
                  {userMsg}
                </div>
              )}

              <form onSubmit={handleCreateNewAdmin} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aniket Sharma"
                      value={newAdminName}
                      onChange={(e) => setNewAdminName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-cyan-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Username (For Login)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. aniket"
                      value={newAdminUsername}
                      onChange={(e) => setNewAdminUsername(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-cyan-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role / Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Lead Mentor / Sales Specialist"
                      value={newAdminRole}
                      onChange={(e) => setNewAdminRole(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-cyan-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Password / Passcode</label>
                    <input
                      type="text"
                      required
                      placeholder="Assign password (e.g. aniket123)"
                      value={newAdminPasscode}
                      onChange={(e) => setNewAdminPasscode(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-cyan-600"
                    />
                  </div>
                </div>

                {/* Permissions Checkbox Grid */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700">Granted Module Permissions</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ALL_PERMISSIONS.map((perm) => {
                      const isChecked = newAdminPermissions.includes(perm.key);
                      return (
                        <label
                          key={perm.key}
                          className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                            isChecked
                              ? 'border-cyan-600 bg-cyan-50/50 text-slate-900 font-bold'
                              : 'border-slate-200 bg-slate-50 text-slate-500'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewAdminPermissions([...newAdminPermissions, perm.key]);
                              } else {
                                setNewAdminPermissions(newAdminPermissions.filter((p) => p !== perm.key));
                              }
                            }}
                            className="mt-0.5 rounded text-cyan-600 focus:ring-cyan-500"
                          />
                          <div>
                            <div className="text-xs font-bold">{perm.label}</div>
                            <div className="text-[10px] text-slate-500 font-normal">{perm.description}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-cyan-600/20 active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create Admin User Account</span>
                </button>
              </form>
            </div>

            {/* Existing Admin Accounts Table & Permission Manager */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-600" />
                  <h4 className="text-lg font-extrabold text-slate-900">
                    Existing Registered Admins ({adminList.length})
                  </h4>
                </div>
                <button
                  onClick={loadAdminUsersList}
                  disabled={loadingAdmins}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingAdmins ? 'animate-spin' : ''}`} />
                  Refresh List
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-mono text-[11px]">
                    <tr>
                      <th className="px-4 py-3 font-bold">Admin Name & Username</th>
                      <th className="px-4 py-3 font-bold">Role</th>
                      <th className="px-4 py-3 font-bold">Password / PIN</th>
                      <th className="px-4 py-3 font-bold">Active Module Permissions</th>
                      <th className="px-4 py-3 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-medium">
                    {adminList.map((user) => (
                      <tr key={user.username} className="hover:bg-slate-50/60">
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">{user.name}</div>
                          <div className="text-[11px] font-mono text-cyan-600 font-semibold">@{user.username}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-600 font-medium">{user.role}</td>
                        <td className="px-4 py-3 font-mono text-slate-500 font-bold">
                          {user.passcode}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap gap-1">
                              {ALL_PERMISSIONS.map((p) => {
                                const isPermGranted = user.permissions?.includes(p.key);
                                return (
                                  <button
                                    key={p.key}
                                    type="button"
                                    onClick={() => handleTogglePermission(user.username, p.key)}
                                    title={`Click to ${isPermGranted ? 'revoke' : 'grant'} ${p.label} permission`}
                                    className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold border transition-all ${
                                      isPermGranted
                                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                                        : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200 opacity-60'
                                    }`}
                                  >
                                    {isPermGranted ? '✓ ' : '+ '}{p.label}
                                  </button>
                                );
                              })}
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={() => handleSaveUserPermissions(user.username, user.permissions)}
                                className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-sm active:scale-95"
                              >
                                <Save className="w-3.5 h-3.5" />
                                <span>Save Permissions for @{user.username}</span>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {user.username.toLowerCase() !== 'mandar' && user.username.toLowerCase() !== currentAdmin.username.toLowerCase() ? (
                            <button
                              onClick={() => handleDeleteAdminAccount(user.username)}
                              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Admin Account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-400">Protected</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

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

        {/* Tab 4: Webinar & Live Masterclass Popup Modal Settings */}
        {activeTab === 'popup' && (
          <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 max-w-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-600" />
              <span>Live Masterclass & Webinar Popup Modal</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#FAFAFC] rounded-2xl border border-slate-200">
                <div>
                  <div className="text-xs font-bold text-slate-900">Enable Live Event Popup Modal</div>
                  <div className="text-[11px] text-slate-500">Show floating event announcement popup to website visitors</div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.popup_active ?? false}
                  onChange={(e) => setFormData({ ...formData, popup_active: e.target.checked })}
                  className="w-5 h-5 accent-[#0067FF] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Top Eyebrow Badge Text</label>
                <input
                  type="text"
                  value={formData.popup_badge || ''}
                  onChange={(e) => setFormData({ ...formData, popup_badge: e.target.value })}
                  placeholder="SPECIAL LIVE SESSION THIS SATURDAY"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Popup Headline Title</label>
                <input
                  type="text"
                  value={formData.popup_title || ''}
                  onChange={(e) => setFormData({ ...formData, popup_title: e.target.value })}
                  placeholder="⚡ Free Live Masterclass: Build Your First LLM Application"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Popup Description Body</label>
                <textarea
                  rows={3}
                  value={formData.popup_description || ''}
                  onChange={(e) => setFormData({ ...formData, popup_description: e.target.value })}
                  placeholder="Join Sagar Parmar live to learn how to build production AI applications with Python & OpenAI..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-[#0067FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Action Button Text</label>
                  <input
                    type="text"
                    value={formData.popup_button_text || ''}
                    onChange={(e) => setFormData({ ...formData, popup_button_text: e.target.value })}
                    placeholder="Reserve My Free Seat"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-xs focus:outline-none focus:border-[#0067FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Registration Link / WhatsApp URL</label>
                  <input
                    type="text"
                    value={formData.popup_button_url || ''}
                    onChange={(e) => setFormData({ ...formData, popup_button_url: e.target.value })}
                    placeholder="https://wa.me/918591928362..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-xs focus:outline-none focus:border-[#0067FF]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-4 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#0067FF]/20 transition-all active:scale-95"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save & Publish Live Popup</span>
            </button>
          </form>
        )}

        {/* Tab 5: Hiring Partners Manager */}
        {activeTab === 'partners' && (
          <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  <span>Hiring Partners & Salary Hike Manager ({partnerList.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Manage partner companies, salary hike tags, and placement packages featured on the homepage.</p>
              </div>

              <button
                type="button"
                onClick={handleAddPartner}
                className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-100 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Partner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partnerList.map((company, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#FAFAFC] border border-slate-200 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-700">Company #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePartner(idx)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all"
                      title="Remove Company"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={company.name}
                      onChange={(e) => handleUpdatePartner(idx, 'name', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-bold text-xs text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Salary Hike Tag</label>
                      <input
                        type="text"
                        value={company.hike}
                        onChange={(e) => handleUpdatePartner(idx, 'hike', e.target.value)}
                        placeholder="+70% Hike"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-bold text-xs text-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Salary Package</label>
                      <input
                        type="text"
                        value={company.package}
                        onChange={(e) => handleUpdatePartner(idx, 'package', e.target.value)}
                        placeholder="₹7.0 - ₹9.0 LPA"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-mono text-xs text-slate-800"
                      />
                    </div>
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
              <span>Save Hiring Partners Wall</span>
            </button>
          </form>
        )}

        {/* Tab 6: FAQ Manager */}
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

        {/* Tab 7: Testimonials Manager */}
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

        {/* Tab 8: Contact & WhatsApp Settings */}
        {activeTab === 'contact' && (
          <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 max-w-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-teal-600" />
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

        {/* Tab 9: Leadership Settings */}
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

        {/* Tab 10: Custom Security Passcode Settings */}
        {activeTab === 'security' && (
          <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 max-w-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-rose-600" />
              <span>Admin Login Passcode Security</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Custom Secret Passcode / PIN</label>
                <input
                  type="text"
                  value={formData.admin_passcode || 'mandar123'}
                  onChange={(e) => setFormData({ ...formData, admin_passcode: e.target.value })}
                  placeholder="Enter new admin passcode..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
                />
                <p className="text-[11px] text-slate-500 mt-1">This secret key will be required to log into the Admin Dashboard (`/admin`).</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-4 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#0067FF]/20 transition-all active:scale-95"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Secret Admin Passcode</span>
            </button>
          </form>
        )}

        {/* Tab 11: Brochure Leads Table & 1-Click WhatsApp CRM */}
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
