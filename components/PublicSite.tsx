import React, { useState, useEffect } from 'react';
import { SiteContent, Comment, PublicPage } from '../types';
import { MockBackend } from '../services/storage';
import { 
  Send, MessageSquare, Activity, Cpu, 
  BarChart3, ArrowRight, Share2, 
  Zap, Database, Layers, Monitor, Server, 
  ChevronRight, MapPin, Mail, ShieldCheck,
  Factory, Cog
} from 'lucide-react';

interface PublicSiteProps {
  content: SiteContent;
}

const PublicSite: React.FC<PublicSiteProps> = ({ content }) => {
  const [activePage, setActivePage] = useState<PublicPage>('home');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ author: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPublicComments();
    const interval = setInterval(loadPublicComments, 5000); 
    return () => clearInterval(interval);
  }, []);

  const loadPublicComments = async () => {
    const allComments = await MockBackend.getComments();
    setComments(allComments.filter(c => c.status === 'approved'));
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author || !newComment.text) return;
    setSubmitting(true);
    await MockBackend.addComment(newComment.author, newComment.text);
    setNewComment({ author: '', text: '' });
    setSubmitting(false);
    alert('您的意見已提交審核。我們將盡快處理。');
  };

  const NavItem = ({ page, label }: { page: PublicPage; label: string }) => (
    <button 
      onClick={() => setActivePage(page)}
      className={`text-xs font-bold uppercase tracking-widest transition-colors ${
        activePage === page ? 'text-white border-b-2 border-blue-500' : 'text-slate-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col">
      
      {/* Top Bar */}
      <nav className="fixed w-full bg-slate-950 text-white z-50 border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 font-medium tracking-tight cursor-pointer"
            onClick={() => setActivePage('home')}
          >
            <div className="w-6 h-6 bg-blue-600 text-white flex items-center justify-center font-bold text-xs rounded-sm">P</div>
            <span className="text-sm font-semibold uppercase tracking-wider">PrediMaint</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <NavItem page="home" label="首頁" />
            <NavItem page="company" label="公司介紹" />
            <NavItem page="products" label="產品介紹" />
            <NavItem page="cases" label="案例分享" />
            <NavItem page="contact" label="聯絡我們" />
          </div>

          <button 
            onClick={() => setActivePage('contact')}
            className="hidden md:block border border-slate-600 px-4 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all"
          >
            預約演示
          </button>
        </div>
      </nav>

      {/* Main Content Router */}
      <main className="flex-grow pt-16">
        
        {/* === HOME PAGE === */}
        {activePage === 'home' && (
          <>
            <section className="relative min-h-[90vh] bg-slate-950 text-white flex items-center border-b border-slate-800 overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
              </div>
              <div className="max-w-[1400px] mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center py-20">
                <div>
                  <div className="inline-block px-3 py-1 mb-6 border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                    營運智慧 (Operational Intelligence)
                  </div>
                  <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-[1.1]">
                    {content.heroTitle}
                  </h1>
                  <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl font-light">
                    {content.heroDescription}
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => setActivePage('products')} className="bg-blue-700 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors flex items-center gap-2">
                      探索產品 <ArrowRight className="w-4 h-4" />
                    </button>
                    <button onClick={() => setActivePage('cases')} className="border border-slate-700 text-slate-300 px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors">
                      查看案例
                    </button>
                  </div>
                </div>
                {/* Tech Viz */}
                <div className="border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
                    <span className="text-xs font-mono text-slate-400">系統狀態 (SYSTEM_STATUS)</span>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs font-mono text-green-500">連線中 (LIVE)</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-950 p-4 border border-slate-800 flex justify-between items-center hover:border-blue-500/50 transition-colors">
                      <span className="text-xs uppercase text-slate-500 flex items-center gap-2"><Factory className="w-3 h-3" /> 監控資產數量</span>
                      <span className="text-xl font-light text-white font-mono">12,408</span>
                    </div>
                    <div className="bg-slate-950 p-4 border border-slate-800 flex justify-between items-center hover:border-orange-500/50 transition-colors">
                      <span className="text-xs uppercase text-slate-500 flex items-center gap-2"><Activity className="w-3 h-3" /> 偵測異常 (24h)</span>
                      <span className="text-xl font-light text-orange-400 font-mono">47</span>
                    </div>
                    <div className="bg-slate-950 p-4 border border-slate-800 flex justify-between items-center hover:border-green-500/50 transition-colors">
                      <span className="text-xs uppercase text-slate-500 flex items-center gap-2"><BarChart3 className="w-3 h-3" /> 避免停機價值</span>
                      <span className="text-xl font-light text-green-400 font-mono">$8.2M</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <div className="flex gap-1 h-8 items-end justify-between px-1">
                      {[40, 65, 30, 80, 55, 90, 45, 70, 35, 60, 20, 75, 50, 85, 40].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="w-1.5 bg-blue-600/40 hover:bg-blue-500 transition-colors"></div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-600 font-mono mt-2 text-right">REAL-TIME TELEMETRY STREAM</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="py-20 bg-white">
              <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-3 gap-12">
                 <div className="group cursor-pointer border-t-2 border-transparent hover:border-blue-600 pt-8 transition-all" onClick={() => setActivePage('products')}>
                    <Cpu className="w-10 h-10 text-slate-900 mb-4" />
                    <h3 className="text-lg font-bold uppercase mb-2 group-hover:text-blue-600 transition-colors">診斷引擎</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">針對振動與熱異常的即時邊緣運算分析。毫秒級反應速度。</p>
                 </div>
                 <div className="group cursor-pointer border-t-2 border-transparent hover:border-indigo-600 pt-8 transition-all" onClick={() => setActivePage('products')}>
                    <Monitor className="w-10 h-10 text-slate-900 mb-4" />
                    <h3 className="text-lg font-bold uppercase mb-2 group-hover:text-indigo-600 transition-colors">維護套件</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">全艦隊可靠性管理的企業級儀表板。整合 SAP 與工單系統。</p>
                 </div>
                 <div className="group cursor-pointer border-t-2 border-transparent hover:border-green-600 pt-8 transition-all" onClick={() => setActivePage('cases')}>
                    <ShieldCheck className="w-10 h-10 text-slate-900 mb-4" />
                    <h3 className="text-lg font-bold uppercase mb-2 group-hover:text-green-600 transition-colors">實績證明</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">見證我們如何為財富 500 強製造商節省數百萬美元維護成本。</p>
                 </div>
              </div>
            </section>
          </>
        )}

        {/* === COMPANY PAGE === */}
        {activePage === 'company' && (
          <section className="py-24 bg-white min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4 border-t-4 border-slate-900 pt-8">
                <h2 className="text-4xl font-bold tracking-tight mb-4 text-slate-900 uppercase">關於我們</h2>
                <div className="text-sm font-mono text-slate-400">FOUNDED: 2021<br/>HQ: TAIPEI, TAIWAN</div>
              </div>
              <div className="md:col-span-8 pt-8">
                <h3 className="text-2xl font-medium text-slate-900 mb-6 font-serif">{content.aboutTitle}</h3>
                <p className="text-xl text-slate-600 font-light leading-relaxed mb-12">
                  {content.aboutDescription}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-12">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2 text-slate-800">
                      <Database className="w-4 h-4 text-blue-600" /> 我們的數據
                    </h4>
                    <p className="text-sm text-slate-500 leading-7">訓練資料庫包含超過 5 億小時、橫跨 10 個不同產業的專有機器故障數據。這是我們與競爭對手最大的護城河。</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2 text-slate-800">
                      <Zap className="w-4 h-4 text-orange-600" /> 我們的物理模型
                    </h4>
                    <p className="text-sm text-slate-500 leading-7">我們不只使用黑盒 AI。我們將機械工程原理嵌入神經網絡之中，確保每一次的預測都符合物理定律。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* === PRODUCTS PAGE === */}
        {activePage === 'products' && (
          <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-slate-900 text-white py-20 border-b border-slate-800">
              <div className="max-w-[1400px] mx-auto px-6">
                <h2 className="text-4xl font-light mb-4">平台能力</h2>
                <p className="text-slate-400 max-w-2xl font-light">從感測器端緣到雲端儀表板的完整資產健康管理解決方案。</p>
              </div>
            </div>

            {/* Product 1: Engine */}
            <section className="py-24 border-b border-slate-200">
              <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">{content.engineTitle}</h3>
                  <p className="text-lg text-slate-600 font-light leading-relaxed mb-8">{content.engineDescription}</p>
                  <ul className="space-y-3 border-t border-slate-200 pt-6">
                    {['高頻採樣 (20kHz)', '裝置端 FFT 訊號處理', '低延遲警報 (<50ms)', '自動故障分類 (ISO 10816)'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 uppercase tracking-wide">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-2 border border-slate-200 shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500">
                   {/* Placeholder for Product Image */}
                   <div className="bg-slate-100 h-80 flex flex-col items-center justify-center border border-slate-100 overflow-hidden relative">
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-5">
                          {Array.from({length: 36}).map((_, i) => <div key={i} className="border border-slate-900"></div>)}
                      </div>
                      <Cog className="w-16 h-16 text-slate-300 mb-4 animate-spin-slow" style={{ animationDuration: '10s' }} />
                      <div className="text-slate-500 font-mono text-xs uppercase text-center bg-white px-4 py-2 border border-slate-200 shadow-sm z-10">
                         Edge Compute Node<br/>
                         <span className="text-[10px] text-green-500">STATUS: ONLINE</span>
                      </div>
                   </div>
                </div>
              </div>
            </section>

            {/* Product 2: Software */}
            <section className="py-24 bg-white">
              <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 bg-slate-900 p-2 shadow-2xl -rotate-1 hover:rotate-0 transition-transform duration-500 rounded-sm">
                   {/* Placeholder for Software Image */}
                   <div className="bg-slate-800 h-80 flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="w-full h-full p-8 flex flex-col gap-4">
                          <div className="h-2 w-1/3 bg-slate-700 rounded mb-4"></div>
                          <div className="flex gap-4 h-32">
                              <div className="flex-1 bg-slate-700/50 rounded border border-slate-600"></div>
                              <div className="flex-1 bg-slate-700/50 rounded border border-slate-600"></div>
                          </div>
                          <div className="flex-1 bg-slate-700/30 rounded border border-slate-600"></div>
                      </div>
                      <div className="absolute bottom-4 right-4 text-xs font-mono text-green-400 bg-slate-900 px-2 py-1 border border-slate-700">
                          PREDICTIVE_SCORE: 98.4%
                      </div>
                   </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="w-12 h-12 bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-900/20">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">{content.softwareTitle}</h3>
                  <p className="text-lg text-slate-600 font-light leading-relaxed mb-8">{content.softwareDescription}</p>
                  <ul className="space-y-3 border-t border-slate-200 pt-6">
                    {['全艦隊健康評分儀表板', '自動化工單派發 (SAP/Maximo)', '備品庫存優化建議', '根本原因分析 (RCA) 輔助工具'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 uppercase tracking-wide">
                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* === CASE STUDIES PAGE === */}
        {activePage === 'cases' && (
          <section className="py-20 bg-white min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="mb-16 border-b border-slate-200 pb-8">
                <h2 className="text-3xl font-bold text-slate-900 uppercase mb-4">客戶成功案例</h2>
                <p className="text-slate-500">數據會說話。看看我們如何協助產業領導者提升可靠性。</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {content.caseStudies.map((study) => (
                  <div key={study.id} className="bg-slate-50 border border-slate-200 p-8 hover:border-blue-500 transition-colors group">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-200 text-slate-600 px-2 py-1 rounded-sm">
                        {study.industry}
                      </span>
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors transform group-hover:translate-x-1" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{study.title}</h3>
                    <div className="text-3xl font-mono text-blue-600 mb-6 font-light">{study.metrics}</div>
                    <p className="text-slate-600 leading-relaxed text-sm border-t border-slate-200 pt-6">
                      {study.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* === CONTACT PAGE === */}
        {activePage === 'contact' && (
          <div className="min-h-screen bg-slate-50">
            <div className="bg-slate-900 text-white py-20">
               <div className="max-w-[1400px] mx-auto px-6">
                 <h2 className="text-4xl font-light mb-4">與我們聯絡</h2>
                 <p className="text-slate-400">準備好開始您的預知保養旅程了嗎？</p>
               </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
               {/* Contact Info */}
               <div>
                  <h3 className="text-lg font-bold uppercase text-slate-900 mb-8 border-b border-slate-200 pb-2">聯絡資訊</h3>
                  <div className="space-y-6">
                     <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                           <div className="text-xs font-bold uppercase text-slate-400 mb-1">總部地址</div>
                           <div className="text-slate-800">{content.contactAddress}</div>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <Mail className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                           <div className="text-xs font-bold uppercase text-slate-400 mb-1">電子郵件</div>
                           <div className="text-slate-800 font-mono">{content.contactEmail}</div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-16">
                     <h3 className="text-lg font-bold uppercase text-slate-900 mb-6 border-b border-slate-200 pb-2">客戶回饋留言板</h3>
                     <p className="text-sm text-slate-500 mb-6">歡迎留下您對我們產品的建議或使用心得。</p>
                     
                     <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 mb-8">
                       {comments.length === 0 && (
                         <div className="text-center py-8 bg-white border border-dashed border-slate-300 text-slate-400 text-sm">
                           目前尚無公開留言。
                         </div>
                       )}
                       {comments.map((comment) => (
                         <div key={comment.id} className="bg-white p-4 border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                               <span className="font-bold text-slate-900 text-sm">{comment.author}</span>
                               <span className="text-[10px] text-slate-400 font-mono">{new Date(comment.timestamp).toLocaleDateString()}</span>
                            </div>
                            <p className="text-slate-600 text-sm">{comment.content}</p>
                         </div>
                       ))}
                     </div>

                     <form onSubmit={handlePostComment} className="bg-white p-6 border border-slate-200 shadow-sm">
                        <h4 className="text-sm font-bold uppercase text-slate-800 mb-4 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" /> 新增留言
                        </h4>
                        <div className="space-y-4">
                           <input 
                              type="text" 
                              placeholder="您的姓名 / 公司"
                              value={newComment.author}
                              onChange={e => setNewComment({...newComment, author: e.target.value})}
                              className="w-full border border-slate-300 p-2 text-sm focus:border-blue-500 outline-none"
                              required
                           />
                           <textarea 
                              placeholder="請輸入您的回饋..."
                              value={newComment.text}
                              onChange={e => setNewComment({...newComment, text: e.target.value})}
                              className="w-full border border-slate-300 p-2 text-sm h-24 focus:border-blue-500 outline-none"
                              required
                           />
                           <button 
                              type="submit" 
                              disabled={submitting}
                              className="w-full bg-slate-900 text-white py-2 text-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors disabled:opacity-50"
                           >
                              {submitting ? '提交中...' : '送出留言 (需審核)'}
                           </button>
                        </div>
                     </form>
                  </div>
               </div>

               {/* Map Placeholder */}
               <div className="h-full min-h-[400px] bg-slate-200 border border-slate-300 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-slate-300 opacity-20" style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                  <div className="text-center z-10">
                     <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                     <span className="text-slate-500 font-mono text-sm uppercase">Google Maps Integration</span>
                     <p className="text-xs text-slate-400 mt-2">Lat: 25.0330, Long: 121.5654</p>
                  </div>
               </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px] rounded-sm">P</div>
            <span className="font-semibold uppercase tracking-wider text-slate-200">PrediMaint AI</span>
          </div>
          <div className="flex gap-8 text-xs font-mono uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">隱私權政策</a>
            <a href="#" className="hover:text-white transition-colors">服務條款</a>
            <a href="#" className="hover:text-white transition-colors">資安白皮書</a>
          </div>
          <div className="text-xs text-slate-600">
            © 2024 PrediMaint Inc. All Systems Operational.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicSite;