"use server";
import "./styles/global.css";
import WidthContainer from "./components/WidthContainer";
import Header from "./components/Header";
import { cookies } from "next/headers";
import { Toaster } from 'react-hot-toast';
import styles from "./styles/Toast.module.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //информация о юзере вынесена в серверный компонент для пререндеринга
  const cookieStore = await cookies();
  const isLogged = cookieStore.get("logged")?.value ? true : false;

  const usernameCookie = cookieStore.get("username")?.value;
  const emailCookie = cookieStore.get("email")?.value;

  return (
    <html lang="en">
      <body>
        {/* тостер, чтобы тосты работали асинхронно между страницами */}
      <Toaster
      position="top-right"
        toastOptions={{
          className: styles.toastBase,
          success: { className: styles.toastSuccess },
          error: { className: styles.toastError },
          loading: { className: styles.toastLoading },
        }}
      />
        <WidthContainer>
          <Header 
          isLogged={isLogged}
          usernameProp={usernameCookie}
          emailProp={emailCookie}
          ></Header>
          {children}
        </WidthContainer>
      </body>
    </html>
  );
}
