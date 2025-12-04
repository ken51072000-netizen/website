import React, { useState, useEffect } from 'react';
import { ViewMode, SiteContent } from './types';
import { MockBackend } from './services/storage';
import PublicSite from './components/PublicSite';
import AdminPanel from './components/AdminPanel';
import { Settings, Eye, Loader } from 'lucide-react';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('public');
  const [content, setContent] = useState<SiteContent | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Initial fetch
    fetchContent();
  }, [refreshKey]);

  const fetchContent = async () => {
    const data = await MockBackend.getContent();
    setContent(data);
  };

  const handleContentUpdated = () => {
    // Force re-fetch when Admin updates content
    setRefreshKey(prev => prev + 1);
  };

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4 text-slate-600">
          <Loader className="w-8 h-8 animate-spin text-blue-500" />
          <p>正在載入 PrediMaint 系統...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Role Switcher Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-2">
        <div className="bg-slate-900/90 backdrop-blur-sm text-white p-2 rounded-full shadow-xl flex items-center gap-1 pl-4 pr-2">
          <span className="text-xs font-semibold mr-2 uppercase tracking-wider text-gray-300">
            檢視模式:
          </span>
          
          <button
            onClick={() => setViewMode('public')}
            className={`p-2 rounded-full transition-all ${
              viewMode === 'public' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'hover:bg-white/10 text-gray-400'
            }`}
            title="訪客檢視"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setViewMode('admin')}
            className={`p-2 rounded-full transition-all ${
              viewMode === 'admin' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'hover:bg-white/10 text-gray-400'
            }`}
            title="後台管理"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'public' ? (
        <PublicSite content={content} />
      ) : (
        <AdminPanel content={content} onContentUpdate={handleContentUpdated} />
      )}
    </div>
  );
};

export default App;