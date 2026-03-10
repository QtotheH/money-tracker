import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

const ProfileAvatar = () => {
  return (
    <Card className="p-6 flex flex-col items-center gap-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">

      <div className="text-center space-y-1.5">
        <CardTitle>Ảnh đại diện</CardTitle>

        <p className="text-sm text-muted-foreground">
          Cập nhật ảnh đại diện của bạn
        </p>
      </div>

      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium">
        RS
      </div>

      <Button variant="outline" className="w-full">
        <Camera className="h-4 w-4 mr-2" />
        Đổi ảnh
      </Button>

    </Card>
  )
}

export default ProfileAvatar