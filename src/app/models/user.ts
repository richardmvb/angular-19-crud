export interface User {
  id: number;
  avatar?: string;
  realm: string;
  username: string;
  email: string;
  emailVerified: number;
  first_name: string;
  last_name: string;
  phone: string;
  document_type: string;
  document_number: string;
  address?: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    complement?: string;
  } | any
  phone_number: string;
  password?: string;
  tempPassword?: string;
  message?: string;
  from_paypal: boolean;
  created_at: Date;
  updated_at: Date;
  clubPurchase?: any[];
  hasUsedClubDiscount?: boolean;
}
