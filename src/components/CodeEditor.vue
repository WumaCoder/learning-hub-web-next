<template>
  <div ref="code"></div>
</template>

<script>
import { onMounted, ref } from "vue";

import { keymap } from "@codemirror/next/view";
import { EditorView, basicSetup } from "@codemirror/next/basic-setup";
import { EditorState, tagExtension } from "@codemirror/next/state";
import { defaultKeymap } from "@codemirror/next/commands";
import { cpp } from "@codemirror/next/lang-cpp";
import { java } from "@codemirror/next/lang-java";
import { python } from "@codemirror/next/lang-python";

const languageTag = "lang";

export default {
  props: {
    modelValue: String,
    lang: String,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { code, clear } = useCodemirror(props, { emit });
    return {
      code,
      clear,
    };
  },
};

function useCodemirror(props, { emit = () => null } = {}) {
  const code = ref();
  const langList = {
    c: cpp,
    cpp: cpp,
    java: java,
    py2: python,
    py3: python,
  };
  const langExt = EditorState.transactionFilter.of((tr) => {
    return [
      tr,
      {
        reconfigure: {
          [languageTag]: langList[props.lang](),
        },
      },
    ];
  });

  const codeView = new EditorView({
    state: EditorState.create({
      doc: props.modelValue,
      extensions: [
        basicSetup,
        keymap(defaultKeymap),
        tagExtension(languageTag, cpp()),
        langExt,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            emit("update:modelValue", update.state.doc.toString());
          }
        }),
      ],
    }),
  });

  // /** style */
  codeView.dom.style["height"] = "400px";
  codeView.dom.style["outline"] = "0";

  /** life */
  onMounted(() => {
    code.value.appendChild(codeView.dom);
  });

  const clear = () => {
    const tr = codeView.state.update({
      changes: {
        to: codeView.state.doc.length,
        from: 0,
        insert: "",
      },
    });
    codeView.dispatch(tr);
  };

  return {
    code,
    clear,
  };
}
</script>
