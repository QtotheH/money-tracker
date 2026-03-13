import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Mail, Lock } from "lucide-react"

const LoginForm = () => {
  return (
    <Card className="w-full border-none shadow-none">

      <CardHeader>
        <CardTitle className="text-2xl text-center">Đăng nhập</CardTitle>
        <CardDescription className="text-center">
          Bạn chưa có tài khoản? 
          <Link
            to="/register"
            className="text-emerald-600 cursor-pointer ml-1 font-medium hover:underline"
          >
            Đăng ký
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* Email */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            Email
          </label>

          <div className="relative top-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Nhập email của bạn"
            />
          </div>
        </div>

        {/* Mật khẩu */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            Mật khẩu
          </label>

          <div className="relative top-1">
            <Lock className="absolute left-3 top-1/2 -translate-1/2 h-4 w-4 text-gray-400"/>
            <Input
              type="password"
              className="pl-9"
              placeholder="Nhập mật khẩu"
            />
          </div>
        </div>

        {/* Nút đăng nhập */}
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          Đăng nhập
        </Button>

      </CardContent>

    </Card>
  )
}

export default LoginForm