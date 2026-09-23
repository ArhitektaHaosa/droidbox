// Load and render product data from data/products.json only
(function() {
  'use strict';

  let products = [];

  async function init() {
    try {
      await loadProducts();
      renderComparisonCards();
      renderComparisonTable();
      renderProducts();
      initCollapsibleTips();
    } catch (error) {
      console.error('Error initializing app:', error);
      showError('Failed to load product data. Please refresh the page.');
    }
  }

  async function loadProducts() {
    try {
      const response = await fetch('data/products.json');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      products = await response.json();
      products.sort((a, b) => (a.rank || 999) - (b.rank || 999));
    } catch (error) {
      console.error('Error loading products:', error);
      throw error;
    }
  }

  // Mobile-first: render card view
  function renderComparisonCards() {
    const container = document.getElementById('comparisonCards');
    if (!container) return;

    container.innerHTML = products.map(product => `
      <div class="comparison-card">
        <div class="comparison-card-header">
          <span class="rank-badge ${product.best_for === 'AliExpress' ? 'best-for-aliexpress' : ''}">${product.rank}</span>
          <div class="comparison-card-title">
            <h3>${escapeHtml(product.name)}</h3>
            <span class="brand">${escapeHtml(product.brand)}</span>
          </div>
        </div>
        ${renderProductImage(product, 'comparison-card-image')}
        <div class="comparison-card-specs">
          <div class="spec">
            <span class="spec-value ${getScoreClass(product.score_overall)}">${product.score_overall.toFixed(1)}</span>
            <span class="spec-label">Overall</span>
          </div>
          <div class="spec">
            <span class="spec-value">${escapeHtml(product.netflix_max)}</span>
            <span class="spec-label">Netflix</span>
          </div>
          <div class="spec">
            <span class="spec-value">${product.ram_gb}/${product.storage_gb}GB</span>
            <span class="spec-label">RAM/Storage</span>
          </div>
        </div>
        <a href="#${product.id}" class="btn btn-primary">View Details</a>
      </div>
    `).join('');
  }

  // Desktop: render comparison table
  function renderComparisonTable() {
    const tbody = document.getElementById('comparisonTableBody');
    if (!tbody) return;

    tbody.innerHTML = products.map(product => `
      <tr>
        <td>
          <span class="rank-badge">${product.rank}</span>
        </td>
        <td>
          <span class="device-name">${escapeHtml(product.name)}</span>
          <span class="device-brand">${escapeHtml(product.brand)}</span>
        </td>
        <td>
          <span class="score ${getScoreClass(product.score_overall)}">${product.score_overall.toFixed(1)}</span>
        </td>
        <td>
          <span class="score ${getScoreClass(product.score_streaming)}">${product.score_streaming.toFixed(1)}</span>
        </td>
        <td>${escapeHtml(product.netflix_max)}</td>
        <td>${product.ram_gb}GB / ${product.storage_gb}GB</td>
      </tr>
    `).join('');
  }

  // Render product detail cards
  function renderProducts() {
    const container = document.getElementById('productsList');
    if (!container) return;

    container.innerHTML = products.map(product => `
      <div class="product-card" id="${product.id}">
        ${product.best_for === 'AliExpress' ? '<span class="best-for-aliexpress-badge">Best for AliExpress</span>' : ''}
        
        <div class="product-header">
          <div class="product-rank">#${product.rank}</div>
          ${renderProductImage(product, 'product-image')}
          <div class="product-title">
            <h3>${escapeHtml(product.name)}</h3>
            <span class="brand">${escapeHtml(product.brand)}</span>
            ${product.short_description ? `<span class="short-desc">${escapeHtml(product.short_description)}</span>` : ''}
          </div>
        </div>

        <div class="product-scores">
          <div class="score-item">
            <span class="score-value ${getScoreClass(product.score_overall)}">${product.score_overall.toFixed(1)}</span>
            <span class="score-label">Overall</span>
          </div>
          <div class="score-item">
            <span class="score-value ${getScoreClass(product.score_streaming)}">${product.score_streaming.toFixed(1)}</span>
            <span class="score-label">Streaming</span>
          </div>
          <div class="score-item">
            <span class="score-value ${getScoreClass(product.score_value)}">${product.score_value.toFixed(1)}</span>
            <span class="score-label">Value</span>
          </div>
          <div class="score-item">
            <span class="score-value ${getScoreClass(product.score_build)}">${product.score_build.toFixed(1)}</span>
            <span class="score-label">Build</span>
          </div>
        </div>

        <div class="product-specs">
          <div class="spec-row">
            <span class="spec-label">OS:</span>
            <span class="spec-value">${escapeHtml(product.os)}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">SoC:</span>
            <span class="spec-value">${escapeHtml(product.soc)}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Memory:</span>
            <span class="spec-value">${product.ram_gb}GB RAM / ${product.storage_gb}GB Storage</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Widevine:</span>
            <span class="spec-value">${escapeHtml(product.widevine)}<span class="spec-badge">Certified</span></span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Netflix Max:</span>
            <span class="spec-value">${escapeHtml(product.netflix_max)}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Prime Video:</span>
            <span class="spec-value">Native<span class="spec-badge">Yes</span></span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Wi-Fi:</span>
            <span class="spec-value">${escapeHtml(product.wifi)}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">HDR:</span>
            <span class="spec-value">${escapeHtml(product.hdr)}</span>
          </div>
        </div>

        <div class="product-details">
          <button class="buying-tips-toggle" data-product="${product.id}">
            Show Buying Tips
          </button>
          <div class="buying-tips-content" data-product="${product.id}">
            <div class="detail-section pros">
              <h4>Pros</h4>
              <p>${escapeHtml(product.pros)}</p>
            </div>
            <div class="detail-section cons">
              <h4>Cons</h4>
              <p>${escapeHtml(product.cons)}</p>
            </div>
            <div class="detail-section dos">
              <h4>Do</h4>
              <p>${escapeHtml(product.dos)}</p>
            </div>
            <div class="detail-section donts">
              <h4>Don't</h4>
              <p>${escapeHtml(product.donts)}</p>
            </div>
          </div>
        </div>

        ${product.notes ? `
          <div style="background: var(--bg-dark); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--text-secondary); border-left: 3px solid var(--accent-teal-dim);">
            <strong style="color: var(--text-primary);">Note:</strong> ${escapeHtml(product.notes)}
          </div>
        ` : ''}

        <div class="product-actions">
          ${renderCTA(product)}
        </div>
      </div>
    `).join('');
  }

  // Render product image (local or URL)
  function renderProductImage(product, className) {
    if (product.image_local) {
      return `<img src="${escapeHtml(product.image_local)}" alt="${escapeHtml(product.name)}" class="${className}" onerror="this.style.display='none'">`;
    } else if (product.image_url) {
      return `<img src="${escapeHtml(product.image_url)}" alt="${escapeHtml(product.name)}" class="${className}" onerror="this.style.display='none'">`;
    }
    return '';
  }

  // Render CTA button - uses affiliate_url from data/products.json ONLY
  function renderCTA(product) {
    if (product.affiliate_url && product.affiliate_url.trim()) {
      return `
        <a href="${escapeHtml(product.affiliate_url)}" 
           class="btn btn-primary" 
           target="_blank" 
           rel="noopener noreferrer nofollow">
          View on AliExpress →
        </a>
        ${product.product_url && product.product_url.trim() ? `
          <a href="${escapeHtml(product.product_url)}" 
             class="btn btn-secondary" 
             target="_blank" 
             rel="noopener noreferrer">
            Product Page
          </a>
        ` : `
          <a href="https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(product.aliexpress_search)}" 
             class="btn btn-secondary" 
             target="_blank" 
             rel="noopener noreferrer">
            Search AliExpress
          </a>
        `}
      `;
    } else {
      return `
        <button class="btn btn-placeholder" 
                disabled 
                title="Affiliate link not configured. Site owner: add s.click URL to affiliate.txt">
          Affiliate Link Pending
        </button>
        ${product.product_url && product.product_url.trim() ? `
          <a href="${escapeHtml(product.product_url)}" 
             class="btn btn-secondary" 
             target="_blank" 
             rel="noopener noreferrer">
            Product Page
          </a>
        ` : `
          <a href="https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(product.aliexpress_search)}" 
             class="btn btn-secondary" 
             target="_blank" 
             rel="noopener noreferrer">
            Search AliExpress
          </a>
        `}
      `;
    }
  }

  // Initialize collapsible buying tips
  function initCollapsibleTips() {
    const toggles = document.querySelectorAll('.buying-tips-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const productId = toggle.getAttribute('data-product');
        const content = document.querySelector(`.buying-tips-content[data-product="${productId}"]`);
        
        if (content) {
          const isExpanded = toggle.classList.contains('expanded');
          if (isExpanded) {
            toggle.classList.remove('expanded');
            content.classList.remove('expanded');
            toggle.textContent = 'Show Buying Tips';
          } else {
            toggle.classList.add('expanded');
            content.classList.add('expanded');
            toggle.textContent = 'Hide Buying Tips';
          }
        }
      });
    });
  }

  function getScoreClass(score) {
    if (score >= 9.0) return 'high';
    if (score >= 8.0) return 'medium';
    return 'low';
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  function showError(message) {
    const container = document.getElementById('productsList');
    if (container) {
      container.innerHTML = `
        <div style="background: rgba(248, 113, 113, 0.1); color: var(--score-low); padding: 1.5rem; border-radius: 12px; text-align: center; border: 1px solid var(--score-low);">
          <strong>Error:</strong> ${escapeHtml(message)}
        </div>
      `;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
