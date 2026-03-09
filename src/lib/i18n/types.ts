export type Locale = "en" | "zh";

export interface Dictionary {
  nav: {
    gouache: string;
    paintings: string;
    sculptures: string;
    others: string;
    news: string;
    about: string;
  };
  hero: {
    name: string;
    nameZh: string;
  };
  about: {
    sectionTitle: string;
    bio: string;
    readMore: string;
    pageTitle: string;
    heading: string;
    bio1: string;
    bio2: string;
    membershipsTitle: string;
    memberships: string[];
    exhibitionsTitle: string;
    contactTitle: string;
    emailLabel: string;
    facebookLabel: string;
    facebookText: string;
  };
  news: {
    sectionTitle: string;
    viewAll: string;
    backToNews: string;
  };
  contact: {
    sectionTitle: string;
    email: string;
    facebook: string;
  };
  footer: {
    copyright: string;
    backToTop: string;
  };
  gallery: {
    gouacheTitle: string;
    paintingsTitle: string;
    sculpturesTitle: string;
    othersTitle: string;
  };
  common: {
    untitled: string;
  };
}
