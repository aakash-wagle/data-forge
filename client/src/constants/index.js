import { people01, people02, people03, facebook, instagram, linkedin, twitter, send, shield, star  } from "../assets";

// PreProcessing operations
export const preProcessOps = {

}

export const operations = {
  "Rename Column": {
    "Old Name": ["any", "drop"],
    "New Name": ["object", "text"],
  },
  "Drop Column": { "Column Name": ["any", "drop"] },
  "Fill Empty Cells": {
    "Column Name": ["any", "drop"],
    "Replace term": ["object", "text"],
  },
  "Drop Empty Cells": { "Column Name": ["any", "drop"] },
  // "One Hot Encoding": {
  //   "Column Names separaed by commas": ["object", "mult"],
  // },
  Tokenize: { "Column Name": ["object", "drop"] },
  "Remove Stopwords": { "Column Name": ["object", "drop"] },
};

export const opsRoutes = {
  "Rename Column": "rename_columns",
  "Drop Column": "drop_columns",
  "Fill Empty Cells": "fill_nan",
  "Drop Empty Cells": "drop_nan",
  "One Hot Encoding": "one_hot_encoding",
  "Tokenize": "tokenize",
  "Remove Stopwords": "remove_stopwords",
};

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "Documentation",
    title: "Documentation",
  },
  {
    id: "Review",
    title: "Review",
  },
  {
    id: "Get",
    title: "Get Started",
    path: "/filedropper"
  },  
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Rewards",
    content:
      "The best credit cards offer some tantalizing combinations of promotions and prizes",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "We take proactive steps make sure your information and transactions are secure.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Balance Transfer",
    content:
      "A balance transfer credit card can save you a lot of money in interest charges.",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content: 
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    name: "Steve Mark",
    title: "Data Scientist",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    name: "Kenn Gallagher",
    title: "Student",
    img: people03,
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "150+",
  },
  {
    id: "stats-3",
    title: "Downloads",
    value: "230M+",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];
