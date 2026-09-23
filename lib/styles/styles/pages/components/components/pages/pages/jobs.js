import { useEffect, useState } from "react";
import { fetchJobs } from "../lib/jobs";
import JobCard from "../components/JobCard";

const REGIONS = ["Andijon", "Farg'ona", "Namangan", "Toshkent", "Samarqand", "Buxoro"];
const CATS = ["Qurilish", "Xizmat ko'rsatish", "IT", "Uy ishlari"];

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [minSalary, setMinSalary] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchJobs({ region, category, minSalary })
      .then(setJobs)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [region, category, minSalary]);

  return (
    <>
      <div className="topbar">
        <h1>Mavjud ishlar</h1>
        <div className="sub">Filtrlab qidiring</div>
      </div>
      <div className="container">
        <div className="field">
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">Barcha viloyatlar</option>
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="field">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Barcha kategoriyalar</option>
            {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <select value={minSalary} onChange={(e) => setMinSalary(Number(e.target.value))}>
            <option value={0}>Maosh — barchasi</option>
            <option value={1000000}>1 000 000 so'mdan yuqori</option>
            <option value={2000000}>2 000 000 so'mdan yuqori</option>
            <option value={3000000}>3 000 000 so'mdan yuqori</option>
          </select>
        </div>

        {loading && <div className="empty">Yuklanmoqda...</div>}
        {!loading && jobs.length === 0 && <div className="empty">Bu filtrga mos e'lon topilmadi</div>}
        {jobs.map((j) => <JobCard key={j.id} job={j} />)}
      </div>
    </>
  );
               }
