import { useState } from "react";
import { createJob } from "../lib/jobs";
import { auth } from "../lib/firebase";

const REGIONS = ["Andijon", "Farg'ona", "Namangan", "Toshkent", "Samarqand", "Buxoro"];
const CATS = ["Qurilish", "Xizmat ko'rsatish", "IT", "Uy ishlari"];

export default function Post() {
  const [form, setForm] = useState({
    title: "", region: REGIONS[0], cat: CATS[0], addr: "",
    desc: "", salary: "", type: "Kunlik",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const valid = form.title.trim() && form.addr.trim() && form.desc.trim() && form.salary;

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    if (!valid) return;
    setSubmitting(true);
    try {
      // auth.currentUser bo'lishi uchun avval kirish (login) sozlanishi kerak.
      const ownerId = auth.currentUser?.uid || "anonim";
      await createJob(
        {
          title: form.title.trim(),
          region: form.region,
          cat: form.cat,
          salary: Number(form.salary),
          type: form.type,
          desc: `${form.desc.trim()} (Manzil: ${form.addr.trim()})`,
        },
        ownerId
      );
      setDone(true);
    } catch (e) {
      console.error("E'lon joylashda xato:", e);
      alert("Xatolik yuz berdi. Firebase sozlamalarini tekshiring.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <>
        <div className="topbar"><h1>E'lon berish</h1></div>
        <div className="container">
          <div className="empty">E'lon joylandi. Uni "Ishlar" bo'limidan ko'rishingiz mumkin.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="topbar">
        <h1>E'lon berish</h1>
        <div className="sub">Ishingizni e'lon qiling</div>
      </div>
      <div className="container">
        <div className="field">
          <label>Sarlavha</label>
          <input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Masalan: Santexnik kerak" />
        </div>
        <div className="field">
          <label>Viloyat</label>
          <select value={form.region} onChange={(e) => update("region", e.target.value)}>
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Kategoriya</label>
          <select value={form.cat} onChange={(e) => update("cat", e.target.value)}>
            {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Aniq manzil</label>
          <input value={form.addr} onChange={(e) => update("addr", e.target.value)} placeholder="Tuman, mahalla" />
        </div>
        <div className="field">
          <label>Ish tavsifi va talablar</label>
          <textarea rows={4} value={form.desc} onChange={(e) => update("desc", e.target.value)} placeholder="Tajriba, yosh chegarasi va boshqa shartlar" />
        </div>
        <div className="field">
          <label>Maosh (so'm)</label>
          <input type="number" value={form.salary} onChange={(e) => update("salary", e.target.value)} placeholder="2000000" />
        </div>
        <div className="field">
          <label>Ish turi</label>
          <select value={form.type} onChange={(e) => update("type", e.target.value)}>
            <option>Kunlik</option><option>Doimiy</option><option>Haftalik</option><option>Loyihaviy</option>
          </select>
        </div>
        <button className="submit" disabled={!valid || submitting} onClick={handleSubmit}>
          {submitting ? "Yuklanmoqda..." : "E'lon berish"}
        </button>
      </div>
    </>
  );
}
