const svgPlaceholder = (palette, title, subtitle) => {
  const [bg, panel, accent, text] = palette;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
    <rect width="800" height="1000" fill="${bg}"/>
    <rect x="72" y="72" width="656" height="856" rx="42" fill="${panel}"/>
    <rect x="145" y="165" width="510" height="550" rx="230" fill="${accent}" opacity="0.18"/>
    <path d="M286 250h228l44 112-52 82v240H294V444l-52-82 44-112Z" fill="${accent}" opacity="0.88"/>
    <path d="M320 282c26-34 56-50 80-50s54 16 80 50" fill="none" stroke="${panel}" stroke-width="18" stroke-linecap="round"/>
    <text x="94" y="812" fill="${text}" font-family="Arial, sans-serif" font-size="32" font-weight="700">${title}</text>
    <text x="94" y="856" fill="${text}" font-family="Arial, sans-serif" font-size="22" opacity="0.72">${subtitle}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

window.fitProducts = [
  {
    id: "P001",
    name: "에센셜 드레이프 셔츠",
    brand: "Atelier Nown",
    category: "셔츠",
    price: 89000,
    fitType: "세미오버핏",
    stretch: "보통",
    thickness: "얇음",
    description: "힘 있게 떨어지는 드레이프 원단으로, 단독 착용과 이너 레이어링 모두 자연스럽게 이어지는 셔츠입니다.",
    image: svgPlaceholder(["#d8d0c3", "#f8f4ee", "#55665c", "#241f1a"], "ESSENTIAL SHIRT", "Soft drape / Semi-over fit")
  },
  {
    id: "P002",
    name: "모던 테이퍼드 슬랙스",
    brand: "Ground Form",
    category: "팬츠",
    price: 109000,
    fitType: "테이퍼드핏",
    stretch: "약간 있음",
    thickness: "보통",
    description: "허벅지부터 밑단까지 점진적으로 정리되는 테이퍼드 실루엣으로, 데일리와 오피스 모두 커버합니다.",
    image: svgPlaceholder(["#d4cec4", "#fcf8f3", "#8a6c57", "#2c241e"], "TAPERED SLACKS", "Clean line / Daily tailoring")
  },
  {
    id: "P003",
    name: "컴포트 릴랙스 데님",
    brand: "Low Archive",
    category: "데님",
    price: 98000,
    fitType: "릴랙스핏",
    stretch: "거의 없음",
    thickness: "보통",
    description: "너무 와이드하지 않게 볼륨을 남긴 릴랙스 데님으로, 상체가 큰 체형에도 하체 균형을 잡아줍니다.",
    image: svgPlaceholder(["#d9d8d3", "#f8f8f5", "#5a6572", "#1f2023"], "RELAX DENIM", "Balanced volume / Easy wear")
  },
  {
    id: "P004",
    name: "소프트 크롭 니트",
    brand: "Layer House",
    category: "니트",
    price: 76000,
    fitType: "정핏",
    stretch: "좋음",
    thickness: "보통",
    description: "허리선을 자연스럽게 정리해 주는 크롭 밸런스로, 가벼운 레이어링에 잘 어울리는 니트입니다.",
    image: svgPlaceholder(["#d9d0c7", "#fbf7f1", "#9a8266", "#2f261e"], "SOFT CROP KNIT", "Shape line / Soft texture")
  }
];
