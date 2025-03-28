import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginStyles.css';

const Terms = () => {
  return (
    <div className="login-page">
      <div className="blurred-background"></div>
      <div className="content-wrapper">
        <div className="logo-container">
          <Link className="logo" to="/welcome" aria-label="Go to Welcome page"></Link>
          <Link className="logo2" to="/welcome" aria-label="Go to Welcome page"></Link>
        </div>
        <div className="main-container">
          <div className="left-section">
  <div className="scrollable-content2">
    <h5>1. Acceptance of Terms</h5>
    <p>By accessing or registering on Kqueue, you agree to comply with these Terms. If you do not agree, please do not use our services.</p>

    <h5>2. User Accounts & Responsibilities</h5>
    <p>You must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials. Any unauthorized access or suspicious activity should be reported immediately.</p>

    <h5>3. Use of Services</h5>
    <p>For KMITL Clinic: Users can book medical appointments, check schedules, and view staff details. For KMITL Sport Center: Users can reserve sports facilities and view activity schedules. Misuse of the system, such as booking fake appointments, is strictly prohibited.</p>

    <h5>4. Appointment & Cancellation Policy</h5>
    <p>Users should book, reschedule, or cancel appointments responsibly. Repeated no-shows may lead to temporary account restrictions.</p>

    <h5>5. Privacy & Data Protection</h5>
    <p>We collect necessary personal information for service operations. Your data will not be shared with third parties except as required by law. Review our Privacy Policy for more details.</p>

    <h5>6. Prohibited Activities</h5>
    <p>Users must not: Provide false information or impersonate others. Interfere with the platform’s functionality or attempt unauthorized access. Use Kqueue for any illegal or harmful purposes.</p>

    <h5>7. Account Suspension & Termination</h5>
    <p>Violation of these Terms may result in temporary or permanent account suspension. Kqueue reserves the right to suspend accounts engaging in misconduct.</p>

    <h5>8. Limitation of Liability</h5>
    <p>Kqueue is provided on an “as-is” basis; we do not guarantee uninterrupted service. We are not responsible for appointment outcomes or delays in service.</p>

    <h5>9. Changes to Terms</h5>
    <p>We may update these Terms periodically. Continued use of Kqueue signifies acceptance of any changes.</p>

    <h5>10. Contact Information</h5>
    <p>For questions, contact us at support@kqueue.com.</p>
</div>
<Link to="/login" className="forgot-password-btn">Back to Login</Link>
          </div>
          <div className="right-section">
            <div className="welcome-message">
              Welcome to Kqueue, a queue management system for KMC Hospital. By
              registering or using our services, you agree to the following Terms & Conditions.
            </div>
            <div className="open-hour">
              <div className="info-row">
                <div className="info-header">
                  <div className="icon-container">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h3>Open hour</h3>
                </div>
                <div className="info-content">
                  <p>Monday to Friday: 08:00 a.m. - 18:00 p.m.</p>
                  <p>Saturday to Sunday: 09:00 a.m. - 12:00 p.m.</p>
                  <p>Public Holiday: 08:30 a.m. - 17:00 p.m.</p>
                </div>
              </div>
              <div className="contacts">
                <div className="info-row">
                  <div className="info-header">
                    <div className="icon-container">
                      <i className="fas fa-user"></i>
                    </div>
                    <h3>Contacts</h3>
                  </div>
                  <div className="info-content">
                    <p><i className="fab fa-facebook"></i> ศูนย์การแพทย์ สจล. KMITL Medical Center</p>
                    <p><i className="fas fa-globe"></i> <a href="https://kmchf-pp.org" target="_blank" rel="noopener noreferrer">https://kmchf-pp.org</a></p>
                    <p><i className="fas fa-phone"></i> 02 329 8143, 02 329 8000 - 3633</p>
                  </div>
                </div>
                <div className="location">
                  <div className="info-row">
                    <div className="info-header">
                      <div className="icon-container">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <h3>Location</h3>
                    </div>
                    <div className="info-content">
                      <p><span>Address:</span> 3 Thanon Chalong Krung, Lam Prathew, Lat Krabang, Bangkok 10520</p>
                      <p><span>Located at:</span>King Mongkut's Institute of<br />Technology Ladkrabang</p>
                    </div>
                  </div>
                </div>
                <div className="flexible-line">
                  kque.support@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;