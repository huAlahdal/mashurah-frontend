export interface Response {
  id: number;
  numberOfHours: number;
  pricePerHour: number;
  dest: string;
  mainservice: string;
  service: string;
  urgent: string;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  statusId: number;
  clientId: number;
  serviceProviderId: number;
  discountId: number;
  clientName: string;
  clientMobile: string;
  clientEmail: string;
  serviceProviderName: string;
  serviceProviderMobile: string;
  serviceProviderEmail: string;
}
