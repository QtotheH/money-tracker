import React from "react";
import AppearanceCard from "../components/AppearanceCard";
import NotificationCard from "../components/NotificationCard";

const SettingPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Chia 2 thành phần */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          {/* Thành phần thứ nhất */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
                Cài đặt
              </h1>
              <p className="text-muted-foreground">
                Tùy chỉnh trải nghiệm và tùy chọn ứng dụng của bạn
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 ml-4 mr-8">
        <AppearanceCard />
        <NotificationCard />
      </div>
    </main>
  );
};

export default SettingPage;
