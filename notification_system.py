"""
CCMS Notification System — Production-Ready Flask API
======================================================
Sends REAL Gmail email notifications and Twilio SMS messages
after a student submits a registration form on the frontend.

Setup:
  pip install flask flask-cors python-dotenv twilio

Environment Variables (set in .env or Vercel dashboard):
  SENDER_EMAIL        — Gmail address (e.g. ccms.events2026@gmail.com)
  SENDER_PASSWORD     — Gmail App Password (NOT your Gmail password)
  TWILIO_ACCOUNT_SID  — Twilio Console → Account SID
  TWILIO_AUTH_TOKEN   — Twilio Console → Auth Token
  TWILIO_PHONE_NUMBER — Twilio purchased phone number (e.g. +1415XXXXXXX)
  FLASK_SECRET_KEY    — A random secret string for session signing
"""

import os
import smtplib
import logging
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from flask import Flask, request, jsonify
from flask_cors import CORS

# Conditionally import dotenv (not available on Vercel, but useful locally)
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Conditionally import Twilio
try:
    from twilio.rest import Client as TwilioClient
    TWILIO_AVAILABLE = True
except ImportError:
    TWILIO_AVAILABLE = False

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("CCMS-Notify")

# ---------------------------------------------------------------------------
# Flask App
# ---------------------------------------------------------------------------
app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "ccms-dev-secret-2026")
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ---------------------------------------------------------------------------
# Configuration (loaded from environment variables)
# ---------------------------------------------------------------------------
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "")
SENDER_PASSWORD = os.environ.get("SENDER_PASSWORD", "")

TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID", "")
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN", "")
TWILIO_PHONE_NUMBER = os.environ.get("TWILIO_PHONE_NUMBER", "")

# Initialize Twilio client (if credentials are available)
twilio_client = None
if TWILIO_AVAILABLE and TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN:
    try:
        twilio_client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        logger.info("✅ Twilio client initialized successfully.")
    except Exception as e:
        logger.warning(f"⚠️ Twilio initialization failed: {e}")


# ---------------------------------------------------------------------------
# HTML Email Template — Professional, Branded, Mobile-Responsive
# ---------------------------------------------------------------------------
def build_email_html(student_name, event_name, club_name, date, time,
                     venue, reg_id, team_name, dept):
    """Generate a beautiful HTML email template for event confirmation."""
    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; background-color:#0a0e17; font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0e17; padding:24px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#111827,#1a1f2e); border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.08);">
              
              <!-- Header Banner -->
              <tr>
                <td style="background:linear-gradient(135deg,#1db954,#00d4aa); padding:32px; text-align:center;">
                  <h1 style="margin:0; color:#000; font-size:28px; font-weight:800; letter-spacing:-0.5px;">
                    🎓 PulseCampus CCMS
                  </h1>
                  <p style="margin:6px 0 0; color:rgba(0,0,0,0.7); font-size:14px; font-weight:600;">
                    Silver Jubilee Edition 2026 — Event Registration Confirmed
                  </p>
                </td>
              </tr>

              <!-- Greeting -->
              <tr>
                <td style="padding:32px 32px 16px;">
                  <h2 style="margin:0; color:#ffffff; font-size:22px; font-weight:700;">
                    Hey {student_name}! 🎉
                  </h2>
                  <p style="margin:12px 0 0; color:#9ca3af; font-size:15px; line-height:1.6;">
                    Your registration has been <span style="color:#1db954; font-weight:700;">successfully confirmed</span>. 
                    You are officially registered for the event below. Keep this email as your digital pass!
                  </p>
                </td>
              </tr>

              <!-- Event Details Card -->
              <tr>
                <td style="padding:0 32px 24px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; overflow:hidden;">
                    <tr>
                      <td style="padding:20px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:6px 0;">
                              <span style="color:#6b7280; font-size:12px; text-transform:uppercase; font-weight:700; letter-spacing:0.5px;">Event</span><br>
                              <span style="color:#ffffff; font-size:16px; font-weight:700;">{event_name}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:6px 0;">
                              <span style="color:#6b7280; font-size:12px; text-transform:uppercase; font-weight:700; letter-spacing:0.5px;">Club</span><br>
                              <span style="color:#1db954; font-size:14px; font-weight:600;">{club_name}</span>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" style="padding:12px 0 0;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td width="50%" style="padding:6px 0;">
                                    <span style="color:#6b7280; font-size:11px; text-transform:uppercase; font-weight:700;">📅 Date</span><br>
                                    <span style="color:#e5e7eb; font-size:13px;">{date}</span>
                                  </td>
                                  <td width="50%" style="padding:6px 0;">
                                    <span style="color:#6b7280; font-size:11px; text-transform:uppercase; font-weight:700;">🕐 Time</span><br>
                                    <span style="color:#e5e7eb; font-size:13px;">{time}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="50%" style="padding:6px 0;">
                                    <span style="color:#6b7280; font-size:11px; text-transform:uppercase; font-weight:700;">📍 Venue</span><br>
                                    <span style="color:#e5e7eb; font-size:13px;">{venue}</span>
                                  </td>
                                  <td width="50%" style="padding:6px 0;">
                                    <span style="color:#6b7280; font-size:11px; text-transform:uppercase; font-weight:700;">👥 Team</span><br>
                                    <span style="color:#e5e7eb; font-size:13px;">{team_name}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="50%" style="padding:6px 0;">
                                    <span style="color:#6b7280; font-size:11px; text-transform:uppercase; font-weight:700;">🏛️ Department</span><br>
                                    <span style="color:#e5e7eb; font-size:13px;">{dept}</span>
                                  </td>
                                  <td width="50%" style="padding:6px 0;">
                                    <span style="color:#6b7280; font-size:11px; text-transform:uppercase; font-weight:700;">🎫 Pass ID</span><br>
                                    <span style="color:#1db954; font-size:14px; font-weight:800;">{reg_id}</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Important Notice -->
              <tr>
                <td style="padding:0 32px 24px;">
                  <table width="100%" style="background:rgba(29,185,84,0.08); border:1px solid rgba(29,185,84,0.2); border-radius:10px;">
                    <tr>
                      <td style="padding:16px;">
                        <p style="margin:0; color:#1db954; font-size:13px; font-weight:700;">📌 Important Reminders:</p>
                        <ul style="margin:8px 0 0; padding-left:18px; color:#9ca3af; font-size:13px; line-height:1.8;">
                          <li>Carry your <strong style="color:#fff;">College ID Card</strong> on event day</li>
                          <li>Keep your <strong style="color:#1db954;">Pass ID: {reg_id}</strong> handy for check-in</li>
                          <li>Arrive <strong style="color:#fff;">30 minutes early</strong> for registration verification</li>
                          <li>Contact your event coordinator for any queries</li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:20px 32px; border-top:1px solid rgba(255,255,255,0.06); text-align:center;">
                  <p style="margin:0; color:#6b7280; font-size:12px;">
                    🏛️ PulseCampus CCMS 2026 — Silver Jubilee College Club Management System
                  </p>
                  <p style="margin:6px 0 0; color:#4b5563; font-size:11px;">
                    This is an automated confirmation. Do not reply to this email.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    """


# ---------------------------------------------------------------------------
# Email Service
# ---------------------------------------------------------------------------
def send_email_notification(recipient_email, student_name, event_details):
    """
    Send a rich HTML confirmation email via Gmail SMTP.
    Requires SENDER_EMAIL and SENDER_PASSWORD (App Password) env vars.
    """
    if not SENDER_EMAIL or not SENDER_PASSWORD:
        logger.warning("⚠️ Email credentials not configured. Skipping email.")
        return {"success": False, "error": "Email credentials not configured"}

    try:
        msg = MIMEMultipart("alternative")
        msg["From"] = f"PulseCampus CCMS <{SENDER_EMAIL}>"
        msg["To"] = recipient_email
        msg["Subject"] = f"✅ Registration Confirmed: {event_details.get('eventName', 'CCMS Event')}"

        # Plain text fallback
        plain_text = (
            f"Hi {student_name},\n\n"
            f"Your registration for {event_details.get('eventName')} is confirmed!\n"
            f"Club: {event_details.get('clubName', 'CCMS')}\n"
            f"Date: {event_details.get('date', 'TBA')}\n"
            f"Time: {event_details.get('time', 'TBA')}\n"
            f"Venue: {event_details.get('venue', 'TBA')}\n"
            f"Pass ID: {event_details.get('regId', 'N/A')}\n\n"
            f"Keep your Pass ID handy for check-in.\n\n"
            f"Best regards,\nCCMS 2026 Team"
        )

        # Rich HTML email
        html_body = build_email_html(
            student_name=student_name,
            event_name=event_details.get("eventName", "CCMS Event"),
            club_name=event_details.get("clubName", "CCMS"),
            date=event_details.get("date", "TBA"),
            time=event_details.get("time", "TBA"),
            venue=event_details.get("venue", "TBA"),
            reg_id=event_details.get("regId", "N/A"),
            team_name=event_details.get("teamName", "Individual"),
            dept=event_details.get("dept", "")
        )

        msg.attach(MIMEText(plain_text, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        # Connect and send
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        server.quit()

        logger.info(f"📧 Email sent successfully to {recipient_email}")
        return {"success": True, "message": f"Email sent to {recipient_email}"}

    except smtplib.SMTPAuthenticationError:
        logger.error("❌ Gmail authentication failed. Check App Password.")
        return {"success": False, "error": "Gmail authentication failed. Use an App Password, not your Gmail password."}
    except Exception as e:
        logger.error(f"❌ Email sending failed: {e}")
        return {"success": False, "error": str(e)}


# ---------------------------------------------------------------------------
# SMS Service
# ---------------------------------------------------------------------------
def send_sms_notification(recipient_phone, student_name, event_details):
    """
    Send an SMS notification via Twilio after event registration.
    Requires TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER env vars.
    """
    if not twilio_client:
        logger.warning("⚠️ Twilio not configured. Skipping SMS.")
        return {"success": False, "error": "Twilio SMS not configured"}

    if not TWILIO_PHONE_NUMBER:
        return {"success": False, "error": "Twilio sender phone number not set"}

    try:
        sms_body = (
            f"🎓 PulseCampus CCMS\n\n"
            f"Hi {student_name}! ✅ Your registration for "
            f"\"{event_details.get('eventName')}\" is confirmed!\n\n"
            f"📅 Date: {event_details.get('date', 'TBA')}\n"
            f"🕐 Time: {event_details.get('time', 'TBA')}\n"
            f"📍 Venue: {event_details.get('venue', 'TBA')}\n"
            f"🎫 Pass ID: {event_details.get('regId', 'N/A')}\n\n"
            f"Carry your College ID. Arrive 30 mins early.\n"
            f"— CCMS 2026 Team"
        )

        message = twilio_client.messages.create(
            body=sms_body,
            from_=TWILIO_PHONE_NUMBER,
            to=recipient_phone
        )

        logger.info(f"📱 SMS sent to {recipient_phone} (SID: {message.sid})")
        return {"success": True, "message": f"SMS sent to {recipient_phone}", "sid": message.sid}

    except Exception as e:
        logger.error(f"❌ SMS sending failed: {e}")
        return {"success": False, "error": str(e)}


# ===========================================================================
# API ROUTES
# ===========================================================================

@app.route("/", methods=["GET"])
def index():
    """Health check endpoint."""
    return jsonify({
        "service": "PulseCampus CCMS Notification System",
        "version": "2.0.0",
        "status": "running",
        "email_configured": bool(SENDER_EMAIL and SENDER_PASSWORD),
        "sms_configured": bool(twilio_client),
        "timestamp": datetime.utcnow().isoformat()
    })


@app.route("/api/notify", methods=["POST"])
def notify_user():
    """
    Main notification endpoint — called from the CCMS frontend after
    a student submits the registration form.

    Expected JSON payload:
    {
      "studentName": "Shorajit Das",
      "email": "shorajit.das@gmail.com",
      "phone": "+919841234567",
      "eventName": "Silver Jubilee Grand Gala",
      "clubName": "Aura Harmonics",
      "date": "Nov 15, 2026",
      "time": "06:00 PM - 10:30 PM",
      "venue": "Grand Open-Air Amphitheatre",
      "regId": "REG-2026-1001",
      "teamName": "Acoustic Mirage",
      "dept": "Computer Science & Engineering"
    }
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON body provided"}), 400

    student_name = data.get("studentName", "Student")
    email = data.get("email", "")
    phone = data.get("phone", "")

    if not email and not phone:
        return jsonify({"error": "At least one of 'email' or 'phone' is required"}), 400

    results = {
        "email": {"success": False, "skipped": True},
        "sms": {"success": False, "skipped": True}
    }

    # --- Send Email ---
    if email:
        results["email"] = send_email_notification(email, student_name, data)

    # --- Send SMS ---
    if phone:
        # Normalize phone number (remove spaces)
        clean_phone = phone.replace(" ", "").replace("-", "")
        if not clean_phone.startswith("+"):
            clean_phone = "+91" + clean_phone  # Default to India country code
        results["sms"] = send_sms_notification(clean_phone, student_name, data)

    # Determine overall status
    any_success = results["email"].get("success") or results["sms"].get("success")
    status_code = 200 if any_success else 207  # 207 = Multi-Status (partial)

    return jsonify({
        "message": "Notifications processed",
        "studentName": student_name,
        "results": results,
        "timestamp": datetime.utcnow().isoformat()
    }), status_code


@app.route("/api/health", methods=["GET"])
def health_check():
    """Detailed health check showing configuration status."""
    return jsonify({
        "status": "healthy",
        "services": {
            "email": {
                "configured": bool(SENDER_EMAIL and SENDER_PASSWORD),
                "provider": "Gmail SMTP (smtp.gmail.com:587)"
            },
            "sms": {
                "configured": bool(twilio_client),
                "provider": "Twilio" if TWILIO_AVAILABLE else "Twilio (library not installed)"
            }
        },
        "environment": {
            "SENDER_EMAIL": "✅ Set" if SENDER_EMAIL else "❌ Not set",
            "SENDER_PASSWORD": "✅ Set" if SENDER_PASSWORD else "❌ Not set",
            "TWILIO_ACCOUNT_SID": "✅ Set" if TWILIO_ACCOUNT_SID else "❌ Not set",
            "TWILIO_AUTH_TOKEN": "✅ Set" if TWILIO_AUTH_TOKEN else "❌ Not set",
            "TWILIO_PHONE_NUMBER": "✅ Set" if TWILIO_PHONE_NUMBER else "❌ Not set"
        }
    })


# ===========================================================================
# Entry Point
# ===========================================================================
if __name__ == "__main__":
    logger.info("=" * 60)
    logger.info("  🚀 CCMS Notification Server Starting...")
    logger.info(f"  📧 Email configured: {bool(SENDER_EMAIL and SENDER_PASSWORD)}")
    logger.info(f"  📱 SMS configured:   {bool(twilio_client)}")
    logger.info("=" * 60)

    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=os.environ.get("FLASK_DEBUG", "False").lower() == "true"
    )