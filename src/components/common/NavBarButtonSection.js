

const NavBarButtonSection = ({ sectionName, sectionId }) => {
    return (
        <a className="group nav-link p-1 sm:p-3 hover:bg-white active:bg-lime-100 pointer-events-auto" href={`#${sectionId}`}>
            <span className="w-fit text-white group-hover:text-black   ">{sectionName}</span>
        </a>
    )
}

export default NavBarButtonSection