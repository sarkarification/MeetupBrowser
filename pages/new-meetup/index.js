import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetUpData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  };

  return (
    <>
      <Head>
        <title> React MeetUp Using NextJs</title>
        <meta name="description" content="Add next gen react meetups" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
