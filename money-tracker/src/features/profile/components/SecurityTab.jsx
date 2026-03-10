import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const SecurityTab = () => {
  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">

      <CardHeader>
        <CardTitle>Bảo mật</CardTitle>

        <p className="text-sm text-muted-foreground">
          Thay đổi mật khẩu của bạn
        </p>
      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <label className="text-sm font-medium">
            Mật khẩu hiện tại
          </label>

          <Input  className="mt-1" type="password"/>
        </div>

        <div>
          <label className="text-sm font-medium">
            Mật khẩu mới
          </label>

          <Input  className="mt-1" type="password"/>
        </div>

        <div>
          <label className="text-sm font-medium">
            Xác nhận mật khẩu mới
          </label>

          <Input  className="mt-1" type="password"/>
        </div>

        <Button className="bg-emerald-600 hover:bg-emerald-700">
          Cập nhật mật khẩu
        </Button>

      </CardContent>

    </Card>
  )
}

export default SecurityTab