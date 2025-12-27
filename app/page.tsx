'use client';

import { useState } from 'react';

export default function Home() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [showLegend, setShowLegend] = useState(true);

  const layers = [
    { id: 'tier1', name: 'Tier 1 Providers / Internet Backbone', color: '#3B82F6' },
    { id: 'core', name: 'ISP Core Network', color: '#8B5CF6' },
    { id: 'distribution', name: 'Regional Distribution / PoPs', color: '#10B981' },
    { id: 'access', name: 'Customer Access Networks', color: '#F59E0B' },
    { id: 'customer', name: 'Customer Premises', color: '#EF4444' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ISP Network Architecture Diagram
          </h1>
          <p className="text-slate-400">Interactive visualization of Internet Service Provider infrastructure</p>
        </header>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            {showLegend ? 'Hide' : 'Show'} Legend
          </button>
          <button
            onClick={() => setSelectedLayer(null)}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            Reset View
          </button>
        </div>

        {showLegend && (
          <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h3 className="font-semibold mb-3">Network Layers</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {layers.map(layer => (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer.id)}
                  className={`p-2 rounded cursor-pointer transition-all ${
                    selectedLayer === layer.id ? 'ring-2 ring-white' : ''
                  }`}
                  style={{ backgroundColor: layer.color + '40', borderLeft: `4px solid ${layer.color}` }}
                >
                  <div className="text-sm font-medium">{layer.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700 relative overflow-hidden">
          <svg width="100%" height="900" viewBox="0 0 1200 900" className="mx-auto">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
              </marker>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Layer 1: Internet Backbone / Tier 1 Providers */}
            <g className={selectedLayer && selectedLayer !== 'tier1' ? 'opacity-30' : 'opacity-100'}>
              {/* Tier 1 Provider A */}
              <ellipse cx="300" cy="80" rx="120" ry="60" fill="#3B82F6" opacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
              <text x="300" y="75" textAnchor="middle" fill="#3B82F6" fontSize="14" fontWeight="bold">Tier 1 Provider A</text>
              <text x="300" y="92" textAnchor="middle" fill="#60A5FA" fontSize="11">Internet Backbone</text>

              {/* Tier 1 Provider B */}
              <ellipse cx="600" cy="80" rx="120" ry="60" fill="#3B82F6" opacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
              <text x="600" y="75" textAnchor="middle" fill="#3B82F6" fontSize="14" fontWeight="bold">Tier 1 Provider B</text>
              <text x="600" y="92" textAnchor="middle" fill="#60A5FA" fontSize="11">Internet Backbone</text>

              {/* IXP */}
              <ellipse cx="900" cy="80" rx="120" ry="60" fill="#3B82F6" opacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
              <text x="900" y="75" textAnchor="middle" fill="#3B82F6" fontSize="14" fontWeight="bold">IXP</text>
              <text x="900" y="92" textAnchor="middle" fill="#60A5FA" fontSize="11">Internet Exchange Point</text>
            </g>

            {/* Connections: Tier 1 to Core */}
            <line x1="300" y1="140" x2="450" y2="220" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="600" y1="140" x2="600" y2="220" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="900" y1="140" x2="750" y2="220" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="375" y="175" fill="#94a3b8" fontSize="10">Fiber</text>
            <text x="610" y="175" fill="#94a3b8" fontSize="10">Fiber</text>
            <text x="810" y="175" fill="#94a3b8" fontSize="10">Fiber</text>

            {/* Layer 2: Core Network */}
            <g className={selectedLayer && selectedLayer !== 'core' ? 'opacity-30' : 'opacity-100'}>
              {/* Core Router */}
              <rect x="520" y="230" width="160" height="100" rx="8" fill="#8B5CF6" opacity="0.2" stroke="#8B5CF6" strokeWidth="2"/>
              <text x="600" y="265" textAnchor="middle" fill="#8B5CF6" fontSize="16" fontWeight="bold">Core Router</text>
              <text x="600" y="285" textAnchor="middle" fill="#A78BFA" fontSize="11">Primary Gateway</text>
              <text x="600" y="305" textAnchor="middle" fill="#A78BFA" fontSize="10">BGP, OSPF</text>

              {/* Data Center */}
              <rect x="280" y="230" width="160" height="100" rx="8" fill="#8B5CF6" opacity="0.2" stroke="#8B5CF6" strokeWidth="2"/>
              <text x="360" y="265" textAnchor="middle" fill="#8B5CF6" fontSize="16" fontWeight="bold">Data Center</text>
              <text x="360" y="285" textAnchor="middle" fill="#A78BFA" fontSize="10">DNS Servers</text>
              <text x="360" y="300" textAnchor="middle" fill="#A78BFA" fontSize="10">Email Servers</text>
              <text x="360" y="315" textAnchor="middle" fill="#A78BFA" fontSize="10">Storage</text>

              {/* Firewall */}
              <rect x="760" y="230" width="160" height="100" rx="8" fill="#8B5CF6" opacity="0.2" stroke="#8B5CF6" strokeWidth="2"/>
              <text x="840" y="270" textAnchor="middle" fill="#8B5CF6" fontSize="16" fontWeight="bold">Firewall</text>
              <text x="840" y="290" textAnchor="middle" fill="#A78BFA" fontSize="11">DPI & Security</text>
              <text x="840" y="310" textAnchor="middle" fill="#A78BFA" fontSize="10">Traffic Filtering</text>
            </g>

            {/* Connections: Core to Distribution */}
            <line x1="480" y1="330" x2="300" y2="420" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="600" y1="330" x2="600" y2="420" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="720" y1="330" x2="900" y2="420" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>

            {/* Layer 3: Regional Distribution / PoPs */}
            <g className={selectedLayer && selectedLayer !== 'distribution' ? 'opacity-30' : 'opacity-100'}>
              {/* Regional Router West */}
              <circle cx="300" cy="480" r="55" fill="#10B981" opacity="0.2" stroke="#10B981" strokeWidth="2"/>
              <text x="300" y="475" textAnchor="middle" fill="#10B981" fontSize="14" fontWeight="bold">Regional PoP</text>
              <text x="300" y="492" textAnchor="middle" fill="#34D399" fontSize="11">West Region</text>

              {/* Regional Router Central */}
              <circle cx="600" cy="480" r="55" fill="#10B981" opacity="0.2" stroke="#10B981" strokeWidth="2"/>
              <text x="600" y="475" textAnchor="middle" fill="#10B981" fontSize="14" fontWeight="bold">Regional PoP</text>
              <text x="600" y="492" textAnchor="middle" fill="#34D399" fontSize="11">Central Region</text>

              {/* Regional Router East */}
              <circle cx="900" cy="480" r="55" fill="#10B981" opacity="0.2" stroke="#10B981" strokeWidth="2"/>
              <text x="900" y="475" textAnchor="middle" fill="#10B981" fontSize="14" fontWeight="bold">Regional PoP</text>
              <text x="900" y="492" textAnchor="middle" fill="#34D399" fontSize="11">East Region</text>
            </g>

            {/* Connections: Distribution to Access */}
            <line x1="260" y1="535" x2="200" y2="600" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="340" y1="535" x2="400" y2="600" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="560" y1="535" x2="500" y2="600" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="640" y1="535" x2="700" y2="600" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="860" y1="535" x2="800" y2="600" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="940" y1="535" x2="1000" y2="600" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>

            {/* Layer 4: Access Networks */}
            <g className={selectedLayer && selectedLayer !== 'access' ? 'opacity-30' : 'opacity-100'}>
              {/* FTTH OLT */}
              <rect x="120" y="610" width="140" height="70" rx="6" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" strokeWidth="2"/>
              <text x="190" y="638" textAnchor="middle" fill="#F59E0B" fontSize="13" fontWeight="bold">OLT</text>
              <text x="190" y="655" textAnchor="middle" fill="#FBBF24" fontSize="10">Optical Line Terminal</text>
              <text x="190" y="670" textAnchor="middle" fill="#FBBF24" fontSize="9">FTTH</text>

              {/* Fiber Distribution */}
              <rect x="320" y="610" width="140" height="70" rx="6" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" strokeWidth="2"/>
              <text x="390" y="638" textAnchor="middle" fill="#F59E0B" fontSize="13" fontWeight="bold">Fiber Hub</text>
              <text x="390" y="655" textAnchor="middle" fill="#FBBF24" fontSize="10">Distribution Point</text>

              {/* DSLAM */}
              <rect x="420" y="610" width="140" height="70" rx="6" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" strokeWidth="2"/>
              <text x="490" y="638" textAnchor="middle" fill="#F59E0B" fontSize="13" fontWeight="bold">DSLAM</text>
              <text x="490" y="655" textAnchor="middle" fill="#FBBF24" fontSize="10">DSL Access</text>

              {/* Wireless Tower */}
              <rect x="620" y="610" width="140" height="70" rx="6" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" strokeWidth="2"/>
              <text x="690" y="630" textAnchor="middle" fill="#F59E0B" fontSize="13" fontWeight="bold">📡 Cell Tower</text>
              <text x="690" y="650" textAnchor="middle" fill="#FBBF24" fontSize="10">4G/5G Base Station</text>
              <text x="690" y="667" textAnchor="middle" fill="#FBBF24" fontSize="9">Wireless Access</text>

              {/* WiFi Hub */}
              <rect x="720" y="610" width="140" height="70" rx="6" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" strokeWidth="2"/>
              <text x="790" y="638" textAnchor="middle" fill="#F59E0B" fontSize="13" fontWeight="bold">WiFi Hub</text>
              <text x="790" y="655" textAnchor="middle" fill="#FBBF24" fontSize="10">Public WiFi</text>

              {/* Satellite */}
              <rect x="920" y="610" width="140" height="70" rx="6" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" strokeWidth="2"/>
              <text x="990" y="630" textAnchor="middle" fill="#F59E0B" fontSize="13" fontWeight="bold">🛰️ Satellite</text>
              <text x="990" y="650" textAnchor="middle" fill="#FBBF24" fontSize="10">Ground Station</text>
              <text x="990" y="667" textAnchor="middle" fill="#FBBF24" fontSize="9">Remote Access</text>
            </g>

            {/* Connections: Access to Customer */}
            <line x1="190" y1="680" x2="190" y2="750" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="390" y1="680" x2="390" y2="750" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="490" y1="680" x2="490" y2="750" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="690" y1="680" x2="690" y2="750" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
            <line x1="790" y1="680" x2="790" y2="750" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
            <line x1="990" y1="680" x2="990" y2="750" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>

            {/* Layer 5: Customer Premises */}
            <g className={selectedLayer && selectedLayer !== 'customer' ? 'opacity-30' : 'opacity-100'}>
              {/* ONT */}
              <rect x="130" y="760" width="120" height="60" rx="5" fill="#EF4444" opacity="0.2" stroke="#EF4444" strokeWidth="2"/>
              <text x="190" y="785" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">ONT</text>
              <text x="190" y="802" textAnchor="middle" fill="#F87171" fontSize="9">Fiber Modem</text>

              {/* Customer Router 1 */}
              <rect x="330" y="760" width="120" height="60" rx="5" fill="#EF4444" opacity="0.2" stroke="#EF4444" strokeWidth="2"/>
              <text x="390" y="785" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">🏠 Home Router</text>
              <text x="390" y="802" textAnchor="middle" fill="#F87171" fontSize="9">WiFi Gateway</text>

              {/* Customer Router 2 */}
              <rect x="430" y="760" width="120" height="60" rx="5" fill="#EF4444" opacity="0.2" stroke="#EF4444" strokeWidth="2"/>
              <text x="490" y="785" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">🏢 Business</text>
              <text x="490" y="802" textAnchor="middle" fill="#F87171" fontSize="9">Enterprise Gateway</text>

              {/* Mobile Device */}
              <rect x="630" y="760" width="120" height="60" rx="5" fill="#EF4444" opacity="0.2" stroke="#EF4444" strokeWidth="2"/>
              <text x="690" y="785" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">📱 Mobile</text>
              <text x="690" y="802" textAnchor="middle" fill="#F87171" fontSize="9">Smartphone/Tablet</text>

              {/* WiFi Client */}
              <rect x="730" y="760" width="120" height="60" rx="5" fill="#EF4444" opacity="0.2" stroke="#EF4444" strokeWidth="2"/>
              <text x="790" y="785" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">💻 Laptop</text>
              <text x="790" y="802" textAnchor="middle" fill="#F87171" fontSize="9">WiFi Client</text>

              {/* Satellite Customer */}
              <rect x="930" y="760" width="120" height="60" rx="5" fill="#EF4444" opacity="0.2" stroke="#EF4444" strokeWidth="2"/>
              <text x="990" y="785" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">🏔️ Remote</text>
              <text x="990" y="802" textAnchor="middle" fill="#F87171" fontSize="9">Satellite Terminal</text>
            </g>

            {/* Redundancy paths (dashed lines showing backup routes) */}
            <line x1="360" y1="280" x2="600" y2="280" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
            <line x1="680" y1="280" x2="840" y2="280" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
            <line x1="300" y1="535" x2="600" y2="535" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
            <line x1="600" y1="535" x2="900" y2="535" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
          </svg>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <h4 className="font-semibold text-blue-400 mb-2">🔗 Connection Types</h4>
              <div className="space-y-1 text-slate-300">
                <div>━━━ Fiber Optic (Solid)</div>
                <div>- - - Wireless (Dashed)</div>
                <div>- - - Redundant Paths</div>
              </div>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <h4 className="font-semibold text-purple-400 mb-2">⚙️ Key Components</h4>
              <div className="space-y-1 text-slate-300">
                <div>OLT: Optical Line Terminal</div>
                <div>ONT: Optical Network Terminal</div>
                <div>DSLAM: DSL Access Multiplexer</div>
                <div>PoP: Point of Presence</div>
              </div>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <h4 className="font-semibold text-green-400 mb-2">📊 Network Features</h4>
              <div className="space-y-1 text-slate-300">
                <div>✓ Multi-provider redundancy</div>
                <div>✓ Geographic distribution</div>
                <div>✓ Multiple access methods</div>
                <div>✓ Failover protection</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-slate-500 text-sm">
          <p>Interactive ISP Network Architecture • Click layers to highlight • Hover for details</p>
        </footer>
      </div>
    </main>
  );
}
