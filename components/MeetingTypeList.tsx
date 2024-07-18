'use client'

import { useState } from "react"
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation"
import NextLink from 'next/link';
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from 'react-datepicker'
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";


const MeetingTypeList = () => {
const router= useRouter();
    const [meetingState, setMeetingState] = useState<
      'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
    >(undefined);
    const {user} = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
      dateTime: new Date(),
      description: '',
      link: ''
    });
    const [callDetails, setCallDetails] = useState<Call>()
    const createMeeting = async () =>{
      if(!client || !user) return;

      try {
        const id= crypto.randomUUID();
        const call= client.call('default',id);

        if(!call) throw new Error('Failed to Create a call')

          const startsAt =  values.dateTime.toISOString() || new Date(Date.now()).toISOString();
          const description = values.description || 'Instant Meeting';

          await call.getOrCreate({
            data:{
              starts_at: startsAt,
              custom:{
                description
              }
            }
          })
          setCallDetails(call);

          if(!values.description){
            router.push(`/meeting/${call.id}`)
          }

      } catch (error) {
        console.log(error);
      }
    }
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
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
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-pink-2"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
       <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-pink-3"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-pink-4"
        handleClick={() => router.push('/recordings')}
      />

      {!callDetails?(
        <MeetingModal
        isOpen= {meetingState==='isScheduleMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title= "Create Meeting"
        handleClick={createMeeting}
       >
        <div className="flex flex-col gap-2.5">
          <label className="text-base text-normal leading-[22px] text-sky-2">
            Add a Description
          </label>
          <Textarea className="border-none bg-dark-3 focus-visible:ring-0 focus-visible-ring-offset-0" onChange={(e)=>{
            setValues({...values, description:e.target.value})
          }}/>
          </div> 
          <div className="flex w-full flex-col gap-2.5">
          <label className="text-base text-normal leading-[22px] text-sky-2">
            Select Date and Time
          </label>
          <ReactDatePicker
          selected={values.dateTime}
          onChange={(date)=>setValues({...values,dateTime:date!})}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="w-full rounded bg-dark-3 p-2"
          />
          </div>
        </MeetingModal> ): (
        <MeetingModal
         isOpen= {meetingState==='isScheduleMeeting'}
         onClose={()=>setMeetingState(undefined)}
         title= "Create Meeting"
         className="text-center"
         handleClick={()=>{
         navigator.clipboard.writeText(meetingLink);
           toast({title: 'Link Copied',
            className:'bg-dark-3 text-white'
           })
         }}
         image="/icons/checked.svg"
         buttonIcon="/icons/copy.svg"
         buttonText="Copy Meeting Link"
        />
       )
      }

        <MeetingModal
         isOpen= {meetingState==='isInstantMeeting'}
         onClose={()=>setMeetingState(undefined)}
         title= "Create Meeting"
         className="text-center"
         buttonText="Start Meeting"
         handleClick={createMeeting}
        />
        <MeetingModal
         isOpen= {meetingState==='isJoiningMeeting'}
         onClose={()=>setMeetingState(undefined)}
         title= "Provide the Link here"
         className="text-center"
         buttonText="Join Meeting"
         handleClick={()=> router.push(values.link)}
        >
          <Input 
          placeholder="Meeting Link"
          className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e)=> setValues({...values, link:e.target.value})}
          />
        </MeetingModal>
        
    </section>
  )
}

export default MeetingTypeList
