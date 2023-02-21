import Link from "next/link";
import Image from "next/image";

import { getSession, signOut } from "next-auth/client";
import { useEffect, useState } from "react";
import { useContext } from "react";

import UserContext from "../store/user-context";

function Slidebar(props) {
  const [session, setSession] = useState();
  const [userProfileDetails, setUserProfileDetails] = useState();
  const userCtx = useContext(UserContext);

  const handleSlidebarSize = () => {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");

    sidebar?.classList.toggle("sidebar__open");
    if (sidebar.classList.contains("sidebar__open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
    }
  };

  const getUserProfileDetails = async () => {
    if (!userCtx.user && !userCtx.session) {
      return;
    }
    if (session?.user.image !== null && !userCtx.user) {
      return (
        <div className="profile-details">
          <Image
            src={userCtx.session?.user.image}
            alt="profileImg"
            width={45}
            height={45}
          />

          <div className="name_job">
            <div className="name">{userCtx.session?.user.name}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="profile-details">
          <img
            //src={`/uploads/images/${userCtx.user?.avatar}`}
            src={ `${userCtx.user?.avatar}`  }

            alt="profileImg"
            width={45}
            height={45}
          />
          <div className="name_job">
            <div className="name">{userCtx.user?.username}</div>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      setSession(session);
      const userData = await getUserProfileDetails();
      setUserProfileDetails(userData);
    }
    fetchData();
  }, [userCtx]);

  return (
    <div className="sidebar " style={{ marginTop: "55px" }}>
      <div className="logo-details">
        <i className="bx bx-tv icon"></i>
        <div className="logo_name">AnimeLab</div>
        <i className="bx bx-menu" id="btn" onClick={handleSlidebarSize}></i>
      </div>

      <ul className="icon-list">
        {userCtx.user?.isAdmin && (
          <li>
            <Link href="/admin">
              <a>
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Admin</span>
              </a>
            </Link>
            <span className="slidebar__tooltip">Admin</span>
          </li>
        )}

        {!session?.user && (
          <li>
            <Link href="/login">
              <a>
                <i className="bx bx-user"></i>
                <span className="links_name">Login</span>
              </a>
            </Link>
            <span className="slidebar__tooltip">Login</span>
          </li>
        )}

        <li>
          <Link href="/search">
            <a>
              <i className="bx bx-search-alt-2"></i>
              <span className="links_name">Search</span>
            </a>
          </Link>
          <span className="slidebar__tooltip">Search</span>
        </li>
        <li>
          <Link href="/anime">
            <a>
              <i className="bx bx-bookmarks"></i>
              <span className="links_name">Animes</span>
            </a>
          </Link>
          <span className="slidebar__tooltip">Animes</span>
        </li>

        <li>
          <Link href="/manga">
            <a>
              <i className="bx bx-book"></i>
              <span className="links_name">Mangas</span>
            </a>
          </Link>
          <span className="slidebar__tooltip">Mangas</span>
        </li>

        {userCtx.user && (
          <li>
            <Link href={`/saved/${userCtx.user?._id}`}>
              <a>
                <i className="bx bx-heart"></i>
                <span className="links_name">Saved</span>
              </a>
            </Link>
            <span className="slidebar__tooltip">Saved</span>
          </li>
        )}

        {userCtx.user && (
          <li>
            <Link href={`/chats`}>
              <a>
                <i className="bx bxl-messenger"></i>
                <span className="links_name">Chats</span>
              </a>
            </Link>
            <span className="slidebar__tooltip">Chats</span>
          </li>
        )}

        <li>
          <Link href="/discord">
            <a>
              <i className="bx bxl-discord"></i>
              <span className="links_name">Discord</span>
            </a>
          </Link>
          <span className="slidebar__tooltip">Discord</span>
        </li>

        <li>
          <Link href="/music">
            <a>
              <i className='bx bx-headphone'></i>
              <span className="links_name">Music</span>
            </a>
          </Link>
          <span className="slidebar__tooltip">Music</span>
        </li>

          <li>
          <Link href="/news">
            <a>
              <i className='bx bx-news'></i>
              <span className="links_name">News</span>
            </a>
          </Link>
          <span className="slidebar__tooltip">News</span>
        </li>

        {session?.user && (
          <li className="profile">
            {userProfileDetails}
            <i
              className="bx bx-log-out"
              id="log_out"
              style={{ cursor: "pointer" }}
              onClick={() => {
                signOut();
                localStorage.removeItem("user-chat-profile-secret");
              }}
            ></i>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Slidebar;
