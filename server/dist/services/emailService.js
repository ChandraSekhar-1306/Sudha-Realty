"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const env_1 = require("../config/env");
mail_1.default.setApiKey(env_1.config.sendGrid.apiKey);
class EmailService {
    constructor() {
        this.fromEmail = env_1.config.sendGrid.fromEmail;
        this.frontendUrl = env_1.config.frontend.url;
        this.toPersonal = env_1.config.sendGrid.toPersonal;
    }
    sendEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ to, subject, html }) {
            try {
                const msg = {
                    to,
                    from: this.fromEmail,
                    subject,
                    html,
                };
                yield mail_1.default.send(msg);
                console.log(`Email sent successfully to ${to}`);
            }
            catch (error) {
                console.error('Email sending failed:', error);
                throw new Error('Failed to send email');
            }
        });
    }
    // Appointment confirmation email
    sendAppointmentConfirmation(email, name, appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = 'Consultation Booking Confirmed';
            const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Consultation Booking Confirmed</h2>
        <p>Dear ${name},</p>
        <p>Thank you for booking a consultation with us. Your booking has been received and is currently under review.</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Booking ID:</strong> ${appointmentId}</p>
          <p><strong>Status:</strong> Pending Review</p>
        </div>
        <p>We will review your booking and send you a confirmation email with the meeting details within 24 hours.</p>
        <p>You can check your booking status in your dashboard: <a href="${this.frontendUrl}/dashboard">View Dashboard</a></p>
        <p>Best regards,<br>Sudha Realty</p>
      </div>
    `;
            yield this.sendEmail({ to: email, subject, html });
        });
    }
    // Appointment approval email with Zoom link
    sendAppointmentApproval(email, name, scheduledTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = 'Consultation Approved - Meeting Details Inside';
            const timeString = scheduledTime
                ? new Date(scheduledTime).toLocaleString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short'
                })
                : 'To be scheduled';
            const meetingLink = 'https://meet.google.com/pef-ipuh-baa';
            const meetingCode = 'pef-ipuh-baa';
            const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #059669;">Consultation Approved! 🎉</h2>
      <p>Dear ${name},</p>
      <p>Your consultation booking has been approved.</p>
      <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #059669; margin-top: 0;">Meeting Details</h3>
        <p><strong>Meeting Link:</strong> <a href="${meetingLink}" style="color: #2563eb; text-decoration: none;">Join Meeting</a></p>
        <p><strong>Meeting Code:</strong> <code style="background-color: #fff; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${meetingCode}</code></p>
      </div>
      <p>Please join the meeting at the scheduled time using the link above. We recommend joining 5 minutes early to test your audio and video.</p>
      <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Tip:</strong> Make sure you have a stable internet connection and a quiet environment for the best consultation experience.</p>
      </div>
      <p>Looking forward to speaking with you!</p>
      <p>Best regards,<br>Sudha Realty</p>
    </div>
  `;
            yield this.sendEmail({ to: email, subject, html });
        });
    }
    // Appointment rejection email
    sendAppointmentRejection(email, name, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = 'Consultation Booking Update';
            const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Consultation Booking Update</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your interest in our consultation services. Unfortunately, we are unable to proceed with your booking at this time.</p>
        ${reason ? `
          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Reason:</strong> ${reason}</p>
          </div>
        ` : ''}
        <p>Please feel free to submit a new booking request or contact us directly if you have any questions.</p>
        <p>You can book another consultation: <a href="${this.frontendUrl}/book">Book Consultation</a></p>
        <p>Best regards,<br>Sudha Realty</p>
      </div>
    `;
            yield this.sendEmail({ to: email, subject, html });
        });
    }
    // Property inquiry notification to admin
    sendInquiryNotification(propertyTitle, inquirerName, inquirerEmail, inquirerPhone, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = `New Property Inquiry: ${propertyTitle}`;
            const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Property Inquiry</h2>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Property: ${propertyTitle}</h3>
          <p><strong>Inquirer:</strong> ${inquirerName}</p>
          <p><strong>Email:</strong> ${inquirerEmail}</p>
          <p><strong>Phone:</strong> ${inquirerPhone}</p>
        </div>
        <div style="background-color: #ffffff; border: 1px solid #d1d5db; padding: 20px; border-radius: 8px;">
          <h4>Message:</h4>
          <p>${message}</p>
        </div>
        <p>Please respond to the inquiry through the admin dashboard.</p>
        <p><a href="${this.frontendUrl}/admin/inquiries">View in Dashboard</a></p>
      </div>
    `;
            yield this.sendEmail({ to: this.toPersonal, subject, html });
        });
    }
    // Inquiry response to user
    sendInquiryResponse(email, name, propertyTitle, responseMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = `Response to your inquiry: ${propertyTitle}`;
            const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Response to Your Property Inquiry</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your interest in <strong>${propertyTitle}</strong>. We have received your inquiry and here's our response:</p>
        <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0;">
          <p>${responseMessage}</p>
        </div>
        <p>If you have any additional questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Sudha Realty</p>
      </div>
    `;
            yield this.sendEmail({ to: email, subject, html });
        });
    }
}
exports.emailService = new EmailService();
