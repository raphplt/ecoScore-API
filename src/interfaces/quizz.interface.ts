export default interface Iquizz {
  save: any;
  title: string;
  category: string;
  answers: Array<Ianswers>;
  answersType: string;
}

// Answers interface
interface Ianswers {
  name: string;
  value: string;
  slug: string;
}