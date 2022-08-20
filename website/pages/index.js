import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Videos from "../components/Videos/Videos";
import useSWR from "swr";

export default function Home({ allPostsData }) {
  // const isLogged = checkLogged();

  const { data: currUser } = useSWR(
    "user",
    (key) => {
      const value = localStorage.getItem("user");
      return !!value ? JSON.parse(value) : undefined;
    },
    { refreshInterval: 500 }
  );

  // console.log(currUser);

  return (
    <Layout home currUser={currUser}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Videos isLogged={!!currUser} />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
