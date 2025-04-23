import "./styles/global.css";
import WidthContainer from "./components/WidthContainer";
import Header from "./components/Header";
import { cookies } from "next/headers";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //вынес проверку на логин в серверный компонент чтобы состояние кнопки "выйти/войти" предзагружалось
  const cookieStore = await cookies();
  const isLogged = cookieStore.get("logged")?.value ? true : false;
  return (
    <html lang="en">
      <body>
        <WidthContainer>
          <Header isLogged={isLogged}></Header>
        {children}
        </WidthContainer>
      </body>
    </html>
  );
}
