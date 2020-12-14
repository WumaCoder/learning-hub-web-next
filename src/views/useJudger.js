import { useStore } from "vuex";
import { reactive, unref } from "vue";
import { verify } from "tools/verify";
import { getJob } from "api/judger";
import { sleep } from "tools/promise";
import { useToast } from "primevue/usetoast";

export function useJudger(model, rules, judgeHandler) {
  const store = useStore();
  const toast = useToast();
  const resultMap = store.state.resultMap;
  const runState = reactive({
    show: false,
    padding: false,
    result: "OK",
    judgeTime: "",
    runTime: "",
    runMemory: "",
  });

  const submit = async () => {
    const verRes = verify(model, unref(rules));

    if (!verRes.isPass) {
      toast.add({
        severity: "warn",
        summary: "Form Error",
        detail: `form field '${verRes.field}' ${verRes.error}`,
        life: 3000,
      });
      return;
    }

    runState.show = false;
    runState.padding = true;

    const body = await unref(judgeHandler)(model);
    let runData = body.data;

    while (
      resultMap[runData.result] == "QUEUE" ||
      resultMap[runData.result] == "JUDGEING"
    ) {
      await sleep(1000);
      runData = await getJob(runData.job_id).then(
        (res) => res.data.returnvalue
      );
    }
    runState.padding = false;
    runState.show = true;
    runState.result = resultMap[runData.result];
    runState.judgeTime = runData.updated_at;
    runState.runTime = runData.data.time || "-";
    runState.runMemory = runData.data.memory || "-";
  };

  return { runState, submit };
}
