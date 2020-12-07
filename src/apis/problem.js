import { http } from "tools/http";

export async function getProblem(problemId) {
  const res = await http.get(`/judger/api/v1/problem/${problemId}`);
  return res.data;
}

export async function getProblems(pageQuery = {}) {
  const res = await http.get(`/judger/api/v1/problem`, {
    params: { ...pageQuery },
  });
  return res.data;
}
