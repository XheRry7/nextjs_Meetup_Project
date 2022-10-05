import {useRouter}  from 'next/router'
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const Meetup = () => {
    const router = useRouter();

  async function addMeetupHandler(meetupData) {
    await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // const data =  response.json();
    // console.log(data);
    router.push('/');
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default Meetup;
