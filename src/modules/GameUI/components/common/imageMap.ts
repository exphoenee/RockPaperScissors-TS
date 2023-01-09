import domelemjs from "domelemjs";
import mediaFolder from "../../../../constants/mediaFolder";

export type imageMapType = {
  className?: string;
  alt: string;
  fileName: string;
  id?: string;
};

const imageMap = ({ className, alt, id, fileName }: imageMapType) => {
  const img = domelemjs({
    tag: "img",
    attrs: {
      class: [className, `loader-image`].join(" "),
      alt,
      id,
      src: `${mediaFolder}/loader.png`,
    },
  });

  const imgLoader = () =>
    fetch(`${mediaFolder}/${fileName}`).then((response) =>
      response.blob().then((blob) => {
        img.src = URL.createObjectURL(blob);
        img.classList.remove("loader-image");
        img.removeEventListener("load", imgLoader);
      })
    );

  img.addEventListener("load", imgLoader);

  return img;
};

export default imageMap;
