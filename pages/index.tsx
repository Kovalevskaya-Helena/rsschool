import Layout from 'src/components/Layout/Layout';
import { PeopleSearch } from 'src/components/PeopleSearch';
import { wrapper } from 'src/redux/store';
import { api } from 'src/redux/api';
import { useRouter } from 'next/router';
import { Details } from 'src/components/Details';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <PeopleSearch />
      {router.query.details && <Details />}
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      const { page, details, search } = query as {
        page?: string;
        details?: string;
        search?: string;
      };

      await Promise.all([
        store.dispatch(
          api.endpoints.getStarWarsPeople.initiate({
            ...(page && { page }),
            ...(search && { search }),
          })
        ),

        ...(details
          ? [store.dispatch(api.endpoints.getStarwarsPerson.initiate(details))]
          : []),
      ]);

      await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));

      return {
        props: {},
      };
    }
);
