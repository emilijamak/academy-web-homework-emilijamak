interface NavbarProps {
  handleFavorites: (value: boolean) => void;
}

function Navbar({ handleFavorites }: NavbarProps) {
  const handleClick = (value: boolean) => {
    handleFavorites(value);
  };

  return (
    <div className="navbar-container">
      <div className="wrapper">
        <div className="logo">INFINITY GALLERY</div>
        <div className="links-wrapper">
          <div onClick={() => handleClick(false)} className="link">
            All Photos
          </div>
          <div onClick={() => handleClick(true)} className="link">
            Favorite
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
