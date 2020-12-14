import { reactive } from "vue";

export function useQuery(handler, ...args) {
  const data = reactive({
    title: "加载中...",
    description: "加载中...",
    is_disabled: false,
    hint: "",
    source: "",
    tags: [],
    hard: 0,
    data: {},
    type: "",
    create_user_id: 0,
    deleted_at: null,
    id: 7,
    created_at: "2020-11-23T05:35:06.212Z",
    updated_at: "2020-11-23T05:35:06.212Z",
    ac_num: 0,
    submit_num: 0,
  });

  handler(...args).then((res) => Object.assign(data, res.data));

  return { data };
}
