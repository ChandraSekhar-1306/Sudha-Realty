// import axios from "axios";
// import base64 from "base-64";
// import { config } from '../config/env';
// import { ZoomMeetingResponse } from '../types';

// class ZoomService {
//   private readonly accountId = config.zoom.accountid;
//   private readonly clientId = config.zoom.clientid;
//   private readonly clientSecret = config.zoom.clientsecret;

//   private getAuthHeaders() {
//     return {
//       Authorization: `Basic ${base64.encode(
//         `${this.clientId}:${this.clientSecret}`
//       )}`,
//       "Content-Type": "application/json",
//     };
//   }

//   private async generateAccessToken(): Promise<string> {
//     try {
//       const response = await axios.post(
//         `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${this.accountId}`,
//         {},
//         {
//           headers: this.getAuthHeaders(),
//         }
//       );

//       interface ZoomTokenResponse {
//         access_token: string;
//         [key: string]: any;
//       }
//       const jsonResponse = response.data as ZoomTokenResponse;
      
//       if (!jsonResponse?.access_token) {
//         console.log("generateAccessToken Error - No access token in response:", jsonResponse);
//         throw new Error('Zoom access token not found in response');
//       }
      
//       return jsonResponse.access_token;
//     } catch (error) {
//       console.log("generateAccessToken Error --> ", error);
//       throw error;
//     }
//   }

//   async createMeeting(
//     topic: string = "Real Estate Consultation",
//     agenda?: string,
//     startTime?: Date,
//     duration: number = 60,
//     customerEmail?: string,
//     customerName?: string
//   ): Promise<ZoomMeetingResponse> {
//     try {
//       const zoomAccessToken = await this.generateAccessToken();
      
// const meetingData = {
//   agenda: agenda || topic,
//   default_password: false,
//   duration,
//   password: "12345",
//   settings: {
//     allow_multiple_devices: true,
//     alternative_hosts:  "admin@sudharealty.in",
//     alternative_hosts_email_notification: true,
//     calendar_type: 1,
//     contact_email:  "admin@sudharealty.in",
//     contact_name: customerName || "Sudha Realty",
//     email_notification: true,
//     encryption_type: "enhanced_encryption",
//     focus_mode: true,
//     host_video: true,
//     join_before_host: true,
//     meeting_authentication: true,
//     mute_upon_entry: true,
//     participant_video: true,
//     private_meeting: true,
//     waiting_room: false,
//     watermark: false,
//     continuous_meeting_chat: {
//       enable: true,
//     },
//   },
//   start_time: startTime
//     ? startTime.toISOString()
//     : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
//   timezone: "Asia/Kolkata",
//   topic,
//   type: 2, // Scheduled Meeting
// };


//       const response = await axios.post(
//         `https://api.zoom.us/v2/users/me/meetings`,
//         meetingData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${zoomAccessToken}`,
//           },
//         }
//       );

//       const jsonResponse = response.data as ZoomMeetingResponse;
      
//       console.log("Zoom meeting created successfully:", {
//         id: jsonResponse.id,
//         topic: jsonResponse.topic,
//         join_url: jsonResponse.join_url
//       });
      
//       return jsonResponse;
//     } catch (error) {
//       console.log("createMeeting Error --> ", error);
//       throw new Error('Failed to create Zoom meeting');
//     }
//   }

//   // Convenience method for creating consultation meetings
//   async createConsultationMeeting(
//     customerName: string,
//     customerEmail: string,
//     scheduledTime?: Date
//   ): Promise<ZoomMeetingResponse> {
//     const topic = `Real Estate Consultation - ${customerName}`;
//     const agenda = `Real estate consultation meeting with ${customerName}`;
    
//     return this.createMeeting(
//       topic,
//       agenda,
//       scheduledTime,
//       60,
//       customerEmail,
//       customerName
//     );
//   }
// }

// export const zoomService = new ZoomService();