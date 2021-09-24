import Image from "next/image";
import { useSession, signOut } from "next-auth/client";
import { useContext } from "react";
import UserContext from "../store/user-context";

function Navbar0(props) {
  const [session, loading] = useSession();
  const userCtx = useContext(UserContext);

  function logoutHandler() {
    signOut();
  }

  return (
    <div className="navigation-wrap bg-white start-header start-style">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-md navbar__light">
              <a
                className="navbar__brand"
                href="https://front.codes/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={"/images/logo-2.png"}
                  alt={"logo-image"}
                  width={820}
                  height={400}
                />
              </a>

              <button
                className="navbar__toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar__toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto py-4 py-md-0">
                  <li className="nav__item pl-4 pl-md-0 ml-0 ml-md-4 active">
                    <a
                      className="nav__link dropdown__toggle"
                      data-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Home
                    </a>
                    <div className="dropdown__menu">
                      <a className="dropdown__item" href="#">
                        Action
                      </a>
                      <a className="dropdown__item" href="#">
                        Another action
                      </a>
                      <a className="dropdown__item" href="#">
                        Something else here
                      </a>
                      <a className="dropdown__item" href="#">
                        Another action
                      </a>
                    </div>
                  </li>
                  <li className="nav__item pl-4 pl-md-0 ml-0 ml-md-4">
                    <a className="nav__link" href="#">
                      Portfolio
                    </a>
                  </li>
                  <li className="nav__item pl-4 pl-md-0 ml-0 ml-md-4">
                    <a className="nav__link" href="#">
                      Agency
                    </a>
                  </li>
                  <li className="nav__item pl-4 pl-md-0 ml-0 ml-md-4">
                    <a
                      className="nav__link dropdown__toggle"
                      data-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Services
                    </a>
                    <div className="dropdown__menu">
                      <a className="dropdown__item" href="#">
                        Action
                      </a>
                      <a className="dropdown__item" href="#">
                        Another action
                      </a>
                      <a className="dropdown__item" href="#">
                        Something else here
                      </a>
                      <a className="dropdown__item" href="#">
                        Another action
                      </a>
                    </div>
                  </li>
                  <li className="nav__item pl-4 pl-md-0 ml-0 ml-md-4">
                    <a className="nav__link" href="#">
                      Journal
                    </a>
                  </li>
                  <li className="nav__item pl-4 pl-md-0 ml-0 ml-md-4">
                    <a className="nav__link" href="#">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar0;
