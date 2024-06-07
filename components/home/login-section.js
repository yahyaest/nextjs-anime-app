import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";

function LoginSection() {
  const router = useRouter();
  const [session, setSession] = useState();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { data: auth_session } = useSession();

  useEffect(() => {
    async function fetchData() {
      setSession(auth_session);
    }
    fetchData();
  }, []);

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

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
      router.replace("/");
    }
  }

  if (session) return null;
  return (
    <section className="text-white">
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className=" row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 mb-3">Quick sign-up</h1>
            <p className="col-lg-10 fs-4">
              Quick Sign Up. You are here to create a FREE AnimeLab account.
              Please fill the form with email and password.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5 text-black-50 ">
            <form
              className="p-4 p-md-5 border rounded-3 bg-light"
              onSubmit={submitHandler}
            >
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  required
                  ref={emailInputRef}
                ></input>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  required
                  ref={passwordInputRef}
                ></input>
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me"></input> Remember
                  me
                </label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign up
              </button>
              <hr className="my-4"></hr>
              <small className="text-muted">
                By clicking Sign up, you agree to the terms of use.
              </small>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginSection;
