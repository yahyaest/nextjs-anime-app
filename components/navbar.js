import { Navbar, Nav } from "react-bootstrap";
import Image from "next/legacy/image";
import { useSession, signOut } from "next-auth/react";
import { useContext } from "react";
import UserContext from "../store/user-context";

function NavbarComponent(props) {
  // const [session, loading] = useSession();
  const { data: session , status} = useSession()
  const userCtx = useContext(UserContext);

  function handleLightMode() {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      document.querySelector("#switch").classList.remove("switched");
    } else {
      document.body.classList.add("dark");
      document.querySelector("#switch").classList.add("switched");
    }
  }

  function logoutHandler() {
    signOut()
    // signOut({ callbackUrl: process.env.PROD_URL || process.env.DEV_URL });
    // localStorage.removeItem("user-chat-profile-secret");

  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" fixed="top" className="shadow menu">
        <Navbar.Brand href="/">
          <div className="nav-logo">
            <Image
              src={"/images/anime-logo.png"}
              alt={"logo-image"}
              width={90}
              height={30}
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="navbar-item" href="/anime">
              Animes
            </Nav.Link>
            <Nav.Link className="navbar-item" href="/manga">
              Mangas
            </Nav.Link>
            <Nav.Link className="navbar-item" href="/search">
              Search
            </Nav.Link>
          </Nav>
          <Nav>
            {userCtx?.user && (
              <Nav.Link
                className="navbar-item"
                href={`/saved/${userCtx.user?._id}`}
              >
                Saved
                <span className="fav-counter">
                  {userCtx.user?.liked_animes.length}
                </span>
              </Nav.Link>
            )}
          </Nav>
          {/* <Nav>
            {session && (
              <Nav.Link className="navbar-item" href="/chats">
                Chats
                {userCtx.unread_messages > 0 && (
                  <span className="notification-counter">
                    {userCtx.unread_messages}
                  </span>
                )}
              </Nav.Link>
            )}
          </Nav> */}
          <Nav>
            {!session && status !== "loading" && (
              <Nav.Link className="navbar-item" href="/login">
                Login
              </Nav.Link>
            )}
            {session && (
              <Nav.Link className="navbar-item" onClick={logoutHandler}>
                Logout
              </Nav.Link>
            )}
            <Nav.Link className="mx-3 mt-2" onClick={handleLightMode}>
              <div id="switch">
                <div id="circle"></div>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
