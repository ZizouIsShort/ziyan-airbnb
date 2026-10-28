import { Icon } from "./Icon";

export function Header() {
  return (
    <header className="site-header" id="siteHeader">
      <div className="header-inner">
        <a className="logo" href="#" aria-label="Airbnb homepage">
          <span className="logo-wrap">
            <Icon name="logo" />
          </span>
        </a>

        <div className="search-pill" role="search">
          <button className="search-seg" type="button">
            <img
              className="search-house"
              src="/assets/images/ui/searchbar-house.png"
              alt=""
              aria-hidden="true"
            />
            Anywhere
          </button>
          <span className="search-divider" />
          <button className="search-seg" type="button">
            Anytime
          </button>
          <span className="search-divider" />
          <button className="search-seg search-seg-muted" type="button">
            Add guests
          </button>
          <button className="search-submit" type="button" aria-label="Search" />
        </div>

        <nav className="header-nav">
          <a className="host-link" href="#">
            Become a host
          </a>
          <button
            className="icon-btn"
            type="button"
            aria-label="Choose a language and currency"
          >
            <span>
              <Icon name="globe" />
            </span>
          </button>
          <button
            className="icon-btn menu-btn"
            type="button"
            aria-label="Main navigation menu"
          >
            <span>
              <Icon name="menu" />
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
