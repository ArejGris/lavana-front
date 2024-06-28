
import Provider from "@/utils/Provider";
import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@nextui-org/tabs'
export const metadata = {
  title: "lavana",
  description: "lavana store",
};
export default function RootLayout({ children ,
  params: {
    lng
  }}) {
    
  return (
    <html lang={lng} >
    
      <body>
      <Provider>
      {children}
      </Provider>
      </body>
    </html>
  );
}
