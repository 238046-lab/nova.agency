import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';

const API = process.env.REACT_APP_BACKEND_URL;

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        setLoading(false);
        return;
      }
      const data = await res.json();
      localStorage.setItem('nova_token', data.token);
      navigate('/admin/dashboard');
    } catch {
      setError('حدث خطأ في الاتصال');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C2B48] via-[#0f172a] to-[#1C2B48] flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Nova</h1>
          <p className="text-[#8EB1D1]">لوحة التحكم</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6" data-testid="admin-login-form">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm text-center" data-testid="login-error">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[#A7C7E7] text-sm">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8EB1D1]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-11 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#8EB1D1] transition-colors"
                placeholder="admin@novaway.agency"
                required
                data-testid="login-email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[#A7C7E7] text-sm">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8EB1D1]" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-11 pl-11 text-white placeholder:text-white/30 focus:outline-none focus:border-[#8EB1D1] transition-colors"
                placeholder="••••••••"
                required
                data-testid="login-password"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8EB1D1]">
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8EB1D1] hover:bg-[#A7C7E7] text-[#1C2B48] font-bold py-3 rounded-xl transition-colors"
            data-testid="login-submit"
          >
            {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
          </Button>

          <div className="text-center">
            <a href="/" className="text-[#8EB1D1] text-sm hover:underline">العودة للموقع</a>
          </div>
        </form>
      </div>
    </div>
  );
}
