export default function JobCard({ job }) {
  return (
    <div className="job">
      <div className="row1">
        <div>
          <h3>{job.title}</h3>
          <div className="region">{job.region} · {job.ownerName || "Foydalanuvchi"}</div>
        </div>
        <div className="salary">{Number(job.salary || 0).toLocaleString("ru-RU")} so'm</div>
      </div>
      <div className="tags">
        <span className="tag">{job.cat}</span>
        <span className="tag">{job.type}</span>
      </div>
      <div className="desc">{job.desc}</div>
    </div>
  );
  }
