import { useState } from 'react';

export default function ContactSection() {
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
      <h2 className="section-title">Contact</h2>
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
          <button className="button primary" type="submit">Send</button>
          {sent && <div className="sent-note" role="status">Message queued ✔</div>}
        </form>
        <div className="alt-contacts">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=farrellfyelo@gmail.com" target="_blank" rel="noopener noreferrer">farrellfyelo@gmail.com</a>
          <a href="https://github.com/girene646-laso" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.instagram.com/prlpyl/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        </div>
      </div>
    </section>
  );
}
