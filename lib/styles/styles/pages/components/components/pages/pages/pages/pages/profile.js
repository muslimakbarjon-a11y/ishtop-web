import { useEffect, useState } from "react";
import { fetchMyActiveJob, deleteJob } from "../lib/jobs";
import { auth } from "../lib/firebase";
import JobCard from "../components/JobCard";

export default function Profile() {
  const [myJob, setMyJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ownerId = auth.currentUser?.uid || "anonim";
    fetchMyActiveJob(ownerId)
      .then(setMyJob)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  async function handleClose() {
    if (!myJob) return;
    await deleteJob(myJob.id);
    setMyJob(null);
  }

  return (
    <>
      <div className="topbar">
        <h1>Profil</h1>
        <div className="sub">Sizning faoliyatingiz</div>
      </div>
      <div className="container">
        <h3 style={{ marginBottom: 12 }}>Mening e'lonim</h3>
        {loading && <div className="empty">Yuklanmoqda...</div>}
        {!loading && !myJob && <div className="empty">Sizda faol e'lon yo'q.</div>}
        {myJob && (
          <>
            <JobCard job={myJob} />
            <button className="btn" onClick={handleClose}>E'lonni yopish</button>
          </>
        )}
      </div>
    </>
  );
          }
