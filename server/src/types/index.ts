import { Request } from 'express';
import { User, Admin } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user?: User;
  admin?: Admin;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface PropertyFilters {
  category?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
  bedrooms?: string;
  bathrooms?: string;
}

export interface CreateAppointmentDTO {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export interface CreatePropertyDTO {
  title: string;
  description: string;
  price: string;
  location: string;
  area?: string;
  bedrooms?: string;
  bathrooms?: string;
  category: 'FRESH_SALES' | 'RESALE';
  type: 'OPEN_PLOTS' | 'APARTMENTS' | 'VILLAS' | 'FARMLAND';
  features?: string[];
  coordinates?: {
    lat: string;
    lng: string;
  };
}

export interface CreateInquiryDTO {
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

// export interface ZoomMeeting {
//   topic: string;
//   type: number;
//   start_time: string;
//   duration: number;
//   timezone: string;
//   settings: {
//     host_video: boolean;
//     participant_video: boolean;
//     join_before_host: boolean;
//     mute_upon_entry: boolean;
//     watermark: boolean;
//     use_pmi: boolean;
//     approval_type: number;
//     audio: string;
//     auto_recording: string;
//   };
// }

// export interface ZoomMeetingResponse {
//   id: number;
//   topic: string;
//   join_url: string;
//   start_url: string;
//   start_time: string;
//   duration: number;
// }
export interface ZoomMeeting {
  topic: string;
  type: number; // 1 -> Instant, 2 -> Scheduled
  start_time: string;
  duration: number;
  timezone: string;
  agenda?: string;
  default_password: boolean;
  password?: string;
  settings: {
    allow_multiple_devices: boolean;
    alternative_hosts?: string;
    alternative_hosts_email_notification: boolean;
    breakout_room?: {
      enable: boolean;
      rooms: Array<{
        name: string;
        participants: string[];
      }>;
    };
    calendar_type: number;
    contact_email: string;
    contact_name: string;
    email_notification: boolean;
    encryption_type: string;
    focus_mode: boolean;
    host_video: boolean;
    join_before_host: boolean;
    meeting_authentication: boolean;
    meeting_invitees?: Array<{ email: string }>;
    mute_upon_entry: boolean;
    participant_video: boolean;
    private_meeting: boolean;
    waiting_room: boolean;
    watermark: boolean;
    continuous_meeting_chat?: {
      enable: boolean;
    };
  };
}

export interface ZoomMeetingResponse {
  id: number;
  topic: string;
  join_url: string;
  start_url: string;
  start_time: string;
  duration: number;
}


export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}

export interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
}