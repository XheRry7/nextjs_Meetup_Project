import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

// export async function getServerSideProps (context) {
//  const req= context.req;
//  const res = context.res;

//   return {
//     props: {
//       meetups: dummyMeetups
//     }
//   }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://shehryar:sheryx1744@cluster0.gqpr36i.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  console.log(meetups);
  client.close();

  return {
    props: {
      meetups: meetups.map((e) => ({
        title: e.title,
        address: e.address,
        image: e.image,
        id: e._id.toString(),
      })),
    },
    revalidate: 1,
  };
} // ssg: static site generation

export default HomePage;
