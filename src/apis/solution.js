import { http } from "tools/http";

export async function getSolution(problemId) {
  const res = await http.get(`/judger/api/v1/judger/solution/${problemId}`);
  return res.data;
}

export async function getSolutions(pageQuery = {}) {
  const res = await http.get(`/judger/api/v1/judger/solution`, {
    params: { ...pageQuery },
  });
  return res.data;
}
