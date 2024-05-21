export interface BaseModel {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUserModel extends BaseModel {
  name: string;
  email?: string;
  password: string;
  contact_no: string;
  role: string;
  address: string;
  zip_code: string;
  city: string;
  state: string;
  isDeleted: boolean;
}

export interface ServiceModel extends BaseModel {
  service_name: string;
  isDeleted: boolean;
}

export interface ProjectModel extends BaseModel {
  project_name: string;
  address: string;
  zip_code: string;
  city: string;
  state: string;
  isDeleted: boolean;
}

export interface TaskModel extends BaseModel {
  assignee_id: number;
  employee_id: number;
  project_id: number;
  service_id: number;
  main_activity: string;
  sub_activity: string;
  start_date: Date;
  end_date: Date;
  start_time: string;
  end_time: string;
  isDeleted: boolean;
}
export interface UserServiceModel extends BaseModel {
  user_id: number;
  service_id: number;
}

export interface StockModel extends BaseModel {
  stock_type_id: number;
  auth_id: number;
  project_id: number;
  stock_type: string;
  total_quantity: number;
  remaining_quantity: number;
  used_quantity: number;
}

export interface StockDetailsModel extends BaseModel {
  stock_id: number;
  status: string;
  remarks: string;
  received_quantity?: number;
  accepted_quantity?: number;
  date: Date;
  used_quantity?: number;
  balance: number;
}

export interface InquiryModel extends BaseModel {
  name: string;
  email: string;
  title: string;
  remarks: string;
  website: string;
  partnerType: string;
}

export interface BusinessPartnerModel extends BaseModel {
  company_name: string;
  authorized_person_name: string;
  business_title: string;
  contact_no: string;
  business_details: string;
  visiting_card_image: string;
  website: string;
  visit_date?: Date;
  visit_location?: string;
  email?: string;
}
