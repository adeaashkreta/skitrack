/*  ──────────────────────────────────────────────────────────────
    src/pages/InsertUser.jsx
    ────────────────────────────────────────────────────────────── */
import { useState } from 'react';
import '../assets/css/form.css';

export default function InsertUser() {
  /* --------------------------- state -------------------------- */
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    birthDate: '',
    role: ''              // optional in UI, required only if you choose it
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // success / error message

  /* --------------------------- regex -------------------------- */
  const nameRe   = /^[A-Za-zÀ-ÿ' -]{2,}$/;
  const emailRe  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe  = /^\d{8,15}$/;           // optional, 8–15 digits when present

  /* ------------------------- validate ------------------------- */
  const validate = () => {
    const e = {};
    if (!nameRe.test(form.firstName))   e.firstName = 'Invalid first name';
    if (!nameRe.test(form.lastName))    e.lastName  = 'Invalid last name';
    if (!emailRe.test(form.email))      e.email     = 'Invalid e-mail';
    if (form.password.length < 8 || form.password.length > 20)
      e.password = 'Password 8-20 chars';
    /* phone is OPTIONAL – only validate if user typed something */
    if (form.phoneNumber && !phoneRe.test(form.phoneNumber))
      e.phoneNumber = 'Phone 8-15 digits';
    if (form.birthDate === '')          e.birthDate = 'Choose a date';
    /* role is optional here – back-end will default if omitted   */
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* -------------------------- submit -------------------------- */
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setStatus(null);
    if (!validate()) return;

    /* strip empty fields so the API gets only what’s filled in */
    const payload = Object.fromEntries(
      Object.entries(form).filter(([, v]) => v !== '')
    );

    try {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error((await res.json()).message || 'Server error');
      setStatus({ ok: true, msg: '✅ User inserted successfully!' });
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        birthDate: '',
        role: ''
      });
    } catch (err) {
      setStatus({ ok: false, msg: `❌ ${err.message}` });
    }
  };

  /* --------------------------- render ------------------------- */
  const f = form;            // shorthand
  const e = errors;

  return (
    <div className="insertuser-container">
      <div className="insertuser-form-box">
        <form onSubmit={handleSubmit} noValidate>
          <h1>Add a User</h1>

          <div className="insertuser-input-group">
            {/* ----------- left column ----------- */}
            <div className="insertuser-input-group-left">
              {[
                ['firstName',  'First Name',     f.firstName],
                ['lastName',   'Last Name',      f.lastName],
                ['email',      'Email',          f.email],
                ['password',   'Password',       f.password, 'password']
              ].map(([name, ph, val, type = 'text']) => (
                <div className="insertuser-input-field" key={name}>
                  <input
                    type={type}
                    placeholder={ph}
                    value={val}
                    onChange={(ev) => setForm({ ...form, [name]: ev.target.value })}
                  />
                  {e[name] && <div className="insertuser-error-message">{e[name]}</div>}
                </div>
              ))}
            </div>

            {/* ----------- right column ---------- */}
            <div className="insertuser-input-group-right">
              {[
                ['phoneNumber', 'Phone Number', f.phoneNumber],
                ['birthDate',   'Birth Date',   f.birthDate, 'date'],
                ['role',        'Role (optional – e.g. admin / user)', f.role]
              ].map(([name, ph, val, type = 'text']) => (
                <div className="insertuser-input-field" key={name}>
                  <input
                    type={type}
                    placeholder={ph}
                    value={val}
                    onChange={(ev) => setForm({ ...form, [name]: ev.target.value })}
                  />
                  {e[name] && <div className="insertuser-error-message">{e[name]}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* ----------- submit & message ------- */}
          <div className="insertuser-btn-group">
            <button type="submit" className="insertuser-btn">
              Submit
            </button>
          </div>
          {status && (
            <p style={{ color: status.ok ? 'green' : 'red', marginTop: 4 }}>
              {status.msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
