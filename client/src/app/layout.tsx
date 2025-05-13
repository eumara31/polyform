"use server";
import "./styles/global.css";
import WidthContainer from "./components/WidthContainer";
import Header from "./components/Header";
import { cookies } from "next/headers";
import api from "./utilities/api";
import { Toaster } from 'react-hot-toast';

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
  console.log(usernameCookie, emailCookie)

  return (
    <html lang="en">
      <body>
        {/* <Toaster position="top-right"></Toaster> */}
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
