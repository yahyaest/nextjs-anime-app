import Head from "next/head";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/client";
import axios from "axios";
import { toast } from "react-toastify";

async function createUser(user, chatProfile) {
  await axios
    .post("/api/auth/signup", user, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((data) => console.log("success add", user))
    .catch((error) => {
      throw new Error(error || "Something went wrong!");
    });

  await axios({
    method: "POST",
    url: "https://api.chatengine.io/users/",
    data: chatProfile,
    headers: { "PRIVATE-KEY": `${process.env.CHAT_PRIVATE_KEY}` },
  })
    .then((data) => console.log("success add", chatProfile))
    .catch((error) => {
      throw new Error(error || "Something went wrong!");
    });
}

function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [imageFile, setImageFile] = useState("");

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  function handleImage(e) {
    setImageFile(e.target.files[0]);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      // log user in
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (result.error) {
        toast.error(result.error);
      }

      if (!result.error) {
        // set some auth state
        localStorage.setItem("user-chat-profile-secret", enteredPassword);
        router.replace("/");
      }
    } else {
      try {
        const enteredUsername = usernameInputRef.current.value;
        const enteredConfirmedPassword = confirmPasswordInputRef.current.value;

        if (enteredPassword !== enteredConfirmedPassword) {
          toast.error(
            "Password and confirmed password are different.Try again."
          );
        } else {
          let newUser = new FormData();
          newUser.append("username", enteredUsername);
          newUser.append("email", enteredEmail);
          newUser.append("password", enteredPassword);
          newUser.append("avatar", imageFile);

          let chatProfile = new FormData();
          chatProfile.append("username", enteredUsername);
          chatProfile.append("first_name", enteredUsername);
          chatProfile.append("last_name", enteredUsername);
          chatProfile.append("email", enteredEmail);
          chatProfile.append("secret", enteredPassword);
          chatProfile.append("avatar", imageFile);

          const result = await createUser(newUser, chatProfile);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container ">
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Login/Register Page..."
        />
      </Head>
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <div className="card-login flex-row my-5 border-0 shadow rounded-3 overflow-hidden ">
            <div className="card-img-left d-none d-md-flex"></div>
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                {isLogin ? "Login" : "Register"}
              </h5>
              <form onSubmit={submitHandler}>
                {!isLogin && (
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputUsername"
                      placeholder="Username"
                      required
                      autoFocus
                      ref={usernameInputRef}
                    ></input>
                    <label forhtml="floatingInputUsername">Username</label>
                  </div>
                )}

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInputEmail"
                    placeholder="Email address"
                    required
                    ref={emailInputRef}
                  ></input>
                  <label forhtml="floatingInputEmail">Email address</label>
                </div>

                <hr />

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                    ref={passwordInputRef}
                  ></input>
                  <label forhtml="floatingPassword">Password</label>
                </div>

                {!isLogin && (
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPasswordConfirm"
                      placeholder="Confirm Password"
                      required
                      ref={confirmPasswordInputRef}
                    ></input>
                    <label forhtml="floatingPasswordConfirm">
                      Confirm Password
                    </label>
                  </div>
                )}

                <hr />

                {!isLogin && (
                  <div className="mb-3">
                    <label forhtml="floatingProfileImage">Profile Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="floatingProfileImage"
                      required
                      onChange={handleImage}
                    />
                  </div>
                )}

                <div className="d-grid mb-2">
                  <button
                    className="
                      btn btn-lg btn-primary btn-login
                      fw-bold
                      text-uppercase
                    "
                    type="submit"
                  >
                    {isLogin ? "Login" : "Register"}
                  </button>
                </div>

                <a
                  className="d-block text-center mt-2 small"
                  style={{ cursor: "pointer" }}
                  onClick={switchAuthModeHandler}
                >
                  {isLogin
                    ? "Don't have an account? Register"
                    : "Have an account? Sign In"}
                </a>

                <hr className="my-4" />

                <div className="d-grid mb-2">
                  <button
                    className="
                      btn btn-lg btn-google btn-login
                      fw-bold
                      text-uppercase
                    "
                    type="submit"
                    onClick={() => signIn("google")}
                  >
                    <i className="fa fa-google me-2"></i> Sign up with Google
                  </button>
                </div>

                <div className="d-grid mb-2">
                  <button
                    className="
                      btn btn-lg btn-facebook btn-login
                      fw-bold
                      text-uppercase
                    "
                    type="submit"
                    onClick={() => signIn("facebook")}
                  >
                    <i className="fa fa-facebook-f me-2"></i> Sign up with
                    Facebook
                  </button>
                </div>

                <div className="d-grid">
                  <button
                    className="
                      btn btn-lg btn-github btn-login
                      fw-bold
                      text-uppercase
                    "
                    type="submit"
                    onClick={() => signIn("github")}
                  >
                    <i className="fa fa-github me-2"></i> Sign up with Github
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default LoginPage;
