const users = window.fitUsers;
const products = window.fitProducts;
const sizeResults = window.fitSizeResults;

const app = document.querySelector("#app");
const statusUserText = document.querySelector("#statusUserText");

const state = {
  selectedUserId: localStorage.getItem("fit-sense-user") || users[0].id,
  view: "users",
  selectedProductId: null,
  selectedResultId: null
};

const money = new Intl.NumberFormat("ko-KR");

function setUser(userId) {
  state.selectedUserId = userId;
  localStorage.setItem("fit-sense-user", userId);
}

function getSelectedUser() {
  return users.find((user) => user.id === state.selectedUserId) || users[0];
}

function getSelectedProduct() {
  return products.find((product) => product.id === state.selectedProductId) || null;
}

function getSelectedResult() {
  return sizeResults.find((result) => result.id === state.selectedResultId) || null;
}

function getResultsForProduct(userId, productId) {
  return sizeResults
    .filter((result) => result.userId === userId && result.productId === productId)
    .sort((a, b) => b.score - a.score);
}

function getBadgeClass(level) {
  if (level === "높음") return "badge-strong";
  if (level === "보통") return "badge-medium";
  return "badge-light";
}

function render() {
  const selectedUser = getSelectedUser();
  statusUserText.textContent = `${selectedUser.name} 기준 추천`;

  if (state.view === "users") {
    renderUserSelection(selectedUser);
    return;
  }

  if (state.view === "products") {
    renderProductList(selectedUser);
    return;
  }

  if (state.view === "product-detail") {
    renderProductDetail(selectedUser, getSelectedProduct());
    return;
  }

  if (state.view === "result-detail") {
    renderResultDetail(selectedUser, getSelectedProduct(), getSelectedResult());
  }
}

function renderUserSelection(selectedUser) {
  app.innerHTML = `
    <section class="screen">
      <div class="hero">
        <span class="eyebrow">Body-based fit recommendation</span>
        <h1>같은 옷도<br />사람마다 다르게 보여줍니다.</h1>
        <p>체형 프로필을 고르면, 그 사람에게 맞는 사이즈와 핏 결과만 자연스럽게 이어집니다.</p>
        <div class="hero-meta">
          <span class="pill">사용자 3명</span>
          <span class="pill">상품 4개</span>
          <span class="pill">결과 리포트 포함</span>
        </div>
      </div>

      <div class="section-title">
        <div>
          <h2>사용자 선택</h2>
          <p>누구를 기준으로 추천할지 먼저 정해 주세요.</p>
        </div>
        <button class="primary-button" data-action="go-products">상품 보기</button>
      </div>

      <div class="stack">
        ${users
          .map(
            (user) => `
              <button class="card user-card ${user.id === selectedUser.id ? "active" : ""}" data-user-id="${user.id}">
                <div class="user-card-top">
                  <div style="display:flex; gap:14px; align-items:center;">
                    <div class="avatar">${user.name.slice(0, 1)}</div>
                    <div style="text-align:left;">
                      <h3>${user.name}</h3>
                      <p class="muted">${user.summary}</p>
                    </div>
                  </div>
                  <span class="soft-tag">${user.usualTopSize} / ${user.usualBottomSize}</span>
                </div>
                <div class="tag-row">
                  ${user.features.map((feature) => `<span class="tag">${feature}</span>`).join("")}
                </div>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderProductList(selectedUser) {
  app.innerHTML = `
    <section class="screen">
      <div class="card current-user">
        <div class="avatar">${selectedUser.name.slice(0, 1)}</div>
        <div style="flex:1;">
          <strong>${selectedUser.name}</strong>
          <p class="muted">${selectedUser.summary}</p>
        </div>
        <button class="ghost-button" data-action="go-users">변경</button>
      </div>

      <div class="hero">
        <span class="eyebrow">${selectedUser.name}님 기준 탐색</span>
        <h1>오늘 입고 싶은 무드에 맞춰 골라보세요.</h1>
        <p>${selectedUser.styleNote}</p>
        <div class="hero-meta">
          <span class="pill">상의 ${selectedUser.usualTopSize}</span>
          <span class="pill">하의 ${selectedUser.usualBottomSize}</span>
          <span class="pill">${selectedUser.bodyRatio}</span>
        </div>
      </div>

      <div class="section-title">
        <div>
          <h2>상품 목록</h2>
          <p>선택된 사용자 기준으로 상세 추천이 이어집니다.</p>
        </div>
      </div>

      <div class="product-grid">
        ${products
          .map((product) => {
            const topResult = getResultsForProduct(selectedUser.id, product.id)[0];
            return `
              <button class="card product-card" data-product-id="${product.id}">
                <div class="product-image"><img src="${product.image}" alt="${product.name}" /></div>
                <div class="product-body">
                  <div class="product-meta">
                    <div style="text-align:left;">
                      <div class="muted">${product.brand}</div>
                      <h3>${product.name}</h3>
                    </div>
                    <div class="price">${money.format(product.price)}원</div>
                  </div>
                  <div class="compact-tags">
                    <span class="soft-tag">${product.fitType}</span>
                    <span class="mini-tag">${product.category}</span>
                    <span class="mini-tag">${product.stretch}</span>
                  </div>
                  <div class="summary-row">
                    <span class="fit-highlight">${topResult ? `${topResult.sizeName} 추천` : "추천 준비 중"}</span>
                    <span class="${topResult ? getBadgeClass(topResult.recommendationLevel) : "badge-light"}">${topResult ? topResult.recommendationLevel : "정보 없음"}</span>
                  </div>
                </div>
              </button>
            `;
          })
          .join("")}
      </div>
      <div class="bottom-spacer"></div>
    </section>
  `;
}

function renderProductDetail(selectedUser, product) {
  const results = getResultsForProduct(selectedUser.id, product.id);
  const bestResult = results[0];

  app.innerHTML = `
    <section class="screen">
      <div class="toolbar">
        <button data-action="go-products">이전</button>
        <button data-action="go-users">사용자 변경</button>
      </div>

      <div class="desktop-split">
        <div class="screen" style="padding-bottom:0;">
          <div class="detail-image card"><img src="${product.image}" alt="${product.name}" /></div>
          <div class="card panel detail-body">
            <div>
              <div class="muted">${product.brand} · ${product.category}</div>
              <h2 style="margin:8px 0 0; font-size:30px;">${product.name}</h2>
            </div>
            <p class="muted">${product.description}</p>
            <div class="spec-grid">
              <div class="spec-item"><strong>가격</strong>${money.format(product.price)}원</div>
              <div class="spec-item"><strong>핏 유형</strong>${product.fitType}</div>
              <div class="spec-item"><strong>신축성</strong>${product.stretch}</div>
              <div class="spec-item"><strong>두께감</strong>${product.thickness}</div>
            </div>
          </div>
        </div>

        <div class="screen" style="padding-bottom:0;">
          <div class="card panel">
            <div class="profile-header">
              <div>
                <div class="muted">현재 기준 사용자</div>
                <h2>${selectedUser.name}</h2>
              </div>
              <span class="soft-tag">${selectedUser.bodyRatio}</span>
            </div>
            <p class="muted">${selectedUser.summary}</p>
            <div class="tag-row">
              ${selectedUser.features.map((feature) => `<span class="tag">${feature}</span>`).join("")}
            </div>
          </div>

          <div class="card detail-card">
            <div class="recommendation-banner">
              <strong>가장 잘 맞는 선택</strong>
              <div style="display:flex; justify-content:space-between; align-items:end; gap:12px;">
                <div>
                  <div class="muted">추천 사이즈</div>
                  <div style="font-size:32px; font-weight:700;">${bestResult.sizeName}</div>
                </div>
                <div class="${getBadgeClass(bestResult.recommendationLevel)}">${bestResult.recommendationLevel}</div>
              </div>
              <p class="muted" style="margin-top:10px;">${bestResult.silhouetteNote}</p>
            </div>

            <div>
              <h3>사이즈 결과</h3>
              <p class="muted">같은 상품이라도 ${selectedUser.name}님 기준 결과는 아래처럼 달라집니다.</p>
            </div>

            <div class="result-list">
              ${results
                .map(
                  (result) => `
                    <button class="card result-card" data-result-id="${result.id}">
                      <div class="result-head">
                        <div style="text-align:left;">
                          <h3>${result.sizeName}</h3>
                          <div class="result-score">추천도 ${result.score}점</div>
                        </div>
                        <div class="${getBadgeClass(result.recommendationLevel)}">${result.recommendationLevel}</div>
                      </div>
                      <div class="detail-row">
                        <span class="fit-highlight">${result.overallFit}</span>
                        <span class="muted">${result.alternateSize} 대안</span>
                      </div>
                      <p class="muted" style="text-align:left; margin:0;">${result.riskNote}</p>
                    </button>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderResultDetail(selectedUser, product, result) {
  const entries = [
    ["어깨", result.measurements.shoulder],
    ["소매", result.measurements.sleeve],
    ["기장", result.measurements.length],
    ["허리", result.measurements.waist],
    ["힙", result.measurements.hip],
    ["허벅지", result.measurements.thigh]
  ];

  app.innerHTML = `
    <section class="screen">
      <div class="toolbar">
        <button data-action="go-product-detail">이전</button>
        <button data-action="go-products">상품 목록</button>
      </div>

      <div class="card detail-card">
        <div>
          <div class="muted">${selectedUser.name} · ${product.name}</div>
          <h3>${result.sizeName}</h3>
        </div>

        <div class="recommendation-banner">
          <strong>${result.recommendationLevel} 추천</strong>
          <div style="font-size:22px; font-weight:700;">${result.overallFit}</div>
          <p class="muted" style="margin-top:10px;">${result.silhouetteNote}</p>
        </div>

        <div class="report-grid">
          ${entries
            .map(
              ([label, value]) => `
                <div class="report-item">
                  <strong>${label}</strong>
                  <div>${value}</div>
                </div>
              `
            )
            .join("")}
        </div>

        <div class="note-box">
          <strong style="display:block; margin-bottom:8px;">주의사항</strong>
          ${result.riskNote}
        </div>

        <div class="note-box">
          <strong style="display:block; margin-bottom:8px;">차선 추천</strong>
          ${result.alternateSize}
        </div>
      </div>
    </section>
  `;
}

app.addEventListener("click", (event) => {
  const userButton = event.target.closest("[data-user-id]");
  const productButton = event.target.closest("[data-product-id]");
  const resultButton = event.target.closest("[data-result-id]");
  const actionButton = event.target.closest("[data-action]");

  if (userButton) {
    setUser(userButton.dataset.userId);
    render();
    return;
  }

  if (productButton) {
    state.selectedProductId = productButton.dataset.productId;
    state.view = "product-detail";
    render();
    return;
  }

  if (resultButton) {
    state.selectedResultId = resultButton.dataset.resultId;
    state.view = "result-detail";
    render();
    return;
  }

  if (actionButton) {
    const action = actionButton.dataset.action;

    if (action === "go-products") state.view = "products";
    if (action === "go-users") state.view = "users";
    if (action === "go-product-detail") state.view = "product-detail";

    render();
  }
});

render();
