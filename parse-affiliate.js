#!/usr/bin/env node
// Parse affiliate.txt into data/products.json
// Run with: node parse-affiliate.js
// (Optional build step — site also works without it via inline parsing)

const fs = require('fs');
const path = require('path');

const affiliateFile = path.join(__dirname, 'affiliate.txt');
const outputFile = path.join(__dirname, 'data', 'products.json');

function parseAffiliateTxt(content) {
  const lines = content.split('\n');
  const products = [];
  let currentProduct = {};

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip comments and empty lines
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    // Product separator
    if (trimmed === '---') {
      if (Object.keys(currentProduct).length > 0) {
        products.push(currentProduct);
      }
      currentProduct = {};
      continue;
    }
    
    // Parse key: value pairs
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
      
      // Convert numeric fields
      if (key === 'rank' || key.endsWith('_gb')) {
        currentProduct[key] = value ? parseFloat(value) : null;
      } else if (key.startsWith('score_')) {
        currentProduct[key] = value ? parseFloat(value) : null;
      } else if (key === 'netflix_max' || key === 'prime_native' || key === 'google_certified') {
        currentProduct[key] = value;
      } else {
        currentProduct[key] = value;
      }
    }
  }
  
  // Add last product if exists
  if (Object.keys(currentProduct).length > 0) {
    products.push(currentProduct);
  }
  
  // Sort by rank
  products.sort((a, b) => (a.rank || 999) - (b.rank || 999));
  
  return products;
}

try {
  const content = fs.readFileSync(affiliateFile, 'utf8');
  const products = parseAffiliateTxt(content);
  
  fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
  console.log(`✓ Parsed ${products.length} products to ${outputFile}`);
} catch (error) {
  console.error('Error parsing affiliate.txt:', error.message);
  process.exit(1);
}
