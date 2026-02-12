// State Dashboard — Central Governance Layer for Telangana
import { useNavigate } from 'react-router-dom';
import { mockDistricts } from '../../mocks/admin-mock-data';
import { districtAnalyticsData, getRiskColor, getRiskLabel } from '../../data/district-geojson';

const stateMetrics = {
    totalCases: Object.values(districtAnalyticsData).reduce((s, d) => s + d.totalCases, 0),
    activeCases: Object.values(districtAnalyticsData).reduce((s, d) => s + d.activeCases, 0),
    recovered: Object.values(districtAnalyticsData).reduce((s, d) => s + d.recovered, 0),
    waterAlerts: Object.values(districtAnalyticsData).reduce((s, d) => s + d.waterContaminationAlerts, 0),
    totalDistricts: mockDistricts.length,
    totalASHA: mockDistricts.reduce((s, d) => s + d.ashaCount, 0),
    healthCamps: 247,
    stateRiskScore: Math.round(Object.values(districtAnalyticsData).reduce((s, d) => s + d.riskScore, 0) / Object.values(districtAnalyticsData).length),
};

const topRiskDistricts = Object.entries(districtAnalyticsData)
    .sort(([, a], [, b]) => b.riskScore - a.riskScore)
    .slice(0, 5);

const aiAlerts = [
    { id: 1, text: 'Cholera outbreak probability rising in Warangal — 78% confidence', severity: 'critical', icon: 'ri-alarm-warning-fill' },
    { id: 2, text: 'Dengue cases expected to spike in Hyderabad (monsoon correlation)', severity: 'high', icon: 'ri-bug-fill' },
    { id: 3, text: 'Fluoride contamination trend detected in Nalgonda', severity: 'high', icon: 'ri-drop-fill' },
    { id: 4, text: 'ASHA deployment coverage below threshold in Adilabad', severity: 'medium', icon: 'ri-user-heart-fill' },
];

const severityColors: Record<string, string> = { critical: 'bg-red-50 border-red-200 text-red-800', high: 'bg-orange-50 border-orange-200 text-orange-800', medium: 'bg-amber-50 border-amber-200 text-amber-800' };

export default function StateDashboard() {
    const navigate = useNavigate();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Telangana State Health Overview</h1>
                    <p className="text-sm text-slate-500 mt-1">Central Governance Dashboard — Real-time analytics across all districts</p>
                </div>
                <button onClick={() => navigate('/state/reports')}
                    className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <i className="ri-file-chart-fill"></i> Generate State Report
                </button>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                    { label: 'Total Cases', value: stateMetrics.totalCases.toLocaleString(), color: 'bg-blue-50 text-blue-700' },
                    { label: 'Active Cases', value: stateMetrics.activeCases.toLocaleString(), color: 'bg-red-50 text-red-700' },
                    { label: 'Recovered', value: stateMetrics.recovered.toLocaleString(), color: 'bg-emerald-50 text-emerald-700' },
                    { label: 'Water Alerts', value: stateMetrics.waterAlerts, color: 'bg-orange-50 text-orange-700' },
                    { label: 'Districts', value: stateMetrics.totalDistricts, color: 'bg-indigo-50 text-indigo-700' },
                    { label: 'ASHA Workers', value: stateMetrics.totalASHA.toLocaleString(), color: 'bg-purple-50 text-purple-700' },
                    { label: 'State Risk', value: stateMetrics.stateRiskScore, color: 'bg-slate-900 text-white' },
                ].map((m, i) => (
                    <div key={i} className={`${m.color} p-4 rounded-2xl text-center shadow-sm`}>
                        <p className="text-2xl font-black">{m.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider mt-1">{m.label}</p>
                    </div>
                ))}
            </div>

            {/* AI Outbreak Alerts */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <i className="ri-robot-2-fill text-indigo-600 text-xl"></i>
                    <h3 className="text-lg font-bold text-slate-900">AI Early Warning System</h3>
                </div>
                <div className="space-y-3">
                    {aiAlerts.map(a => (
                        <div key={a.id} className={`${severityColors[a.severity]} border p-4 rounded-xl flex items-center gap-3`}>
                            <i className={`${a.icon} text-xl`}></i>
                            <p className="font-medium text-sm flex-1">{a.text}</p>
                            <span className="px-2 py-0.5 bg-white/60 rounded text-[10px] font-bold uppercase">{a.severity}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top 5 Risk Districts */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900">Top 5 High-Risk Districts</h3>
                        <button onClick={() => navigate('/state/district-performance')} className="text-sm text-indigo-600 font-bold hover:underline">View All →</button>
                    </div>
                    <div className="space-y-3">
                        {topRiskDistricts.map(([name, data], i) => (
                            <div key={name} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                                <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-black text-sm text-slate-600">{i + 1}</span>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900">{name}</p>
                                    <p className="text-xs text-slate-400">{data.activeCases} active cases • {data.totalCases} total</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black" style={{ color: getRiskColor(data.riskScore) }}>{data.riskScore}</p>
                                    <p className="text-[10px] font-bold uppercase" style={{ color: getRiskColor(data.riskScore) }}>{getRiskLabel(data.riskScore)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Governance Flow Tracker */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Governance Flow Tracker</h3>
                    <div className="space-y-4">
                        {[
                            { step: 'State identifies risk zones', icon: 'ri-search-eye-fill', color: 'bg-indigo-100 text-indigo-700', status: 'active' },
                            { step: 'Advisory generated & sent', icon: 'ri-mail-send-fill', color: 'bg-purple-100 text-purple-700', status: 'active' },
                            { step: 'District receives & acknowledges', icon: 'ri-building-4-fill', color: 'bg-blue-100 text-blue-700', status: 'active' },
                            { step: 'ASHA workers execute field actions', icon: 'ri-user-heart-fill', color: 'bg-teal-100 text-teal-700', status: 'active' },
                            { step: 'Community feedback collected', icon: 'ri-team-fill', color: 'bg-emerald-100 text-emerald-700', status: 'pending' },
                            { step: 'Compliance metrics reported', icon: 'ri-checkbox-circle-fill', color: 'bg-amber-100 text-amber-700', status: 'pending' },
                        ].map((flow, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl ${flow.color} flex items-center justify-center`}>
                                    <i className={`${flow.icon} text-lg`}></i>
                                </div>
                                <div className="flex-1 flex items-center gap-3">
                                    <p className="font-medium text-slate-900 text-sm">{flow.step}</p>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${flow.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {flow.status === 'active' ? '✓ Active' : 'Pending'}
                                    </span>
                                </div>
                                {i < 5 && <div className="text-slate-300"><i className="ri-arrow-down-s-line text-xl"></i></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">State Modules</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: 'District Performance', icon: 'ri-building-4-fill', path: '/state/district-performance', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
                        { label: 'Risk Intelligence', icon: 'ri-shield-flash-fill', path: '/state/risk-intelligence', color: 'bg-red-50 hover:bg-red-100 text-red-700' },
                        { label: 'State Map', icon: 'ri-map-2-fill', path: '/state/map', color: 'bg-teal-50 hover:bg-teal-100 text-teal-700' },
                        { label: 'Send Advisory', icon: 'ri-mail-send-fill', path: '/state/advisory-generator', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
                        { label: 'Compliance Tracker', icon: 'ri-checkbox-circle-fill', path: '/state/compliance', color: 'bg-amber-50 hover:bg-amber-100 text-amber-700' },
                        { label: 'Health Camps', icon: 'ri-heart-pulse-fill', path: '/state/health-camps', color: 'bg-pink-50 hover:bg-pink-100 text-pink-700' },
                        { label: 'State Reports', icon: 'ri-file-chart-fill', path: '/state/reports', color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700' },
                        { label: 'Budget Overview', icon: 'ri-money-rupee-circle-fill', path: '/state/district-performance', color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' },
                    ].map((mod, i) => (
                        <button key={i} onClick={() => navigate(mod.path)}
                            className={`${mod.color} p-4 rounded-xl transition-all text-left flex items-center gap-3 group`}>
                            <i className={`${mod.icon} text-xl`}></i>
                            <span className="font-bold text-sm">{mod.label}</span>
                            <i className="ri-arrow-right-s-line ml-auto opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
