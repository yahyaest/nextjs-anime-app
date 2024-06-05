function Footer() {
  return (
    <footer>
      <div className="content">
        <div className="left box">
          <div className="upper">
            <div className="topic">About us</div>
            <p>
              AnimeLab connects anime and manga fans across 200+ countries and
              territories through the content they love. AnimeLab provides a
              Large Collection of Anime.Catch your favorite shows and movies.
            </p>
          </div>
          <div className="lower">
            <div className="topic">Contact us</div>
            <div className="phone">
              <a>
                <i className="fa fa-phone-volume"></i>+007 9089 6767
              </a>
            </div>
            <div className="email">
              <a>
                <i className="fa fa-envelope"></i>abc@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="middle box">
          <div className="topic">Our Services</div>
          <div>
            <a>Web Design, Development</a>
          </div>
          <div>
            <a>Web UX Design, Reasearch</a>
          </div>
          <div>
            <a>Web User Interface Design</a>
          </div>
          <div>
            <a>Theme Development, Design</a>
          </div>
          <div>
            <a>Mobile Application Design</a>
          </div>
          <div>
            <a>Wire raming & Prototyping</a>
          </div>
        </div>
        <div className="right box">
          <div className="topic">Subscribe us</div>
          <form action="#">
            <input type="text" placeholder="Enter email address"></input>
            <input type="submit" name="" value="Send"></input>
            <div className="media-icons">
              <a>
                <i className="fa fa-facebook-f"></i>
              </a>
              <a>
                <i className="fa fa-instagram"></i>
              </a>
              <a>
                <i className="fa fa-twitter"></i>
              </a>
              <a>
                <i className="fa fa-youtube"></i>
              </a>
              <a>
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="bottom px-2 pb-1">
        <p>
          Copyright &#169; 2021 <a>AnimeLab</a> All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
