import { useState } from "react"
import { PlusIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TransactionsList from "@/features/transactions/components/TransactionsList"
import AddTransactionDialog from "@/features/transactions/components/AddTransactionDialog"

const TransactionPage = () => {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
                Giao dịch
              </h1>
              <p className="text-muted-foreground">Xem và quản lý tất cả giao dịch tài chính của bạn</p>
            </div>

            <Button
              onClick={() => setIsAddTransactionOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Thêm giao dịch
            </Button>
          </div>

          <Card className="card-hover-effect">
            <CardHeader>
              <CardTitle>Tất cả giao dịch</CardTitle>
              <CardDescription>Lịch sử đầy đủ cho các hoạt động tài chính của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionsList showAll={true} />
            </CardContent>
          </Card>

          <AddTransactionDialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen} />
        </div>
      </div>
    </main>
  )
}

export default TransactionPage