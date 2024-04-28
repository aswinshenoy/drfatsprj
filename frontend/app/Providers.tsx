'use client';
import React from "react";
import {DSRContextProvider} from "chaya-ui";
import Link from "next/link";

const Providers = ({ children }: { children: React.ReactNode }) => {

  return (
    <DSRContextProvider
      theme={{
        background: '#FAFAFA',
        primary: '#311B92',
        secondary: '#311B92',
        color: '#111',
        primaryTextColor: '#EEE',
        secondaryTextColor: '#EEE',
      }}
      linkWrapper={(link, component) => (
        <Link href={link} legacyBehavior>
          {component}
        </Link>
      )}
      iconWrapper={(icon, props) => <i className={`ri-${icon}-line ${icon}`} {...props} />}
    >
      {children}
    </DSRContextProvider>
  )
};

export default Providers;