import imageMap from "../../../common/imageMap";

const licensingModal = [
  {
    tag: "h3",
    text: "Made by Viktor Bozzay",
    children: [
      {
        tag: "span",
        text: "©2023",
      },
    ],
  },
  {
    tag: "a",
    attrs: {
      href: "https://www.webforsol.hu",
      class: "w4s",
      target: "_blank",
    },
    children: imageMap({
      fileName: "webforsol.svg",
      alt: "WebforSol logo",
    }),
  },
  {
    tag: "div",
    children: [
      {
        tag: "h2",
        text: "Other licenses",
      },
      {
        tag: "p",
        children: [
          {
            tag: "span",
            text: "Icons made by ",
          },
          {
            tag: "a",
            text: " Roundicons",
            attrs: {
              href: "https://www.flaticon.com/authors/roundicons",
              title: "Roundicons",
            },
          },
          {
            tag: "span",
            text: " from ",
          },
          {
            tag: "a",
            text: "www.flaticon.com",
            attrs: {
              href: "https://www.flaticon.com/",
              title: "Flaticon",
            },
          },
        ],
      },
      {
        tag: "p",
        children: [
          {
            tag: "span",
            text: "Icons made by ",
          },
          {
            tag: "a",
            text: "Smashicons",
            attrs: {
              href: "https://www.flaticon.com/authors/smashicons",
              title: "Smashicons",
            },
          },
          {
            tag: "span",
            text: " from ",
          },
          {
            tag: "a",
            text: "www.flaticon.com",
            attrs: {
              href: "https://www.flaticon.com/",
              title: "Flaticon",
            },
          },
        ],
      },
      {
        tag: "p",
        children: [
          {
            tag: "span",
            text: "Icons made by",
          },
          {
            tag: "a",
            text: " Freepik ",
            attrs: {
              href: "https://www.freepik.com",
              title: "Freepik",
            },
          },
          {
            tag: "span",
            text: " from ",
          },
          {
            tag: "a",
            text: "www.flaticon.com",
            attrs: {
              href: "https://www.flaticon.com/",
              title: "Flaticon",
            },
          },
          {
            tag: "p",
            children: [
              {
                tag: "span",
                text: "Icons made by ",
              },

              {
                tag: "a",
                text: "GeekClick",
                attrs: {
                  href: "https://www.flaticon.com/authors/geekclick",
                  title: "GeekClick",
                },
              },
              {
                tag: "span",
                text: " from ",
              },
              {
                tag: "a",
                text: "www.flaticon.com",
                attrs: {
                  href: "https://www.flaticon.com/",
                  title: "Flaticon",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

export default licensingModal;
