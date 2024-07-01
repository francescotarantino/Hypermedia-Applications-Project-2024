declare interface IPerson {
  id: number;
  name: string;
  surname: string;
  main_role: string;
  birthdate?: string;
  city?: string;
  email?: string;
  bio: string;
  hobbies?: string[];
  main_expertise?: string;
  languages?: string[];
  picture: IPicture;
  job_experiences?: {
    name: string;
    role: string;
    end_date: string;
    start_date: string;
    description: string;
  }[];
  educations?: {
    end_date: string;
    start_date: string;
    school_name: string;
    course: string;
  }[];
  responsible_for_services?: {
    id: number;
    name: string;
    main_image: IPicture
  }
  involved_in_services?: {
    id: number;
    name: string;
    main_image: IPicture
  }
  responsible_for_projects?: {
    id: number;
    name: string;
    main_image: IPicture
  }
  involved_in_projects?: {
    id: number;
    name: string;
    main_image: IPicture
  }
}