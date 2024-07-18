import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn,  UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-full px-6 py-4 lg:px-10'>
        <Link href="/" className='flex items-center gap-1'>
        <Image 
        src="/images/video.png"
        alt=' Chitchat Logo'
        width={32}
        height={32}
        className='max-sm:size-10'
        />
        <p className='text-[26px] p-4 font-extrabold max-sm:hidden text-white'>ChitChat</p>
        </Link>
        <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton  />
        </SignedIn>
            <MobileNav/>
        </div>
    </nav>
  )
}

export default Navbar
