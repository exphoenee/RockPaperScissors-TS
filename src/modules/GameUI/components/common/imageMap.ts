import domelemjs from "domelemjs";

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
      src: "./media/loader.png",
      dataset: {
        filename: fileName,
      },
    },
    handleEvent: () => imgLoader(),
  });

  const imgLoader = () =>
    img.addEventListener("load", () => {
      fetch(fileName).then((response) =>
        response.blob().then((blob) => {
          img.src = URL.createObjectURL(blob);
          img.classList.remove("loader-image");
          img.removeEventListener("load", imgLoader);
        })
      );
    });

  return img;
};

export default imageMap;
