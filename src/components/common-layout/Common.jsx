import React from 'react'
import Header from '../header'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { ThemeProvider as NextThemesProvider } from "next-themes";

const Commonlayout = async ({children, ...props}) => {
  const user = await currentUser();
  
  const profileInfo = null;
  if (user && !profileInfo?._id) redirect('/onboard')

  return (
    <>
    <NextThemesProvider {...props}>
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
    <Header
      user={JSON.parse(JSON.stringify(user))}
        />


      <main>{children}</main>
      </div>
      </NextThemesProvider>
    </>
  )
}

export default Commonlayout
