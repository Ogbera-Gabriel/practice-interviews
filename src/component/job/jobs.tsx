import { useState, useEffect } from "react";
import "./jobs.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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

 
  // const fetchJobInfo = async (ids: number[]) => {
  //   const jobInfo: Job[] = [];

  //   for (const id of ids) {
  //     try {
  //       const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  //       const data = await response.json();
  //       jobInfo.push(data);
  //     } catch (error) {
  //       console.error(`Error fetching job info for ID ${id}:`, error);
  //     }
  //   }

  //   setJobsInfo((prev) => [...prev, ...jobInfo]);
  //   setPage((prev) => prev + 1);
  // }

  const fetchJobInfo = async (ids: number[]) => {
    try {
      const jobInfoPromises = ids.map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
      );
  
      const jobInfo = await Promise.all(jobInfoPromises);
      setJobsInfo((prev) => [...prev,...jobInfo]);
      setPage((prev) => prev + 1);
    } catch (error) {
      toast.error('Error fetching job info:');
    }
  };

  useEffect(() => {
    fetchIds();
  }, []);

  return (
    <div>
      <div>
      <Link to="/">HomePage</Link>
      </div>
      <h1 style={{color: "orange"}}>Hacker News Jobs Board</h1>
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
      {!endPage &&<button style={{backgroundColor: "orange"}} onClick={fetchIds}>Load more jobs</button>}
    </div>
  );
};

export default Jobs;
