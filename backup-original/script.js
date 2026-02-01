// ============================================
// PAGE ROUTING & NAVIGATION
// ============================================

// Navigation handling
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

function navigateToPage(pageName) {
  // Update nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    }
  });

  // Update pages
  pages.forEach(page => {
    page.classList.remove('active');
    if (page.id === `${pageName}-page`) {
      page.classList.add('active');
    }
  });

  // Update dashboard when navigating to it
  if (pageName === 'dashboard') {
    updateDashboard();
  }
}

// Handle navigation clicks
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageName = link.dataset.page;
    navigateToPage(pageName);
    window.location.hash = pageName;
  });
});

// Handle browser back/forward
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1);
  if (hash && ['detection', 'awareness', 'dashboard'].includes(hash)) {
    navigateToPage(hash);
  }
});

// Initialize page on load
window.addEventListener('load', () => {
  const hash = window.location.hash.slice(1);
  if (hash && ['detection', 'awareness', 'dashboard'].includes(hash)) {
    navigateToPage(hash);
  } else {
    navigateToPage('detection');
  }

  // Focus input
  if (inputText) inputText.focus();
});

// ============================================
// TAB SWITCHING
// ============================================

const tabBtns = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;

    // Update buttons
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update content
    tabContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === `${tabName}-tab`) {
        content.classList.add('active');
      }
    });
  });
});

// ============================================
// IMAGE UPLOAD & DRAG-DROP
// ============================================

const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');
const uploadPlaceholder = document.getElementById('uploadPlaceholder');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const removeImageBtn = document.getElementById('removeImage');
const browseBtn = document.getElementById('browseBtn');
const extractedTextSection = document.getElementById('extractedTextSection');
const extractedText = document.getElementById('extractedText');

// Browse button click
browseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  fileInput.click();
});

// Upload area click
uploadArea.addEventListener('click', () => {
  if (!imagePreview.style.display || imagePreview.style.display === 'none') {
    fileInput.click();
  }
});

// File input change
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith('image/')) {
    handleImageUpload(file);
  }
});

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');

  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    handleImageUpload(file);
  }
});

// Handle image upload
function handleImageUpload(file) {
  const reader = new FileReader();

  reader.onload = (e) => {
    previewImg.src = e.target.result;
    uploadPlaceholder.style.display = 'none';
    imagePreview.style.display = 'block';

    // Simulate text extraction (in real app, use OCR API)
    simulateTextExtraction();
  };

  reader.readAsDataURL(file);
}

// Remove image
removeImageBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  clearImageUpload();
});

function clearImageUpload() {
  fileInput.value = '';
  previewImg.src = '';
  uploadPlaceholder.style.display = 'block';
  imagePreview.style.display = 'none';
  extractedTextSection.style.display = 'none';
  extractedText.value = '';
}

// Simulate text extraction from image
function simulateTextExtraction() {
  extractedTextSection.style.display = 'block';
  extractedText.value = 'Click here to enter or paste text extracted from the image...';
  extractedText.focus();
  extractedText.select();
}

// ============================================
// DETECTION FUNCTIONALITY
// ============================================

// DOM Elements
const inputText = document.getElementById('inputText');
const charCounter = document.getElementById('charCounter');
const scanBtn = document.getElementById('scanBtn');
const clearBtn = document.getElementById('clearBtn');
const scanBtnText = document.getElementById('scanBtnText');
const spinner = document.getElementById('spinner');
const resultsCard = document.getElementById('resultsCard');
const statusBadge = document.getElementById('statusBadge');
const statusIcon = document.getElementById('statusIcon');
const statusText = document.getElementById('statusText');
const riskValue = document.getElementById('riskValue');
const progressFill = document.getElementById('progressFill');
const analysisList = document.getElementById('analysisList');

// Character Counter
if (inputText) {
  inputText.addEventListener('input', () => {
    const length = inputText.value.length;
    charCounter.textContent = `${length} / 2000`;

    charCounter.classList.remove('warning', 'error');
    if (length > 1800) {
      charCounter.classList.add('error');
    } else if (length > 1500) {
      charCounter.classList.add('warning');
    }
  });
}

// Clear Button
clearBtn.addEventListener('click', () => {
  inputText.value = '';
  charCounter.textContent = '0 / 2000';
  charCounter.classList.remove('warning', 'error');
  resultsCard.classList.remove('show');
  clearImageUpload();

  // Switch back to text tab
  tabBtns[0].click();

  inputText.focus();
});

// Scan Button
scanBtn.addEventListener('click', async () => {
  // Get text from active tab
  let text = '';
  const activeTab = document.querySelector('.tab-panel.active');

  if (activeTab.id === 'text-tab') {
    text = inputText.value.trim();
  } else {
    text = extractedText.value.trim();
  }

  // Validation
  if (!text) {
    alert('Please enter some text to analyze');
    return;
  }

  if (text.length < 10) {
    alert('Please enter at least 10 characters for analysis');
    return;
  }

  // Start scanning
  await performScan(text);
});

// Perform Phishing Scan
async function performScan(text) {
  // Disable button and show loading state
  scanBtn.disabled = true;
  scanBtnText.textContent = 'Analyzing...';
  spinner.style.display = 'inline-block';
  resultsCard.classList.remove('show');

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Analyze text for phishing indicators
  const analysis = analyzeText(text);

  // Display results
  displayResults(analysis);

  // Save to history
  saveToHistory(text, analysis);

  // Re-enable button
  scanBtn.disabled = false;
  scanBtnText.textContent = '🔍 Scan for Phishing';
  spinner.style.display = 'none';
}

// Analyze Text for Phishing Indicators
function analyzeText(text) {
  const lowerText = text.toLowerCase();
  let riskScore = 0;
  const reasons = [];

  // Check for urgency language
  const urgencyWords = ['urgent', 'immediate', 'act now', 'limited time', 'expires', 'verify now', 'suspend', 'locked', 'unusual activity'];
  const hasUrgency = urgencyWords.some(word => lowerText.includes(word));
  if (hasUrgency) {
    riskScore += 25;
    reasons.push('Urgency language detected (e.g., "act now", "urgent", "expires")');
  }

  // Check for credential requests
  const credentialWords = ['password', 'credit card', 'ssn', 'social security', 'account number', 'pin', 'verify your', 'confirm your'];
  const hasCredentialRequest = credentialWords.some(word => lowerText.includes(word));
  if (hasCredentialRequest) {
    riskScore += 30;
    reasons.push('Credential or sensitive information request detected');
  }

  // Check for suspicious links
  const urlPattern = /(https?:\/\/[^\s]+)/gi;
  const urls = text.match(urlPattern) || [];
  const hasSuspiciousUrl = urls.some(url => {
    const suspiciousPatterns = ['.tk', '.ml', '.ga', 'bit.ly', 'tinyurl', 'goo.gl', '@', 'login', 'verify', 'secure'];
    return suspiciousPatterns.some(pattern => url.toLowerCase().includes(pattern));
  });

  if (hasSuspiciousUrl) {
    riskScore += 25;
    reasons.push('Suspicious link structure or shortened URL detected');
  } else if (urls.length > 0) {
    riskScore += 10;
    reasons.push('Contains external links - verify destination before clicking');
  }

  // Check for domain spoofing (lookalike domains)
  const commonBrands = ['paypal', 'amazon', 'microsoft', 'apple', 'google', 'facebook', 'netflix'];
  const hasSpoofing = commonBrands.some(brand => {
    const variations = [
      brand.replace('l', '1'),
      brand.replace('o', '0'),
      brand.replace('a', '@'),
      brand + '-verify',
      brand + '-secure',
      brand + '-support'
    ];
    return variations.some(v => lowerText.includes(v));
  });

  if (hasSpoofing) {
    riskScore += 30;
    reasons.push('Possible domain spoofing or lookalike domain detected');
  }

  // Check for poor grammar/spelling
  const hasMultipleExclamation = (text.match(/!/g) || []).length > 3;
  const hasAllCaps = text.split(' ').some(word => word.length > 3 && word === word.toUpperCase());
  if (hasMultipleExclamation || hasAllCaps) {
    riskScore += 15;
    reasons.push('Unusual formatting detected (excessive punctuation or capitalization)');
  }

  // Check for financial terms
  const financialWords = ['refund', 'payment', 'invoice', 'transaction', 'bank', 'paypal', 'wire transfer', 'prize', 'winner'];
  const hasFinancialTerms = financialWords.some(word => lowerText.includes(word));
  if (hasFinancialTerms) {
    riskScore += 20;
    reasons.push('Financial transaction or monetary request mentioned');
  }

  // Check for impersonation
  const impersonationWords = ['amazon', 'paypal', 'microsoft', 'apple', 'google', 'irs', 'government', 'bank of'];
  const hasImpersonation = impersonationWords.some(word => lowerText.includes(word));
  if (hasImpersonation && (hasUrgency || hasCredentialRequest)) {
    riskScore += 25;
    reasons.push('Possible impersonation of trusted organization detected');
  }

  // Cap risk score at 100
  riskScore = Math.min(riskScore, 100);

  // Add positive indicators if score is low
  if (riskScore < 30) {
    if (reasons.length === 0) {
      reasons.push('No obvious phishing indicators detected');
      reasons.push('Text appears to be legitimate communication');
    }
    reasons.push('Always verify sender identity through official channels');
  }

  // Determine status
  let status;
  if (riskScore < 30) {
    status = 'safe';
  } else if (riskScore < 60) {
    status = 'suspicious';
  } else {
    status = 'phishing';
  }

  return {
    status,
    riskScore,
    reasons
  };
}

// Display Results
function displayResults(analysis) {
  const { status, riskScore, reasons } = analysis;

  // Set status badge
  statusBadge.className = `mantine-badge ${status}`;

  if (status === 'safe') {
    statusIcon.textContent = '✅';
    statusText.textContent = 'SAFE';
  } else if (status === 'suspicious') {
    statusIcon.textContent = '⚠️';
    statusText.textContent = 'SUSPICIOUS';
  } else {
    statusIcon.textContent = '🚨';
    statusText.textContent = 'PHISHING';
  }

  // Set risk score
  riskValue.textContent = `${riskScore}%`;

  // Animate progress bar
  setTimeout(() => {
    progressFill.style.width = `${riskScore}%`;

    progressFill.className = 'progress-fill';
    if (riskScore < 30) {
      progressFill.classList.add('low');
    } else if (riskScore < 60) {
      progressFill.classList.add('medium');
    } else {
      progressFill.classList.add('high');
    }
  }, 100);

  // Set analysis reasons
  analysisList.innerHTML = '';
  reasons.forEach(reason => {
    const li = document.createElement('li');
    li.textContent = reason;
    analysisList.appendChild(li);
  });

  // Show results with animation
  setTimeout(() => {
    resultsCard.classList.add('show');
    resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 200);
}

// ============================================
// SCAN HISTORY & LOCAL STORAGE
// ============================================

function saveToHistory(text, analysis) {
  const history = getScanHistory();

  const scan = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    text: text.substring(0, 100), // Store preview only
    status: analysis.status,
    riskScore: analysis.riskScore
  };

  history.unshift(scan);

  // Keep only last 50 scans
  if (history.length > 50) {
    history.pop();
  }

  localStorage.setItem('phishguard_history', JSON.stringify(history));
}

function getScanHistory() {
  const stored = localStorage.getItem('phishguard_history');
  return stored ? JSON.parse(stored) : [];
}

// ============================================
// DASHBOARD
// ============================================

function updateDashboard() {
  const history = getScanHistory();

  // Calculate statistics
  const totalScans = history.length;
  const safeCount = history.filter(s => s.status === 'safe').length;
  const suspiciousCount = history.filter(s => s.status === 'suspicious').length;
  const phishingCount = history.filter(s => s.status === 'phishing').length;

  // Update stat cards
  document.getElementById('totalScans').textContent = totalScans;
  document.getElementById('safeCount').textContent = safeCount;
  document.getElementById('suspiciousCount').textContent = suspiciousCount;
  document.getElementById('phishingCount').textContent = phishingCount;

  // Update chart
  if (totalScans > 0) {
    const safePercent = Math.round((safeCount / totalScans) * 100);
    const suspiciousPercent = Math.round((suspiciousCount / totalScans) * 100);
    const phishingPercent = Math.round((phishingCount / totalScans) * 100);

    document.getElementById('safeBar').style.width = `${safePercent}%`;
    document.getElementById('suspiciousBar').style.width = `${suspiciousPercent}%`;
    document.getElementById('phishingBar').style.width = `${phishingPercent}%`;

    document.getElementById('safePercent').textContent = `${safePercent}%`;
    document.getElementById('suspiciousPercent').textContent = `${suspiciousPercent}%`;
    document.getElementById('phishingPercent').textContent = `${phishingPercent}%`;
  }

  // Update scan history list
  const scanHistoryEl = document.getElementById('scanHistory');

  if (history.length === 0) {
    scanHistoryEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <p>No scans yet. Start by analyzing some content!</p>
      </div>
    `;
  } else {
    scanHistoryEl.innerHTML = '';

    // Show last 10 scans
    history.slice(0, 10).forEach(scan => {
      const scanItem = document.createElement('div');
      scanItem.className = 'scan-item';

      const date = new Date(scan.timestamp);
      const timeStr = date.toLocaleString();

      scanItem.innerHTML = `
        <div class="scan-item-header">
          <div class="mantine-badge ${scan.status}">
            <span class="badge-icon">${scan.status === 'safe' ? '✅' : scan.status === 'suspicious' ? '⚠️' : '🚨'}</span>
            <span>${scan.status.toUpperCase()}</span>
          </div>
          <span class="scan-item-time">${timeStr}</span>
        </div>
        <div class="scan-item-preview">${scan.text}${scan.text.length >= 100 ? '...' : ''}</div>
      `;

      scanHistoryEl.appendChild(scanItem);
    });
  }
}

// Allow Enter key to submit (with Shift+Enter for new line)
if (inputText) {
  inputText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      scanBtn.click();
    }
  });
}

if (extractedText) {
  extractedText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      scanBtn.click();
    }
  });
}
