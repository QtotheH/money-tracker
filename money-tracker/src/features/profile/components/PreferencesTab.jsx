import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PreferencesTab = () => {
  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">

      <CardHeader>
        <CardTitle>Tùy chọn</CardTitle>

        <p className="text-sm text-muted-foreground">
          Tùy chỉnh trải nghiệm sử dụng ứng dụng
        </p>
      </CardHeader>

      <CardContent>

        <p className="text-muted-foreground">
          Các cài đặt tùy chọn sẽ sớm được cập nhật
        </p>

      </CardContent>

    </Card>
  )
}

export default PreferencesTab