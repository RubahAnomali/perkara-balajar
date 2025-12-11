import { useState } from 'react';

function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: replace with actual backend / email service.
    console.log('Form submission', form);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section" aria-label="Contact form">
      <h2 className="section-title">Let's Work Together</h2>
      <p className="section-subtitle">
        I'm currently available for freelance projects and full-time opportunities. 
        Let's discuss how we can work together.
      </p>
      <div className="contact-wrapper">
        <form onSubmit={onSubmit} className="contact-form" aria-live="polite">
          <label>
            <span>Name</span>
            <input name="name" value={form.name} onChange={onChange} required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" value={form.email} onChange={onChange} required />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" value={form.message} onChange={onChange} rows={5} required />
          </label>
          <button className="button primary" type="submit">Send Message</button>
          {sent && <div className="sent-note" role="status">Message sent successfully ✔</div>}
        </form>
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <div className="alt-contacts">
            <a href="mailto:farrellfyelo@gmail.com" className="contact-link">
              <span className="icon">📧</span>
              <span>farrellfyelo@gmail.com</span>
            </a>
            <a href="https://github.com/girene646-laso" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="icon">💻</span>
              <span>GitHub</span>
            </a>
            <a href="https://www.instagram.com/prlpyl/" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="icon">📱</span>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
