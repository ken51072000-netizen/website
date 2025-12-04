import React, { useState, useEffect } from 'react';
import { SiteContent, Comment, AdminTab, CaseStudy } from '../types';
import { MockBackend } from '../services/storage';
import { 
  Save, Trash2, CheckCircle, XCircle, Layout, MessageSquare, 
  Server, Loader2, Activity, Radio, Database, Cloud, Cpu
} from 'lucide-react';

interface AdminPanelProps {
  content: SiteContent;
  onContentUpdate: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ content, onContentUpdate }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('architecture');
  const [formData, setFormData] = useState<SiteContent>(content);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const data = await MockBackend.getComments();
    setComments(data);
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await MockBackend.saveContent(formData);
    onContentUpdate();
    setLoading(false);
    setStatusMessage('系統設定已更新');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleAddCaseStudy = () => {
    const newCase: CaseStudy = {
      id: crypto.randomUUID(),
      title: '新案例標題',
      metrics: '$0',
      industry: '產業類別',
      description: '請輸入案例描述...'
    };
    setFormData(prev => ({ ...prev, caseStudies: [...prev.caseStudies, newCase] }));
  };

  const handleRemoveCaseStudy = (id: string) => {
    setFormData(prev => ({
      ...prev,
      caseStudies: prev.caseStudies.filter(c => c.id !== id)
    }));
  };

  const handleCommentAction = async (id: string, action: 'approve' | 'reject' | 'delete') => {
    if (action === 'delete') {
      await MockBackend.deleteComment(id);
    } else {
      await MockBackend.updateCommentStatus(id, action === 'approve' ? 'approved' : 'rejected');
    }
    loadComments();
  };

  return (
    <div className="bg-slate-100 min-h-screen shadow-xl border-l border-slate-300 flex flex-col font-sans text-slate-900">
      {/* Admin Header */}
      <div className="p-5 border-b border-slate-300 bg-white flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800 uppercase tracking-wider">
            <Activity className="w-5 h-5 text-blue-600" />
            後台管理控制台
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1">SYSTEM_ACCESS_LEVEL_1</p>
        </div>
        {statusMessage && (
          <div className="bg-slate-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-400" />
            {statusMessage}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-slate-300">
        {[
          { id: 'architecture', label: '系統架構 (GCP)', icon: Server },
          { id: 'content', label: '內容管理 (CMS)', icon: Layout },
          { id: 'comments', label: `留言審核 (${comments.filter(c => c.status === 'pending').length})`, icon: MessageSquare }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AdminTab)}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === tab.id ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        
        {/* ARCHITECTURE TAB */}
        {activeTab === 'architecture' && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white p-8 border border-slate-300 mb-8">
              <h3 className="text-xl font-bold mb-2 text-slate-900 uppercase">GCP 工業物聯網架構圖</h3>
              <p className="text-slate-500 text-sm mb-8 max-w-2xl">
                高吞吐量數據管道，用於接收工廠資產的振動/遙測數據，透過 ML 進行即時處理，並將洞察結果提供給前端顯示。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 transform -translate-y-1/2"></div>
                <div className="bg-slate-50 border border-slate-200 p-6 flex flex-col items-center text-center hover:border-blue-500 transition-colors">
                  <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-4 text-blue-600 shadow-sm z-10">
                    <Radio className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1 uppercase">IoT Core / Pub/Sub</h4>
                  <p className="text-xs text-slate-500">MQTT 橋接器，每秒處理 50k+ 事件。</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 flex flex-col items-center text-center hover:border-blue-500 transition-colors">
                  <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-4 text-purple-600 shadow-sm z-10">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1 uppercase">Cloud Dataflow</h4>
                  <p className="text-xs text-slate-500">即時串流處理與異常偵測。</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 flex flex-col items-center text-center hover:border-blue-500 transition-colors">
                  <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-4 text-green-600 shadow-sm z-10">
                    <Database className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1 uppercase">BigQuery</h4>
                  <p className="text-xs text-slate-500">時序數據倉儲與歷史分析。</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 flex flex-col items-center text-center hover:border-blue-500 transition-colors">
                  <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-4 text-orange-600 shadow-sm z-10">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1 uppercase">Cloud Run</h4>
                  <p className="text-xs text-slate-500">託管 React 前端應用程式。</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT CMS TAB */}
        {activeTab === 'content' && (
          <form onSubmit={handleSaveContent} className="max-w-4xl mx-auto space-y-6">
            
            {/* 1. Main Pages Section */}
            <div className="space-y-6">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">頁面內容設定</h3>
               
               {/* Hero */}
               <div className="bg-white p-6 border border-slate-300 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                     <h4 className="text-sm font-bold uppercase text-slate-800">首頁 Hero 區塊</h4>
                  </div>
                  <input type="text" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} className="w-full border p-2 text-sm mb-2" placeholder="標題" />
                  <textarea value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} className="w-full border p-2 text-sm h-20" placeholder="描述" />
               </div>

               {/* About */}
               <div className="bg-white p-6 border border-slate-300 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                     <h4 className="text-sm font-bold uppercase text-slate-800">公司介紹 (About)</h4>
                  </div>
                  <input type="text" value={formData.aboutTitle} onChange={e => setFormData({...formData, aboutTitle: e.target.value})} className="w-full border p-2 text-sm mb-2" placeholder="標題" />
                  <textarea value={formData.aboutDescription} onChange={e => setFormData({...formData, aboutDescription: e.target.value})} className="w-full border p-2 text-sm h-20" placeholder="描述" />
               </div>
            </div>

            {/* 2. Products Section */}
            <div className="space-y-6 pt-6">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">產品介紹</h3>
               
               {/* Product 1: Engine */}
               <div className="bg-white p-6 border border-slate-300 shadow-sm border-l-4 border-l-blue-600">
                  <div className="flex justify-between items-center mb-4">
                     <h4 className="text-sm font-bold uppercase text-slate-800">產品：診斷引擎</h4>
                  </div>
                  <input type="text" value={formData.engineTitle} onChange={e => setFormData({...formData, engineTitle: e.target.value})} className="w-full border p-2 text-sm mb-2" placeholder="產品標題" />
                  <textarea value={formData.engineDescription} onChange={e => setFormData({...formData, engineDescription: e.target.value})} className="w-full border p-2 text-sm h-20" placeholder="產品描述" />
               </div>

               {/* Product 2: Software */}
               <div className="bg-white p-6 border border-slate-300 shadow-sm border-l-4 border-l-indigo-600">
                  <div className="flex justify-between items-center mb-4">
                     <h4 className="text-sm font-bold uppercase text-slate-800">產品：維護軟體</h4>
                  </div>
                  <input type="text" value={formData.softwareTitle} onChange={e => setFormData({...formData, softwareTitle: e.target.value})} className="w-full border p-2 text-sm mb-2" placeholder="產品標題" />
                  <textarea value={formData.softwareDescription} onChange={e => setFormData({...formData, softwareDescription: e.target.value})} className="w-full border p-2 text-sm h-20" placeholder="產品描述" />
               </div>
            </div>

            {/* 3. Case Studies Section */}
            <div className="space-y-6 pt-6">
                <div className="flex justify-between items-end border-b border-slate-200 pb-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">客戶案例</h3>
                    <button type="button" onClick={handleAddCaseStudy} className="text-xs font-bold uppercase text-blue-600 flex items-center gap-1 hover:text-blue-800">
                        + 新增案例
                    </button>
                </div>
                
                {formData.caseStudies.map((study, index) => (
                    <div key={study.id} className="bg-white p-6 border border-slate-300 shadow-sm relative group">
                        <button type="button" onClick={() => handleRemoveCaseStudy(study.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-[10px] uppercase text-slate-500 mb-1">案例標題</label>
                                <input 
                                    value={study.title}
                                    onChange={(e) => {
                                        const newCases = [...formData.caseStudies];
                                        newCases[index].title = e.target.value;
                                        setFormData({...formData, caseStudies: newCases});
                                    }}
                                    className="w-full border border-slate-300 p-2 text-sm font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase text-slate-500 mb-1">關鍵指標 (Metrics)</label>
                                <input 
                                    value={study.metrics}
                                    onChange={(e) => {
                                        const newCases = [...formData.caseStudies];
                                        newCases[index].metrics = e.target.value;
                                        setFormData({...formData, caseStudies: newCases});
                                    }}
                                    className="w-full border border-slate-300 p-2 text-sm text-green-600 font-mono"
                                />
                            </div>
                        </div>
                        <div>
                             <label className="block text-[10px] uppercase text-slate-500 mb-1">描述</label>
                             <textarea 
                                value={study.description}
                                onChange={(e) => {
                                    const newCases = [...formData.caseStudies];
                                    newCases[index].description = e.target.value;
                                    setFormData({...formData, caseStudies: newCases});
                                }}
                                className="w-full border border-slate-300 p-2 text-sm h-16"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* 4. Contact Info */}
            <div className="bg-white p-6 border border-slate-300 shadow-sm mt-6">
                <h4 className="text-sm font-bold uppercase text-slate-800 mb-4">聯絡資訊設定</h4>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 text-sm"
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        value={formData.contactAddress}
                        onChange={e => setFormData({...formData, contactAddress: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 text-sm"
                        placeholder="地址"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 sticky bottom-0 bg-slate-100/90 py-4 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50 shadow-lg"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                儲存變更
              </button>
            </div>
          </form>
        )}

        {/* COMMENTS MODERATION TAB */}
        {activeTab === 'comments' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <h3 className="text-lg font-bold text-slate-800 uppercase mb-4 border-b border-slate-200 pb-2">留言審核佇列</h3>
            {comments.length === 0 ? (
              <div className="text-center py-16 bg-white border border-dashed border-slate-300">
                <p className="text-slate-400 text-sm font-mono">無待審核項目</p>
              </div>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="bg-white p-6 border border-slate-200 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-slate-900 text-sm uppercase">{comment.author}</span>
                      <span className="text-xs text-slate-400 font-mono">{new Date(comment.timestamp).toLocaleDateString()}</span>
                      <span className={`text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider border ${
                        comment.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' :
                        comment.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}>
                        {comment.status === 'approved' ? '已核准' : comment.status === 'rejected' ? '已駁回' : '待審核'}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm font-light">"{comment.content}"</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {comment.status === 'pending' && (
                      <>
                        <button onClick={() => handleCommentAction(comment.id, 'approve')} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-green-50 text-slate-600 hover:text-green-700 border border-slate-200 hover:border-green-300 text-xs font-bold uppercase tracking-wider transition-colors">
                          <CheckCircle className="w-3 h-3" /> 核准
                        </button>
                        <button onClick={() => handleCommentAction(comment.id, 'reject')} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 border border-slate-200 hover:border-red-300 text-xs font-bold uppercase tracking-wider transition-colors">
                          <XCircle className="w-3 h-3" /> 駁回
                        </button>
                      </>
                    )}
                    <button onClick={() => handleCommentAction(comment.id, 'delete')} className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors ml-2" title="永久刪除">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;