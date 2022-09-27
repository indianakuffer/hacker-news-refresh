export interface Story {
  by: string;
  id: number;
  kids : number[];
  descendants: number;
  score : number;
  title : string;
  time : number;
  type : "story";
  url : string;
}

export interface Comment {
  by: string;
  id: number;
  kids : number[];
  parent: number;
  text : string;
  time : number;
  type : "comment";
}