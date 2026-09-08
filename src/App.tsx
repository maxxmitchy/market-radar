/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Activity } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <Activity className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-semibold text-slate-800">Market Radar</h1>
      </header>
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 flex flex-col items-center justify-center h-64 border-dashed mt-8">
          <p className="font-medium text-slate-700">Initial skeleton repository structure setup complete.</p>
          <p className="text-sm mt-2">Ready for GitHub upload.</p>
        </div>
      </main>
    </div>
  );
}
