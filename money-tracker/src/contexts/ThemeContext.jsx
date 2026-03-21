import React, { createContext, useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, syncThemeToDB} from "@/store/slices/authSlice.js";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const user = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  // Khởi tạo state ưu tiên settings của User (nếu đã đăng nhập)
  const [isDark, setIsDark] = useState(() => {
    // xem người dùng có lưu settings theme hay không?
    if (user?.settings?.theme) {
      return user.settings.theme === 'dark'; // trả về true nếu settings theme của người dùng là 'dark'
    }
    // nếu không có setting theme thì lấy theme đã lưu trước đó trong localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark'; // trả về true nếu theme là dark
  });

  const [mounted, setMounted] = useState(false);

  // Lắng nghe thay đổi khi User Đăng nhập / Đăng xuất
  useEffect(() => {
    if (user && user.settings) {
      // Nếu user đăng nhập, ép theme theo settings của user
      const userWantsDark = user.settings.theme === 'dark';
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(userWantsDark);
      // thay đổi className của html để tailwind áp dụng 'dark:'
      document.documentElement.classList.toggle('dark', userWantsDark);
      // lưu lại theme vào localStorage
      localStorage.setItem('theme', userWantsDark ? 'dark' : 'light');
    }
  }, [user]); // chạy lại khi user thay đổi (đăng nhập/ đăng xuất/ thay đổi thông tin)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // set theme mặc định khi chưa đăng nhập/ chưa có localStorage theme trước đó là 'light'
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches;
        setIsDark(prefersDark);
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  }, []); // chạy 1 lần duy nhất khi được mount

  const toggleTheme = () => {
    setIsDark(prev => {
      const newDarkState = !prev; // toggle (phủ định theme trước)
      const themeString = newDarkState ? 'dark' : 'light';
      
      try {
        localStorage.setItem('theme', themeString);
        document.documentElement.classList.toggle('dark', newDarkState);

        // gửi API lưu xuống DB và cập nhật Redux
        if (user) {
          dispatch(syncThemeToDB(themeString));
        }
      } catch (error) {
        console.error('Failed to save theme:', error);
      }
      
      return newDarkState;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}
