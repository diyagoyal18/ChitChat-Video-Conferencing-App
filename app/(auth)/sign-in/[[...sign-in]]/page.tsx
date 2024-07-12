import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='flex h-screen w-full justify-center items-center'>
        <SignIn/>
    </main>
  )
}

export default SignInPage

//we used double square brackets taaki ye saare signin redirects ko access krle and we end up at the correct page