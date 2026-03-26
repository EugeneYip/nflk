
import React, { useEffect, useMemo, useRef, useState } from "react";

const PALETTE = {
  bg: "#FCFAF2",
  paper: "#FFFDF8",
  ink: "#2B2621",
  line: "#DDD2C2",
  blue: "#3A5F76",
  blueSoft: "#EAF1F5",
  green: "#5B6D5B",
  greenSoft: "#EDF3EC",
  amber: "#B58A43",
  amberSoft: "#F7F0E1",
  rust: "#B35C44",
  rustSoft: "#F9ECE7",
  plum: "#6E5873",
  plumSoft: "#F2ECF4",
};

const ICONS = {
  book: { viewBox: "0 0 24 24", paths: [
    { d: "M4.75 6.5A1.75 1.75 0 0 1 6.5 4.75H18A1.25 1.25 0 0 1 19.25 6v11.1A6.1 6.1 0 0 0 17 16.67H7a2.25 2.25 0 0 0-2.25 2.23V6.5Z", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" },
    { d: "M8 8.5h7M8 11.5h7M8 14.5h4", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" },
  ]},
  layers: { viewBox: "0 0 24 24", paths: [
    { d: "M12 4 4 8l8 4 8-4-8-4Z", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" },
    { d: "M4 12l8 4 8-4M4 16l8 4 8-4", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" },
  ]},
  alert: { viewBox: "0 0 24 24", paths: [
    { d: "M12 3.75 21 19.5H3L12 3.75Z", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" },
    { d: "M12 8.2v5.1", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" },
    { d: "M12 16.55h.01", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" },
  ]},
  target: { viewBox: "0 0 24 24", paths: [
    { d: "M12 5.25a6.75 6.75 0 1 0 6.75 6.75", fill: "none", stroke: "currentColor", strokeWidth: 1.6 },
    { d: "M12 8.5a3.5 3.5 0 1 0 3.5 3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.6 },
    { d: "M20 4 12.2 11.8M16 4h4v4", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
  ]},
  plane: { viewBox: "0 0 24 24", paths: [
    { d: "M3.75 11.85 19.9 4.6c.7-.31 1.43.42 1.12 1.12l-7.25 16.15c-.34.76-1.46.7-1.72-.09l-2.08-6.12-6.12-2.08c-.8-.27-.85-1.39-.1-1.73Z", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" },
    { d: "M9.95 15.68 20.98 4.65", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" },
  ]},
  users: { viewBox: "0 0 24 24", paths: [
    { d: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16.5 10a2.5 2.5 0 1 0 0-5", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" },
    { d: "M4.5 18.5a4.5 4.5 0 0 1 9 0M14.5 18.5a3.75 3.75 0 0 1 5 0", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" },
  ]},
  building: { viewBox: "0 0 24 24", paths: [
    { d: "M5 20V6.5c0-.83.67-1.5 1.5-1.5h11c.83 0 1.5.67 1.5 1.5V20M9 20v-4h6v4", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" },
    { d: "M8 8.25h.01M12 8.25h.01M16 8.25h.01M8 11.75h.01M12 11.75h.01M16 11.75h.01", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" },
  ]},
  megaphone: { viewBox: "0 0 24 24", paths: [
    { d: "M4.5 13.25V10.75c0-.97.78-1.75 1.75-1.75H9l7.5-3v12L9 15H6.25c-.97 0-1.75-.78-1.75-1.75Z", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" },
    { d: "M9 15.1v2.15a1.75 1.75 0 0 1-3.5 0V15M18.7 8.2a4.25 4.25 0 0 1 0 7.6", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" },
  ]},
  scale: { viewBox: "0 0 24 24", paths: [
    { d: "M12 4v15.5M6 7.25h12M8 7.25 5.25 12h5.5L8 7.25Zm8 0L13.25 12h5.5L16 7.25ZM8 19.5h8", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" },
  ]},
  clock: { viewBox: "0 0 24 24", paths: [
    { d: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", fill: "none", stroke: "currentColor", strokeWidth: 1.6 },
    { d: "M12 7.75v4.6l3 1.7", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" },
  ]},
  check: { viewBox: "0 0 24 24", paths: [
    { d: "M5.5 12.5 10 17l8.5-10", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
  ]},
  arrowRight: { viewBox: "0 0 24 24", paths: [
    { d: "M5 12h14", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" },
    { d: "m13 7 5 5-5 5", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
  ]},
  hashtag: { viewBox: "0 0 24 24", paths: [
    { d: "M9 4 7 20M17 4 15 20M4 9h16M3 15h16", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" },
  ]},
  quote: { viewBox: "0 0 24 24", paths: [
    { d: "M7.5 12.5H4.75A3.75 3.75 0 0 1 8.5 8.75v.5M16.5 12.5h-2.75a3.75 3.75 0 0 1 3.75-3.75v.5", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" },
    { d: "M6 12.5v4.25h4V12.5M15 12.5v4.25h4V12.5", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinejoin: "round" },
  ]},
  menu: { viewBox: "0 0 24 24", paths: [
    { d: "M4 7h16M4 12h16M4 17h16", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" },
  ]},
  map: { viewBox: "0 0 24 24", paths: [
    { d: "M9 4.75 15 7l5-2.25v14.5L15 21.5 9 19.25 4 21.5V7L9 4.75ZM9 4.75v14.5M15 7v14.5", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" },
  ]},
  shield: { viewBox: "0 0 24 24", paths: [
    { d: "M12 3.75 18.5 6v5.2c0 4.01-2.64 7.41-6.5 9.05-3.86-1.64-6.5-5.04-6.5-9.05V6L12 3.75ZM9.2 12.1 11 13.9l3.8-3.8", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" },
  ]},
  mail: { viewBox: "0 0 24 24", paths: [
    { d: "M4.75 7.25h14.5A1.75 1.75 0 0 1 21 9v6a1.75 1.75 0 0 1-1.75 1.75H4.75A1.75 1.75 0 0 1 3 15V9c0-.97.78-1.75 1.75-1.75Z", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" },
    { d: "m4 8.5 8 5 8-5", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" },
  ]},
  spark: { viewBox: "0 0 24 24", paths: [
    { d: "M12 4.5 13.65 8.35 17.5 10l-3.85 1.65L12 15.5l-1.65-3.85L6.5 10l3.85-1.65L12 4.5Z", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" },
    { d: "M18.5 3.5v2M18.5 8.5v2M16 6h2M19 6h2", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" },
  ]},
  globe: { viewBox: "0 0 24 24", paths: [
    { d: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", fill: "none", stroke: "currentColor", strokeWidth: 1.6 },
    { d: "M4.5 12h15M12 4.1c2.05 2.12 3.2 4.97 3.2 7.9S14.05 17.78 12 19.9M12 4.1C9.95 6.22 8.8 9.07 8.8 12S9.95 17.78 12 19.9", fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round", strokeLinejoin: "round" },
  ]},
};

const SECTION_LABELS = {
  overview: { en: "Overview", zh: "總覽" },
  timeline: { en: "Timeline", zh: "時間線" },
  mechanism: { en: "Mechanism", zh: "問題機制" },
  people: { en: "Actors", zh: "角色網絡" },
  campaigns: { en: "Campaigns", zh: "行動設計" },
  government: { en: "Government", zh: "政府回應" },
  strategy: { en: "Strategy", zh: "策略答案" },
  discussion: { en: "Discussion", zh: "課堂應對" },
};

const HERO = {
  eyebrow: { en: "Case infrastructure for reading, discussion, and revision", zh: "用於閱讀、討論與複習的案例基礎架構" },
  title: { en: "Social Advocacy and Guerrilla Marketing: The No Fly List Kids Canada", zh: "社會倡議與游擊式行銷：加拿大 No Fly List Kids" },
  summary: {
    en: "This is not just a story about attention. It is a case about how attention became organized pressure, and how organized pressure became policy movement. By November 2018, the key issue was no longer awareness. It was implementation.",
    zh: "這不只是關於 attention 的故事，而是 attention 如何變成有組織的施壓，又如何進一步推動政策移動的案例。到了 2018 年 11 月，核心問題已不再是 awareness，而是 implementation。",
  },
};

const SECTION_NOTES = {
  overview: { en: "Core thesis, case boundary, and the numbers worth remembering.", zh: "先抓主論點、案例邊界，以及最值得記住的數字。" },
  timeline: { en: "A dual-track view of campaign escalation and policy movement.", zh: "用雙軌方式看 campaign 升級與政策移動。" },
  mechanism: { en: "The operating problem, why PPIO was insufficient, and what a real fix required.", zh: "看懂運作問題、PPIO 的侷限，以及真正解方需要甚麼。" },
  people: { en: "Who did what, and why role clarity became a hidden advantage.", zh: "關鍵人物各自做了甚麼，及分工如何成為隱性優勢。" },
  campaigns: { en: "Three campaigns, three different jobs, and one broader conversion system.", zh: "三個 campaign，各自不同任務，共同形成轉換系統。" },
  government: { en: "A fair reading of state response, partial progress, and trust breakdown.", zh: "平衡評估政府回應、有限進展與信任轉折。" },
  strategy: { en: "The strongest short-term and long-term answers supported by the case.", zh: "從 case evidence 推出的短期與長期最佳策略答案。" },
  discussion: { en: "The safest opening, framing moves, and Q&A prompts for class.", zh: "課堂上最穩的開場、框架語句與 Q&A 問題。" },
};


const STICKY_SUMMARY = {
  overview: {
    thesis: {
      en: "The case turns on a shift from awareness to implementation. By November 2018, visibility was no longer the main constraint.",
      zh: "這個案例的核心在於從 awareness 轉向 implementation。到了 2018 年 11 月，可見度已不是主要限制。"
    },
    numbers: [
      { en: "CA$81.4M budget", zh: "8,140 萬加幣預算" },
      { en: "230 MPs", zh: "230 位 MP" },
      { en: "CA$250K+ absorbed", zh: "已投入超過 25 萬加幣" },
    ],
    oral: {
      en: "I would open by saying NFLK had already won attention and budget approval. The real question in late 2018 was whether those gains would become a functioning redress system.",
      zh: "我會先說，NFLK 已經贏得 attention 與預算核定。2018 年底真正要回答的，是這些成果能否變成可運作的 redress system。"
    },
  },
  timeline: {
    thesis: {
      en: "The timeline matters because campaign escalation and policy movement were happening together, not in separate stories.",
      zh: "時間線重要，是因為 campaign 升級與政策移動是同時發生的，不是兩條無關的故事。"
    },
    numbers: [
      { en: "Dec 31, 2015 tweet", zh: "2015 年 12 月 31 日推文" },
      { en: "Nov 6, 2017 Hill Day", zh: "2017 年 11 月 6 日 Hill Day" },
      { en: "Feb 27, 2018 budget", zh: "2018 年 2 月 27 日預算" },
    ],
    oral: {
      en: "I would frame the timeline as a move from viral attention, to organized advocacy, to political conversion, and finally to implementation risk.",
      zh: "我會把時間線框成：病毒式 attention、有組織倡議、政治轉換，最後走到 implementation risk。"
    },
  },
  mechanism: {
    thesis: {
      en: "NFLK was confronting a systemic identity-matching problem, not a one-off airport inconvenience.",
      zh: "NFLK 面對的是制度性的身分比對失靈，不是單一機場小插曲。"
    },
    numbers: [
      { en: "2,000 listed names", zh: "約 2,000 個名單名字" },
      { en: "~50 per name", zh: "每個名字約 50 人" },
      { en: "100,000 estimated matches", zh: "估計 100,000 人受影響" },
    ],
    oral: {
      en: "My core point here would be that PPIO signaled responsiveness, but it did not provide the binding Canadian redress path that families actually needed.",
      zh: "我在這一段的核心會是：PPIO 代表政府有在回應，但它沒有提供家庭真正需要、具拘束力的加拿大 redress path。"
    },
  },
  people: {
    thesis: {
      en: "NFLK became more effective as family frustration turned into a role-divided advocacy system.",
      zh: "當家庭挫折轉成有角色分工的倡議系統後，NFLK 才真正變得更有效。"
    },
    numbers: [
      { en: "Core parents", zh: "核心家長組織者" },
      { en: "PR, legal, French support", zh: "PR、法律、法語支援" },
      { en: "National reach", zh: "全國性擴張" },
    ],
    oral: {
      en: "I would stress that role clarity was a hidden advantage. Different people carried communications, politics, legal support, and bilingual outreach.",
      zh: "我會強調角色分工是隱性優勢。不同人分別承擔溝通、政治、法律與雙語外展。"
    },
  },
  campaigns: {
    thesis: {
      en: "The three guerrilla campaigns worked because they solved different communication problems rather than repeating the same tactic.",
      zh: "三個 guerrilla campaigns 之所以有效，是因為它們分別解決了不同的溝通問題，而不是重複同一招。"
    },
    numbers: [
      { en: "338 paper airplanes", zh: "338 架紙飛機" },
      { en: "2/3 of Parliament wrote", zh: "約三分之二國會成員寫信" },
      { en: "100,000 as city scale", zh: "100,000 轉成城市規模" },
    ],
    oral: {
      en: "If called on, I would say Baby Name broadened identification, Paper Airplane drove political conversion, and 100,000 Cities made scale legible.",
      zh: "若被點到，我會直接說：Baby Name 擴大認同，Paper Airplane 促成政治轉換，100,000 Cities 讓規模變得可讀。"
    },
  },
  government: {
    thesis: {
      en: "The fairest reading is that the government moved, but mostly under sustained outside pressure.",
      zh: "最公平的解讀是：政府確實有動，但多半是在持續的制度外壓力下才推進。"
    },
    numbers: [
      { en: "PPIO created", zh: "PPIO 已成立" },
      { en: "2017 budget: no funding", zh: "2017 預算：沒有 funding" },
      { en: "2018 budget: CA$81.4M", zh: "2018 預算：8,140 萬加幣" },
    ],
    oral: {
      en: "I would avoid saying the government was absent. A better answer is that it was responsive but incomplete, and NFLK made delay politically harder.",
      zh: "我不會說政府完全缺席。更好的答案是，政府有回應，但不完整，而 NFLK 讓延後處理的政治成本變高。"
    },
  },
  strategy: {
    thesis: {
      en: "The best answer is disciplined continuation, not endless expansion.",
      zh: "最佳答案是有紀律地持續，而不是無限擴張。"
    },
    numbers: [
      { en: "Bill C-59 still pending", zh: "Bill C-59 仍待通過" },
      { en: "230-MP support base", zh: "230 位 MP 支持基礎" },
      { en: "Finite family resources", zh: "家庭資源有限" },
    ],
    oral: {
      en: "My short answer would be that NFLK should use Hill Day as an implementation push: move Bill C-59, activate supportive MPs, and demand a public roadmap.",
      zh: "我的簡短答案會是：NFLK 應把 Hill Day 當成 implementation push，推 Bill C-59、動員支持 MPs，並要求公開 roadmap。"
    },
  },
  discussion: {
    thesis: {
      en: "The safest class position is precise, balanced, and clearly anchored in case-time evidence.",
      zh: "課堂上最穩的立場，是精準、平衡，而且清楚錨定在案例當時的證據。"
    },
    numbers: [
      { en: "Case-time only", zh: "只用案例當時資訊" },
      { en: "Fact first, analysis framed", zh: "先事實，再框架分析" },
      { en: "One clean opening", zh: "一個乾淨開場立場" },
    ],
    oral: {
      en: "I would open with the implementation shift, then say the best short-term move was focused pressure on Bill C-59 rather than another generic awareness push.",
      zh: "我會先講 implementation shift，再接著說，最好的短期做法是集中施壓 Bill C-59，而不是再做一次泛泛的 awareness push。"
    },
  },
};

const READING_PATH = [
  { en: "Start with the decision point so the whole case is anchored in November 2018 rather than in the earlier awareness phase.", zh: "先看決策點，把整個案例固定在 2018 年 11 月，而不是停留在早期 awareness 階段。" },
  { en: "Use the dual-track timeline next so the campaign and the policy process stay connected in your head.", zh: "接著看雙軌時間線，讓 campaign 與政策進程在腦中保持連動。" },
  { en: "Then compare the three guerrilla campaigns by job, not by surface creativity alone.", zh: "再把三個 guerrilla campaign 按任務比較，而不是只看表面創意。" },
  { en: "End with strategy and discussion so you can convert reading into a class-ready position.", zh: "最後看策略與課堂應答，將閱讀直接轉成可發言立場。" },
];

const CAMPAIGN_SCOREBOARD = [
  {
    title: { en: "Baby Name", zh: "Baby Name" },
    note: { en: "Best at broadening identification", zh: "最擅長擴大認同與共感" },
    tone: "blue",
    scores: [
      { label: { en: "Public identification", zh: "公眾認同" }, value: 5 },
      { label: { en: "Political conversion", zh: "政治轉換" }, value: 2 },
      { label: { en: "Scale legibility", zh: "規模可讀性" }, value: 3 },
      { label: { en: "Repeatability", zh: "重複操作性" }, value: 4 },
    ],
  },
  {
    title: { en: "Paper Airplane", zh: "Paper Airplane" },
    note: { en: "Best at visible political action", zh: "最擅長促成可見政治行動" },
    tone: "green",
    scores: [
      { label: { en: "Public identification", zh: "公眾認同" }, value: 3 },
      { label: { en: "Political conversion", zh: "政治轉換" }, value: 5 },
      { label: { en: "Scale legibility", zh: "規模可讀性" }, value: 3 },
      { label: { en: "Repeatability", zh: "重複操作性" }, value: 2 },
    ],
  },
  {
    title: { en: "100,000 Cities", zh: "100,000 Cities" },
    note: { en: "Best at making scale feel real", zh: "最擅長把規模變得具體" },
    tone: "amber",
    scores: [
      { label: { en: "Public identification", zh: "公眾認同" }, value: 3 },
      { label: { en: "Political conversion", zh: "政治轉換" }, value: 3 },
      { label: { en: "Scale legibility", zh: "規模可讀性" }, value: 5 },
      { label: { en: "Repeatability", zh: "重複操作性" }, value: 4 },
    ],
  },
];

const IMPLEMENTATION_DASHBOARD = [
  { title: { en: "Legislative dependence", zh: "立法依賴風險" }, value: 88, tone: "rust", text: { en: "Bill C-59 still needed to move before the parliamentary window closed.", zh: "Bill C-59 仍需在國會時程關閉前往前推進。" } },
  { title: { en: "Administrative buildout", zh: "行政建置風險" }, value: 74, tone: "amber", text: { en: "Budget approval alone did not create a working redress system.", zh: "預算核定本身，不會自動變成可運作的 redress system。" } },
  { title: { en: "Resource fatigue", zh: "資源疲勞風險" }, value: 82, tone: "plum", text: { en: "NFLK had no outside funding and had already absorbed major personal and volunteer costs.", zh: "NFLK 沒有外部資金，而且已承擔高額個人與志工成本。" } },
  { title: { en: "Political turnover", zh: "政治更替風險" }, value: 79, tone: "blue", text: { en: "The 2019 election created continuity risk even after the budget win.", zh: "即使預算已到位，2019 選舉仍帶來延續性風險。" } },
];

const STAT_CARDS = [
  { icon: "clock", color: "blue", value: { en: "3 years", zh: "3 年" }, label: { en: "Campaign duration before the November 2018 decision point", zh: "到 2018 年 11 月決策點前的倡議期" } },
  { icon: "building", color: "green", value: { en: "CA$81.4M", zh: "8,140 萬加幣" }, label: { en: "Federal budget committed to build and operate a redress system", zh: "聯邦預算已編列用於建立與運作 redress system 的金額" } },
  { icon: "mail", color: "amber", value: { en: "230 MPs", zh: "230 位 MP" }, label: { en: "Written support across all five political parties", zh: "橫跨五個政黨的書面支持" } },
  { icon: "plane", color: "rust", value: { en: "338 planes", zh: "338 架紙飛機" }, label: { en: "One plane for every MP in the Paper Airplane Campaign", zh: "Paper Airplane Campaign 對應每位 MP 的實體接觸" } },
  { icon: "users", color: "plum", value: { en: "100,000 est.", zh: "估計 100,000 人" }, label: { en: "Estimated scale of mistaken flags used in the 100,000 Cities Campaign", zh: "100,000 Cities Campaign 用來具象化問題規模的估計值" } },
  { icon: "alert", color: "rust", value: { en: "CA$250K+", zh: "超過 25 萬加幣" }, label: { en: "Personal spending, pro bono support, and volunteer effort already absorbed", zh: "成員已承擔的個人支出、無償專業協助與志工投入" } },
];

const CASE_BOUNDARY = [
  { icon: "shield", title: { en: "Case-time discipline", zh: "案例時間邊界" }, body: { en: "All interpretation here stops at the case moment in November 2018. The page is built for class discussion and should not rely on later hindsight.", zh: "此頁所有判讀都停在 2018 年 11 月的案例時間點，目的在於課堂討論，因此不依賴後續事後資訊。" } },
  { icon: "scale", title: { en: "Balanced judgment", zh: "平衡評估" }, body: { en: "The government was not absent, but its response was incomplete and often slow. NFLK mattered because it made the issue politically unavoidable.", zh: "政府並非毫無作為，但其回應並不完整且速度偏慢。NFLK 的關鍵作用，在於讓這個議題在政治上變得無法忽視。" } },
  { icon: "spark", title: { en: "Reader-first design", zh: "以讀者理解為先" }, body: { en: "The structure below converts dense text into decision logic, causal flow, audience maps, and campaign comparisons so the case becomes easier to study and discuss.", zh: "下方結構把原本較密的文字轉成決策邏輯、因果流程、受眾地圖與 campaign 比較，讓案例更容易閱讀、理解與討論。" } },
];

const DECISION_POINT = {
  title: { en: "The decision point in one screen", zh: "用一個畫面抓住決策點" },
  thesis: { en: "NFLK had already won money. The real problem was converting budget approval into an implemented redress system before time, politics, and fatigue closed the window.", zh: "NFLK 已經贏得預算，但真正問題在於，能否在時間、政治變動與組織疲勞關上窗口之前，把預算核定真正轉成可落地的 redress system。" },
  items: [
    { icon: "check", label: { en: "What had been won", zh: "已經贏到的成果" }, body: { en: "Federal funding of CA$81.4 million was included in the February 27, 2018 budget.", zh: "2018 年 2 月 27 日聯邦預算已納入 8,140 萬加幣。" } },
    { icon: "alert", label: { en: "What still blocked implementation", zh: "仍然卡住落地的因素" }, body: { en: "Bill C-59 still needed to pass because the redress system depended on it.", zh: "Bill C-59 仍需通過，因為 redress system 的落地與其直接相關。" } },
    { icon: "clock", label: { en: "Why urgency mattered", zh: "為何時間如此重要" }, body: { en: "If the bill missed the parliamentary calendar ending in June 2019, the group could be forced to start again.", zh: "若未能趕上 2019 年 6 月結束的國會時程，整件事可能必須重新來過。" } },
    { icon: "users", label: { en: "Why expansion was risky", zh: "為何不能無限擴張" }, body: { en: "NFLK had no outside funding and could not sustain open-ended advocacy indefinitely.", zh: "NFLK 沒有外部資金，無法無限期維持開放式倡議。" } },
  ],
};

const TIMELINE = [
  { year: "2009-2013", leftTitle: { en: "Early warning signs", zh: "早期警訊" }, leftBody: { en: "Adam was flagged for extra screening as early as six weeks old, again at 18 months, and Cajee wrote to the Ministry of Transportation in 2013.", zh: "Adam 在六週大時就被額外安檢，18 個月時再度被攔，Cajee 也曾於 2013 年致函交通部。" }, rightTitle: { en: "No system fix yet", zh: "制度尚未修正" }, rightBody: { en: "The problem existed well before the public campaign. Families were dealing with recurring friction without a Canadian redress solution.", zh: "問題在公開倡議之前就已存在，各家庭長期承受反覆摩擦，但加拿大仍沒有 redress solution。" } },
  { year: "Dec 2015-Jan 2016", leftTitle: { en: "Tweet, media, network formation", zh: "推文爆開，媒體跟進，網絡成形" }, leftBody: { en: "Ahmed’s airport tweet went viral. Global National and later other outlets covered the issue. Families found one another through social media.", zh: "Ahmed 在機場發出的推文爆紅，Global National 與其他媒體跟進報導，受影響家庭也因社群媒體而彼此找到。" }, rightTitle: { en: "NFLK formally emerges", zh: "NFLK 正式出現" }, rightBody: { en: "Cajee’s January 6 email became the first official NFLK communication. Khan built the group’s Twitter and Facebook accounts.", zh: "Cajee 在 1 月 6 日寄出的 email 成為 NFLK 第一封正式訊息，Khan 也建立了官方 Twitter 與 Facebook 帳號。" } },
  { year: "May 2016-Jan 2017", leftTitle: { en: "Government acknowledgement", zh: "政府開始承認問題" }, leftBody: { en: "Goodale announced a Redress Working Group and then the Passenger Protect Inquiries Office, signalling movement but not a full solution.", zh: "Goodale 宣布成立 Redress Working Group，之後又設置 Passenger Protect Inquiries Office，代表政府開始動，但仍不是完整解法。" }, rightTitle: { en: "PPIO proves inadequate", zh: "PPIO 被證明不足" }, rightBody: { en: "Families learned that the office mostly redirected people to existing workarounds such as U.S. TRIP or airline loyalty cards.", zh: "家庭後來發現，該辦公室多半只是把人導向既有替代方案，例如美國的 TRIP 或航空公司會員卡。" } },
  { year: "Mar-Nov 2017", leftTitle: { en: "Budget loss and regrouping", zh: "2017 預算失敗，團體重整" }, leftBody: { en: "When the 2017 budget produced no funding, NFLK regrouped, launched a letter-writing campaign, and contacted MPs across parties while staying non-controversial.", zh: "2017 預算沒有給出 funding 之後，NFLK 重新整隊，發起 letter-writing campaign，並以不具爭議的姿態跨黨接觸 MPs。" }, rightTitle: { en: "Turning point after the Bardsley correction", zh: "Bardsley correction 成為轉折點" }, rightBody: { en: "After Public Safety’s correction to the Globe and Mail, NFLK felt less able to trust quiet cooperation and increased pressure through media and allies.", zh: "Public Safety 對 Globe and Mail 發出 correction 後，NFLK 對低調合作的信任下降，並開始透過媒體與盟友加大施壓。" } },
  { year: "Late 2017-Early 2018", leftTitle: { en: "Hearings, Hill Day, guerrilla campaigns", zh: "聽證、Hill Day 與 guerrilla campaigns" }, leftBody: { en: "Parliamentary testimony, the first Hill Day, the Baby Name Campaign, the Paper Airplane Campaign, and the 100,000 Cities Campaign pushed the issue from sympathy to political action.", zh: "國會作證、第一次 Hill Day、Baby Name、Paper Airplane、100,000 Cities 等行動，把議題從同情推進到政治行動。" }, rightTitle: { en: "Political support hardens", zh: "政治支持逐步成形" }, rightBody: { en: "The group secured written support from 230 MPs across five parties and met Finance Minister Morneau eight days before the budget.", zh: "團體成功獲得五黨、230 位 MP 的書面支持，並在預算前八天與財政部長 Morneau 會面。" } },
  { year: "Feb-Nov 2018", leftTitle: { en: "Budget victory", zh: "預算勝利" }, leftBody: { en: "The February 27, 2018 budget included CA$81.4 million to build and operate a redress system, later followed by a meeting with Trudeau on August 31.", zh: "2018 年 2 月 27 日聯邦預算納入 8,140 萬加幣，之後 NFLK 亦於 8 月 31 日與 Trudeau 會面。" }, rightTitle: { en: "Implementation risk becomes central", zh: "implementation risk 變成核心" }, rightBody: { en: "By November 2018 the fight had shifted. The question was no longer whether the issue mattered. It was whether the promised fix would actually happen.", zh: "到了 2018 年 11 月，戰場已經改變。問題不再是此議題有沒有被看見，而是承諾的修正究竟會不會真的發生。" } },
];

const FAILURE_FLOW = [
  { icon: "users", title: { en: "Shared or similar names", zh: "姓名與名單相近或重複" }, body: { en: "Children and innocent travellers were caught because their names resembled names on the DHP list.", zh: "兒童與無辜旅客因姓名與 DHP 名單相似，而被錯誤攔下。" } },
  { icon: "alert", title: { en: "Airport screening burden", zh: "機場端的額外安檢負擔" }, body: { en: "The practical result was repeated secondary screening, boarding friction, and stigma for very young children.", zh: "實際後果是反覆的二次安檢、登機摩擦，以及加諸在年幼孩子身上的污名。" } },
  { icon: "building", title: { en: "No binding operational fix", zh: "沒有具拘束力的操作性修正" }, body: { en: "Early guidance to airlines was not legally binding, so the core problem remained inside the operating system.", zh: "早期對航空公司的指引沒有法律拘束力，因此核心問題仍然留在系統本身。" } },
  { icon: "map", title: { en: "No Canadian redress path", zh: "加拿大缺乏 redress path" }, body: { en: "Without a Canadian equivalent to U.S. TRIP, innocent travellers could not reliably clear their identities in advance.", zh: "在沒有類似美國 TRIP 的加拿大 redress path 之前，無辜旅客無法穩定地事前排除錯誤身分比對。" } },
];

const REDRESS_COMPARE = [
  { name: { en: "U.S. TRIP", zh: "美國 TRIP" }, good: { en: "Provides an identity verification path for mistaken matches.", zh: "可讓誤判旅客有身分驗證與排除的途徑。" }, limit: { en: "It was a U.S. system, not a Canadian solution for Canadian children.", zh: "它是美國制度，不是加拿大兒童的加拿大解法。" } },
  { name: { en: "PPIO", zh: "PPIO" }, good: { en: "Showed the government was responding and set up a visible office.", zh: "代表政府至少開始回應，也設置了可見的行政窗口。" }, limit: { en: "It mainly redirected people to workarounds that already existed and did not solve the root problem.", zh: "它主要把人導向既有替代方式，並未解決根本問題。" } },
  { name: { en: "Desired Canadian redress system", zh: "目標中的加拿大 redress system" }, good: { en: "Would prevent innocent people from being repeatedly flagged during booking and travel.", zh: "理想上可避免無辜者在訂票與旅行過程中持續被誤攔。" }, limit: { en: "It still required legislation, funding, administrative buildout, and implementation discipline.", zh: "但它仍然需要立法、預算、行政建置與執行紀律。" } },
];

const PEOPLE = [
  { icon: "users", name: { en: "Sulemaan Ahmed and Khadija Cajee", zh: "Sulemaan Ahmed 與 Khadija Cajee" }, role: { en: "Central organizers and the public face of the case opening.", zh: "最核心的組織者，也是案例開端的主要對外人物。" } },
  { icon: "hashtag", name: { en: "Zamir Khan", zh: "Zamir Khan" }, role: { en: "Early parent organizer who built NFLK’s official Twitter and Facebook accounts.", zh: "最早參與的家長之一，並建立 NFLK 的官方 Twitter 與 Facebook 帳號。" } },
  { icon: "megaphone", name: { en: "Dawn Matthews", zh: "Dawn Matthews" }, role: { en: "PR-trained campaign designer who drove the Baby Name, Paper Airplane, and 100,000 Cities campaigns.", zh: "具有 PR 背景的 campaign 設計者，主導 Baby Name、Paper Airplane、100,000 Cities 三項行動。" } },
  { icon: "map", name: { en: "Amber Cammish", zh: "Amber Cammish" }, role: { en: "Important for generating political support in western Canada.", zh: "對西加拿大的政治支持動員特別重要。" } },
  { icon: "book", name: { en: "Émilie Gascon-Léger", zh: "Émilie Gascon-Léger" }, role: { en: "French-language translator and outreach lead who expanded national reach.", zh: "法語翻譯與外展主力，讓倡議規模更具全國性。" } },
  { icon: "scale", name: { en: "Sheila Block, Danny Assaf, Khalid Elgazzar", zh: "Sheila Block、Danny Assaf、Khalid Elgazzar" }, role: { en: "Legal support and pro bono counsel, including a possible Charter-based path if legislation stalled.", zh: "提供法律協助與無償顧問，並保留若立法受阻時的 Charter 路徑。" } },
  { icon: "quote", name: { en: "Lauren Ferraro and Flavio Volpe", zh: "Lauren Ferraro 與 Flavio Volpe" }, role: { en: "Helped with speaking preparation, political process navigation, and Hill Day execution.", zh: "協助演說準備、政治流程理解與 Hill Day 執行。" } },
];

const CAMPAIGN_CARDS = [
  { title: { en: "Baby Name Campaign", zh: "Baby Name Campaign" }, audience: { en: "Main audience: general public", zh: "主要受眾：一般公眾" }, job: { en: "Communication job: show that the issue was broader, more ordinary, and not limited to a small set of Muslim families.", zh: "溝通任務：讓外界理解這不是只影響少數穆斯林家庭，而是一個更廣、更日常、更可共感的問題。" }, evidence: { en: "Used baby photos, flagged names, and the number of Canadians sharing each name. The David Smith example made the logic concrete.", zh: "用嬰兒照片、被誤判名字，以及共享同名的加拿大人人數來呈現，像 David Smith 的例子就讓邏輯非常具體。" }, strength: { en: "Strong at widening identification and humanizing the problem.", zh: "強項在於擴大認同感，並把議題具體人性化。" }, limit: { en: "Public sympathy alone did not guarantee budget or legislative movement.", zh: "但公眾同情本身，並不直接等於預算與立法推進。" }, color: "blue" },
  { title: { en: "Paper Airplane Campaign", zh: "Paper Airplane Campaign" }, audience: { en: "Main audience: MPs before the budget vote", zh: "主要受眾：預算表決前的 MPs" }, job: { en: "Communication job: convert awareness into visible, low-friction political action.", zh: "溝通任務：把 awareness 轉成可見、低摩擦、可執行的政治行動。" }, evidence: { en: "338 hand-folded planes were mailed, some MPs posted them publicly, and roughly two-thirds of Parliament wrote support letters.", zh: "共寄出 338 架手折紙飛機，部分 MPs 主動公開貼文，約三分之二國會成員寫信表示支持。" }, strength: { en: "This was the clearest tactical conversion device in the case.", zh: "這是整個案例中最清楚的戰術轉換裝置。" }, limit: { en: "It required heavy manual labour and was not infinitely scalable.", zh: "缺點是高度仰賴人工製作，無法無限擴張。" }, color: "green" },
  { title: { en: "100,000 Cities Campaign", zh: "100,000 Cities Campaign" }, audience: { en: "Main audience: politicians and local opinion leaders", zh: "主要受眾：政治人物與地方意見節點" }, job: { en: "Communication job: turn an abstract estimate into a geographic image people could immediately feel.", zh: "溝通任務：把抽象估計數字轉成地理畫面，讓人一眼理解規模。" }, evidence: { en: "The campaign compared the estimated 100,000 affected people with whole city populations such as Nanaimo and Cape Breton Island.", zh: "它把估計的 100,000 名受影響者，對照到 Nanaimo、Cape Breton Island 等整個城市的人口。" }, strength: { en: "It made scale legible and resonated especially with politicians.", zh: "它讓規模變得可讀，對政治人物特別有效。" }, limit: { en: "The number remained an estimate, not a census count.", zh: "但這個數字畢竟是估計值，不是人口普查。" }, color: "amber" },
];

const EXHIBIT_RECONSTRUCTIONS = [
  {
    kind: "baby",
    tone: "blue",
    title: { en: "Baby Name mini exhibit", zh: "Baby Name 小型示意圖" },
    fact: { en: "Public-facing visual: baby photo, flagged name, and the number of Canadians who shared that name.", zh: "面向公眾的視覺：嬰兒照片、被誤判名字，以及共享同名的加拿大人人數。" },
    caption: { en: "Built to widen identification and show the problem was broader than a few visible families.", zh: "核心作用是擴大認同，讓外界理解這不是只有少數可見家庭的問題。" },
  },
  {
    kind: "plane",
    tone: "green",
    title: { en: "Paper Airplane mini exhibit", zh: "Paper Airplane 小型示意圖" },
    fact: { en: "MP-targeted object: 338 hand-folded planes, one for each MP, with children’s faces visible on the wings.", zh: "針對 MPs 的實體物件：共 338 架手折紙飛機，每位 MP 一架，機翼上可見孩子照片。" },
    caption: { en: "Built for conversion to action. The strongest case signal is that about two-thirds of Parliament wrote support letters.", zh: "核心作用是促成行動。案例裡最強的訊號，是約三分之二國會成員最後寫信支持。" },
  },
  {
    kind: "cities",
    tone: "amber",
    title: { en: "100,000 Cities mini exhibit", zh: "100,000 Cities 小型示意圖" },
    fact: { en: "Scale translation visual: the estimated 100,000 affected people were compared with city populations such as Nanaimo and Cape Breton Island.", zh: "把抽象規模翻成地理畫面：將估計 100,000 名受影響者，對照到 Nanaimo、Cape Breton Island 等城市人口。" },
    caption: { en: "Built to make scale feel concrete, especially for politicians and local opinion leaders.", zh: "核心作用是讓規模變具體，對政治人物與地方意見節點尤其有效。" },
  },
];

const MEDIA_LOGIC = [
  { title: { en: "Digital media", zh: "數位媒體" }, bullets: [
    { en: "Created speed, low-cost reach, and direct access to policymakers and journalists.", zh: "帶來速度、低成本擴散，以及直接接觸官員與媒體的能力。" },
    { en: "Twitter was best for public signaling, tagging, thanking, and distributing campaign assets.", zh: "Twitter 最適合對外表態、標記官員、公開致謝，以及散佈 campaign 素材。" },
    { en: "Facebook was especially useful for coordination among affected families.", zh: "Facebook 特別適合受影響家庭之間的協調與溝通。" },
  ], color: "blue" },
  { title: { en: "Traditional media", zh: "傳統媒體" }, bullets: [
    { en: "Added legitimacy, scale, and public recognition to the issue.", zh: "補上了正當性、規模感與公共認可。" },
    { en: "Global National and the Globe and Mail helped move the story from private frustration to public problem.", zh: "Global National 與 Globe and Mail 把私人困擾推升為公共問題。" },
    { en: "Its weakness was weaker control over framing, shown clearly by the Bardsley correction incident.", zh: "缺點是 framing 控制較弱，Bardsley correction 就是明顯例子。" },
  ], color: "rust" },
  { title: { en: "Guerrilla execution", zh: "游擊式執行" }, bullets: [
    { en: "Added memorability, metaphor, and tactical conversion rather than just exposure.", zh: "它提供的不是單純曝光，而是記憶點、隱喻與戰術轉換。" },
    { en: "The strongest campaign was the one that most clearly moved political actors to act.", zh: "最強的 campaign，就是最能把政治人物推向實際行動的那一個。" },
    { en: "These campaigns mattered because they were part of a larger advocacy system, not because any one alone solved the problem.", zh: "這些 campaign 的價值在於它們嵌在更大的倡議系統裡，而不是單一行動就能解決問題。" },
  ], color: "green" },
];

const GOVERNMENT_ROWS = [
  { move: { en: "Goodale’s early engagement and airline guidance", zh: "Goodale 的早期介入與對航空公司的指引" }, progress: { en: "Showed the issue had reached senior government attention.", zh: "代表議題已進入高層政府注意範圍。" }, limit: { en: "The guidance was not binding and did not fix the operating problem.", zh: "但該指引沒有拘束力，也沒有修正作業系統本身。" } },
  { move: { en: "Redress Working Group", zh: "Redress Working Group" }, progress: { en: "Acknowledged that a systemic fix was needed.", zh: "代表政府承認此事需要制度性修正。" }, limit: { en: "Recognition still stopped short of an implemented solution.", zh: "但承認問題不等於真正落地。" } },
  { move: { en: "Passenger Protect Inquiries Office", zh: "Passenger Protect Inquiries Office" }, progress: { en: "Created a visible administrative office and signalled responsiveness.", zh: "提供一個看得見的行政窗口，也讓外界感到政府有反應。" }, limit: { en: "For families, it mostly redirected them to pre-existing workarounds and failed the root test.", zh: "但對家庭而言，它主要只是重新導向既有替代方案，沒有通過根本問題的測試。" } },
  { move: { en: "Committee recommendations and hearings", zh: "委員會建議與聽證" }, progress: { en: "Moved the issue further into formal political process and gave NFLK a legitimate forum.", zh: "把議題更正式地推進到制度內，也給 NFLK 合法發聲的位置。" }, limit: { en: "Recommendations still required follow-through, political will, and budget action.", zh: "但建議本身仍需後續執行、政治意志與預算落實。" } },
  { move: { en: "2018 budget allocation", zh: "2018 預算編列" }, progress: { en: "This was the biggest policy movement in the case and a genuine victory.", zh: "這是案例中最大的政策移動，也是真正的勝利。" }, limit: { en: "Budget approval did not guarantee implementation. Bill C-59 and administrative execution still mattered.", zh: "但預算核定不保證 implementation，Bill C-59 與行政執行仍是關鍵。" } },
];

const MISSED_POINTS = [
  { en: "The case is not just about media visibility. The better reading is visibility converted into political conversion.", zh: "這個案例不只是媒體能見度，而是能見度如何被轉成政治行動。" },
  { en: "PPIO was a visible response, but for NFLK it was not a real solution.", zh: "PPIO 雖然是可見回應，但對 NFLK 而言並不是真正解法。" },
  { en: "The Bardsley correction changed the trust relationship and hardened NFLK’s pressure strategy.", zh: "Bardsley correction 改變了信任關係，也讓 NFLK 的施壓策略更強硬。" },
  { en: "French-language translation was not peripheral. It helped national scale and legitimacy.", zh: "法語翻譯不是邊角工作，而是全國化與正當性的重要推力。" },
  { en: "The campaign deliberately stayed non-controversial to keep broad political support available.", zh: "該團體刻意維持不具爭議性，才能保留跨黨政治支持空間。" },
  { en: "Paper Airplanes mattered because they lowered the cost of political participation for MPs.", zh: "Paper Airplanes 之所以重要，是因為它降低了 MPs 參與支持的成本。" },
  { en: "By November 2018 the strategic center had shifted from funding to implementation discipline.", zh: "到了 2018 年 11 月，策略中心已從 funding 轉成 implementation discipline。" },
];

const SHORT_TERM = [
  { title: { en: "Use Hill Day as an implementation push", zh: "把 Hill Day 當成 implementation push" }, body: { en: "The issue was no longer broad awareness. The message should now be urgency, execution, and accountability.", zh: "眼前焦點已不是廣泛 awareness，而是急迫性、執行力與問責。" }, icon: "target", tone: "blue" },
  { title: { en: "Press for Bill C-59", zh: "集中推動 Bill C-59" }, body: { en: "The group needed the relevant legislation to move before the parliamentary window closed.", zh: "在國會時程關閉之前，相關立法必須往前推進。" }, icon: "scale", tone: "rust" },
  { title: { en: "Activate the existing 230-MP network", zh: "啟動既有的 230 位 MP 網絡" }, body: { en: "The strongest move was to convert already proven political support into renewed pressure on senators and officials.", zh: "最強的做法，是把已被證明存在的政治支持，再次轉成對 senators 與官員的施壓。" }, icon: "mail", tone: "green" },
  { title: { en: "Ask for a public roadmap", zh: "要求公開 implementation roadmap" }, body: { en: "A concrete sequence of legislative and administrative milestones would let NFLK monitor without promising endless activism.", zh: "要求清楚的立法與行政里程碑，能讓 NFLK 在不承諾無限期行動的前提下持續監督。" }, icon: "book", tone: "amber" },
];

const LONG_TERM = [
  { title: { en: "Selective continuity, not endless expansion", zh: "有選擇地持續，而非無限擴張" }, body: { en: "NFLK should shift into a lower-cost monitoring mode once the immediate implementation push is made.", zh: "在短期 implementation push 完成後，NFLK 應轉入較低成本的監督模式。" }, icon: "layers", tone: "plum" },
  { title: { en: "Track implementation milestones", zh: "追蹤 implementation milestones" }, body: { en: "Bill C-59, administrative buildout, and execution updates should remain visible and monitored.", zh: "Bill C-59、行政建置與執行進度都應持續被看見並被追蹤。" }, icon: "clock", tone: "blue" },
  { title: { en: "Prepare a concise briefing for new officials", zh: "預備給新官員的精簡 briefing" }, body: { en: "With elections approaching in 2019, turnover risk made continuity materials strategically useful.", zh: "2019 選舉將至，政治更替風險讓 continuity materials 變得非常實用。" }, icon: "book", tone: "amber" },
  { title: { en: "Keep the legal option in reserve", zh: "保留法律路徑作為後備" }, body: { en: "If implementation stalled, legal pressure remained a credible fallback.", zh: "若 implementation 停滯，法律施壓仍是可信的後備方案。" }, icon: "scale", tone: "rust" },
];

const SPEAKING = {
  title: { en: "Safest oral position if you are cold-called", zh: "若被 cold-call，最穩的口頭立場" },
  opening: {
    en: "NFLK’s problem in November 2018 is no longer awareness. It is implementation. The group already proved it can generate visibility and sympathy. The next task is to convert political support and budget approval into a working redress system before legislative timing and electoral turnover close the window.",
    zh: "NFLK 在 2018 年 11 月的核心問題已經不是 awareness，而是 implementation。這個團體已經證明自己有能力創造能見度與公共同情。接下來的任務，是在立法時程與選舉更替把窗口關上之前，把政治支持與預算核定真正轉成可運作的 redress system。",
  },
  frames: [
    { label: { en: "When stating facts", zh: "當你在講 case facts 時" }, text: { en: "State dates, numbers, events, and exhibit evidence directly and confidently.", zh: "日期、數字、事件與 exhibit 證據，直接而自信地講。" } },
    { label: { en: "When giving analysis", zh: "當你在做分析時" }, text: { en: "Frame the point. Try phrases such as “Based on the case evidence,” “I would argue,” or “A reasonable next step would be.”", zh: "記得先框架。可用「Based on the case evidence」「I would argue」「A reasonable next step would be」等講法。" } },
    { label: { en: "When handling the tweet time inconsistency", zh: "當被問到推文時間不一致時" }, text: { en: "The safest move is to say “Ahmed’s December 31, 2015 tweet” and avoid the exact hour unless pressed.", zh: "最穩的講法是直接說「Ahmed 在 2015 年 12 月 31 日那則推文」，除非被追問，否則不要主動講小時。" } },
  ],
};

const QA = [
  { en: "Looking only from late 2018, what part of implementation worried you most after the budget was approved?", zh: "若只站在 2018 年底當時來看，預算通過後你們對 implementation 最擔心的是哪一部分？" },
  { en: "Which NFLK activity changed government response the most, and why?", zh: "在你們看來，NFLK 哪一項行動最明顯改變了政府回應，為甚麼？" },
  { en: "After the Bardsley correction, how did you decide how much to preserve the relationship with Public Safety versus increase pressure?", zh: "在 Bardsley correction 之後，你們是如何判斷要保留多少與 Public Safety 的關係，以及要把壓力加到甚麼程度？" },
  { en: "In the Paper Airplane Campaign, were you intentionally designing for conversion to action, or did the political response exceed expectations?", zh: "在 Paper Airplane Campaign 裡，你們是有意識地設計成促成行動的轉換工具，還是政治回應其實超出預期？" },
];

function Icon({ name, size = 18, className = "" }) {
  const icon = ICONS[name] || ICONS.book;
  return (
    <svg viewBox={icon.viewBox} width={size} height={size} className={className} fill="none" aria-hidden="true">
      {icon.paths.map((path, index) => <path key={`${name}-${index}`} {...path} />)}
    </svg>
  );
}

function labelForMode(copy, mode) {
  if (mode === "en") return copy.en;
  if (mode === "zh") return copy.zh;
  return `${copy.en} · ${copy.zh}`;
}

function DualLabel({ en, zh, mode, className = "", zhClassName = "" }) {
  if (mode === "bi") {
    return (
      <div className={`space-y-1 ${className}`}>
        <div>{en}</div>
        <div className={zhClassName}>{zh}</div>
      </div>
    );
  }
  return <div className={className}>{mode === "en" ? en : zh}</div>;
}

function TextBlock({ copy, mode, className = "", zhClassName = "" }) {
  if (mode === "bi") {
    return (
      <div className={`space-y-3 ${className}`}>
        <div>{copy.en}</div>
        <div className={`border-l-2 pl-4 ${zhClassName || "border-[#D6C9B9] text-[#5C5248]"}`}>{copy.zh}</div>
      </div>
    );
  }
  return <div className={className}>{mode === "en" ? copy.en : copy.zh}</div>;
}

function BulletList({ items, mode }) {
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-3">
          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-[#8F7A62]" />
          <TextBlock copy={item} mode={mode} className="text-sm leading-7 text-[#433C35]" zhClassName="border-[#E2D8C8] text-[#5C5248]" />
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ id, title, summary, mode }) {
  return (
    <div id={id} className="scroll-mt-24 space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight text-[#241F1A] md:text-[30px]">
        {mode === "bi" ? (
          <div className="space-y-1">
            <div>{title.en}</div>
            <div className="text-xl font-medium text-[#5D5349] md:text-2xl">{title.zh}</div>
          </div>
        ) : mode === "en" ? title.en : title.zh}
      </h2>
      <TextBlock copy={summary} mode={mode} className="max-w-4xl text-[15px] leading-7 text-[#4C443C]" zhClassName="border-[#D8CCBC] text-[#5A5047]" />
    </div>
  );
}

function StatCard({ item, mode }) {
  const soft = item.color === "green" ? PALETTE.greenSoft : item.color === "amber" ? PALETTE.amberSoft : item.color === "rust" ? PALETTE.rustSoft : item.color === "plum" ? PALETTE.plumSoft : PALETTE.blueSoft;
  const strong = item.color === "green" ? PALETTE.green : item.color === "amber" ? PALETTE.amber : item.color === "rust" ? PALETTE.rust : item.color === "plum" ? PALETTE.plum : PALETTE.blue;
  return (
    <div className="rounded-[24px] border border-[#E6DCCD] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,252,246,0.96))] p-4 shadow-[0_14px_36px_rgba(43,38,33,0.06)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(43,38,33,0.08)]">
      <div className="flex items-start gap-3">
        <div className="rounded-xl p-2" style={{ backgroundColor: soft, color: strong }}><Icon name={item.icon} size={18} /></div>
        <div>
          <div className="text-lg font-semibold text-[#241F1A]">{mode === "en" ? item.value.en : mode === "zh" ? item.value.zh : item.value.en}</div>
          <TextBlock copy={item.label} mode={mode} className="mt-1 text-sm leading-6 text-[#5B5148]" zhClassName="border-[#E3D8C8] text-[#695E55]" />
        </div>
      </div>
    </div>
  );
}

function BoundaryCard({ item, mode }) {
  return (
    <div className="rounded-[24px] border border-[#E5DACC] bg-[linear-gradient(180deg,#FFFFFF,#FFFCF7)] p-5 shadow-[0_10px_28px_rgba(43,38,33,0.035)]">
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-xl bg-[#F6F1E7] p-2 text-[#7A6653]"><Icon name={item.icon} size={18} /></div>
        <div className="space-y-2">
          <div className="text-base font-semibold text-[#241F1A]">{mode === "en" ? item.title.en : mode === "zh" ? item.title.zh : item.title.en}</div>
          <TextBlock copy={item.body} mode={mode} className="text-sm leading-7 text-[#514840]" zhClassName="border-[#E3D8C8] text-[#62574E]" />
        </div>
      </div>
    </div>
  );
}

function DecisionItem({ item, mode }) {
  const positive = item.icon === "check";
  return (
    <div className="rounded-[24px] border border-[#E5D9CB] bg-[linear-gradient(180deg,#FFFFFF,#FFFBF5)] p-5 shadow-[0_12px_30px_rgba(43,38,33,0.045)]">
      <div className="flex items-start gap-3">
        <div className={`rounded-xl p-2 ${positive ? "bg-[#EDF3EC] text-[#5B6D5B]" : "bg-[#F8EEE8] text-[#B35C44]"}`}><Icon name={item.icon} size={18} /></div>
        <div className="space-y-2">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#7D6E60]">{labelForMode(item.label, mode)}</div>
          <TextBlock copy={item.body} mode={mode} className="text-[15px] leading-7 text-[#433B34]" zhClassName="border-[#DDD2C2] text-[#5B5148]" />
        </div>
      </div>
    </div>
  );
}

function TimelineRow({ item, mode }) {
  return (
    <div className="grid gap-4 rounded-[30px] border border-[#E4D9CB] bg-[linear-gradient(180deg,#FFFFFF,#FFFCF8)] p-5 shadow-[0_12px_30px_rgba(43,38,33,0.04)] md:grid-cols-[104px_1fr_1fr] md:p-6">
      <div className="text-sm font-semibold tracking-[0.14em] text-[#7A6B5D] md:pt-1">{item.year}</div>
      <div className="rounded-2xl bg-[#FBF7EF] p-4">
        <div className="mb-2 text-base font-semibold text-[#2C2824]">{mode === "en" ? item.leftTitle.en : mode === "zh" ? item.leftTitle.zh : item.leftTitle.en}</div>
        <TextBlock copy={item.leftBody} mode={mode} className="text-sm leading-7 text-[#4E453D]" zhClassName="border-[#DDD2C2] text-[#5E544B]" />
      </div>
      <div className="rounded-2xl bg-[#F8FBFD] p-4">
        <div className="mb-2 text-base font-semibold text-[#2C2824]">{mode === "en" ? item.rightTitle.en : mode === "zh" ? item.rightTitle.zh : item.rightTitle.en}</div>
        <TextBlock copy={item.rightBody} mode={mode} className="text-sm leading-7 text-[#4E453D]" zhClassName="border-[#D7DEE5] text-[#5E544B]" />
      </div>
    </div>
  );
}

function FlowCard({ item, mode, last }) {
  return (
    <div className="relative flex-1">
      <div className="h-full rounded-[24px] border border-[#E5DACA] bg-[linear-gradient(180deg,#FFFFFF,#FFFCF7)] p-5 shadow-[0_10px_28px_rgba(43,38,33,0.035)]">
        <div className="mb-3 inline-flex rounded-xl bg-[#F5EFE4] p-2 text-[#7B6854]"><Icon name={item.icon} size={18} /></div>
        <div className="mb-2 text-base font-semibold text-[#241F1A]">{mode === "en" ? item.title.en : mode === "zh" ? item.title.zh : item.title.en}</div>
        <TextBlock copy={item.body} mode={mode} className="text-sm leading-7 text-[#4D453E]" zhClassName="border-[#E1D6C7] text-[#5E544B]" />
      </div>
      {!last ? <div className="absolute top-1/2 -right-6 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#DED3C3] bg-white text-[#8B7B69] shadow-sm lg:flex"><Icon name="arrowRight" size={18} /></div> : null}
    </div>
  );
}

function CompareCard({ item, mode }) {
  return (
    <div className="rounded-[24px] border border-[#E5DACA] bg-[linear-gradient(180deg,#FFFFFF,#FFFCF7)] p-5 shadow-[0_10px_28px_rgba(43,38,33,0.035)]">
      <div className="mb-3 text-base font-semibold text-[#241F1A]">{mode === "en" ? item.name.en : mode === "zh" ? item.name.zh : item.name.en}</div>
      <div className="space-y-3">
        <div className="rounded-xl bg-[#EEF5EE] p-3">
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#617361]">{mode === "zh" ? "有甚麼進展" : mode === "en" ? "What it did" : "What it did · 有甚麼進展"}</div>
          <TextBlock copy={item.good} mode={mode} className="text-sm leading-7 text-[#435245]" zhClassName="border-[#D8E5D8] text-[#536255]" />
        </div>
        <div className="rounded-xl bg-[#FBF1EC] p-3">
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#8A5F52]">{mode === "zh" ? "為何仍不足" : mode === "en" ? "Why it fell short" : "Why it fell short · 為何仍不足"}</div>
          <TextBlock copy={item.limit} mode={mode} className="text-sm leading-7 text-[#664A42]" zhClassName="border-[#E8D4CE] text-[#74564C]" />
        </div>
      </div>
    </div>
  );
}

function PersonCard({ item, mode }) {
  return (
    <div className="rounded-[24px] border border-[#E5DACC] bg-[linear-gradient(180deg,#FFFFFF,#FFFCF7)] p-5 shadow-[0_10px_28px_rgba(43,38,33,0.035)]">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-[#F6F0E7] p-2 text-[#7A6956]"><Icon name={item.icon} size={18} /></div>
        <div>
          <div className="mb-2 text-base font-semibold text-[#241F1A]">{mode === "en" ? item.name.en : mode === "zh" ? item.name.zh : item.name.en}</div>
          <TextBlock copy={item.role} mode={mode} className="text-sm leading-7 text-[#4D453E]" zhClassName="border-[#DDD2C2] text-[#5E544B]" />
        </div>
      </div>
    </div>
  );
}

function CampaignCard({ item, mode }) {
  const soft = item.color === "green" ? PALETTE.greenSoft : item.color === "amber" ? PALETTE.amberSoft : PALETTE.blueSoft;
  const strong = item.color === "green" ? PALETTE.green : item.color === "amber" ? PALETTE.amber : PALETTE.blue;
  const rows = [
    { label: { en: "Audience", zh: "受眾" }, value: item.audience },
    { label: { en: "Job", zh: "任務" }, value: item.job },
    { label: { en: "Evidence", zh: "案例證據" }, value: item.evidence },
    { label: { en: "Strength", zh: "強項" }, value: item.strength },
    { label: { en: "Limit", zh: "限制" }, value: item.limit },
  ];
  return (
    <div className="overflow-hidden rounded-[30px] border border-[#E4D9CB] bg-[linear-gradient(180deg,#FFFFFF,#FFFCF8)] shadow-[0_12px_32px_rgba(43,38,33,0.04)]">
      <div className="px-5 py-4" style={{ backgroundColor: soft }}><div className="text-lg font-semibold" style={{ color: strong }}>{mode === "en" ? item.title.en : mode === "zh" ? item.title.zh : item.title.en}</div></div>
      <div className="divide-y divide-[#EFE7DC]">
        {rows.map((row, idx) => (
          <div key={idx} className="grid gap-2 px-5 py-4 md:grid-cols-[120px_1fr]">
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#7A6B5D]">{labelForMode(row.label, mode)}</div>
            <TextBlock copy={row.value} mode={mode} className="text-sm leading-7 text-[#473F38]" zhClassName="border-[#E1D7C7] text-[#5D534A]" />
          </div>
        ))}
      </div>
    </div>
  );
}



function ExhibitIllustration({ kind, tone }) {
  const strong = tone === "green" ? PALETTE.green : tone === "amber" ? PALETTE.amber : tone === "rust" ? PALETTE.rust : tone === "plum" ? PALETTE.plum : PALETTE.blue;
  const soft = tone === "green" ? PALETTE.greenSoft : tone === "amber" ? PALETTE.amberSoft : tone === "rust" ? PALETTE.rustSoft : tone === "plum" ? PALETTE.plumSoft : PALETTE.blueSoft;
  const line = "#8E7F71";

  if (kind === "baby") {
    return (
      <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
        <rect x="0" y="0" width="320" height="180" rx="24" fill={soft} />
        <rect x="22" y="22" width="276" height="136" rx="22" fill="#FFFDF8" stroke="#E7DDCF" />
        <circle cx="74" cy="66" r="23" fill="#F5D7C5" />
        <path d="M57 66c4-19 31-22 36 0" fill="#6C4F3E" />
        <circle cx="67" cy="69" r="2.2" fill="#473A31" />
        <circle cx="81" cy="69" r="2.2" fill="#473A31" />
        <path d="M68 78c3 3 10 3 13 0" fill="none" stroke="#A86D5B" strokeWidth="2" strokeLinecap="round" />
        <rect x="112" y="42" width="132" height="18" rx="9" fill={soft} />
        <rect x="112" y="71" width="96" height="14" rx="7" fill="#F3EEE5" />
        <rect x="112" y="93" width="112" height="14" rx="7" fill="#F3EEE5" />
        <text x="122" y="55" fill={strong} fontSize="12" fontWeight="700">David Smith</text>
        <text x="122" y="81" fill="#665C53" fontSize="10">shared by many Canadians</text>
        <text x="122" y="103" fill="#665C53" fontSize="10">ordinary name, ordinary child</text>
        <rect x="34" y="122" width="228" height="14" rx="7" fill={strong} opacity="0.14" />
        <text x="44" y="132" fill="#5B5148" fontSize="10">broader than a few visible families</text>
      </svg>
    );
  }

  if (kind === "plane") {
    return (
      <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
        <rect x="0" y="0" width="320" height="180" rx="24" fill={soft} />
        <rect x="18" y="18" width="284" height="144" rx="22" fill="#FFFDF8" stroke="#E7DDCF" />
        <path d="M34 129h252" stroke="#E7DDCF" strokeWidth="2" strokeDasharray="5 6" />
        <path d="M88 108 190 78 146 122 131 95 88 108Z" fill={strong} opacity="0.2" stroke={strong} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="145" cy="93" r="6" fill="#F5D7C5" />
        <circle cx="158" cy="87" r="5" fill="#E9C4AF" />
        <circle cx="170" cy="82" r="4.5" fill="#DFAE8D" />
        <path d="M210 55c16 0 29 13 29 29" fill="none" stroke={strong} strokeWidth="3" strokeLinecap="round" />
        <path d="M208 70c8 0 15 7 15 15" fill="none" stroke={strong} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="34" y="36" width="46" height="22" rx="11" fill={strong} opacity="0.12" />
        <text x="46" y="50" fill={strong} fontSize="11" fontWeight="700">338 MPs</text>
        <rect x="206" y="110" width="72" height="22" rx="11" fill={strong} opacity="0.12" />
        <text x="220" y="124" fill={strong} fontSize="11" fontWeight="700">~2/3 wrote</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
      <rect x="0" y="0" width="320" height="180" rx="24" fill={soft} />
      <rect x="18" y="18" width="284" height="144" rx="22" fill="#FFFDF8" stroke="#E7DDCF" />
      <circle cx="72" cy="90" r="33" fill={strong} opacity="0.12" />
      <text x="49" y="95" fill={strong} fontSize="16" fontWeight="700">100K</text>
      <path d="M138 108h112" stroke="#D9CEBE" strokeWidth="8" strokeLinecap="round" />
      <path d="M150 108V80l20 12 16-22 18 16 14-10 18 32" fill="none" stroke={strong} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="149" cy="79" r="4" fill={strong} />
      <circle cx="186" cy="70" r="4" fill={strong} />
      <circle cx="219" cy="76" r="4" fill={strong} />
      <rect x="40" y="126" width="74" height="18" rx="9" fill={strong} opacity="0.12" />
      <text x="53" y="138" fill="#6A5F55" fontSize="10">Nanaimo</text>
      <rect x="132" y="126" width="110" height="18" rx="9" fill={strong} opacity="0.12" />
      <text x="146" y="138" fill="#6A5F55" fontSize="10">Cape Breton Island</text>
    </svg>
  );
}

function ExhibitCard({ item, mode }) {
  const soft = item.tone === "green" ? PALETTE.greenSoft : item.tone === "amber" ? PALETTE.amberSoft : item.tone === "rust" ? PALETTE.rustSoft : item.tone === "plum" ? PALETTE.plumSoft : PALETTE.blueSoft;
  const strong = item.tone === "green" ? PALETTE.green : item.tone === "amber" ? PALETTE.amber : item.tone === "rust" ? PALETTE.rust : item.tone === "plum" ? PALETTE.plum : PALETTE.blue;
  return (
    <div className="overflow-hidden rounded-[30px] border border-[#E4D9CB] bg-[linear-gradient(180deg,#FFFFFF,#FFFCF8)] shadow-[0_16px_34px_rgba(43,38,33,0.05)]">
      <div className="border-b border-[#EEE4D8] px-4 py-4 sm:px-5" style={{ backgroundColor: soft }}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <DualLabel en={item.title.en} zh={item.title.zh} mode={mode} className="text-base font-semibold text-[#241F1A]" zhClassName="text-sm text-[#75685B]" />
          <div className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ backgroundColor: "rgba(255,255,255,0.72)", color: strong }}>SVG</div>
        </div>
        <div className="overflow-hidden rounded-[22px] border border-white/70 bg-white/55">
          <div className="aspect-[16/9] w-full"><ExhibitIllustration kind={item.kind} tone={item.tone} /></div>
        </div>
      </div>
      <div className="space-y-3 px-4 py-4 sm:px-5 sm:py-5">
        <div>
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B6C5E]">{mode === "zh" ? "示意重點" : mode === "en" ? "Visual logic" : "Visual logic · 示意重點"}</div>
          <TextBlock copy={item.fact} mode={mode} className="text-sm leading-7 text-[#4B433C]" zhClassName="border-[#DDD2C2] text-[#5E544B]" />
        </div>
        <div>
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B6C5E]">{mode === "zh" ? "閱讀用途" : mode === "en" ? "Why it helps" : "Why it helps · 閱讀用途"}</div>
          <TextBlock copy={item.caption} mode={mode} className="text-sm leading-7 text-[#4B433C]" zhClassName="border-[#DDD2C2] text-[#5E544B]" />
        </div>
      </div>
    </div>
  );
}

function CampaignExhibitGallery({ mode }) {
  return (
    <div className="rounded-[28px] border border-[#E2D8CA] bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-[#F7F0E1] p-2 text-[#B58A43]"><Icon name="spark" size={18} /></div>
        <div>
          <div className="text-lg font-semibold text-[#241F1A]">{mode === "zh" ? "Reconstructed mini exhibits" : mode === "en" ? "Reconstructed mini exhibits" : "Reconstructed mini exhibits · 重建式小型 exhibits"}</div>
          <div className="mt-1 text-sm text-[#5E544B]">{mode === "zh" ? "這不是原案例圖片重貼，而是依照案例描述重建的 SVG 示意圖，目的在於讓讀者更快進入三個 campaign 的視覺邏輯與使用情境。" : mode === "en" ? "These are not pasted case images. They are reconstructed SVG exhibits based on the case description, designed to make the three campaign concepts easier to grasp at a glance." : "These are not pasted case images. They are reconstructed SVG exhibits based on the case description, designed to make the three campaign concepts easier to grasp at a glance.｜這不是原案例圖片重貼，而是依照案例描述重建的 SVG 示意圖，目的在於讓讀者更快進入三個 campaign 的視覺邏輯與使用情境。"}</div>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-3">{EXHIBIT_RECONSTRUCTIONS.map((item, idx) => <ExhibitCard key={idx} item={item} mode={mode} />)}</div>
    </div>
  );
}

function MediaCard({ item, mode }) {
  const soft = item.color === "green" ? PALETTE.greenSoft : item.color === "rust" ? PALETTE.rustSoft : PALETTE.blueSoft;
  const strong = item.color === "green" ? PALETTE.green : item.color === "rust" ? PALETTE.rust : PALETTE.blue;
  return (
    <div className="rounded-[24px] border border-[#E5DACA] bg-[linear-gradient(180deg,#FFFFFF,#FFFCF7)] p-5 shadow-[0_10px_28px_rgba(43,38,33,0.035)]">
      <div className="mb-4 inline-flex rounded-xl px-3 py-1.5 text-sm font-semibold" style={{ backgroundColor: soft, color: strong }}>{mode === "en" ? item.title.en : mode === "zh" ? item.title.zh : item.title.en}</div>
      <BulletList items={item.bullets} mode={mode} />
    </div>
  );
}

function GovernmentTable({ mode }) {
  const head = {
    move: mode === "zh" ? "政府動作" : mode === "en" ? "Government move" : "Government move · 政府動作",
    progress: mode === "zh" ? "代表的進展" : mode === "en" ? "What it showed" : "What it showed · 代表的進展",
    limit: mode === "zh" ? "仍然不足之處" : mode === "en" ? "Why it still fell short" : "Why it still fell short · 仍然不足之處",
  };
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#E1D7C8] bg-white">
      <div className="hidden bg-[#F7F2E8] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#786A5B] md:grid md:grid-cols-[1.25fr_1fr_1fr]">
        <div>{head.move}</div><div>{head.progress}</div><div>{head.limit}</div>
      </div>
      <div className="divide-y divide-[#EFE7DC]">
        {GOVERNMENT_ROWS.map((row, idx) => (
          <div key={idx} className="grid gap-3 px-5 py-5 md:grid-cols-[1.25fr_1fr_1fr]">
            <div><div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#857362] md:hidden">{head.move}</div><TextBlock copy={row.move} mode={mode} className="text-sm font-semibold leading-7 text-[#2E2924]" zhClassName="border-[#E0D6C7] text-[#3F3832]" /></div>
            <div><div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#857362] md:hidden">{head.progress}</div><TextBlock copy={row.progress} mode={mode} className="text-sm leading-7 text-[#4A423A]" zhClassName="border-[#E0D6C7] text-[#5D534A]" /></div>
            <div><div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#857362] md:hidden">{head.limit}</div><TextBlock copy={row.limit} mode={mode} className="text-sm leading-7 text-[#4A423A]" zhClassName="border-[#E0D6C7] text-[#5D534A]" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MissedPoint({ item, mode }) {
  return (
    <div className="rounded-2xl border border-[#E4DACB] bg-white p-4">
      <div className="flex gap-3">
        <div className="mt-1 rounded-full bg-[#F5EFE4] p-2 text-[#7B6956]"><Icon name="check" size={16} /></div>
        {mode === "bi" ? (
          <div className="space-y-2"><div className="text-sm leading-7 text-[#433B34]">{item.en}</div><div className="border-l-2 border-[#DDD2C2] pl-3 text-sm leading-7 text-[#5D534A]">{item.zh}</div></div>
        ) : <div className="text-sm leading-7 text-[#433B34]">{mode === "en" ? item.en : item.zh}</div>}
      </div>
    </div>
  );
}

function StrategyCard({ item, mode }) {
  const soft = item.tone === "green" ? PALETTE.greenSoft : item.tone === "amber" ? PALETTE.amberSoft : item.tone === "rust" ? PALETTE.rustSoft : item.tone === "plum" ? PALETTE.plumSoft : PALETTE.blueSoft;
  const strong = item.tone === "green" ? PALETTE.green : item.tone === "amber" ? PALETTE.amber : item.tone === "rust" ? PALETTE.rust : item.tone === "plum" ? PALETTE.plum : PALETTE.blue;
  return (
    <div className="rounded-[24px] border border-[#E5DACA] bg-[linear-gradient(180deg,#FFFFFF,#FFFCF7)] p-5 shadow-[0_10px_28px_rgba(43,38,33,0.035)]">
      <div className="mb-3 flex items-start gap-3"><div className="rounded-xl p-2" style={{ backgroundColor: soft, color: strong }}><Icon name={item.icon} size={18} /></div><div className="text-base font-semibold text-[#241F1A]">{mode === "en" ? item.title.en : mode === "zh" ? item.title.zh : item.title.en}</div></div>
      <TextBlock copy={item.body} mode={mode} className="text-sm leading-7 text-[#4A423A]" zhClassName="border-[#DDD2C2] text-[#5B5148]" />
    </div>
  );
}

function NavItem({ id, label, activeId, onClick, mode }) {
  const active = activeId === id;
  return (
    <button onClick={() => onClick(id)} className={`group flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 text-left text-sm transition ${active ? "border-[#2F5168] bg-[#2F5168] text-white shadow-[0_10px_22px_rgba(47,81,104,0.18)]" : "border-transparent text-[#5D5349] hover:border-[#E2D6C7] hover:bg-[#F8F3EA]"}`}>
      {mode === "bi" ? (
        <div className="space-y-0.5">
          <div className="font-medium leading-5">{label.en}</div>
          <div className={`text-xs leading-5 ${active ? "text-white/80" : "text-[#8B7D70]"}`}>{label.zh}</div>
        </div>
      ) : (
        <span>{mode === "en" ? label.en : label.zh}</span>
      )}
      <Icon name="arrowRight" size={15} className={active ? "translate-x-0 opacity-90" : "opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-70"} />
    </button>
  );
}


function SectionMapCard({ item, mode, activeId, onClick }) {
  const active = item.id === activeId;
  return (
    <button onClick={() => onClick(item.id)} className={`rounded-[24px] border p-4 text-left transition ${active ? "border-[#2F5168] bg-[#F4F8FB] shadow-[0_10px_22px_rgba(58,95,118,0.10)]" : "border-[#E5DACA] bg-[linear-gradient(180deg,#FFFFFF,#FFFCF7)] hover:border-[#CBBBA6] hover:bg-[#FFFCF7] hover:shadow-[0_8px_20px_rgba(43,38,33,0.04)]"}`}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <DualLabel en={item.label.en} zh={item.label.zh} mode={mode} className="text-sm font-semibold text-[#241F1A]" zhClassName="text-xs text-[#7C6E61]" />
        <div className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${active ? "bg-[#2F5168] text-white" : "bg-[#F5EFE4] text-[#7A6C5D]"}`}>{String(item.index).padStart(2, "0")}</div>
      </div>
      <TextBlock copy={SECTION_NOTES[item.id]} mode={mode} className="text-[13px] leading-6 text-[#5A5047]" zhClassName="border-[#DDD2C2] text-[#6B6057]" />
    </button>
  );
}

function MobileJumpNav({ items, activeId, onClick, mode }) {
  return (
    <div className="-mx-1 overflow-x-auto pb-1 lg:hidden">
      <div className="flex min-w-max gap-2 px-1">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <button key={item.id} onClick={() => onClick(item.id)} className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${active ? "border-[#2F5168] bg-[#2F5168] text-white" : "border-[#DED2C3] bg-white text-[#64594F]"}`}>
              {mode === "en" ? item.label.en : mode === "zh" ? item.label.zh : item.label.en}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FloatingLanguageDock({ mode, setMode, open, setOpen, dockRef, buttons }) {
  const currentLabel = mode === "en" ? "EN" : mode === "zh" ? "中文" : "EN / 中文";
  const helper =
    mode === "zh"
      ? "語言"
      : mode === "en"
        ? "Language"
        : "Language · 語言";

  return (
    <div ref={dockRef} className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5">
      <div className={`absolute bottom-[calc(100%+10px)] right-0 w-[188px] origin-bottom-right transition ${open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0"}`}>
        <div className="rounded-[22px] border border-[#DED2C2] bg-[rgba(255,253,248,0.94)] p-2 shadow-[0_18px_35px_rgba(43,38,33,0.12)] backdrop-blur-xl">
          <div className="mb-1.5 px-2 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7C6F62]">
            {helper}
          </div>
          <div className="space-y-1">
            {buttons.map((btn) => {
              const active = mode === btn.key;
              return (
                <button
                  key={btn.key}
                  onClick={() => {
                    setMode(btn.key);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                    active
                      ? "bg-[#2F5168] text-white shadow-sm"
                      : "text-[#5C5248] hover:bg-[#F5EFE4]"
                  }`}
                >
                  <span>{btn.label}</span>
                  <span className={`h-2 w-2 rounded-full ${active ? "bg-white" : "bg-[#D5C8B8]"}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpen((value) => !value)}
        aria-label={helper}
        aria-expanded={open}
        className={`group flex h-10 items-center gap-2 rounded-full border px-2.5 shadow-[0_12px_24px_rgba(43,38,33,0.10)] backdrop-blur-xl transition ${
          open
            ? "border-[#2F5168] bg-[#2F5168] text-white"
            : "border-[#DDD1C1] bg-[rgba(255,253,248,0.88)] text-[#4D443B] hover:border-[#C8B8A3] hover:bg-[rgba(255,253,248,0.96)]"
        }`}
      >
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${open ? "bg-white/14" : "bg-[#F3EDE2]"}`}>
          <Icon name="globe" size={16} />
        </div>
        <div className="hidden min-w-[46px] text-left sm:block">
          <div className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${open ? "text-white/70" : "text-[#8A7C6F]"}`}>
            Lang
          </div>
          <div className="text-xs font-semibold leading-4">{currentLabel}</div>
        </div>
      </button>
    </div>
  );
}


function RailSummary({ activeId, mode }) {
  const label = SECTION_LABELS[activeId] || SECTION_LABELS.overview;
  const note = SECTION_NOTES[activeId] || SECTION_NOTES.overview;
  return (
    <div className="rounded-[24px] border border-[#E7DDCF] bg-[linear-gradient(180deg,#FFFEFA,#FBF6ED)] p-4 shadow-[0_8px_22px_rgba(43,38,33,0.035)]">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C6C5D]">{mode === "zh" ? "目前區段" : mode === "en" ? "Current section" : "Current section · 目前區段"}</div>
      <DualLabel en={label.en} zh={label.zh} mode={mode} className="text-base font-semibold text-[#241F1A]" zhClassName="text-sm text-[#75685B]" />
      <div className="mt-3">
        <TextBlock copy={note} mode={mode} className="text-sm leading-7 text-[#5B5148]" zhClassName="border-[#DDD2C2] text-[#675D54]" />
      </div>
    </div>
  );
}

function ReadingPathCard({ mode }) {
  return (
    <div className="rounded-[24px] border border-[#E7DDCF] bg-[linear-gradient(180deg,#FCF8F0,#F8F1E5)] p-4 shadow-[0_8px_22px_rgba(43,38,33,0.035)]">
      <div className="mb-3 text-sm font-semibold text-[#2B2621]">{mode === "zh" ? "建議閱讀路徑" : mode === "en" ? "Suggested reading path" : "Suggested reading path · 建議閱讀路徑"}</div>
      <div className="space-y-3">
        {READING_PATH.map((item, idx) => (
          <div key={idx} className="grid grid-cols-[22px_minmax(0,1fr)] gap-3">
            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-[#7A6C5D] shadow-sm">{idx + 1}</div>
            <TextBlock copy={item} mode={mode} className="text-sm leading-7 text-[#5B5148]" zhClassName="border-[#DDD2C2] text-[#675D54]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreBar({ value, tone }) {
  const strong = tone === "green" ? PALETTE.green : tone === "amber" ? PALETTE.amber : tone === "rust" ? PALETTE.rust : tone === "plum" ? PALETTE.plum : PALETTE.blue;
  const soft = tone === "green" ? PALETTE.greenSoft : tone === "amber" ? PALETTE.amberSoft : tone === "rust" ? PALETTE.rustSoft : tone === "plum" ? PALETTE.plumSoft : PALETTE.blueSoft;
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="h-2 flex-1 rounded-full" style={{ backgroundColor: step <= value ? strong : soft, opacity: step <= value ? 1 : 0.75 }} />
      ))}
    </div>
  );
}

function CampaignScoreboard({ mode }) {
  return (
    <div className="rounded-[28px] border border-[#E2D8CA] bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-[#F2ECF4] p-2 text-[#6E5873]"><Icon name="layers" size={18} /></div>
        <div>
          <div className="text-lg font-semibold text-[#241F1A]">{mode === "zh" ? "Campaign analytical scoreboard" : mode === "en" ? "Campaign analytical scoreboard" : "Campaign analytical scoreboard · Campaign 分析評分表"}</div>
          <div className="mt-1 text-sm text-[#5E544B]">{mode === "zh" ? "這是基於案例證據的分析圖，不是案例原始數據表。目的在於更快比較三個 campaign 各自最強的功能。" : mode === "en" ? "This is an analytical reading of the case, not a raw case exhibit. It shows, at a glance, what each campaign did best." : "This is an analytical reading of the case, not a raw case exhibit. It shows, at a glance, what each campaign did best.｜這是基於案例證據的分析圖，不是案例原始數據表。目的在於更快比較三個 campaign 各自最強的功能。"}</div>
        </div>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {CAMPAIGN_SCOREBOARD.map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-[#E7DDCF] bg-[#FFFDF8] p-4">
            <div className="mb-3">
              <DualLabel en={item.title.en} zh={item.title.zh} mode={mode} className="text-base font-semibold text-[#241F1A]" zhClassName="text-sm text-[#75685B]" />
              <div className="mt-1 text-sm text-[#6A5F55]">{mode === "en" ? item.note.en : mode === "zh" ? item.note.zh : item.note.en}</div>
            </div>
            <div className="space-y-3">
              {item.scores.map((score, scoreIdx) => (
                <div key={scoreIdx} className="space-y-1.5">
                  <DualLabel en={score.label.en} zh={score.label.zh} mode={mode} className="text-[12px] font-medium text-[#4C443C]" zhClassName="text-[11px] text-[#7C6F62]" />
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1"><ScoreBar value={score.value} tone={item.tone} /></div>
                    <div className="w-5 text-right text-[12px] font-semibold text-[#6A5F55]">{score.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImplementationMeter({ item, mode }) {
  const strong = item.tone === "green" ? PALETTE.green : item.tone === "amber" ? PALETTE.amber : item.tone === "rust" ? PALETTE.rust : item.tone === "plum" ? PALETTE.plum : PALETTE.blue;
  const soft = item.tone === "green" ? PALETTE.greenSoft : item.tone === "amber" ? PALETTE.amberSoft : item.tone === "rust" ? PALETTE.rustSoft : item.tone === "plum" ? PALETTE.plumSoft : PALETTE.blueSoft;
  return (
    <div className="rounded-2xl border border-[#E7DDCF] bg-[#FFFDF8] p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <DualLabel en={item.title.en} zh={item.title.zh} mode={mode} className="text-sm font-semibold text-[#241F1A]" zhClassName="text-xs text-[#7C6F62]" />
        <div className="text-sm font-semibold" style={{ color: strong }}>{item.value}</div>
      </div>
      <div className="mb-3 h-2.5 rounded-full" style={{ backgroundColor: soft }}>
        <div className="h-2.5 rounded-full" style={{ width: `${item.value}%`, backgroundColor: strong }} />
      </div>
      <TextBlock copy={item.text} mode={mode} className="text-sm leading-7 text-[#5A5047]" zhClassName="border-[#DDD2C2] text-[#6B6057]" />
    </div>
  );
}

function ImplementationDashboard({ mode }) {
  return (
    <div className="rounded-[28px] border border-[#E2D8CA] bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-[#F7F0E1] p-2 text-[#B58A43]"><Icon name="alert" size={18} /></div>
        <div>
          <div className="text-lg font-semibold text-[#241F1A]">{mode === "zh" ? "Implementation risk dashboard" : mode === "en" ? "Implementation risk dashboard" : "Implementation risk dashboard · Implementation 風險面板"}</div>
          <div className="mt-1 text-sm text-[#5E544B]">{mode === "zh" ? "這不是在重複說明案例，而是把 2018 年 11 月決策點背後的四個主要風險視覺化。" : mode === "en" ? "This does not restate the case. It visualizes the four major risks sitting behind the November 2018 decision point." : "This does not restate the case. It visualizes the four major risks sitting behind the November 2018 decision point.｜這不是在重複說明案例，而是把 2018 年 11 月決策點背後的四個主要風險視覺化。"}</div>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">{IMPLEMENTATION_DASHBOARD.map((item, idx) => <ImplementationMeter key={idx} item={item} mode={mode} />)}</div>
    </div>
  );
}


function StickyChip({ item, mode }) {
  return (
    <div className="rounded-full border border-[#E3D8C8] bg-[#FFFDF8] px-3 py-1.5 text-xs font-medium leading-5 text-[#5A5148]">
      {mode === "bi" ? (
        <div className="space-y-0.5">
          <div>{item.en}</div>
          <div className="text-[#7A6F64]">{item.zh}</div>
        </div>
      ) : mode === "en" ? item.en : item.zh}
    </div>
  );
}

function StickySummaryStrip({ activeId, mode, navItems }) {
  const summary = STICKY_SUMMARY[activeId] || STICKY_SUMMARY.overview;
  const sectionLabel = navItems.find((item) => item.id === activeId)?.label || SECTION_LABELS.overview;
  const progressIndex = Math.max(0, navItems.findIndex((item) => item.id === activeId));
  const progressWidth = `${((progressIndex + 1) / navItems.length) * 100}%`;

  return (
    <div className="sticky top-3 z-30 mb-8">
      <div className="overflow-hidden rounded-[24px] border border-[#DCCFBE] bg-[linear-gradient(180deg,rgba(255,253,248,0.95),rgba(252,246,236,0.93))] shadow-[0_18px_42px_rgba(43,38,33,0.09)] backdrop-blur-xl">
        <div className="h-1.5 w-full bg-[#EFE6D8]">
          <div className="h-full rounded-r-full bg-[#3A5F76] transition-all duration-300" style={{ width: progressWidth }} />
        </div>
        <div className="grid gap-4 p-4 md:p-5 xl:grid-cols-[0.92fr_0.78fr_1.18fr]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#786B5F]">
              <Icon name="layers" size={14} />
              <span>{mode === "zh" ? "課堂速讀模式" : mode === "en" ? "Class quick-read mode" : "Class quick-read mode · 課堂速讀模式"}</span>
            </div>
            <div className="text-sm font-semibold text-[#251F1A]">
              {mode === "bi" ? `${sectionLabel.en} · ${sectionLabel.zh}` : mode === "en" ? sectionLabel.en : sectionLabel.zh}
            </div>
            <TextBlock copy={summary.thesis} mode={mode} className="text-sm leading-7 text-[#453D36]" zhClassName="border-[#DDD2C2] text-[#5C5248]" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#786B5F]">
              <Icon name="spark" size={14} />
              <span>{mode === "zh" ? "關鍵數字" : mode === "en" ? "Key numbers" : "Key numbers · 關鍵數字"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {summary.numbers.map((item, idx) => <StickyChip key={idx} item={item} mode={mode} />)}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#786B5F]">
              <Icon name="quote" size={14} />
              <span>{mode === "zh" ? "最穩開口立場" : mode === "en" ? "Safest oral position" : "Safest oral position · 最穩開口立場"}</span>
            </div>
            <div className="rounded-2xl border border-[#E5DACC] bg-white/80 p-3">
              <TextBlock copy={summary.oral} mode={mode} className="text-sm leading-7 text-[#433B34]" zhClassName="border-[#DDD2C2] text-[#5C5248]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NFLKCaseInfrastructure() {
  const [mode, setMode] = useState("en");
  const [activeId, setActiveId] = useState("overview");
  const [langOpen, setLangOpen] = useState(false);
  const dockRef = useRef(null);
  const navItems = useMemo(() => Object.entries(SECTION_LABELS).map(([id, label], index) => ({ id, label, index: index + 1 })), []);

  useEffect(() => {
    try {
      const savedMode = window.localStorage.getItem("nflk-case-mode");
      if (savedMode && ["en", "zh", "bi"].includes(savedMode)) {
        setMode(savedMode);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("nflk-case-mode", mode);
    } catch {}
  }, [mode]);

  useEffect(() => {
    if (!langOpen) return;

    const handlePointerDown = (event) => {
      if (dockRef.current && !dockRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [langOpen]);

  useEffect(() => {
    const ids = navItems.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-18% 0px -55% 0px", threshold: [0.2, 0.35, 0.6] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      setActiveId(id);
      setLangOpen(false);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const langButtons = [
    { key: "en", label: "EN" },
    { key: "zh", label: "中文" },
    { key: "bi", label: "EN / 中文" },
  ];

  return (
    <div className="relative isolate min-h-screen w-full overflow-x-clip" style={{ backgroundColor: PALETTE.bg, color: PALETTE.ink }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(58,95,118,0.10),transparent_28%),radial-gradient(circle_at_top_right,rgba(181,138,67,0.10),transparent_26%),linear-gradient(180deg,rgba(252,250,242,1),rgba(248,244,235,0.96))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_20%_10%,rgba(110,88,115,0.08),transparent_24%),radial-gradient(circle_at_80%_0%,rgba(58,95,118,0.08),transparent_22%)]" />
      <div className="relative mx-auto max-w-[1580px] px-4 pb-20 pt-7 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] border border-[#E0D5C6] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,251,245,0.95))] shadow-[0_24px_70px_rgba(43,38,33,0.07)]">
          <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top_left,rgba(58,95,118,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(181,138,67,0.15),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-y-0 left-[272px] hidden w-px bg-[linear-gradient(180deg,transparent,rgba(223,211,196,0.9),transparent)] lg:block" />
          <div className="relative grid gap-8 lg:grid-cols-[272px_minmax(0,1fr)]">
            <aside className="border-b border-[#E9DFD1] bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(255,251,245,0.72))] p-4 lg:min-h-screen lg:border-b-0 lg:border-r lg:p-6">
              <div className="sticky top-6 space-y-5 rounded-[28px] border border-[#ECE3D7] bg-[rgba(255,253,248,0.72)] p-4 backdrop-blur-sm lg:p-0 lg:border-0 lg:bg-transparent">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#F4EEE3] p-2 text-[#745F4C]"><Icon name="menu" size={18} /></div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7C6F62]">NFLK</div>
                    <div className="text-sm text-[#5F554B]">Case infrastructure v8</div>
                  </div>
                </div>
                <RailSummary activeId={activeId} mode={mode} />
                <div className="space-y-2">
                  {navItems.map((item) => <NavItem key={item.id} id={item.id} label={item.label} activeId={activeId} onClick={scrollToId} mode={mode} />)}
                </div>
                <ReadingPathCard mode={mode} />
              </div>
            </aside>
            <main className="min-w-0 p-5 sm:p-7 lg:p-10 xl:p-12 2xl:p-14">
              <div className="mx-auto max-w-[1180px] 2xl:max-w-[1220px]">
              <div className="mb-10" id="overview">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="max-w-4xl space-y-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A6A58]">{mode === "zh" ? HERO.eyebrow.zh : mode === "en" ? HERO.eyebrow.en : `${HERO.eyebrow.en} · ${HERO.eyebrow.zh}`}</div>
                    <h1 className="text-[30px] font-semibold leading-[1.08] tracking-tight text-[#221D18] sm:text-[38px] xl:text-[48px]">
                      {mode === "bi" ? <div className="space-y-2"><div>{HERO.title.en}</div><div className="text-[24px] font-medium text-[#5E544B] sm:text-[28px] xl:text-[34px]">{HERO.title.zh}</div></div> : mode === "en" ? HERO.title.en : HERO.title.zh}
                    </h1>
                    <div className="max-w-3xl rounded-[26px] border border-[#E6DCCD] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(255,250,243,0.92))] p-4 shadow-[0_12px_30px_rgba(43,38,33,0.04)] sm:p-5">
                      <TextBlock copy={HERO.summary} mode={mode} className="text-[16px] leading-8 text-[#4B433C]" zhClassName="border-[#D7CCBC] text-[#5C5248]" />
                    </div>
                  </div>
                  <div className="hidden rounded-2xl border border-[#E4DACB] bg-[linear-gradient(180deg,#FFFFFF,#FFF9F0)] px-3 py-2 text-xs text-[#6D6257] shadow-[0_10px_24px_rgba(43,38,33,0.04)] md:block"><div className="flex items-center gap-2"><Icon name="book" size={16} /><span>{mode === "zh" ? "預設英語主版本" : mode === "en" ? "English-first reading view" : "English-first reading view · 英語主版本"}</span></div></div>
                </div>
                <MobileJumpNav items={navItems} activeId={activeId} onClick={scrollToId} mode={mode} />
                <StickySummaryStrip activeId={activeId} mode={mode} navItems={navItems} />
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{STAT_CARDS.map((item, idx) => <StatCard key={idx} item={item} mode={mode} />)}</div>
              </div>

              <div className="mb-12 grid gap-4 lg:grid-cols-3">{CASE_BOUNDARY.map((item, idx) => <BoundaryCard key={idx} item={item} mode={mode} />)}</div>

              <section className="mb-16 space-y-6">
                <div className="rounded-[28px] border border-[#E2D8CA] bg-white p-5 sm:p-6">
                  <div className="mb-5 flex items-start gap-3">
                    <div className="rounded-xl bg-[#EAF1F5] p-2 text-[#3A5F76]"><Icon name="map" size={18} /></div>
                    <div>
                      <div className="text-lg font-semibold text-[#241F1A]">{mode === "zh" ? "Section map" : mode === "en" ? "Section map" : "Section map · 區段地圖"}</div>
                      <div className="mt-1 text-sm text-[#5E544B]">{mode === "zh" ? "先知道每一區負責回答哪一個問題，再進入細節，整體閱讀會穩很多。" : mode === "en" ? "Know what each section is for before you go deep. It keeps the case easier to navigate and revise." : "Know what each section is for before you go deep. It keeps the case easier to navigate and revise.｜先知道每一區負責回答哪一個問題，再進入細節，整體閱讀會穩很多。"}</div>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{navItems.map((item) => <SectionMapCard key={item.id} item={item} mode={mode} activeId={activeId} onClick={scrollToId} />)}</div>
                </div>
              </section>

              <section className="mb-16 space-y-6"><SectionHeader title={DECISION_POINT.title} summary={DECISION_POINT.thesis} mode={mode} /><div className="grid gap-4 md:grid-cols-2">{DECISION_POINT.items.map((item, idx) => <DecisionItem key={idx} item={item} mode={mode} />)}</div></section>

              <section className="mb-16 space-y-6" id="timeline"><SectionHeader title={{ en: "Dual-track timeline", zh: "雙軌時間線" }} summary={{ en: "Read the left side as campaign development and the right side as the policy and implementation context that kept shifting underneath it.", zh: "左側看 campaign 的形成與升級，右側看同一時間底下不斷變動的政策與 implementation 背景。" }} mode={mode} /><div className="space-y-4">{TIMELINE.map((item, idx) => <TimelineRow key={idx} item={item} mode={mode} />)}</div></section>

              <section className="mb-16 space-y-6" id="mechanism"><SectionHeader title={{ en: "How the problem actually worked", zh: "問題實際上是如何運作的" }} summary={{ en: "The case gets easier once the mechanism is clear. NFLK was not fighting a single airport incident. It was fighting a systemic identity-matching failure with no dependable Canadian redress path.", zh: "只要先看懂問題機制，這個案例就會容易很多。NFLK 對抗的不是單一機場事件，而是一套制度性身分比對失靈，以及缺乏可靠加拿大 redress path 的結果。" }} mode={mode} /><div className="grid gap-4 lg:grid-cols-4">{FAILURE_FLOW.map((item, idx) => <FlowCard key={idx} item={item} mode={mode} last={idx === FAILURE_FLOW.length - 1} />)}</div><div className="grid gap-4 lg:grid-cols-3">{REDRESS_COMPARE.map((item, idx) => <CompareCard key={idx} item={item} mode={mode} />)}</div></section>

              <section className="mb-16 space-y-6" id="people"><SectionHeader title={{ en: "Who made the campaign work", zh: "這個 campaign 為何能運作" }} summary={{ en: "A key strength of NFLK was role clarity over time. The group started from family frustration, but eventually became a distributed advocacy system with communications, legal, bilingual outreach, and political process support.", zh: "NFLK 的重要強項之一，是角色分工會隨時間逐步清楚。它起初只是家庭困擾的集合，但後來慢慢變成具備溝通、法律、雙語外展與政治流程能力的分散式倡議系統。" }} mode={mode} /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{PEOPLE.map((item, idx) => <PersonCard key={idx} item={item} mode={mode} />)}</div></section>

              <section className="mb-16 space-y-6" id="campaigns"><SectionHeader title={{ en: "Why the guerrilla campaigns were effective", zh: "為甚麼 guerrilla campaigns 有效" }} summary={{ en: "The three campaigns did not do the same job. That is exactly why they worked together. One broadened identification, one drove political conversion, and one made scale legible.", zh: "這三個 campaign 並不是在做同一件事，而這正是它們能互補成功的原因。一個擴大認同，一個促成政治轉換，一個把規模變得可讀。" }} mode={mode} /><CampaignExhibitGallery mode={mode} /><div className="grid gap-5 xl:grid-cols-3">{CAMPAIGN_CARDS.map((item, idx) => <CampaignCard key={idx} item={item} mode={mode} />)}</div><CampaignScoreboard mode={mode} /><div className="rounded-[28px] border border-[#E2D8CA] bg-white p-5 sm:p-6"><div className="mb-5 flex items-center gap-3"><div className="rounded-xl bg-[#EEF5EE] p-2 text-[#5B6D5B]"><Icon name="target" size={18} /></div><div><div className="text-lg font-semibold text-[#241F1A]">{mode === "zh" ? "媒體、PR、guerrilla 的組合邏輯" : mode === "en" ? "How digital, PR, and guerrilla work fit together" : "How digital, PR, and guerrilla work fit together · 媒體、PR、guerrilla 的組合邏輯"}</div><div className="text-sm text-[#5E544B]">{mode === "zh" ? "從 attention 到 political conversion 的完整路徑" : mode === "en" ? "The full path from attention to political conversion" : "The full path from attention to political conversion · 從 attention 到 political conversion 的完整路徑"}</div></div></div><div className="grid gap-4 xl:grid-cols-3">{MEDIA_LOGIC.map((item, idx) => <MediaCard key={idx} item={item} mode={mode} />)}</div></div></section>

              <section className="mb-16 space-y-6" id="government"><SectionHeader title={{ en: "How to assess the government fairly", zh: "如何公平評估政府角色" }} summary={{ en: "A strong answer is balanced. The government did move, but NFLK’s persistent outside pressure was what made the issue hard to ignore and costly to defer.", zh: "這一題要答得好，關鍵在平衡。政府確實有動，但真正讓這個議題難以被忽略、難以再延後的，是 NFLK 持續不斷的制度外施壓。" }} mode={mode} /><GovernmentTable mode={mode} /><ImplementationDashboard mode={mode} /><div className="rounded-2xl border border-[#E3D8C8] bg-[#FBF7EE] p-5"><div className="mb-3 text-base font-semibold text-[#241F1A]">{mode === "zh" ? "最穩的總結" : mode === "en" ? "Most defensible conclusion" : "Most defensible conclusion · 最穩的總結"}</div><TextBlock copy={{ en: "Government action mattered, but the 2018 result was best understood as the interaction of inside pressure and outside pressure. NFLK did not replace the state. It made inaction harder.", zh: "政府行動確實重要，但 2018 年的結果，最適合被理解為制度內壓力與制度外壓力的交互作用。NFLK 不是取代政府，而是讓政府更難不作為。" }} mode={mode} className="text-sm leading-7 text-[#4A423A]" zhClassName="border-[#DDD2C2] text-[#5B5148]" /></div></section>

              <section className="mb-16 space-y-6"><SectionHeader title={{ en: "What should not be left out", zh: "有哪些重點不應該漏掉" }} summary={{ en: "These are the details that often disappear in shorter summaries, even though they materially improve the quality of interpretation.", zh: "這些是較短版本最容易漏掉，但其實會明顯提升判讀品質的細節。" }} mode={mode} /><div className="grid gap-4 lg:grid-cols-2">{MISSED_POINTS.map((item, idx) => <MissedPoint key={idx} item={item} mode={mode} />)}</div></section>

              <section className="mb-16 space-y-6" id="strategy"><SectionHeader title={{ en: "Best strategic answer from the case evidence", zh: "依 case evidence 推出的最佳策略答案" }} summary={{ en: "The strongest reading is not endless expansion. It is disciplined continuation. NFLK should use its remaining energy where it has the highest implementation leverage.", zh: "最強的答案不是無限擴張，而是有紀律地持續。NFLK 應把剩餘能量用在最能推動 implementation 的地方。" }} mode={mode} /><div className="grid gap-4 xl:grid-cols-2"><div className="space-y-4 rounded-[28px] border border-[#E3D8C8] bg-white p-5 sm:p-6"><div className="flex items-center gap-3"><div className="rounded-xl bg-[#EAF1F5] p-2 text-[#3A5F76]"><Icon name="target" size={18} /></div><div className="text-lg font-semibold text-[#241F1A]">{mode === "zh" ? "短期策略" : mode === "en" ? "Short-term strategy" : "Short-term strategy · 短期策略"}</div></div><div className="grid gap-4">{SHORT_TERM.map((item, idx) => <StrategyCard key={idx} item={item} mode={mode} />)}</div></div><div className="space-y-4 rounded-[28px] border border-[#E3D8C8] bg-white p-5 sm:p-6"><div className="flex items-center gap-3"><div className="rounded-xl bg-[#F2ECF4] p-2 text-[#6E5873]"><Icon name="layers" size={18} /></div><div className="text-lg font-semibold text-[#241F1A]">{mode === "zh" ? "長期策略" : mode === "en" ? "Long-term strategy" : "Long-term strategy · 長期策略"}</div></div><div className="grid gap-4">{LONG_TERM.map((item, idx) => <StrategyCard key={idx} item={item} mode={mode} />)}</div></div></div></section>

              <section className="mb-16 space-y-6" id="discussion"><SectionHeader title={{ en: "Cold-call and discussion toolkit", zh: "冷點名與課堂討論工具包" }} summary={{ en: "Use this section when you need a clean, defensible position under pressure.", zh: "若你需要在壓力下快速給出乾淨且站得住腳的回答，就看這一段。" }} mode={mode} /><div className="rounded-[28px] border border-[#E3D8C8] bg-white p-5 sm:p-6"><div className="mb-4 flex items-start gap-3"><div className="rounded-xl bg-[#F7F0E1] p-2 text-[#B58A43]"><Icon name="quote" size={18} /></div><div><div className="text-lg font-semibold text-[#241F1A]">{mode === "en" ? SPEAKING.title.en : mode === "zh" ? SPEAKING.title.zh : SPEAKING.title.en}</div><div className="mt-2 max-w-4xl"><TextBlock copy={SPEAKING.opening} mode={mode} className="text-sm leading-8 text-[#473F38]" zhClassName="border-[#DDD2C2] text-[#5C5248]" /></div></div></div><div className="grid gap-4 lg:grid-cols-3">{SPEAKING.frames.map((item, idx) => <div key={idx} className="rounded-2xl bg-[#FCF8F0] p-4"><div className="mb-2 text-sm font-semibold text-[#302A24]">{labelForMode(item.label, mode)}</div><TextBlock copy={item.text} mode={mode} className="text-sm leading-7 text-[#5B5148]" zhClassName="border-[#DDD2C2] text-[#685E55]" /></div>)}</div></div><div className="rounded-[28px] border border-[#E3D8C8] bg-white p-5 sm:p-6"><div className="mb-4 flex items-center gap-3"><div className="rounded-xl bg-[#EAF1F5] p-2 text-[#3A5F76]"><Icon name="users" size={18} /></div><div className="text-lg font-semibold text-[#241F1A]">{mode === "zh" ? "安全又有品質的 Q&A 問題" : mode === "en" ? "Safe but high-value Q&A prompts" : "Safe but high-value Q&A prompts · 安全又有品質的 Q&A 問題"}</div></div><div className="grid gap-4 lg:grid-cols-2">{QA.map((item, idx) => <div key={idx} className="rounded-2xl border border-[#E8DECF] bg-[#FFFDF8] p-4">{mode === "bi" ? <div className="space-y-2"><div className="text-sm leading-7 text-[#433B34]">{item.en}</div><div className="border-l-2 border-[#DDD2C2] pl-3 text-sm leading-7 text-[#5E544B]">{item.zh}</div></div> : <div className="text-sm leading-7 text-[#433B34]">{mode === "en" ? item.en : item.zh}</div>}</div>)}</div></div></section>

              <section className="rounded-[30px] border border-[#D9CEBE] bg-[linear-gradient(180deg,#FFFDF8,#FBF6ED)] p-6 sm:p-8"><div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"><div className="space-y-4"><div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A6A58]">{mode === "zh" ? "最後一句" : mode === "en" ? "Final takeaway" : "Final takeaway · 最後一句"}</div><TextBlock copy={{ en: "NFLK is best understood not as a visibility campaign, but as an example of how a parent-led social advocacy movement converted outrage into organized pressure, and organized pressure into policy movement. The final challenge in the case is whether that movement can now be converted one more time into implementation.", zh: "NFLK 最適合被理解成一個由家長主導的社會倡議運動案例，它把憤怒轉成有組織的施壓，再把有組織的施壓轉成政策移動。這個案例最後真正要回答的問題，是這股力量能否再被轉換一次，真正變成 implementation。" }} mode={mode} className="text-[17px] leading-8 text-[#312B25]" zhClassName="border-[#D9CEBE] text-[#4A4138]" /></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><div className="rounded-2xl border border-[#E2D8CA] bg-white p-4"><div className="mb-2 text-sm font-semibold text-[#2B2621]">{mode === "zh" ? "最簡短主張" : mode === "en" ? "Fastest thesis" : "Fastest thesis · 最簡短主張"}</div><div className="text-sm leading-7 text-[#5C5248]">{mode === "zh" ? "2018 年 11 月時，NFLK 最好的方向不是再做一次大眾 awareness，而是集中火力把政治支持與預算核定真正推進到 implementation。" : mode === "en" ? "In November 2018, NFLK’s best move was not another mass-awareness push. It was to concentrate on turning political support and budget approval into implementation." : "In November 2018, NFLK’s best move was not another mass-awareness push. It was to concentrate on turning political support and budget approval into implementation.｜2018 年 11 月時，NFLK 最好的方向不是再做一次大眾 awareness，而是集中火力把政治支持與預算核定真正推進到 implementation。"}</div></div><div className="rounded-2xl border border-[#E2D8CA] bg-white p-4"><div className="mb-2 text-sm font-semibold text-[#2B2621]">{mode === "zh" ? "最需要背的數字" : mode === "en" ? "Numbers worth remembering" : "Numbers worth remembering · 最需要背的數字"}</div><div className="text-sm leading-7 text-[#5C5248]">{mode === "zh" ? "8,140 萬加幣、230 位 MP、338 架紙飛機、估計 100,000 人、超過 25 萬加幣投入。" : mode === "en" ? "CA$81.4M, 230 MPs, 338 paper airplanes, an estimated 100,000 affected people, and more than CA$250K already absorbed." : "CA$81.4M, 230 MPs, 338 paper airplanes, an estimated 100,000 affected people, and more than CA$250K already absorbed.｜8,140 萬加幣、230 位 MP、338 架紙飛機、估計 100,000 人、超過 25 萬加幣投入。"}</div></div></div></div></section>
              </div>
            </main>
          </div>
        </div>
      </div>
      <FloatingLanguageDock mode={mode} setMode={setMode} open={langOpen} setOpen={setLangOpen} dockRef={dockRef} buttons={langButtons} />
    </div>
  );
}
