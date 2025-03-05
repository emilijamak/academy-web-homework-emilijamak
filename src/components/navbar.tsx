
interface NavbarProps {
  handleFavorites: (value: boolean) => void;
}


function Navbar( {handleFavorites} : NavbarProps ) {

  const handleClick = (value: boolean) => {
    handleFavorites(value)
  }

  return (
    <div className="flex justify-between py-5 px-10 bg-white items-center">
        <div className="flex items-center justify-center ">
            <div className="text-2xl font-bold mr-10">INFINITY</div>
            <div className="flex gap-5">
                <div onClick={() => handleClick(false)} className="text-lg font-semibold hover:text-gray-800 cursor-pointer">All Photos</div>
                <div onClick={() => handleClick(true)} className="text-lg font-semibold hover:text-gray-800 cursor-pointer">Favorite</div>
            </div>
        </div>
        <div className="">other</div>
    </div>
  );
}

export default Navbar;
