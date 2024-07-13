'use client'

import { useState } from "react"
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation"
import NextLink from 'next/link';
import MeetingModal from "./MeetingModal";


const MeetingTypeList = () => {
const router= useRouter();
    const [meetingState, setMeetingState] = useState<
      'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
    >(undefined);
    const createMeeting = () =>{

    }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 '>
       <HomeCard 
       className="bg-pink-1"
       img='/icons/add-meeting.svg'
       title="New Meeting"
       description="Start an instant Meeting"
       handleClick={()=>setMeetingState('isInstantMeeting')}
       
       />
       <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-pink-2"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-pink-3"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-pink-4"
        handleClick={() => router.push('/recordings')}
      />
        <MeetingModal
         isOpen= {meetingState==='isInstantMeeting'}
         onClose={()=>setMeetingState(undefined)}
         title= "Start an Instant Meeting"
         className="text-center"
         buttonText="Start Meeting"
         handleClick={createMeeting}
        />

    </section>
  )
}

export default MeetingTypeList
