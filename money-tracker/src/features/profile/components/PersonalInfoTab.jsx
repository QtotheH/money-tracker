import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react";

const PersonalInfoTab = () => {

  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">

      <CardHeader>
        <CardTitle>Thông tin cá nhân</CardTitle>

        <p className="text-sm text-muted-foreground">
          Cập nhật thông tin cá nhân của bạn
        </p>
      </CardHeader>

      <CardContent className="space-y-4">

        <div className="grid md:grid-cols-2 gap-4">

          <div className="">
            <label className="text-sm font-medium ">
              Họ và tên
            </label>

            <Input className="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <Input  className="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">
              Số điện thoại
            </label>

            <Input  className="mt-1"/>
          </div>

          <div>
            <label className="text-sm font-medium">
              Ngày sinh
            </label>

            <Input  className="mt-1" type="date"/>
          </div>

        </div>

       <Button className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
            <Save className="h-4 w-4" />
            Lưu thay đổi
        </Button>

      </CardContent>

    </Card>
  )
}

export default PersonalInfoTab