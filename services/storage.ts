import { SiteContent, Comment, CaseStudy } from '../types';

const STORAGE_KEY_CONTENT = 'gcp_cms_content_saas_v3_zh_tw';
const STORAGE_KEY_COMMENTS = 'gcp_cms_comments_saas_v3_zh_tw';

const DEFAULT_CONTENT: SiteContent = {
  heroTitle: '工業可靠性的核心操作系統',
  heroDescription: '解讀物理基礎設施的訊號。我們整合振動、聲學和熱影像數據，在故障影響生產產能之前精準預測，實現真正的零停機製造。',
  
  aboutTitle: '物理導向的人工智慧 (Physics-Informed AI)',
  aboutDescription: 'PrediMaint 結合摩擦學 (Tribology) 與熱力學的領域專業知識，輔以先進的深度學習模型，提供處方級的診斷。我們不僅僅是一個儀表板，而是您的自動化可靠性工程師，24/7 守護您的關鍵資產。',
  
  engineTitle: '設備異常診斷引擎',
  engineDescription: '我們的核心運算引擎在邊緣端處理高頻原始感測數據 (20kHz+)。利用快速傅立葉變換 (FFT) 和包絡分析，在毫秒級別內偵測軸承故障、動不平衡、不對心及氣蝕現象。',
  
  softwareTitle: '預知保養軟體套件',
  softwareDescription: '針對您整個資產艦隊的中央指揮中心。根據資產健康評分自動在 SAP/Maximo 中排程工單，視覺化長期劣化趨勢，並利用 AI 優化備品庫存管理策略。',

  caseStudies: [
    {
      id: '1',
      title: '石化煉油廠泵浦優化',
      industry: '石油與天然氣',
      metrics: '年省 $240 萬美元',
      description: '在關鍵飼水泵浦故障前 3 週偵測到早期氣蝕現象，成功避免了非計畫性停機與產線中斷。'
    },
    {
      id: '2',
      title: '汽車裝配線馬達監測',
      industry: '精密製造',
      metrics: '99.9% 稼動率',
      description: '在機械手臂關節部署 500+ 個無線感測器。透過狀態基礎監測 (CBM) 減少了 40% 的維護工時。'
    }
  ],
  
  contactEmail: 'sales@predimaint.io',
  contactAddress: '台北市信義區信義路五段7號 (台北101)',
};

// Simulate API Latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockBackend = {
  getContent: async (): Promise<SiteContent> => {
    await delay(300);
    const stored = localStorage.getItem(STORAGE_KEY_CONTENT);
    return stored ? JSON.parse(stored) : DEFAULT_CONTENT;
  },

  saveContent: async (content: SiteContent): Promise<void> => {
    await delay(500);
    localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(content));
  },

  getComments: async (): Promise<Comment[]> => {
    await delay(300);
    const stored = localStorage.getItem(STORAGE_KEY_COMMENTS);
    return stored ? JSON.parse(stored) : [];
  },

  addComment: async (author: string, content: string): Promise<Comment> => {
    await delay(400);
    const comments = await MockBackend.getComments();
    const newComment: Comment = {
      id: crypto.randomUUID(),
      author,
      content,
      timestamp: Date.now(),
      status: 'pending', // Default to pending moderation
    };
    const updated = [newComment, ...comments];
    localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(updated));
    return newComment;
  },

  updateCommentStatus: async (id: string, status: Comment['status']): Promise<void> => {
    await delay(200);
    const comments = await MockBackend.getComments();
    const updated = comments.map(c => c.id === id ? { ...c, status } : c);
    localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(updated));
  },

  deleteComment: async (id: string): Promise<void> => {
    await delay(200);
    const comments = await MockBackend.getComments();
    const updated = comments.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(updated));
  }
};