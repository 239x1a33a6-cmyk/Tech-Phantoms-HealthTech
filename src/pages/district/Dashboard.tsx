// District Admin Dashboard - Dedicated for District Health Officers
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDistricts, mockPHCs, mockAuditLogs } from '../../mocks/admin-mock-data';
import DistrictRiskMap from '../../components/maps/DistrictRiskMap';
import { districtAnalyticsData, getRiskColor, getRiskLabel } from '../../data/district-geojson';

export default function DistrictDashboard() {
    const navigate = useNavigate();

    // Simulate logged-in district admin's assigned district
    const myDistrict = mockDistricts[0]; // Hyderabad
    const loggedInDistrict = myDistrict.name;
    const myPHCs = mockPHCs.filter(phc => phc.districtId === myDistrict.id);
    const recentActivity = mockAuditLogs.slice(0, 5);
    const analytics = districtAnalyticsData[loggedInDistrict];

    const districtMetrics = [
        { label: 'Total PHCs', value: myDistrict.phcCount.toString(), icon: 'ri-hospital-line', color: 'bg-teal-500', path: '/district/phcs' },
        { label: 'ASHA Workers', value: myDistrict.ashaCount.toString(), icon: 'ri-user-heart-line', color: 'bg-purple-500' },
        { label: 'Population', value: (myDistrict.population / 1000).toFixed(1) + 'K', icon: 'ri-team-line', color: 'bg-blue-500' },
        { label: 'Compliance Score', value: myDistrict.complianceScore + '%', icon: 'ri-medal-line', color: 'bg-emerald-500' },
        { label: 'Risk Index', value: myDistrict.riskIndex.toString(), icon: 'ri-alert-line', color: 'bg-orange-500', path: '/district/risk-map' },
        { label: 'Active Alerts', value: myDistrict.alertFrequency.toString(), icon: 'ri-notification-3-line', color: 'bg-red-500', path: '/district/alerts' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* District Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{myDistrict.name} District</h2>
                        <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-bold uppercase">
                            District Admin
                        </span>
                    </div>
                    <p className="text-slate-500 font-medium">
                        {myDistrict.state} • District Command Center
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => navigate('/district/reports')}
                        className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-slate-200 transition-all flex items-center space-x-2"
                    >
                        <i className="ri-file-text-line"></i>
                        <span>District Report</span>
                    </button>
                </div>
            </div>

            {/* District Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {districtMetrics.map((metric, i) => (
                    <div
                        key={i}
                        onClick={() => metric.path && navigate(metric.path)}
                        className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all ${metric.path ? 'cursor-pointer' : ''}`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${metric.color} p-3 rounded-xl text-white shadow-lg`}>
                                <i className={`${metric.icon} text-2xl`}></i>
                            </div>
                        </div>
                        <h4 className="text-3xl font-black text-slate-900">{metric.value}</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {metric.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* District Risk Map — Auto-loaded on login */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <DistrictRiskMap
                    loggedInDistrict={loggedInDistrict}
                    userRole="district_collector"
                    onDistrictClick={(d) => navigate(`/district/risk-map?district=${d}`)}
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* District Overview Panel */}
                <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">District Overview</h3>
                            <p className="text-sm text-slate-500 mt-1">Key information about {myDistrict.name}</p>
                        </div>
                        <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-lg transition-colors">
                            View Full Details
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="bg-slate-50 p-4 rounded-xl">
                            <p className="text-xs text-slate-400 uppercase font-bold mb-2">District Code</p>
                            <p className="font-mono font-bold text-slate-900 text-lg">{myDistrict.code}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl">
                            <p className="text-xs text-slate-400 uppercase font-bold mb-2">Area</p>
                            <p className="font-bold text-slate-900 text-lg">{myDistrict.area} km²</p>
                        </div>
                        {myDistrict.districtCollector && (
                            <div className="bg-slate-50 p-4 rounded-xl col-span-2">
                                <p className="text-xs text-slate-400 uppercase font-bold mb-2">District Collector</p>
                                <p className="font-bold text-slate-900">{myDistrict.districtCollector}</p>
                            </div>
                        )}
                    </div>

                    {/* Risk Health Summary */}
                    {analytics && (
                        <div className="border-t border-slate-100 pt-6">
                            <h4 className="font-bold text-slate-900 mb-4">Health Risk Summary</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-red-50 p-4 rounded-xl text-center">
                                    <p className="text-2xl font-black text-red-700">{analytics.activeCases}</p>
                                    <p className="text-[10px] text-red-600 font-bold uppercase">Active Cases</p>
                                </div>
                                <div className="bg-emerald-50 p-4 rounded-xl text-center">
                                    <p className="text-2xl font-black text-emerald-700">{analytics.recovered}</p>
                                    <p className="text-[10px] text-emerald-600 font-bold uppercase">Recovered</p>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-xl text-center">
                                    <p className="text-2xl font-black text-orange-700">{analytics.waterContaminationAlerts}</p>
                                    <p className="text-[10px] text-orange-600 font-bold uppercase">Water Alerts</p>
                                </div>
                                <div className="p-4 rounded-xl text-center" style={{ backgroundColor: getRiskColor(analytics.riskScore) + '20' }}>
                                    <p className="text-2xl font-black" style={{ color: getRiskColor(analytics.riskScore) }}>{analytics.riskScore}</p>
                                    <p className="text-[10px] font-bold uppercase" style={{ color: getRiskColor(analytics.riskScore) }}>{getRiskLabel(analytics.riskScore)}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PHC Summary */}
                    <div className="border-t border-slate-100 pt-6 mt-6">
                        <h4 className="font-bold text-slate-900 mb-4">PHC Status Distribution</h4>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-emerald-50 rounded-xl">
                                <p className="text-2xl font-black text-emerald-700">
                                    {myPHCs.filter(p => p.status === 'active').length}
                                </p>
                                <p className="text-xs text-emerald-600 font-bold uppercase mt-1">Active</p>
                            </div>
                            <div className="text-center p-4 bg-orange-50 rounded-xl">
                                <p className="text-2xl font-black text-orange-700">
                                    {myPHCs.filter(p => p.status === 'maintenance').length}
                                </p>
                                <p className="text-xs text-orange-600 font-bold uppercase mt-1">Maintenance</p>
                            </div>
                            <div className="text-center p-4 bg-slate-50 rounded-xl">
                                <p className="text-2xl font-black text-slate-700">
                                    {myPHCs.filter(p => p.status === 'inactive').length}
                                </p>
                                <p className="text-xs text-slate-600 font-bold uppercase mt-1">Inactive</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Module Navigation */}
                <div className="space-y-6">
                    {/* Module Navigation Grid */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">District Modules</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'ASHA Reports', desc: 'Field reports', icon: 'ri-user-heart-fill', path: '/district/asha-reports', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
                                { label: 'Clinical Reports', desc: 'Doctor diagnoses', icon: 'ri-stethoscope-fill', path: '/district/clinical-reports', color: 'bg-teal-50 hover:bg-teal-100 text-teal-700' },
                                { label: 'Risk Analytics', desc: 'Score breakdown', icon: 'ri-bar-chart-box-fill', path: '/district/risk-analytics', color: 'bg-red-50 hover:bg-red-100 text-red-700' },
                                { label: 'Manage Alerts', desc: 'Send alerts', icon: 'ri-alarm-warning-fill', path: '/district/alerts', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700' },
                                { label: 'Alert History', desc: 'Sent alerts log', icon: 'ri-history-line', path: '/district/alert-history', color: 'bg-amber-50 hover:bg-amber-100 text-amber-700' },
                                { label: 'Risk Clusters', desc: 'Cluster monitor', icon: 'ri-bubble-chart-fill', path: '/district/clusters', color: 'bg-rose-50 hover:bg-rose-100 text-rose-700' },
                                { label: 'Interventions', desc: 'Plan actions', icon: 'ri-first-aid-kit-fill', path: '/district/interventions', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
                                { label: 'PHC Monitor', desc: 'PHC status', icon: 'ri-hospital-fill', path: '/district/phcs', color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700' },
                                { label: 'Budget', desc: 'Resource tracking', icon: 'ri-money-rupee-circle-fill', path: '/district/budget', color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' },
                                { label: 'State Advisories', desc: 'Inbox', icon: 'ri-mail-star-fill', path: '/district/advisories', color: 'bg-sky-50 hover:bg-sky-100 text-sky-700' },
                            ].map((mod, i) => (
                                <button key={i} onClick={() => navigate(mod.path)}
                                    className={`${mod.color} p-3 rounded-xl transition-all text-left flex items-center gap-3 group`}>
                                    <i className={`${mod.icon} text-xl`}></i>
                                    <div className="min-w-0">
                                        <p className="font-bold text-sm truncate">{mod.label}</p>
                                        <p className="text-[10px] opacity-70">{mod.desc}</p>
                                    </div>
                                    <i className="ri-arrow-right-s-line ml-auto opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {recentActivity.slice(0, 4).map((activity) => (
                                <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-slate-50 last:border-0">
                                    <div className={`p-2 rounded-lg ${activity.riskLevel === 'high' ? 'bg-red-50' :
                                        activity.riskLevel === 'medium' ? 'bg-orange-50' : 'bg-emerald-50'
                                        }`}>
                                        <i className={`ri-${activity.riskLevel === 'high' ? 'error-warning' :
                                            activity.riskLevel === 'medium' ? 'alert' : 'checkbox-circle'
                                            }-line text-${activity.riskLevel === 'high' ? 'red' :
                                                activity.riskLevel === 'medium' ? 'orange' : 'emerald'
                                            }-600`}></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900 truncate">
                                            {activity.details}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {new Date(activity.timestamp).toLocaleString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* District Scope Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                    <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
                    <div>
                        <p className="font-bold text-blue-900">District Admin Access</p>
                        <p className="text-sm text-blue-700 mt-1">
                            You have administrative access to <strong>{myDistrict.name} District</strong> only.
                            The risk map automatically filters and highlights your assigned district boundary with analytics.
                            For system-wide administration, contact the Super Administrator.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
