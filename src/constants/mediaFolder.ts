// A Vite `base`-t is tartalmazza (pl. GitHub Pages: "/RockPaperScissors-TS/media"),
// hogy az abszolút útvonalak ne a domain gyökeréből töltsenek.
const mediaFolder = `${import.meta.env.BASE_URL}media`;
export default mediaFolder;
