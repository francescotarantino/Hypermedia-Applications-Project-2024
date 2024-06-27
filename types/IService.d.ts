declare interface IService extends IActivity {
  service_hours?: {
    day: string;
    hours: string;
  }[] | null;
  service_hours_description?: string | null;
  service_testimonials?: ITestimonial[];
}