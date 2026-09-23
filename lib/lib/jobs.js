// Firestore bilan ishlash uchun yordamchi funksiyalar.
// Firestore'da "jobs" nomli collection ishlatiladi.
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const jobsCol = collection(db, "jobs");

export async function fetchJobs(filters = {}) {
  let q = query(jobsCol, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  let jobs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  if (filters.region) jobs = jobs.filter((j) => j.region === filters.region);
  if (filters.category) jobs = jobs.filter((j) => j.cat === filters.category);
  if (filters.minSalary) jobs = jobs.filter((j) => j.salary >= filters.minSalary);

  return jobs;
}

export async function createJob(job, ownerId) {
  return addDoc(jobsCol, {
    ...job,
    ownerId,
    createdAt: serverTimestamp(),
  });
}

export async function deleteJob(jobId) {
  return deleteDoc(doc(db, "jobs", jobId));
}

export async function fetchMyActiveJob(ownerId) {
  const q = query(jobsCol, where("ownerId", "==", ownerId));
  const snap = await getDocs(q);
  const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return docs[0] || null;
    }
