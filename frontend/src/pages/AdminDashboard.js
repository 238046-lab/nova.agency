import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FolderOpen, MessageSquare, LogOut, Eye, Monitor, Smartphone, Tablet, Globe, RefreshCw, Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { Button } from '../components/ui/button';

const API = process.env.REACT_APP_BACKEND_URL;

function getToken() {
  return localStorage.getItem('nova_token');
}

function authHeaders() {
  return { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' };
}

// ============ Visitors Tab ============
function VisitorsTab() {
  const [visitors, setVisitors] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [vRes, sRes] = await Promise.all([
        fetch(`${API}/api/admin/visitors`, { headers: authHeaders() }),
        fetch(`${API}/api/admin/visitors/stats`, { headers: authHeaders() })
      ]);
      if (vRes.ok) setVisitors(await vRes.json());
      if (sRes.ok) setStats(await sRes.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const deviceIcon = (d) => {
    if (d === 'Mobile') return <Smartphone className="w-4 h-4" />;
    if (d === 'Tablet') return <Tablet className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4" data-testid="stat-total">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="w-5 h-5 text-[#8EB1D1]" />
              <span className="text-white/60 text-sm">إجمالي الزيارات</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4" data-testid="stat-today">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-[#A7C7E7]" />
              <span className="text-white/60 text-sm">زيارات اليوم</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.today}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Smartphone className="w-5 h-5 text-[#8EB1D1]" />
              <span className="text-white/60 text-sm">موبايل</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.devices?.Mobile || 0}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-[#A7C7E7]" />
              <span className="text-white/60 text-sm">أكثر دولة</span>
            </div>
            <p className="text-lg font-bold text-white truncate">
              {stats.countries ? Object.entries(stats.countries).sort((a,b) => b[1]-a[1])[0]?.[0] || '-' : '-'}
            </p>
          </div>
        </div>
      )}

      {/* Refresh */}
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold">سجل الزوار</h3>
        <Button onClick={fetchData} variant="outline" size="sm" className="border-white/10 text-white/70 hover:bg-white/5" data-testid="refresh-visitors">
          <RefreshCw className={`w-4 h-4 me-1 ${loading ? 'animate-spin' : ''}`} /> تحديث
        </Button>
      </div>

      {/* Visitors Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" data-testid="visitors-table">
            <thead>
              <tr className="border-b border-white/10 text-white/60 text-sm">
                <th className="py-3 px-4 text-right">IP</th>
                <th className="py-3 px-4 text-right">الدولة</th>
                <th className="py-3 px-4 text-right">الجهاز</th>
                <th className="py-3 px-4 text-right">المتصفح</th>
                <th className="py-3 px-4 text-right">النظام</th>
                <th className="py-3 px-4 text-right">المصدر</th>
                <th className="py-3 px-4 text-right">الوقت</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v) => (
                <tr key={v.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white/80 text-sm font-mono">{v.ip}</td>
                  <td className="py-3 px-4 text-white/80 text-sm">{v.country || '-'}{v.city ? `, ${v.city}` : ''}</td>
                  <td className="py-3 px-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">{deviceIcon(v.device)} {v.device}</span>
                  </td>
                  <td className="py-3 px-4 text-white/80 text-sm">{v.browser}</td>
                  <td className="py-3 px-4 text-white/80 text-sm">{v.os}</td>
                  <td className="py-3 px-4 text-white/80 text-sm truncate max-w-[150px]">{v.referrer || 'مباشر'}</td>
                  <td className="py-3 px-4 text-white/60 text-xs whitespace-nowrap">{formatDate(v.visited_at)}</td>
                </tr>
              ))}
              {visitors.length === 0 && !loading && (
                <tr><td colSpan="7" className="py-8 text-center text-white/40">لا يوجد زوار بعد</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ Portfolio Tab ============
function PortfolioTab() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title_ar: '', title_en: '', description_ar: '', description_en: '', image: '', category_ar: '', category_en: '', link: '' });

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/portfolio`);
      if (res.ok) setProjects(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const resetForm = () => {
    setForm({ title_ar: '', title_en: '', description_ar: '', description_en: '', image: '', category_ar: '', category_en: '', link: '' });
    setEditing(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    const url = editing ? `${API}/api/admin/portfolio/${editing}` : `${API}/api/admin/portfolio`;
    const method = editing ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(form) });
      if (res.ok) {
        resetForm();
        fetchProjects();
      }
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;
    try {
      await fetch(`${API}/api/admin/portfolio/${id}`, { method: 'DELETE', headers: authHeaders() });
      fetchProjects();
    } catch (e) { console.error(e); }
  };

  const startEdit = (p) => {
    setForm({
      title_ar: p.title_ar, title_en: p.title_en,
      description_ar: p.description_ar, description_en: p.description_en,
      image: p.image, category_ar: p.category_ar || '', category_en: p.category_en || '', link: p.link || ''
    });
    setEditing(p.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold">إدارة الأعمال</h3>
        <Button onClick={() => { resetForm(); setShowForm(true); }} className="bg-[#8EB1D1] hover:bg-[#A7C7E7] text-[#1C2B48]" data-testid="add-project-btn">
          <Plus className="w-4 h-4 me-1" /> إضافة مشروع
        </Button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4" data-testid="portfolio-form">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-white font-medium">{editing ? 'تعديل مشروع' : 'إضافة مشروع جديد'}</h4>
            <button onClick={resetForm} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="اسم المشروع (عربي)" value={form.title_ar} onChange={v => setForm({...form, title_ar: v})} testId="form-title-ar" />
            <InputField label="Project Name (EN)" value={form.title_en} onChange={v => setForm({...form, title_en: v})} testId="form-title-en" />
            <InputField label="الوصف (عربي)" value={form.description_ar} onChange={v => setForm({...form, description_ar: v})} testId="form-desc-ar" />
            <InputField label="Description (EN)" value={form.description_en} onChange={v => setForm({...form, description_en: v})} testId="form-desc-en" />
            <InputField label="رابط الصورة" value={form.image} onChange={v => setForm({...form, image: v})} testId="form-image" />
            <InputField label="رابط المشروع" value={form.link} onChange={v => setForm({...form, link: v})} testId="form-link" />
            <InputField label="التصنيف (عربي)" value={form.category_ar} onChange={v => setForm({...form, category_ar: v})} testId="form-cat-ar" />
            <InputField label="Category (EN)" value={form.category_en} onChange={v => setForm({...form, category_en: v})} testId="form-cat-en" />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button onClick={resetForm} variant="outline" className="border-white/10 text-white/70">إلغاء</Button>
            <Button onClick={handleSave} className="bg-[#8EB1D1] hover:bg-[#A7C7E7] text-[#1C2B48]" data-testid="save-project-btn">
              <Save className="w-4 h-4 me-1" /> {editing ? 'تحديث' : 'حفظ'}
            </Button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group" data-testid={`project-card-${p.id}`}>
            <div className="relative h-40 overflow-hidden">
              <img src={p.image} alt={p.title_ar} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              {!p.id.startsWith('default') && (
                <div className="absolute top-2 left-2 flex gap-1">
                  <button onClick={() => startEdit(p)} className="p-1.5 bg-white/90 rounded-lg hover:bg-white transition-colors" data-testid={`edit-${p.id}`}>
                    <Pencil className="w-3.5 h-3.5 text-[#1C2B48]" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 bg-red-500/90 rounded-lg hover:bg-red-500 transition-colors" data-testid={`delete-${p.id}`}>
                    <Trash2 className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="text-white font-medium mb-1">{p.title_ar}</h4>
              <p className="text-white/50 text-sm">{p.description_ar}</p>
            </div>
          </div>
        ))}
        {projects.length === 0 && !loading && (
          <div className="col-span-full text-center py-12 text-white/40">لا يوجد مشاريع بعد</div>
        )}
      </div>
    </div>
  );
}

// ============ Contacts Tab ============
function ContactsTab() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/admin/contacts`, { headers: authHeaders() });
        if (res.ok) setContacts(await res.json());
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold">رسائل التواصل</h3>
      <div className="space-y-3">
        {contacts.map((c) => (
          <div key={c.id} className="bg-white/5 border border-white/10 rounded-xl p-4" data-testid={`contact-${c.id}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-white font-medium">{c.name}</span>
                <span className="text-white/40 text-sm mx-2">•</span>
                <span className="text-[#8EB1D1] text-sm">{c.email}</span>
              </div>
              <span className="text-white/40 text-xs">{formatDate(c.created_at)}</span>
            </div>
            {c.phone && <p className="text-white/50 text-sm mb-1">الهاتف: {c.phone}</p>}
            {c.service && <p className="text-white/50 text-sm mb-2">الخدمة: {c.service}</p>}
            <p className="text-white/80 text-sm bg-white/5 rounded-lg p-3">{c.message}</p>
          </div>
        ))}
        {contacts.length === 0 && !loading && (
          <div className="text-center py-12 text-white/40">لا يوجد رسائل بعد</div>
        )}
      </div>
    </div>
  );
}

// ============ Input Field Component ============
function InputField({ label, value, onChange, testId }) {
  return (
    <div>
      <label className="text-white/60 text-sm mb-1 block">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-[#8EB1D1]"
        data-testid={testId}
      />
    </div>
  );
}

// ============ Main Dashboard ============
export default function AdminDashboard() {
  const [tab, setTab] = useState('visitors');
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) navigate('/admin');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('nova_token');
    navigate('/admin');
  };

  const tabs = [
    { id: 'visitors', label: 'الزوار', icon: Users },
    { id: 'portfolio', label: 'الأعمال', icon: FolderOpen },
    { id: 'contacts', label: 'الرسائل', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C2B48] via-[#0f172a] to-[#1C2B48]" dir="rtl" data-testid="admin-dashboard">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Nova</h1>
            <span className="text-[#8EB1D1] text-sm">لوحة التحكم</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-white/50 text-sm hover:text-white transition-colors">الموقع</a>
            <Button onClick={handleLogout} variant="outline" size="sm" className="border-white/10 text-white/70 hover:bg-white/5" data-testid="logout-btn">
              <LogOut className="w-4 h-4 me-1" /> خروج
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-[#8EB1D1] text-[#8EB1D1]'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
              data-testid={`tab-${t.id}`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {tab === 'visitors' && <VisitorsTab />}
        {tab === 'portfolio' && <PortfolioTab />}
        {tab === 'contacts' && <ContactsTab />}
      </main>
    </div>
  );
}
