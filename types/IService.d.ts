declare interface IService extends IActivity {
  service_hours?: string[];
  service_testimonials?: {
    date: string;
    name: string;
    comment: string;
  }
}