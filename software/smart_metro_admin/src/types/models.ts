// TypeScript models for every ERD entity (camelCase, as returned by the API).
// NOTE: PasswordHash is intentionally NOT modelled — it must never reach the frontend.

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export type RoleName = 'Passenger' | 'Admin' | (string & {});

export interface Role {
  roleId: number;
  name: RoleName;
  description?: string;
}

export interface User {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  roleId?: number;
  role: RoleName;
  isActive: boolean;
  createdAt: string;
}

/** Returned by /auth/register and /auth/profile */
export type UserProfile = User;

/** Returned inside the login response */
export interface AuthUser {
  userId: number;
  fullName: string;
  email: string;
  role: RoleName;
}

export interface LoginData {
  token: string;
  user: AuthUser;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SubscriptionPlan {
  planId: number;
  planName: string;
  price: number;
  durationIn: number; // duration (e.g. days) — confirm unit with backend
  isActive: boolean;
}

export interface Subscription {
  subscriptionId: number;
  userId: number;
  planId: number;
  startDate: string;
  endDate: string;
  status: string;
  isActive: boolean;
}

export interface Payment {
  paymentId: number;
  userId: number;
  subscriptionId?: number | null;
  ticketId?: number | null;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  paidAt: string;
  isActive: boolean;
}

export interface Ticket {
  ticketId: number;
  qrCode: string;
  userId: number;
  status: string;
  ticketType: string;
  price: number;
  purchaseDate: string;
  expiryDate: string;
  isActive: boolean;
}

export interface TicketValidation {
  validationId: number;
  ticketId: number;
  gateId: number;
  result: string;
  denialReason?: string | null;
  validationTime: string;
}

export interface Station {
  stationId: number;
  name: string;
  location: string;
  isActive: boolean;
}

export interface Gate {
  gateId: number;
  stationId: number;
  gateType: string;
  status: string;
  isActive: boolean;
}

export interface CrowdPrediction {
  predictionId: number;
  stationId: number;
  predictedFor: string;
  predictedLevel: string;
  createdAt: string;
}

export interface Route {
  routeId: number;
  name: string;
  description?: string;
}

export interface RouteStation {
  routeStationId: number;
  routeId: number;
  stationId: number;
  stopOrder: number;
}

export interface ServiceAlert {
  alertId: number;
  title: string;
  message: string;
  createdByUserId: number;
  isActive: boolean;
  createdAt: string;
}
