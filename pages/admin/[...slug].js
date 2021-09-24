import AdminForm from "nextjs-admin-table/dist/adminForm";

import Head from "next/head";

function AdminFormPage(props) {
  return (
    <div>
      <Head>
        <title>Admin</title>
        <meta
          name="description"
          content="This page is for admin to manage database."
        />
      </Head>
      <AdminForm params={props.params.slug} />
    </div>
  );
}

export async function getServerSideProps(context) {
  return { props: { params: context.params } };
}

export default AdminFormPage;
