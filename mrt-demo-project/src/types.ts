export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  status?: "Active" | "Inactive";
  location?: string;
  startDate?: string;
}
