# Money Tracker (Ứng dụng theo dõi thu chi cá nhân)
Đồ án môn: Các công nghệ lập trình hiện đại (2026)

## 1. GIẢI THÍCH CẤU TRÚC THƯ MỤC DỰ ÁN
### 1.1. Cấu trúc tổng quan
```
money-tracker/
├── public/                          # Tài nguyên tĩnh
│   ├── logo.svg
│   └── favicon.ico
│
├── src/
│   ├── api/                         # API configuration & endpoints
│   │   ├── axiosConfig.js
│   │   ├── endpoints.js
│   │   └── services/
│   │       ├── authService.js
│   │       ├── transactionService.js
│   │       ├── categoryService.js
│   │       ├── budgetService.js
│   │       ├── budgetService.js
│   │       └── ...
│   │
│   ├── assets/                      # Tài nguyên tĩnh (images, fonts, icons)
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   │
│   ├── components/                  # Reusable components
│   │   ├── common/                  # Components dùng chung
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   └── AuthLayout.jsx
│   │   │
│   │   ├── charts/                  # Chart components
│   │   │   ├── PieChart.jsx
│   │   │   ├── BarChart.jsx
│   │   │   ├── LineChart.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── forms/                   # Form components
│   │   │   ├── TransactionForm.jsx
│   │   │   ├── CategoryForm.jsx
│   │   │   ├── BudgetForm.jsx
│   │   │   └── index.js
│   │   │
│   │   └── ui/                      # Shadcn UI components
│   │       ├── button.jsx
│   │       ├── input.jsx
│   │       ├── card.jsx
│   │       ├── select.jsx
│   │       ├── dialog.jsx
│   │       └── ... (các components từ Shadcn)
│   │
│   ├── contexts/                    # Context API
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationContext.jsx
│   │
│   ├── features/                    # Feature-based modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   └── ForgotPasswordForm.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.js
│   │   │   └── pages/
│   │   │       ├── LoginPage.jsx
│   │   │       └── RegisterPage.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── StatCard.jsx
│   │   │   │   ├── RecentTransactions.jsx
│   │   │   │   ├── MonthlyOverview.jsx
│   │   │   │   └── BudgetProgress.jsx
│   │   │   └── pages/
│   │   │       └── DashboardPage.jsx
│   │   │
│   │   ├── transactions/
│   │   │   ├── components/
│   │   │   │   ├── TransactionList.jsx
│   │   │   │   ├── TransactionItem.jsx
│   │   │   │   ├── TransactionFilter.jsx
│   │   │   │   └── AddTransactionButton.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useTransactions.js
│   │   │   └── pages/
│   │   │       ├── TransactionsPage.jsx
│   │   │       └── TransactionDetailPage.jsx
│   │   │
│   │   ├── categories/
│   │   │   ├── components/
│   │   │   │   ├── CategoryList.jsx
│   │   │   │   └── CategoryItem.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useCategories.js
│   │   │   └── pages/
│   │   │       └── CategoriesPage.jsx
│   │   │
│   │   ├── budgets/
│   │   │   ├── components/
│   │   │   │   ├── BudgetList.jsx
│   │   │   │   ├── BudgetItem.jsx
│   │   │   │   └── BudgetChart.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useBudgets.js
│   │   │   └── pages/
│   │   │       └── BudgetsPage.jsx
│   │   │
│   │   ├── reports/
│   │   │   ├── components/
│   │   │   │   ├── IncomeExpenseChart.jsx
│   │   │   │   ├── CategoryBreakdown.jsx
│   │   │   │   └── TrendAnalysis.jsx
│   │   │   └── pages/
│   │   │       └── ReportsPage.jsx
│   │   │
│   │   └── settings/
│   │       ├── components/
│   │       │   ├── ProfileSettings.jsx
│   │       │   ├── AppearanceSettings.jsx
│   │       │   └── NotificationSettings.jsx
│   │       └── pages/
│   │           └── SettingsPage.jsx
│   │
│   ├── hooks/                       # Custom hooks chung
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   ├── useForm.js
│   │   └── ...
│   │
│   ├── lib/                         # Utility functions & helpers
│   │   ├── utils.js                 # Các hàm tiện ích chung
│   │   ├── cn.js                    # classNames utility (từ Shadcn)
│   │   └── validators.js            # Validation functions
│   │
│   ├── routes/                      # Routing configuration
│   │   ├── index.jsx                # Main router setup
│   │   ├── ProtectedRoute.jsx       # Protected route component
│   │   └── routeConfig.js           # Route constants
│   │
│   ├── store/                       # Redux Toolkit store
│   │   ├── index.js                 # Store configuration
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── transactionSlice.js
│   │       ├── categorySlice.js
│   │       ├── budgetSlice.js
│   │       └── uiSlice.js
│   │
│   ├── styles/                      # Global styles
│   │   ├── index.css                # Main CSS file
│   │   ├── globals.css              # Global styles
│   │   └── variables.css            # CSS variables
│   │
│   ├── constants/                   # Constants & configurations
│   │   ├── apiConstants.js
│   │   ├── appConstants.js
│   │   └── routePaths.js
│   │
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Root styles
│
├── mock-api/                        # JSON Server mock data
│   ├── db.json
│   └── routes.json
│
├── .env                             # Environment variables (chứa key - value -> không push lên GitHub)
├── .env.example                     # Environment variables example (file .env chứa các key mẫu)
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── components.json                  # Shadcn config
└── README.md
```
### 1.2. Giải thích chi tiết từng thư mục