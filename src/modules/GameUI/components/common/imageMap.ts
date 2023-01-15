import domelemjs from "domelemjs";
import mediaFolder from "../../../../constants/mediaFolder";

export type imageMapType = {
  className?: string;
  alt: string;
  fileName: string;
  id?: string;
  parent?: HTMLElement;
};

const imageMap = ({ className, alt, id, fileName, parent }: imageMapType) => {
  const img = domelemjs({
    tag: "img",
    parent,
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
