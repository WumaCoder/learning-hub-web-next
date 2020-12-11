import { http } from "tools/http";

export async function judgeCode({
  problemId,
  src = "",
  lang = "cpp",
  isOutput = false,
} = {}) {
  problemId = parseInt(problemId);
  const res = await http.post("/judger/api/v1/judger/code", {
    problemId,
    src,
    lang,
    isOutput,
  });

  return res.data;
}

export async function judgeSingle({ problemId, answer } = {}) {
  problemId = parseInt(problemId);
  const res = await http.post("/judger/api/v1/judger/single", {
    problemId,
    answer,
  });

  return res.data;
}

export async function judgeFill({ problemId, answer } = {}) {
  problemId = parseInt(problemId);
  const res = await http.post("/judger/api/v1/judger/fill", {
    problemId,
    answer,
  });

  return res.data;
}

export async function judgeMulti({ problemId, answers } = {}) {
  problemId = parseInt(problemId);
  const res = await http.post("/judger/api/v1/judger/multi", {
    problemId,
    answers,
  });

  return res.data;
}

export async function getJob(jobId) {
  const res = await http.get("/judger/api/v1/judger/job/" + jobId);
  return res.data;
}
