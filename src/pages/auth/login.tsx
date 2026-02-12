import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [identifier, setIdentifier] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'ID' | 'OTP'>('ID');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: any;
    if (step === 'OTP' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  useEffect(() => {
    if (user) {
      if (user.role === 'SUPER_ADMIN') {
        navigate('/admin/dashboard');
      } else if (user.role === 'CLINIC') {
        navigate('/clinic/dashboard');
      } else if (user.role === 'STATE_AUTHORITY') {
        navigate('/state/dashboard');
      } else if (user.role === 'DHO' || user.role === 'DISTRICT_ADMIN') {
        navigate('/district/dashboard');
      } else if (user.role === 'COMMUNITY_MEMBER') {
        if (!user.profile?.isProfileComplete) {
          navigate('/community/setup');
        } else {
          navigate('/community/dashboard');
        }
      } else if (user.role === 'ASHA_WORKER') {
        if (!user.profile?.isProfileComplete) {
          navigate('/asha/verify');
        } else {
          navigate('/asha/dashboard');
        }
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'mobile') {
      if (!/^\d{10}$/.test(identifier)) {
        setError('Please enter a valid 10-digit mobile number');
        return;
      }
      setStep('OTP');
      setTimer(60);
      setError('');
    } else {
      // Email login goes straight to dashboard via password
      handleLogin();
    }
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(
        loginMethod === 'mobile' ? 'OTP' : 'PASSWORD',
        identifier,
        secret
      );
      // AuthContext will trigger the useEffect for navigation
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Use 9876543210 / 123456 for demo.');
      setLoading(false);
    }
  };

  const resetOTP = () => {
    setTimer(60);
    // Simulate resending OTP
  };

  const demoCredentials = [
    { role: 'State Authority', method: 'email', id: 'state.demo@dharma.gov', secret: 'State@123', type: 'PASS', icon: 'ri-building-4-line', color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100' },
    { role: 'District Admin', method: 'email', id: 'collector.demo@dharma.gov', secret: 'Collector@123', type: 'PASS', icon: 'ri-government-line', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' },
    { role: 'Doctor', method: 'email', id: 'doctor.demo@dharma.gov', secret: 'Doctor@123', type: 'PASS', icon: 'ri-stethoscope-line', color: 'bg-teal-50 border-teal-200 hover:bg-teal-100' },
    { role: 'ASHA Worker', method: 'mobile', id: '9000000001', secret: '123456', type: 'OTP', icon: 'ri-nurse-line', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
    { role: 'Super Admin', method: 'email', id: 'admin', secret: 'admin123', type: 'PASS', icon: 'ri-shield-star-line', color: 'bg-red-50 border-red-200 hover:bg-red-100' },
    { role: 'Community', method: 'mobile', id: '9876543210', secret: '123456', type: 'OTP', icon: 'ri-user-line', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
  ];

  const [autoLoggingIn, setAutoLoggingIn] = useState<string | null>(null);

  const handleSelectCredential = async (cred: typeof demoCredentials[0]) => {
    setAutoLoggingIn(cred.role);
    setLoginMethod(cred.method as 'mobile' | 'email');
    setIdentifier(cred.id);
    setSecret(cred.secret);
    setError('');
    setStep(cred.type === 'OTP' ? 'OTP' : 'ID');

    // Auto-submit after a brief visual delay
    setTimeout(async () => {
      try {
        await login(
          cred.type === 'OTP' ? 'OTP' : 'PASSWORD',
          cred.id,
          cred.secret
        );
      } catch (err: any) {
        setError(err.message || 'Demo login failed');
        setAutoLoggingIn(null);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans text-navy">
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-navy p-8 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-2xl font-bold font-heading">Smart Health Surveillance</h1>
            <p className="text-white/60 text-sm mt-1">Government of India Initiative</p>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-navy">
              {step === 'ID' ? 'Sign In' : 'Verify OTP'}
            </h2>
            <p className="text-gray-500 text-sm">
              {step === 'ID'
                ? 'Access your community health dashboard'
                : `Enter the 6-digit code sent to +91 ${identifier}`}
            </p>
          </div>

          <form onSubmit={step === 'ID' ? handleInitialSubmit : handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start space-x-2 animate-shake">
                <i className="ri-error-warning-line text-red-500 mt-0.5"></i>
                <p className="text-xs text-red-700 leading-tight">{error}</p>
              </div>
            )}

            {step === 'ID' ? (
              <>
                <div className="flex bg-gray-50 p-1 rounded-xl mb-6">
                  <button
                    type="button"
                    onClick={() => { setLoginMethod('mobile'); setIdentifier(''); setSecret(''); setError(''); }}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${loginMethod === 'mobile' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Mobile Number
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLoginMethod('email'); setIdentifier(''); setSecret(''); setError(''); }}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${loginMethod === 'email' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    ASHA ID / Email
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    {loginMethod === 'mobile' ? 'Phone Number' : 'ID / Email'}
                  </label>
                  <div className="relative">
                    <i className={`${loginMethod === 'mobile' ? 'ri-phone-line' : 'ri-user-star-line'} absolute left-4 top-1/2 -translate-y-1/2 text-gray-400`}></i>
                    <input
                      type={loginMethod === 'mobile' ? 'tel' : 'text'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={loginMethod === 'mobile' ? '9876543210' : 'ASHA ID, Email, or "admin"'}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                {loginMethod === 'email' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
                    <div className="relative">
                      <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="password"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">6-Digit OTP</label>
                <div className="relative">
                  <i className="ri-key-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    maxLength={6}
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    placeholder="123456"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-2xl tracking-[0.5em] font-mono shadow-inner"
                    required
                  />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-400">
                    {timer > 0 ? `Resend in ${timer}s` : 'Didn’t receive?'}
                  </span>
                  <button
                    type="button"
                    onClick={resetOTP}
                    disabled={timer > 0}
                    className="text-xs font-bold text-primary disabled:opacity-30"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy-dark shadow-lg shadow-navy/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Verifying...
                </span>
              ) : (
                step === 'ID' && loginMethod === 'mobile' ? 'Send OTP' : 'Sign In'
              )}
            </button>

            {step === 'OTP' && (
              <button
                type="button"
                onClick={() => setStep('ID')}
                className="w-full text-center text-sm font-semibold text-gray-400 hover:text-navy transition-colors"
              >
                Change {loginMethod === 'mobile' ? 'Number' : 'Email'}
              </button>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">
              <i className="ri-flashlight-line mr-1"></i> One-Click Demo Login
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => handleSelectCredential(cred)}
                  disabled={autoLoggingIn !== null}
                  className={`flex items-center gap-2.5 p-3 border rounded-xl transition-all text-left ${cred.color} ${autoLoggingIn === cred.role ? 'animate-pulse ring-2 ring-primary' : ''} disabled:opacity-50`}
                >
                  <i className={`${cred.icon} text-lg`}></i>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-navy block">{cred.role}</span>
                    <span className="text-[9px] text-gray-400 truncate block">
                      {autoLoggingIn === cred.role ? 'Logging in...' : cred.id}
                    </span>
                  </div>
                  {autoLoggingIn === cred.role && (
                    <i className="ri-loader-4-line animate-spin text-primary"></i>
                  )}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-4 text-center italic">
              ⚡ Click any card — credentials auto-fill and login happens automatically
            </p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 text-center">
          <p className="text-[10px] text-gray-400">
            By signing in, you agree to our <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Service</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
