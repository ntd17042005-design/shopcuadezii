
const CONFIG={facebookLink:"https://www.facebook.com/dezi1704"};
const ICONS={
youtube:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="10" rx="3" fill="#FF0000"></rect><path d="M11 10v4l4-2-4-2z" fill="#FFFFFF"></path></svg>`,
chatgpt:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#10A37F"></circle><path d="M12 6.2 c1.6 0 2.9 1.3 2.9 2.9 c0 1.1-.6 2.1-1.6 2.6 l1.2 2.1 c.2.4.1.9-.3 1.1 c-1.2.8-2.8.5-3.6-.7 l-.8-1.4 c-.2-.4-.7-.6-1.1-.4 c-1.3.6-2.9.1-3.5-1.2 c-.6-1.3-.1-2.9 1.2-3.5 l1.2-.6 c.4-.2.6-.7.4-1.1 c-.6-1.3-.1-2.9 1.2-3.5 c.4-.2.8-.3 1.2-.3Z" fill="#E8FFF7" opacity=".95"></path></svg>`,
gemini:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#1A73E8"></circle><path d="M12 6.5l1.4 3.2 3.4.3-2.6 2.2.8 3.3-3-1.8-3 1.8.8-3.3-2.6-2.2 3.4-.3L12 6.5Z" fill="#FFFFFF" opacity=".95"></path></svg>`,
microsoft:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" fill="#F25022"></rect><rect x="13" y="3" width="8" height="8" fill="#7FBA00"></rect><rect x="3" y="13" width="8" height="8" fill="#00A4EF"></rect><rect x="13" y="13" width="8" height="8" fill="#FFB900"></rect></svg>`,
adobe:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" fill="#ED2224"></rect><path d="M12 7l4.2 10h-2.2l-.9-2.3h-2.2L10 17H7.9L12 7Zm-.2 5.8h1.4L12.5 11l-.7 1.8Z" fill="#fff"></path></svg>`,
canva:`<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00C4CC"></stop><stop offset="100%" stop-color="#7D2AE8"></stop></linearGradient></defs><circle cx="12" cy="12" r="9" fill="url(#cg)"></circle><path d="M14.8 15.8c-.8.7-1.8 1-2.9 1-2.6 0-4.5-1.9-4.5-4.7s1.9-4.9 4.7-4.9c1 0 1.9.2 2.7.8l-.8 1.5c-.5-.4-1.1-.6-1.8-.6-1.6 0-2.7 1.1-2.7 3.1 0 1.9 1.1 3 2.7 3 .7 0 1.3-.2 1.9-.7l.7 1.5Z" fill="#fff"></path></svg>`,
capcut:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5" fill="#111827"></rect><path d="M7 9h10M7 15h10M9 7l6 10M15 7l-6 10" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"></path></svg>`,
zoom:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="12" height="12" rx="4" fill="#2D8CFF"></rect><path d="M15 10l5-2v8l-5-2z" fill="#2D8CFF"></path></svg>`,
claude:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#E07B39"></circle><path d="M8.6 12a3.4 3.4 0 1 1 6.8 0a3.4 3.4 0 1 1-6.8 0Zm2.1 0a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0-2.6 0Z" fill="#fff"></path></svg>`,
elsa:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#5B8CFF"></circle><path d="M8 8h8v2H10v2h5v2h-5v2h6v2H8z" fill="#fff"></path></svg>`,
vieon:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="6" fill="#7C4DFF"></rect><path d="M10 9l5 3-5 3z" fill="#fff"></path></svg>`
};
const PRODUCTS=[
{id:"chatgpt-pro-slot",title:"ChatGPT Pro (1 Tháng) - 1 Slot",price:40000,priceText:"40.000 VNĐ",cat:"ai",icon:"chatgpt",note:"BHF",tags:["hot","featured"],image:"assets/images/products/chatgpt-pro-slot.png"},
{id:"chatgpt-pro-admin",title:"ChatGPT Pro (1 Tháng) - Admin Add được 4 slot",price:100000,priceText:"100.000 VNĐ",cat:"ai",icon:"chatgpt",note:"BHF - KBH khi add lỗi",tags:["hot"],image:"assets/images/products/chatgpt-pro-admin.png"},
{id:"chatgpt-plus-kgh",title:"ChatGPT Plus (1 tháng) không gia hạn",price:30000,priceText:"30.000 VNĐ",cat:"ai",icon:"chatgpt",note:"BHF",tags:["deal"],image:"assets/images/products/chatgpt-plus-khong-gia-han.png"},
{id:"chatgpt-plus-giahan",title:"ChatGPT Plus (1 tháng) gia hạn lịch sử chat",price:100000,priceText:"100.000 VNĐ",cat:"ai",icon:"chatgpt",note:"BHF",tags:["hot"],image:"assets/images/products/chatgpt-plus-gia-han.png"},
{id:"gemini-1y-bh6",title:"Gemini Pro + 2TB (1 Năm) - Slot Farm",price:200000,priceText:"200.000 VNĐ",cat:"gemini",icon:"gemini",note:"BH 6 tháng",tags:["hot"],image:"assets/images/products/gemini-1y-bh6.png"},

{id:"gemini-pro-cap",title:"Combo (Gemini Pro + Youtube Premium + Google One 2TB)",price:150000,priceText:"150.000 VNĐ",cat:"ai",icon:"gemini",note:"BHF",tags:["hot","featured"],image:"assets/images/products/gemini-pro-youtube-preminum.png"},
{id:"chatgpt-plus-1nam",title:"ChatGPT Plus (1 Năm) Chính Chủ",price:850000,priceText:"850.000 VNĐ",cat:"ai",icon:"chatgpt",note:"BHF",tags:["hot","featured"],image:"assets/images/products/chatgpt-plus-chinh-chu.png"},
{id:"chatgpt-go-1nam",title:"ChatGPT Go (1 Năm) Chính Chủ",price:200000,priceText:"200.000 VNĐ",cat:"ai",icon:"chatgpt",note:"BHF",tags:["hot","featured"],image:"assets/images/products/chatgpt-go-chinh-chu.png"},

{id:"gemini-4m-kbh",title:"Gemini Pro + 2TB (4 Tháng) - Slot Farm",price:60000,priceText:"60.000 VNĐ",cat:"gemini",icon:"gemini",note:"KBH",tags:["hot","featured","deal"],image:"assets/images/products/gemini-4m-kbh.png"},
{id:"gemini-4m-bhf",title:"Gemini Pro + 2TB (4 Tháng) - Slot Farm",price:90000,priceText:"90.000 VNĐ",cat:"gemini",icon:"gemini",note:"BHF",tags:["hot"],image:"assets/images/products/gemini-4m-bhf.png"},
{id:"gemini-googleone-1y-bh7d",title:"Gemini Pro + Google One 2TB (1 năm) - Slot Farm",price:100000,priceText:"100.000 VNĐ",cat:"gemini",icon:"gemini",note:"BH 7 ngày",tags:["deal"],image:"assets/images/products/gemini-googleone-1y-bh7d.png"},
{id:"gemini-googleone-1y-bhf",title:"Gemini Pro + Google One 2TB (1 năm) - Slot Farm",price:550000,priceText:"550.000 VNĐ",cat:"gemini",icon:"gemini",note:"BHF",tags:["hot"],image:"assets/images/products/gemini-googleone-1y-bhf.png"},
{id:"gemini-1y-bh3",title:"Gemini Pro + 2TB (1 Năm) - Slot Farm",price:150000,priceText:"150.000 VNĐ",cat:"gemini",icon:"gemini",note:"BH 3 tháng",tags:["hot"],image:"assets/images/products/gemini-1y-bh3.png"},
{id:"gemini-business-slot",title:"Gemini Business 1 tháng (Slot Farm)",price:40000,priceText:"40.000 VNĐ",cat:"gemini",icon:"gemini",note:"BHF",tags:["deal"],image:"assets/images/products/gemini-business-slot.png"},
{id:"gemini-business-admin",title:"Gemini Business 1 tháng (Admin) Add được 14 slot",price:100000,priceText:"100.000 VNĐ",cat:"gemini",icon:"gemini",note:"BHF - KBH khi add lỗi",tags:["hot"],image:"assets/images/products/gemini-business-admin.png"},
{id:"adobe-full-3m",title:"Adobe Full App phiên bản mới nhất (3 tháng)",price:100000,priceText:"100.000 VNĐ",cat:"creative",icon:"adobe",note:"BH 7 ngày",tags:["hot"],image:"assets/images/products/adobe-full-3m.png"},
{id:"microsoft-365-1y",title:"Microsoft 365 + Google One 1TB (1 năm) Slot Farm",price:100000,priceText:"100.000 VNĐ",cat:"office",icon:"microsoft",note:"BHF",tags:["hot","featured"],image:"assets/images/products/microsoft-365-1y.png"},
{id:"canva-pro-1y",title:"Canva Pro (1 năm) Slot chính chủ",price:230000,priceText:"230.000 VNĐ",cat:"creative",icon:"canva",note:"BH 1 tháng",tags:["hot"],image:"assets/images/products/canva-pro-1y.png"},
{id:"canva-edu-3y",title:"Canva Edu (3 năm) Slot",price:125000,priceText:"125.000 VNĐ",cat:"creative",icon:"canva",note:"BH 3 tháng",tags:["deal"],image:"assets/images/products/canva-edu-3y.png"},
{id:"capcut-pro-1y",title:"CapCut Pro (1 năm) cấp tài khoản",price:300000,priceText:"300.000 VNĐ",cat:"creative",icon:"capcut",note:"BHF",tags:["hot"],image:"assets/images/products/capcut-pro-1y.png"},
{id:"zoom-pro-1m",title:"Zoom Pro (1 tháng) nâng chính chủ",price:100000,priceText:"100.000 VNĐ",cat:"office",icon:"zoom",note:"BHF",tags:["contact"],image:"assets/images/products/zoom-pro-1m.png"},
{id:"claude-ai-1m",title:"Claude AI (1 tháng) acc cấp hoặc chính chủ",price:350000,priceText:"350.000 VNĐ",cat:"ai",icon:"claude",note:"BHF",tags:["hot"],image:"assets/images/products/claude-ai-1m.png"},
{id:"elsa-pro-1y",title:"ELSA Pro (1 năm) acc cấp hoặc chính chủ",price:400000,priceText:"400.000 VNĐ",cat:"office",icon:"elsa",note:"BHF",tags:["hot"],image:"assets/images/products/elsa-pro-1y.png"},
{id:"vieon-1m",title:"VieON (1 tháng) acc cấp hoặc chính chủ",price:100000,priceText:"100.000 VNĐ",cat:"entertain",icon:"vieon",note:"BHF",tags:["contact"],image:"assets/images/products/vieon-1m.png"},
{id:"yt-1m-20",title:"YouTube Premium (1 Tháng)",price:40000,priceText:"40.000 VNĐ",cat:"youtube",icon:"youtube",note:"BHF",tags:["hot","featured","deal"],image:"assets/images/products/youtube-1m.png"},
{id:"yt-2m-80",title:"YouTube Premium (2 Tháng)",price:80000,priceText:"80.000 VNĐ",cat:"youtube",icon:"youtube",note:"BHF",tags:["hot"],image:"assets/images/products/youtube-2m.png"},
{id:"yt-6m-fixed-350",title:"YouTube Premium (6 Tháng) - Cố định",price:420000,priceText:"420.000 VNĐ",cat:"youtube",icon:"youtube",note:"Không chuyển fam",tags:["hot"],image:"assets/images/products/youtube-6m-fixed.png"},
{id:"yt-1y-fixed-499",title:"YouTube Premium (1 Năm) - Cố định",price:550000,priceText:"550.000 VNĐ",cat:"youtube",icon:"youtube",note:"Không chuyển fam",tags:["hot"],image:"assets/images/products/youtube-1y-fixed.png"},
{id:"capcut-pro-6m",title:"CapCut Pro (6 tháng) cá nhân tài khoản cấp",price:150000,priceText:"150.000 VNĐ",cat:"creative",icon:"capcut",note:"BHF",tags:["hot","new"],image:"assets/images/products/capcut-pro-6m.png"},
{id:"duolingo-super-1y",title:"Duolingo Super (1 năm)",price:150000,priceText:"150.000 VNĐ",cat:"office",icon:"elsa",note:"BHF",tags:["new"],image:"assets/images/products/duolingo-super-1y.png"},
{id:"google-ultra-1m-slot",title:"Google Ultra (1 tháng) slot",price:300000,priceText:"300.000 VNĐ",cat:"ai",icon:"gemini",note:"BHF",tags:["new","hot"],image:"assets/images/products/google-ultra-1m-slot.png"},
{id:"perplexity-pro-1y",title:"Perplexity Pro (1 năm)",price:470000,priceText:"470.000 VNĐ",cat:"ai",icon:"chatgpt",note:"BHF",tags:["new"],image:"assets/images/products/perplexity-pro-1y.png"},
{id:"elsa-premium-1y",title:"ELSA Premium (1 năm)",price:700000,priceText:"700.000 VNĐ",cat:"office",icon:"elsa",note:"BHF",tags:["new"],image:"assets/images/products/elsa-premium-1y.png"}
];
const FEATURED_IDS=["chatgpt-pro-slot","gemini-4m-kbh","yt-1m-20","microsoft-365-1y","chatgpt-pro-admin","gemini-business-admin"];