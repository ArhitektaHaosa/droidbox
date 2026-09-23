// Load and render product data
(function() {
  'use strict';

  let products = [];

  // Initialize the app
  async function init() {
    try {
      await loadProducts();
      renderComparison();
      renderProducts();
    } catch (error) {
      console.error('Error initializing app:', error);
      showError('Failed to load product data. Please refresh the page.');
    }
  }

  // Load products from JSON file
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

  // Render comparison table
  function renderComparison() {
    const tbody = document.getElementById('comparisonTableBody');
    if (!tbody) return;

    tbody.innerHTML = products.map(product => `
      <tr>
        <td>
          <span class="rank-badge ${product.rank <= 3 ? 'top-3' : ''}">${product.rank}</span>
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
        <td>
          <a href="#${product.id}" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">Details</a>
        </td>
      </tr>
    `).join('');
  }

  // Render product cards
  function renderProducts() {
    const container = document.getElementById('productsList');
    if (!container) return;

    container.innerHTML = products.map(product => `
      <div class="product-card" id="${product.id}">
        <div class="product-header">
          <div class="product-rank ${product.rank <= 3 ? 'top-3' : ''}">#${product.rank}</div>
          <div class="product-title">
            <h3>${escapeHtml(product.name)}</h3>
            <span class="brand">${escapeHtml(product.brand)}</span>
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
            <span class="spec-value">Native Support<span class="spec-badge">Yes</span></span>
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
          <div class="detail-section pros">
            <h4>✓ Pros</h4>
            <p>${escapeHtml(product.pros)}</p>
          </div>
          <div class="detail-section cons">
            <h4>✗ Cons</h4>
            <p>${escapeHtml(product.cons)}</p>
          </div>
          <div class="detail-section dos">
            <h4>👍 Do</h4>
            <p>${escapeHtml(product.dos)}</p>
          </div>
          <div class="detail-section donts">
            <h4>👎 Don't</h4>
            <p>${escapeHtml(product.donts)}</p>
          </div>
        </div>

        ${product.notes ? `
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.95rem; color: #5f6368;">
            <strong>Note:</strong> ${escapeHtml(product.notes)}
          </div>
        ` : ''}

        <div class="product-actions">
          ${renderCTA(product)}
        </div>
      </div>
    `).join('');
  }

  // Render CTA button based on affiliate_url availability
  function renderCTA(product) {
    if (product.affiliate_url && product.affiliate_url.trim()) {
      return `
        <a href="${escapeHtml(product.affiliate_url)}" 
           class="btn btn-primary" 
           target="_blank" 
           rel="noopener noreferrer nofollow">
          View on AliExpress →
        </a>
        <a href="https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(product.aliexpress_search)}" 
           class="btn btn-secondary" 
           target="_blank" 
           rel="noopener noreferrer">
          Search: ${escapeHtml(product.aliexpress_search)}
        </a>
      `;
    } else {
      return `
        <button class="btn btn-placeholder" 
                disabled 
                title="Affiliate link not yet configured in affiliate.txt">
          Affiliate Link Pending
        </button>
        <a href="https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(product.aliexpress_search)}" 
           class="btn btn-secondary" 
           target="_blank" 
           rel="noopener noreferrer">
          Search: ${escapeHtml(product.aliexpress_search)}
        </a>
      `;
    }
  }

  // Get score class for color coding
  function getScoreClass(score) {
    if (score >= 9.0) return 'high';
    if (score >= 8.0) return 'medium';
    return 'low';
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  // Show error message
  function showError(message) {
    const container = document.getElementById('productsList');
    if (container) {
      container.innerHTML = `
        <div style="background: #fce8e6; color: #c5221f; padding: 1.5rem; border-radius: 8px; text-align: center;">
          <strong>Error:</strong> ${escapeHtml(message)}
        </div>
      `;
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
