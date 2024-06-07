import { Fragment, useContext } from "react";

import ListTable from "nextjs-admin-table/dist/ListTable";
import AdminPage from "nextjs-admin-table/dist/adminPage";

import Head from "next/head";
import axios from "axios";
import UserContext from "../../store/user-context";
import { getServerSession } from "next-auth/next"
import authOptions from "../../backend/helpers/nextAuthOption"

import {
  getAllCollectionDocuments
} from "../../backend/helpers/mongodb-util";
import { getAllModelDocuments } from "../../backend/helpers/mongoose-util";
import { Bot } from "./../../backend/models/bot";
import { User } from "./../../backend/models/user";
import { Comment } from "./../../backend/models/comment";

const createUser = async (object) => {
  let errorObject = {
    isError: false,
    errorMessage: "",
  };

  await axios
    .post("/api/auth/signup", object)
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err.response.data.message);
      errorObject.isError = true;
      errorObject.errorMessage = err.response?.data.message;
    });

  return errorObject;
};

const updateUser = async (object, id) => {
  console.log("object :", object);

  let errorObject = {
    isError: false,
    errorMessage: "",
  };

  if (object instanceof FormData) {
    await axios
      .patch(`/api/users/upload/${id}`, object)
      .then((data) => console.log(data.data))
      .catch((err) => {
        console.log(err.response?.data.message);
        errorObject.isError = true;
        errorObject.errorMessage = err.response?.data.message;
      });
  } else {
    await axios
      .patch(`/api/users/${id}`, object)
      .then((data) => console.log(data.data))
      .catch((err) => {
        console.log(err.response?.data.message);
        errorObject.isError = true;
        errorObject.errorMessage = err.response?.data.message;
      });
  }

  return errorObject;
};

const deleteUser = async (id) => {
  let errorObject = {
    isError: false,
    errorMessage: "",
  };

  await axios
    .delete(`/api/users/${id}`)
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err.response.data.message);
      errorObject.isError = true;
      errorObject.errorMessage = err.response?.data.message;
    });

  return errorObject;
};

const createBot = async (object) => {
  let errorObject = {
    isError: false,
    errorMessage: "",
  };

  console.log(object);

  await axios
    .post("/api/bots", object)
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err.response.data.message);
      errorObject.isError = true;
      errorObject.errorMessage = err.response?.data.message;
    });

  return errorObject;
};

const updateBot = async (object, id) => {
  console.log("object :", object);

  let errorObject = {
    isError: false,
    errorMessage: "",
  };

  await axios
    .patch(`/api/bots/${id}`, object)
    .then((data) => console.log(data.data))
    .catch((err) => {
      console.log(err.response?.data.message);
      errorObject.isError = true;
      errorObject.errorMessage = err.response?.data.message;
    });

  return errorObject;
};

const deleteBot = async (id) => {
  let errorObject = {
    isError: false,
    errorMessage: "",
  };

  await axios
    .delete(`/api/bots/${id}`)
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err.response.data.message);
      errorObject.isError = true;
      errorObject.errorMessage = err.response?.data.message;
    });

  return errorObject;
};

function Admin(props) {
  const { users, animes, mangas, comments, bots } = props;
  const userCtx = useContext(UserContext);
  return (
    <Fragment>
      <Head>
        <title>Admin</title>
        <meta
          name="description"
          content="This page is for admin to manage database."
        />
      </Head>

      <AdminPage />

      <ListTable
        data={{
          name: "animes",
          imagesUrl: "",
          table: animes,
          icon: <i className="fa fa-tv"></i>,
        }}
        tableAttributes={[
          {
            title: "title",
            label: "Title",
            type: "text",
            format: "input",
            display: "table/form",
            imageProperty: "posterImage",
            validation_type: "string",
          },
          {
            title: "showType",
            label: "ShowType",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "status",
            label: "Status",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "startDate",
            label: "Start Date",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },

          {
            title: "posterImage",
            label: "Poster Image",
            type: "file",
            format: "input",
            display: "table/form",
            image: true,
          },
        ]}
        search="title"
        filters={["status", "showType"]}
      />

      <ListTable
        data={{
          name: "mangas",
          imagesUrl: "",
          table: mangas,
          icon: <i className="fa fa-book"></i>,
        }}
        tableAttributes={[
          {
            title: "title",
            label: "Title",
            type: "text",
            format: "input",
            display: "table/form",
            imageProperty: "posterImage",
            validation_type: "string",
          },
          {
            title: "status",
            label: "Status",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "startDate",
            label: "Start Date",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },

          {
            title: "posterImage",
            label: "Poster Image",
            type: "file",
            format: "input",
            display: "table/form",
            image: true,
          },
        ]}
        search="title"
        filters={["status"]}
      />

      <ListTable
        data={{
          name: "users",
          imagesUrl: "",
          table: users,
          icon: <i className="fa fa-users"></i>,
        }}
        tableAttributes={[
          {
            title: "username",
            label: "userName",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "email",
            label: "Email",
            type: "email",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "password",
            label: "Password",
            type: "password",
            format: "input",
            display: "form",
            validation_type: "string",
          },
          {
            title: "isAdmin",
            label: "IsAdmin",
            type: "text",
            format: "select",
            display: "table/form",
          },
          {
            title: "date_joined",
            label: "Join Date",
            type: "datetime-local",
            format: "input",
            display: "table",
          },

          {
            title: "avatar",
            label: "Avatar",
            type: "file",
            format: "input",
            display: "table/form",
            image: true,
          },
        ]}
        search="username"
        filters={["isAdmin"]}
        elementAdd={createUser}
        elementUpdate={updateUser}
        elementDelete={deleteUser}
      />

      <ListTable
        data={{
          name: "comments",
          table: comments,
          icon: <i className="fa fa-comments"></i>,
        }}
        tableAttributes={[
          {
            title: "comment",
            label: "Comment",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "user.username",
            label: "Username",
            type: "text",
            format: "json",
            display: "table/form",
            validation_type: "object",
            urlForm: {
              tableName: "users",
              id: "user._id",
            },
            relatedProperty: {
              tableName: "users",
              related_id: "user._id",
              property: "avatar",
              type: "image",
              imagesUrl: "",
            },
          },

          {
            title: "anime.title",
            label: "Anime",
            type: "text",
            format: "json",
            display: "table/form",
            validation_type: "object",
          },

          {
            title: "like_counter",
            label: "Like counter",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "number",
          },
          {
            title: "dislike_counter",
            label: "Dislike counter",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "number",
          },
        ]}
        search="comment"
        filters={["anime.title", "user.username"]}
      />

      <ListTable
        data={{
          name: "bots",
          imagesUrl: `/uploads/images`,
          table: bots,
          icon: <i className="bx bx-bot"></i>,
        }}
        tableAttributes={[
          {
            title: "name",
            label: "Name",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "anime",
            label: "Anime",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "discord",
            label: "Discord",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "url",
            label: "Url",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "avatar",
            label: "Avatar",
            type: "file",
            format: "input",
            display: "table/form",
            image: true,
          },
        ]}
        search="name"
        filters={["anime"]}
        elementAdd={createBot}
        elementUpdate={updateBot}
        elementDelete={deleteBot}
      />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions );

  const allAnimes = await getAllCollectionDocuments("animes", { title: 1 });

  const allMangas = await getAllCollectionDocuments("mangas", { title: 1 });

  const allBots = await getAllModelDocuments(Bot, "name");

  const allUsers = await getAllModelDocuments(User, "username");

  const allComments = await getAllModelDocuments(Comment, "created_at");

  const currentUser = await allUsers.filter(
    (user) => user.email === session?.user.email
  )[0];

  const isAdmin = currentUser.isAdmin;

  if (!session || !isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      users: allUsers,
      animes: allAnimes,
      mangas: allMangas,
      comments: allComments,
      bots: allBots,
    },
  };
}

// export async function getStaticPaths() {
//   const tables = ["animes", "users", "comments"].map((table) => ({
//     params: { table:table },
//   }));

//   return { paths: tables, fallback: false };
// }

export default Admin;
