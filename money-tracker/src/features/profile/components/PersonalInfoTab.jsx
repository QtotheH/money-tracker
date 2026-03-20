import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slices/authSlice";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {updatePersonalInfo} from "@/store/slices/authSlice";
import {toast} from "sonner";



const PersonalInfoTab = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  console.log(user);

  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [dob, setDob] = useState(user?.dob || "");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  

   const validateForm = () => {
        const newErrors = {};
        if (!fullname.trim()) {
            newErrors.fullname = "Vui lòng nhập họ tên.";
        }
        if (!email.trim()) {
            newErrors.email = "Vui lòng nhập email.";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Email không hợp lệ.";
        }
        if (!phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại.";
        }
        if (!dob) {
            newErrors.dob = "Vui lòng chọn ngày sinh.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePersonalInfo = async () => {
    if (!validateForm()) return;

    if (!user?.id) {
      toast.error("Không tìm thấy user!");
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(updatePersonalInfo({
        userId: user.id, 
        fullname,
        email,
        phone,
        dob
      })).unwrap();

      toast.success("Cập nhật thành công!");
    } catch (error) {
      toast.error("Lỗi hệ thống!", { description: error });
    } finally {
      setIsSubmitting(false);
    }
  };

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

            <Input value={fullname} 
                    onChange={(e) => {
                                  setFullname(e.target.value);
                                  if (errors.fullname) setErrors({...errors, fullname: null});
                              }} 
                    className={`mt-1 ${errors.fullname ? "border-rose-500" : ""}`}/>
            {errors.fullname && <p className="text-rose-500 text-xs mt-1">{errors.fullname}</p>}

          </div>

          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <Input value={email} onChange={(e) => {
                                  setEmail(e.target.value);
                                  if (errors.email) setErrors({...errors, email: null});
                              }}                      
                            className={`mt-1 ${errors.email ? "border-rose-500" : ""}`}/>
            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}


          </div>

          <div>
            <label className="text-sm font-medium">
              Số điện thoại
            </label>

            <Input value={phone} onChange={(e) => {
                                  setPhone(e.target.value);
                                  if (errors.phone) setErrors({...errors, phone: null});
                              }}                      
                              className={`mt-1 ${errors.phone ? "border-rose-500" : ""}`}/>
            {errors.phone && <p className="text-rose-500 text-xs mt-1">{errors.phone}</p>}


          </div>

          <div>
            <label className="text-sm font-medium">
              Ngày sinh
            </label>

            <Input value={dob} onChange={(e) => {
                                  setDob(e.target.value);
                                  if (errors.dob) setErrors({...errors, dob: null});
                              }}                     
                              className={`mt-1 ${errors.dob ? "border-rose-500" : ""}`}
                              type="date"/>
            {errors.dob && <p className="text-rose-500 text-xs mt-1">{errors.dob}</p>}

          </div>

        </div>

       <Button
          onClick={handleUpdatePersonalInfo} 
          disabled={isSubmitting}            
          className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 dark:text-white"
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>

      </CardContent>

    </Card>
  )
}

export default PersonalInfoTab