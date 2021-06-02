import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";
import Url from "../assets/Url";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title> React MeetUp Using NextJs</title>
        <meta name="description" content="Browse next gen react meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch here
  const client = await MongoClient.connect(Url);

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },

    revalidate: 10,
  };
}

export default HomePage;
