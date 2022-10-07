import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return(
  <Fragment>

  <Head>
    <title>React Meetups</title>
    <meta name="description" content="Browse a huge list of highly active react Meetups!"></meta>
  </Head>
  <MeetupList meetups={props.meetups} />;
  </Fragment>
  )
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
