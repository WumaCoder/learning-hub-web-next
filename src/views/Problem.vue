<template>
  <h2 class="p-ml-2" v-text="problem.title"></h2>
  <div class="p-grid">
    <div class="p-col-9">
      <p-panel
        v-if="problem.description"
        class="p-mt-2 p-text-truncate"
        header="Description"
      >
        <div class="text-pre-wrap" v-text="problem.description"></div>
      </p-panel>
      <p-panel v-if="problem.data.input" class="p-mt-2" header="Input">
        <div class="text-pre-wrap" v-text="problem.data.input"></div>
      </p-panel>
      <p-panel v-if="problem.data.output" class="p-mt-2" header="Output">
        <div class="text-pre-wrap" v-text="problem.data.output"></div>
      </p-panel>
      <p-panel
        v-if="problem.data.sample_input"
        class="p-mt-2"
        header="Sample Input"
      >
        <div class="text-pre-wrap" v-text="problem.data.sample_input"></div>
      </p-panel>
      <p-panel
        v-if="problem.data.sample_output"
        class="p-mt-2"
        header="Sample Output"
      >
        <div class="text-pre-wrap" v-text="problem.data.sample_output"></div>
      </p-panel>
      <p-panel v-if="problem.type === 'code'" class="p-mt-2" header="Code">
        <run-state-part :run-state="runState"></run-state-part>
        <hr v-if="runState.show" size="1" color="#dee2e6" />
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
              <i
                v-show="runState.padding"
                class="pi pi-spin pi-spinner p-mr-1"
              ></i>
              {{ runState.padding ? "Pinding..." : "Submit !" }}
            </p-button>
          </div>
        </div>
        <code-editor
          v-model="model.src"
          :lang="model.lang"
          ref="editor"
        ></code-editor>
      </p-panel>
      <p-panel v-if="problem.type === 'fill'" class="p-mt-2" header="Answer">
        <p-input-text v-model="model.answer" />
        <p-button
          class="p-ml-2"
          @click="onClickSubmit"
          :disabled="runState.padding"
        >
          <p-progress-spinner
            v-show="runState.padding"
            style="width: 15px; height: 15px"
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
      <p-panel v-if="problem.type === 'single'" class="p-mt-2" header="Option">
        <div
          v-for="(item, index) in problem.data.options"
          :key="index"
          class="p-field-radiobutton"
        >
          <p-radio-button :id="item" :value="item" v-model="model.answer" />
          <label :for="item">{{ item }}</label>
        </div>
        <p-button @click="onClickSubmit" :disabled="runState.padding">
          <p-progress-spinner
            v-show="runState.padding"
            style="width: 15px; height: 15px"
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
      <p-panel v-if="problem.type === 'multi'" class="p-mt-2" header="Option">
        <div
          v-for="(item, index) in problem.data.options"
          :key="index"
          class="p-field-radiobutton"
        >
          <p-checkbox :id="item" :value="item" v-model="model.answers" />
          <label :for="item">{{ item }}</label>
        </div>
        <p-button @click="onClickSubmit" :disabled="runState.padding">
          <p-progress-spinner
            v-show="runState.padding"
            style="width: 15px; height: 15px"
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
        Hint: {{ problem.hint }}
      </p>
    </div>
    <div class="p-col-3 p-mt-2">
      <p-fieldset legend="Info">
        <problem-info-part :problem="problem"></problem-info-part>
      </p-fieldset>
      <p-fieldset legend="Stat" class="p-mt-3">
        <p-chart ref="chart" type="pie" :data="stat" />
      </p-fieldset>
    </div>
  </div>
</template>

<script setup>
import CodeEditor from "component/CodeEditor.vue";
import ProblemInfoPart from "component/ProblemInfoPart.vue";
import RunStatePart from "component/RunStatePart.vue";

import { judgeCode, judgeFill, judgeMulti, judgeSingle } from "api/judger";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getProblem } from "api/problem";
import { useJudger } from "./useJudger";
import { useQuery } from "./useQuery";
import { useStat } from "./useStat";

const store = useStore();
const route = useRoute();

const chart = ref(null);
const editor = ref(null);

const langs = store.state.langs;

const routeArgs = {
  problemId: route.params.problemId,
  gourpId: route.query.gourpId,
  groupProblemId: route.query.groupProblemId,
};

const ruleType = {
  code: {
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
  },
  fill: {
    problemId: {
      type: "string",
      required: true,
    },
    answer: {
      type: "string",
      required: true,
    },
  },
  single: {
    problemId: {
      type: "string",
      required: true,
    },
    answer: {
      type: "string",
      required: true,
    },
  },
  multi: {
    problemId: {
      type: "string",
      required: true,
    },
    answers: {
      type: "object",
      required: true,
    },
  },
};

const requestType = {
  code: judgeCode,
  fill: judgeFill,
  single: judgeSingle,
  multi: judgeMulti,
};

const model = reactive(Object.assign({}, routeArgs));

const { data: problem } = useQuery(getProblem, model.problemId);

const { runState, submit: onClickSubmit } = useJudger(
  model,
  computed(() => ruleType[problem.type]),
  computed(() => requestType[problem.type])
);

const { stat } = useStat(
  chart,
  ["Submit Count", "AC Count"],
  computed(() => [problem.submit_num, problem.ac_num])
);

/** Events */
function onClickClear() {
  editor.value.clear();
}
</script>
