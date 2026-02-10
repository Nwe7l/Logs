<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SmartStock - المخزون الذكي</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #090e1a;
      color: #e2e8f0;
    }
    
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .login-card {
      background: #1a2540;
      border: 1px solid #243352;
      border-radius: 20px;
      padding: 40px;
      width: 100%;
      max-width: 400px;
    }
    
    .login-card h1 {
      color: #f1f5f9;
      font-size: 28px;
      text-align: center;
      margin-bottom: 30px;
    }
    
    .input-group {
      margin-bottom: 15px;
    }
    
    .input-group input {
      width: 100%;
      padding: 12px 15px;
      border-radius: 8px;
      border: 1px solid #1e2d4a;
      background: #0d1220;
      color: #f1f5f9;
      font-size: 14px;
    }
    
    .input-group input:focus {
      outline: none;
      border-color: #38bdf8;
    }
    
    .error {
      color: #f87171;
      font-size: 13px;
      text-align: center;
      margin: 10px 0;
    }
    
    .btn {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #0284c7, #38bdf8);
      color: white;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 10px;
    }
    
    .btn:hover {
      opacity: 0.9;
    }
    
    .hint {
      color: #475569;
      font-size: 12px;
      text-align: center;
      margin-top: 20px;
    }
    
    .dashboard {
      min-height: 100vh;
    }
    
    .nav {
      background: #1a2540;
      border-bottom: 1px solid #243352;
      padding: 15px 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .nav-left {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .nav-logo {
      font-size: 18px;
      font-weight: 700;
      color: #f1f5f9;
    }
    
    .nav-right {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .nav-user {
      color: #64748b;
      font-size: 13px;
    }
    
    .btn-logout {
      padding: 6px 14px;
      border-radius: 7px;
      border: 1px solid #1e2d4a;
      background: transparent;
      color: #64748b;
      font-size: 12px;
      cursor: pointer;
    }
    
    .content {
      padding: 25px;
    }
    
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 25px;
    }
    
    .stat-card {
      background: #1a2540;
      border: 1px solid #243352;
      border-radius: 15px;
      padding: 20px;
    }
    
    .stat-icon {
      font-size: 32px;
      margin-bottom: 10px;
    }
    
    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: #38bdf8;
      margin-bottom: 5px;
    }
    
    .stat-label {
      color: #64748b;
      font-size: 12px;
    }
    
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .btn-add {
      padding: 8px 18px;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #0284c7, #38bdf8);
      color: white;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
    
    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 15px;
    }
    
    .item-card {
      background: #1a2540;
      border: 1px solid #243352;
      border-radius: 15px;
      padding: 18px;
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }
    
    .item-icon {
      font-size: 36px;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(56, 189, 248, 0.1);
      border-radius: 10px;
    }
    
    .item-actions {
      display: flex;
      gap: 5px;
    }
    
    .btn-action {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      border: 1px solid #1e2d4a;
      background: transparent;
      cursor: pointer;
      font-size: 12px;
    }
    
    .btn-delete {
      border-color: rgba(244, 114, 182, 0.3);
      color: #f472b6;
    }
    
    .item-name {
      color: #f1f5f9;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    
    .item-category {
      color: #64748b;
      font-size: 11px;
      margin-bottom: 10px;
    }
    
    .item-price {
      color: #34d399;
      font-size: 13px;
      margin-bottom: 10px;
    }
    
    .qty-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      margin-top: 15px;
    }
    
    .btn-qty {
      width: 32px;
      height: 32px;
      border-radius: 7px;
      border: 1px solid #1e2d4a;
      background: #0d1220;
      color: #94a3b8;
      font-size: 18px;
      cursor: pointer;
    }
    
    .qty-value {
      font-size: 20px;
      font-weight: 700;
      color: #38bdf8;
      min-width: 40px;
      text-align: center;
    }
    
    .modal {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    
    .modal-content {
      background: #1a2540;
      border: 1px solid #243352;
      border-radius: 18px;
      padding: 30px;
      width: 100%;
      max-width: 400px;
    }
    
    .modal-title {
      color: #f1f5f9;
      font-size: 18px;
      margin-bottom: 20px;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-label {
      display: block;
      color: #64748b;
      font-size: 11px;
      margin-bottom: 5px;
    }
    
    .form-input {
      width: 100%;
      padding: 10px 12px;
      border-radius: 7px;
      border: 1px solid #1e2d4a;
      background: #0d1220;
      color: #f1f5f9;
      font-size: 14px;
    }
    
    .modal-buttons {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    
    .btn-cancel {
      flex: 1;
      padding: 10px;
      border-radius: 7px;
      border: 1px solid #1e2d4a;
      background: transparent;
      color: #64748b;
      cursor: pointer;
    }
    
    .btn-save {
      flex: 1;
      padding: 10px;
      border-radius: 7px;
      border: none;
      background: linear-gradient(135deg, #0284c7, #38bdf8);
      color: white;
      font-weight: 600;
      cursor: pointer;
    }
    
    .hidden {
      display: none;
    }
  </style>
</head>
<body>
  <!-- Login Page -->
  <div id="loginPage" class="login-page">
    <div class="login-card">
      <h1>📦 SmartStock</h1>
      <div class="input-group">
        <input type="text" id="username" placeholder="اسم المستخدم" />
      </div>
      <div class="input-group">
        <input type="password" id="password" placeholder="كلمة المرور" />
      </div>
      <div id="loginError" class="error hidden"></div>
      <button class="btn" onclick="login()">تسجيل الدخول</button>
      <p class="hint">admin/admin123 (مدير) • user/user123 (مستخدم)</p>
    </div>
  </div>

  <!-- Dashboard -->
  <div id="dashboard" class="dashboard hidden">
    <div class="nav">
      <div class="nav-left">
        <span class="nav-logo">📦 SmartStock</span>
      </div>
      <div class="nav-right">
        <span class="nav-user" id="currentUser"></span>
        <button class="btn-logout" onclick="logout()">خروج</button>
      </div>
    </div>

    <div class="content">
      <!-- Stats -->
      <div class="stats">
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-value" id="totalQty">0</div>
          <div class="stat-label">إجمالي الأغراض</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-value" id="totalValue">0</div>
          <div class="stat-label">قيمة المخزون</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏷️</div>
          <div class="stat-value" id="itemCount">0</div>
          <div class="stat-label">أنواع الأغراض</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚠️</div>
          <div class="stat-value" id="lowStock">0</div>
          <div class="stat-label">كمية منخفضة</div>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar">
        <div></div>
        <button class="btn-add" id="addBtn" onclick="openAddModal()">+ إضافة غرض</button>
      </div>

      <!-- Items Grid -->
      <div class="items-grid" id="itemsGrid"></div>
    </div>
  </div>

  <!-- Modal -->
  <div id="modal" class="modal hidden" onclick="closeModal()">
    <div class="modal-content" onclick="event.stopPropagation()">
      <h2 class="modal-title" id="modalTitle">إضافة غرض جديد</h2>
      <div class="form-group">
        <label class="form-label">الاسم</label>
        <input type="text" class="form-input" id="itemName" />
      </div>
      <div class="form-group">
        <label class="form-label">الأيكون (إيموجي)</label>
        <input type="text" class="form-input" id="itemIcon" />
      </div>
      <div class="form-group">
        <label class="form-label">الكمية</label>
        <input type="number" class="form-input" id="itemQty" />
      </div>
      <div class="form-group">
        <label class="form-label">السعر (ريال)</label>
        <input type="number" class="form-input" id="itemPrice" />
      </div>
      <div class="form-group">
        <label class="form-label">الفئة</label>
        <input type="text" class="form-input" id="itemCategory" />
      </div>
      <div class="modal-buttons">
        <button class="btn-cancel" onclick="closeModal()">إلغاء</button>
        <button class="btn-save" onclick="saveItem()">حفظ</button>
      </div>
    </div>
  </div>

  <script>
    // Data
    let currentUser = null;
    let editingId = null;
    let items = [
      { id: 1, name: "شاشات", icon: "🖥️", qty: 15, category: "إلكترونيات", price: 850 },
      { id: 2, name: "كيبورد", icon: "⌨️", qty: 30, category: "إلكترونيات", price: 120 },
      { id: 3, name: "ماوس", icon: "🖱️", qty: 42, category: "إلكترونيات", price: 65 },
      { id: 4, name: "كيبل USB", icon: "🔌", qty: 200, category: "كوابل", price: 12 },
      { id: 5, name: "كيبل HDMI", icon: "🔗", qty: 85, category: "كوابل", price: 25 },
      { id: 6, name: "مزودات طاقة", icon: "⚡", qty: 50, category: "إلكترونيات", price: 180 },
      { id: 7, name: "كراسي", icon: "🪑", qty: 25, category: "أثاث", price: 400 },
      { id: 8, name: "مكاتب", icon: "🪵", qty: 12, category: "أثاث", price: 950 },
    ];

    const users = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "user", password: "user123", role: "viewer" }
    ];

    // Load data
    function loadData() {
      const saved = localStorage.getItem('smartstock_items');
      if (saved) {
        items = JSON.parse(saved);
      }
    }

    // Save data
    function saveData() {
      localStorage.setItem('smartstock_items', JSON.stringify(items));
    }

    // Login
    function login() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const user = users.find(u => u.username === username && u.password === password);
      
      if (user) {
        currentUser = user;
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('currentUser').textContent = user.username + (user.role === 'admin' ? ' 👑' : ' 👤');
        
        if (user.role !== 'admin') {
          document.getElementById('addBtn').classList.add('hidden');
        }
        
        loadData();
        renderItems();
        updateStats();
      } else {
        const error = document.getElementById('loginError');
        error.textContent = 'اسم المستخدم أو كلمة المرور غلط';
        error.classList.remove('hidden');
      }
    }

    // Logout
    function logout() {
      currentUser = null;
      document.getElementById('loginPage').classList.remove('hidden');
      document.getElementById('dashboard').classList.add('hidden');
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      document.getElementById('loginError').classList.add('hidden');
    }

    // Render items
    function renderItems() {
      const grid = document.getElementById('itemsGrid');
      grid.innerHTML = items.map(item => `
        <div class="item-card">
          <div class="item-header">
            <div class="item-icon">${item.icon}</div>
            ${currentUser.role === 'admin' ? `
              <div class="item-actions">
                <button class="btn-action" onclick="editItem(${item.id})">✏️</button>
                <button class="btn-action btn-delete" onclick="deleteItem(${item.id})">🗑️</button>
              </div>
            ` : ''}
          </div>
          <div class="item-name">${item.name}</div>
          <div class="item-category">${item.category}</div>
          <div class="item-price">${item.price} ريال</div>
          ${currentUser.role === 'admin' ? `
            <div class="qty-controls">
              <button class="btn-qty" onclick="changeQty(${item.id}, -1)">−</button>
              <span class="qty-value">${item.qty}</span>
              <button class="btn-qty" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
          ` : `
            <div style="text-align:center;padding:10px 0">
              <span class="qty-value">${item.qty}</span>
              <span style="color:#64748b;font-size:11px;margin-right:5px">وحدة</span>
            </div>
          `}
        </div>
      `).join('');
    }

    // Update stats
    function updateStats() {
      const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
      const totalValue = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
      const lowStock = items.filter(item => item.qty <= 20).length;
      
      document.getElementById('totalQty').textContent = totalQty;
      document.getElementById('totalValue').textContent = (totalValue / 1000).toFixed(1) + 'K';
      document.getElementById('itemCount').textContent = items.length;
      document.getElementById('lowStock').textContent = lowStock;
    }

    // Change quantity
    function changeQty(id, delta) {
      if (currentUser.role !== 'admin') {
        alert('فقط المدير يقدر يعدل الكميات');
        return;
      }
      
      const item = items.find(i => i.id === id);
      if (item) {
        item.qty = Math.max(0, item.qty + delta);
        saveData();
        renderItems();
        updateStats();
      }
    }

    // Open add modal
    function openAddModal() {
      if (currentUser.role !== 'admin') {
        alert('فقط المدير يقدر يضيف أغراض');
        return;
      }
      
      editingId = null;
      document.getElementById('modalTitle').textContent = 'إضافة غرض جديد';
      document.getElementById('itemName').value = '';
      document.getElementById('itemIcon').value = '📦';
      document.getElementById('itemQty').value = '0';
      document.getElementById('itemPrice').value = '0';
      document.getElementById('itemCategory').value = 'إلكترونيات';
      document.getElementById('modal').classList.remove('hidden');
    }

    // Edit item
    function editItem(id) {
      if (currentUser.role !== 'admin') {
        alert('فقط المدير يقدر يعدل');
        return;
      }
      
      const item = items.find(i => i.id === id);
      if (item) {
        editingId = id;
        document.getElementById('modalTitle').textContent = 'تعديل غرض';
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemIcon').value = item.icon;
        document.getElementById('itemQty').value = item.qty;
        document.getElementById('itemPrice').value = item.price;
        document.getElementById('itemCategory').value = item.category;
        document.getElementById('modal').classList.remove('hidden');
      }
    }

    // Save item
    function saveItem() {
      const name = document.getElementById('itemName').value;
      const icon = document.getElementById('itemIcon').value;
      const qty = parseInt(document.getElementById('itemQty').value) || 0;
      const price = parseInt(document.getElementById('itemPrice').value) || 0;
      const category = document.getElementById('itemCategory').value;
      
      if (!name) {
        alert('الرجاء إدخال اسم الغرض');
        return;
      }
      
      if (editingId) {
        const item = items.find(i => i.id === editingId);
        if (item) {
          item.name = name;
          item.icon = icon;
          item.qty = qty;
          item.price = price;
          item.category = category;
        }
      } else {
        items.push({
          id: Date.now(),
          name,
          icon,
          qty,
          price,
          category
        });
      }
      
      saveData();
      renderItems();
      updateStats();
      closeModal();
    }

    // Delete item
    function deleteItem(id) {
      if (currentUser.role !== 'admin') {
        alert('فقط المدير يقدر يحذف');
        return;
      }
      
      if (confirm('هل أنت متأكد من حذف هذا الغرض؟')) {
        items = items.filter(i => i.id !== id);
        saveData();
        renderItems();
        updateStats();
      }
    }

    // Close modal
    function closeModal() {
      document.getElementById('modal').classList.add('hidden');
    }

    // Enter key login
    document.getElementById('password').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') login();
    });
  </script>
</body>
</html>
