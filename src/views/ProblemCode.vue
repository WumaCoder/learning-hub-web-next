<template>
  <p-toast position="bottom-center" />
  <div>
    <h3 v-text="problem.title"></h3>
    <span>Memory Limit:</span> <span>{{ problem.data.memory_limit }}B</span>
    &nbsp;
    <span>Time Limit:</span><span>{{ problem.data.time_limit }}ms</span>
  </div>
  <div class="p-grid">
    <div class="p-col-9">
      <p-panel class="p-mt-2 p-text-truncate" header="Description">
        <div class="text-pre-wrap" v-text="problem.description"></div>
      </p-panel>
      <p-panel class="p-mt-2" header="Input">
        <div class="text-pre-wrap" v-text="problem.data.input"></div>
      </p-panel>
      <p-panel class="p-mt-2" header="Output">
        <div class="text-pre-wrap" v-text="problem.data.output"></div>
      </p-panel>
      <p-panel class="p-mt-2" header="Sample Input">
        <div class="text-pre-wrap" v-text="problem.data.sample_input"></div>
      </p-panel>
      <p-panel class="p-mt-2" header="Sample Output">
        <div class="text-pre-wrap" v-text="problem.data.sample_output"></div>
      </p-panel>
      <p-panel class="p-mt-2" header="Hint">
        <div class="text-pre-wrap" v-text="problem.hint"></div>
      </p-panel>
      <p-panel class="p-mt-2" header="Source">
        <div class="text-pre-wrap" v-text="problem.source"></div>
      </p-panel>
      <p-panel class="p-mt-2" header="Code">
        <div class="p-d-flex p-jc-between">
          <div>
            <p-dropdown
              v-model="model.lang"
              :options="langs"
              placeholder="Select a Lang"
              class="p-mb-1"
            ></p-dropdown>
          </div>
          <div>
            <p-button
              class="p-button-sm p-mr-2 p-button-danger"
              @click="onClickClear"
              >Clear</p-button
            >
            <p-button
              :disabled="runState.padding"
              class="p-button-sm"
              @click="onClickSubmit"
            >
              <p-progress-spinner
                v-show="runState.padding"
                style="width:15px;height:15px"
                strokeWidth="4"
                animationDuration=".5s"
              />
              {{ runState.padding ? "Pinding..." : "Submit !" }}
            </p-button>
          </div>
        </div>
        <code-editor
          v-model="model.src"
          :lang="model.lang"
          ref="editor"
        ></code-editor>
        <div v-show="runState.show" class="p-grid p-mt-3">
          <div class="p-col-6">
            Result:
            <span
              class="p-tag"
              :class="[
                { OK: 'p-tag-success', QUEUE: 'p-tag-primary' }[
                  runState.result
                ] || 'p-tag-danger',
              ]"
              >{{ runState.result }}</span
            >
          </div>
          <div class="p-col-6">Judge Time: {{ runState.judgeTime }}</div>
          <div class="p-col-6">Run Time: {{ runState.runTime }}ms</div>
          <div class="p-col-6">Run Memory: {{ runState.runMemory }}B</div>
        </div>
      </p-panel>
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
        <p-chart type="pie" :data="stat" />
      </p-fieldset>
    </div>
  </div>
</template>

<script>
import Tags from "component/Tags.vue";
import CodeEditor from "component/CodeEditor.vue";
import { getJob, judgeCode } from "api/judger";
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getProblem } from "api/problem";
import { sleep } from "tools/promise";
import { verify } from "tools/verify";
import { useToast } from "primevue/usetoast";

export default {
  components: { Tags, CodeEditor },
  setup() {
    const store = useStore();
    const route = useRoute();
    const toast = useToast();

    const editor = ref();
    const langs = computed(() => store.state.langs);
    const resultMap = store.state.resultMap;
    const runState = reactive({
      show: false,
      padding: false,
      result: "OK",
      judgeTime: "",
      runTime: "",
      runMemory: "",
    });

    const problem = reactive({
      title: "A+B",
      description: "测试题",
      is_disabled: false,
      hint: "测试题目",
      source: "LH",
      tags: ["算法", "数据结构"],
      hard: 10,
      data: {
        input: "输入两个数",
        output: "输出他的结果",
        sample_input: "1 2",
        sample_output: "3\n",
        time_limit: 1000,
        memory_limit: 134217728,
        src:
          '#include "stdio.h"\n\nint main(){\n  int a,b;\n  while(scanf("%d%d", &a, &b)!=EOF){\n    printf("%d\\n", a+b);\n  }\n  return 0;\n}',
      },
      type: "code",
      create_user_id: 0,
      deleted_at: null,
      id: 7,
      created_at: "2020-11-23T05:35:06.212Z",
      updated_at: "2020-11-23T05:35:06.212Z",
      ac_num: 0,
      submit_num: 0,
    });

    const stat = reactive({
      labels: ["Submit Count", "AC Count"],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: ["#42A5F5", "#66BB6A"],
          hoverBackgroundColor: ["#64B5F6", "#81C784"],
        },
      ],
    });

    const model = reactive({
      problemId: 0,
      gourpId: 0,
      groupProblemId: 0,
      src: "",
      lang: "cpp",
    });

    const onClickSubmit = async () => {
      model.problemId = route.query.problemId;
      model.gourpId = route.query.gourpId;
      model.groupProblemId = route.query.groupProblemId;

      const verRes = verify(model, {
        problemId: {
          type: "string",
          required: true,
        },
        lang: {
          type: "string",
          required: true,
        },
        src: {
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

      const body = await judgeCode(model);
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

    const onClickClear = () => {
      editor.value.clear();
    };

    onMounted(async () => {
      model.problemId = route.query.problemId;
      const res = await getProblem(model.problemId);
      Object.assign(problem, res.data);
    });

    return {
      editor,

      langs,
      runState,
      model,
      stat,
      problem,

      onClickClear,
      onClickSubmit,
    };
  },
};
</script>

<style lang="scss">
.text {
  &-pre-wrap {
    white-space: pre-wrap;
  }
}
</style>
