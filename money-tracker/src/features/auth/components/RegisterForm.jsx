import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Mail, Lock, User, Calendar } from "lucide-react"

const RegisterForm = () => {
  return (
    <Card className="w-full border-none shadow-none">

      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Đăng ký
        </CardTitle>

        <CardDescription className="text-center">
          Bạn đã có tài khoản?
          <Link
            to="/login"
            className="text-emerald-600 cursor-pointer ml-1 font-medium hover:underline">
            Đăng nhập
        </Link>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* Họ tên */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            Họ và tên
          </label>

          <div className="relative top-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

            <Input
              className="pl-9"
              placeholder="Nhập họ tên của bạn"
            />
          </div>
        </div>

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
        {/* Ngày sinh */}
        <div className="space-y-3">
            <label className="text-sm font-medium">
                Ngày sinh
            </label>

            <div className="relative top-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>

                <Input
                type="date"
                className="pl-9"
                />
            </div>
        </div>

        {/* Mật khẩu */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            Mật khẩu
          </label>

          <div className="relative top-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>

            <Input
              type="password"
              className="pl-9"
              placeholder="Nhập mật khẩu"
            />
          </div>
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            Xác nhận mật khẩu
          </label>

          <div className="relative top-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>

            <Input
              type="password"
              className="pl-9"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
        </div>

        {/* Nút đăng ký */}
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          Đăng ký
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200"/>
          <span className="text-xs text-muted-foreground">
            Hoặc đăng ký bằng
          </span>
          <div className="flex-1 h-px bg-gray-200"/>
        </div>

        {/* Social Register */}
        <div className="flex justify-center gap-4">

          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-gray-100 hover:bg-gray-200 border-none"
          >
            <i className="fa-brands fa-google text-[#DB4437] text-lg"></i>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-gray-100 hover:bg-gray-200 border-none"
          >
            <i className="fa-brands fa-twitter text-[#1DA1F2] text-lg"></i>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-gray-100 hover:bg-gray-200 border-none"
          >
            <i className="fa-brands fa-facebook-f text-[#1877F2] text-lg"></i>
          </Button>

        </div>

      </CardContent>

    </Card>
  )
}

export default RegisterForm