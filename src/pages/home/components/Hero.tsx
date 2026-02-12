import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-cream via-white to-mint">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-100 via-white to-green-100 border-2 border-primary/20 rounded-full">
              <span className="text-orange-600 font-semibold">🇮🇳</span>
              <span className="text-sm font-medium text-gray-700">
                Government of India Initiative | भारत सरकार की पहल
              </span>
            </div>

            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-navy leading-tight">
              Smart Community Health Surveillance & Early Warning System
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl font-medium">
              Predictive and preventive health surveillance for rural, tribal, and remote communities across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/report-symptoms')}
                className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold text-lg hover:shadow-2xl transition-all flex items-center justify-center space-x-3 whitespace-nowrap cursor-pointer"
              >
                <span>Report Health Symptoms</span>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <i className="ri-arrow-right-line"></i>
                </div>
              </button>
              <button
                onClick={() => {
                  const alertSection = document.getElementById('early-alerts');
                  if (alertSection) {
                    alertSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-notification-line"></i>
                <span>How Early Alerts Work</span>
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 border-2 border-navy text-navy rounded-full font-semibold text-lg hover:bg-navy hover:text-white transition-all flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-login-box-line"></i>
                <span>Login / Access Dashboard</span>
              </button>
            </div>

          </div>

          <div className="lg:col-span-2 relative">
            <div className="relative aspect-[4/5] bg-gradient-to-br from-teal-500/10 to-blue-600/10 rounded-3xl border-2 border-primary/20 flex items-center justify-center p-12 overflow-hidden">
              {/* Vector-style Illustration Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Background Shapes */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>

                {/* Icons Grid / Composition */}
                <div className="grid grid-cols-2 gap-8 relative z-10 p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-xl">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center">
                      <i className="ri-heart-pulse-line text-5xl text-primary"></i>
                    </div>
                    <span className="text-xs font-bold text-navy/60 uppercase tracking-wider">Health</span>
                  </div>
                  <div className="flex flex-col items-center space-y-3 pt-8">
                    <div className="w-20 h-20 bg-secondary/20 rounded-2xl flex items-center justify-center">
                      <i className="ri-drop-line text-5xl text-secondary"></i>
                    </div>
                    <span className="text-xs font-bold text-navy/60 uppercase tracking-wider">Water</span>
                  </div>
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                      <i className="ri-alarm-warning-line text-5xl text-orange-600"></i>
                    </div>
                    <span className="text-xs font-bold text-navy/60 uppercase tracking-wider">Alert</span>
                  </div>
                  <div className="flex flex-col items-center space-y-3 pt-8">
                    <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                      <i className="ri-shield-check-line text-5xl text-blue-600"></i>
                    </div>
                    <span className="text-xs font-bold text-navy/60 uppercase tracking-wider">Protect</span>
                  </div>
                </div>

                {/* Floating Elements */}
                {/* <div className="absolute -top-4 -left-4 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-bounce duration-[3000ms]">
                  <i className="ri-microscope-line text-2xl text-primary"></i>
                </div>
                <div className="absolute bottom-12 -right-4 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center animate-pulse">
                  <i className="ri-community-line text-xl text-secondary"></i>
                </div> */}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
        <a href="#problem" className="flex flex-col items-center space-y-2 text-gray-400 hover:text-primary transition-colors">
          <span className="text-xs font-medium">Scroll to explore</span>
          <i className="ri-arrow-down-line text-2xl"></i>
        </a>
      </div>
    </section>
  );
}
