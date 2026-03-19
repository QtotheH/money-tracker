import ProfileAvatar from "../components/ProfileAvatar"
import PersonalInfoTab from "../components/PersonalInfoTab"
import SecurityTab from "../components/SecurityTab"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"

const ProfilePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto p-6 space-y-6">

            {/* Tiêu đề */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
                    Hồ sơ cá nhân
                </h1>

                <p className="text-muted-foreground">
                Quản lý thông tin và cài đặt tài khoản của bạn
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <ProfileAvatar />

                <div className="lg:col-span-2">
                {/* orientation="vertical"  -> Đặt tab theo trục dọc*/}
                <Tabs defaultValue="personal" className="">
                    {/* variant="line"  -> Đặt tab theo trục dọc*/}
                    <TabsList className="mb-4 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">

                        <TabsTrigger value="personal" className="p-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-950">
                            Thông tin cá nhân
                        </TabsTrigger>

                        <TabsTrigger value="security" className="p-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-950">
                            Bảo mật
                        </TabsTrigger>

                    </TabsList>

                    <TabsContent value="personal">
                    <   PersonalInfoTab />
                    </TabsContent>

                    <TabsContent value="security">
                        <SecurityTab />
                    </TabsContent>


                </Tabs>

                </div>

            </div>

            </div>
    </main>

  )
}

export default ProfilePage