'use client'
import Navbar from '@/components/navbar/Navbar';
import './layout.css'
import StoreProvider from "./StoreProvider";

export default function Layout({ children }) {
    return (
        <div className="user">
              <Navbar/>
            <StoreProvider>
        {children}
        </StoreProvider>
        </div>
    );
  }