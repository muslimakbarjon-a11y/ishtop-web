import { useEffect, useState } from "react";
import { fetchJobs } from "../lib/jobs";
import JobCard from "../components/JobCard";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs()
      .then((data) => setJobs(data.slice(0, 10)))
      .catch((e) => console.error("Ishlarni yuklashda xato:", e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="topbar">
        <h1>IshTop</h1>
        <div className="sub">Mahalliy ish e'lonlari</div>
      </div>
      <div className="container">
        {loading && <div className="empty">Yuklanmoqda...</div>}
        {!loading && jobs.length === 0 && (
          <div className="empty">
            Hozircha e'lon yo'q. Firebase loyihangizni sozlab, "jobs" collection'ga
            ma'lumot qo'shing.
          </div>
        )}
        {jobs.map((j) => (
          <JobCard key={j.id} job={j} />
        ))}
      </div>
    </>
  );
        }
