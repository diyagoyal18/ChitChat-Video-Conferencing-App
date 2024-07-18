import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  const now = new Date();
  const offsetIST = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
  const nowUTC = now.getTime() + (now.getTimezoneOffset() * 60000);
  const nowIST = new Date(nowUTC + offsetIST);
  const time = nowIST.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
  return (
    <section className='flex size-full flex-col gap-10 text-dark-3'>
       <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
        <h2 className=' max-w-[270px] rounded py-2 text-center text-base font-normal'></h2>
        <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
       </div>
       <MeetingTypeList/>
    </section>
  )
}

export default Home

//this entire page is server side rendered but the meeting type list is client side rendered