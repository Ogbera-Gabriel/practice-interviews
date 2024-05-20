import { useState, useEffect } from "react";
import "./jobs.css";

interface Job {
  id: number;
  title: string;
  type: string;
  score: number;
  time: number;
  url: string;
  by: string;
}

const fetchIdURL = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const Jobs = () => {
  const [page, setPage] = useState(0);
  const [jobsInfo, setJobsInfo] = useState<Job[]>([]);
  const [endPage, setEndPage] = useState(false);

  const fetchIds = async () => {
    const response = await fetch(fetchIdURL);
    const ids = await response.json();
    const sliceIds = ids.slice(page * 6, page * 6 + 6);
    if(sliceIds.length < 6) {
        setEndPage(true);
    }
    fetchJobInfo(sliceIds);
    
  };

  const fetchJobInfo = async (ids: number[]) => {
    const response = await Promise.all(
      ids.map((id: any) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      )
    );
    const jobInfo = await Promise.all(response.map((res: any) => res.json()));
    setJobsInfo((prev) => [...prev,...jobInfo]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchIds();
  }, []);

  return (
    <div>
      <h1>Hacker News Jobs Board</h1>
      <div className="job-wrapper">
        {jobsInfo.map((job: Job, index: number) => (
          <div key={index} className="jobs-wrapper">
            <h3>{job.url ? <a href={job.url}>{job.title}</a> : job.title}</h3>
            <div className="job-info">
              <p> By {job.by}</p> -
              <p>{new Date(job.time * 1000).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      {!endPage &&<button onClick={fetchIds}>Load more jobs</button>}
    </div>
  );
};

export default Jobs;
