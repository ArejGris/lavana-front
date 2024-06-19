
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
    let dir
    if(lng==="ar"){
      dir="rtl"
    }else{
      dir="ltr"
    }
  return (
    <html lang={lng} dir={dir}>
    
      <body>
      <Provider>
      {children}
      </Provider>
      </body>
    </html>
  );
}
