declare interface IActivity {
  id: number;
  type?: "project" | "service";
  name: string;
  abstract: string;
  main_image: IPicture;
  description?: string;
  other_images?: IPicture[];
  main_responsible?: IPerson;
  people_involved?: IPerson[];
}