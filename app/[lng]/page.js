import { useTranslation } from "../i18n";
import { Trans } from 'react-i18next/TransWithoutContext'
import Navbar from "./components/navbar/Navbar";
import { Footer } from "./components/Footer";

export default async function Home({ params: { lng } }) {
  
  const { t } =await useTranslation(lng)
  return (
    <>
    <Navbar lng={lng}/>
    <h1>{t('h1')}</h1>
          <Footer lng={lng}/>
          </>
  );
}
