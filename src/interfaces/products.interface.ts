export default interface Iproducts {
  save: any;
  title: string;
  type: string;
  tags: Array<string>;
  trendScore: number;
  image: string;
  scoreRecycled: boolean;
  scoreEnergy: number;
  scoreCarbon: number;
  scoreRepair: number;
}
