<template>
  <p-toast position="bottom-center" />
  <div>
    <h3 v-text="problem.title"></h3>
  </div>
  <div class="p-grid">
    <div class="p-col-9">
      <p-panel
        v-if="problem.description"
        class="p-mt-2 p-text-truncate"
        header="Description"
      >
        <div class="text-pre-wrap" v-text="problem.description"></div>
      </p-panel>
      <p-panel v-if="problem.data" class="p-mt-2" header="Answer">
        <p-input-text v-model="model.answer" />
        <p-button
          class="p-ml-2"
          @click="onClickSubmit"
          :disabled="runState.padding"
        >
          <p-progress-spinner
            v-show="runState.padding"
            style="width:15px;height:15px"
            strokeWidth="4"
            animationDuration=".5s"
          />
          {{ runState.padding ? "Pinding..." : "Submit !" }}
        </p-button>
        <transition-group name="p-message" tag="div">
          <p-message
            v-if="runState.show"
            :severity="runState.result === 'OK' ? 'success' : 'error'"
            >{{ runState.result }}
          </p-message>
        </transition-group>
      </p-panel>
      <p v-if="problem.hint" class="p-text-center p-text-light">
        Tips: {{ problem.hint }}
      </p>
    </div>
    <div class="p-col-3">
      <p-fieldset legend="Info">
        <div class="p-grid">
          <div class="p-col-4">ID</div>
          <div class="p-col-8">#{{ problem.id }}</div>
        </div>
        <div class="p-grid">
          <div class="p-col-4">Type</div>
          <div class="p-col-8" v-text="problem.type"></div>
        </div>
        <div class="p-grid">
          <div class="p-col-4">Hard</div>
          <div class="p-col-8" v-text="problem.hard"></div>
        </div>
        <div class="p-grid">
          <div class="p-col-4">Source</div>
          <div class="p-col-8" v-text="problem.source"></div>
        </div>
        <div class="p-grid">
          <div class="p-col-4">Created By</div>
          <div
            class="p-col-8"
            v-text="problem.create_user_id || '超级管理员'"
          ></div>
        </div>
        <div class="p-grid">
          <div class="p-col-4">Tags</div>
          <div class="p-col-8">
            <tags :list="problem.tags"></tags>
          </div>
        </div>
      </p-fieldset>
      <p-fieldset legend="Stat" class="p-mt-3">
        <p-chart ref="chart" type="pie" :data="stat" />
      </p-fieldset>
    </div>
  </div>
</template>

<script>
import Tags from "component/Tags.vue";
import { getJob, judgeFill } from "api/judger";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getProblem } from "api/problem";
import { sleep } from "tools/promise";
import { verify } from "tools/verify";
import { useToast } from "primevue/usetoast";

export default {
  components: { Tags },
  setup() {
    const store = useStore();
    const route = useRoute();
    const toast = useToast();

    const resultMap = store.state.resultMap;
    const runState = reactive({
      show: false,
      padding: false,
      result: "OK",
      judgeTime: "",
    });

    const problem = reactive({
      title: "Loading...",
      description: "Loading...",
      is_disabled: false,
      hint: "Loading...",
      source: "Loading...",
      tags: [],
      hard: 10,
      data: {
        options: [],
      },
      type: "",
      create_user_id: 0,
      deleted_at: null,
      id: 7,
      created_at: "2020-11-23T05:35:06.212Z",
      updated_at: "2020-11-23T05:35:06.212Z",
      ac_num: 0,
      submit_num: 0,
    });

    const chart = ref();
    const stat = reactive({
      labels: ["Submit Count", "AC Count"],
      datasets: [
        {
          data: [100, 50],
          backgroundColor: ["#42A5F5", "#66BB6A"],
          hoverBackgroundColor: ["#64B5F6", "#81C784"],
        },
      ],
    });

    const model = reactive({
      problemId: 0,
      gourpId: 0,
      groupProblemId: 0,
      answer: "",
    });

    /**event handler */
    const onClickSubmit = async () => {
      model.problemId = route.query.problemId;
      model.gourpId = route.query.gourpId;
      model.groupProblemId = route.query.groupProblemId;

      const verRes = verify(model, {
        problemId: {
          type: "string",
          required: true,
        },
        answer: {
          type: "string",
          required: true,
        },
      });

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

      const body = await judgeFill(model);
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
    };

    /**left handler */
    onMounted(async () => {
      model.problemId = route.query.problemId;
      const res = await getProblem(model.problemId);
      stat.datasets[0].data[0] = res.data.submit_num | 1;
      stat.datasets[0].data[1] = res.data.ac_num | 1;
      chart.value.refresh();
      Object.assign(problem, res.data);
    });

    return {
      chart,
      runState,
      model,
      stat,
      problem,

      onClickSubmit,
    };
  },
};
</script>
