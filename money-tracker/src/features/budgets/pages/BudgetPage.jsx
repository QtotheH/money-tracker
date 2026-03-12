

const BudgetPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="p-6 space-y-6">

            {/* Tiêu đề */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
                    Ngân sách 
                </h1>

                <p className="text-muted-foreground">
                   Thiết lập và theo dõi giới hạn chi tiêu hàng tháng của bạn
                </p>
            </div>

        </div>
    </main>

  )
}

export default BudgetPage