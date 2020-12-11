<template>
  <p-dataTable
    :value="data"
    :lazy="isLazy"
    :paginator="true"
    :rowHover="true"
    :rows="page.pageSize"
    :rowsPerPageOptions="rowsPerPageOptions"
    :loading="isLoading"
    :totalRecords="page.count"
    :dataKey="dataKey"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    @page="onPage"
    @sort="onSort"
    @row-click="$emit('on-row-click', $event)"
  >
    <template #empty>
      No customers found.
    </template>
    <template #loading>
      Loading customers data. Please wait.
    </template>
    <!-- <template #paginatorLeft>
      <p-button type="button" icon="pi pi-refresh" class="p-button-text" />
    </template>
    <template #paginatorRight>
      <p-button type="button" icon="pi pi-cloud" class="p-button-text" />
    </template> -->
    <template v-for="(item, key) in column" :key="key">
      <p-column
        :field="key"
        :header="item.header"
        :sortable="item.sortable"
        :headerStyle="item.headerStyle"
      >
        <template #body="{data}">
          <component
            :is="item.is"
            :prop="{ key, column: item, row: data, rowItem: data[key] }"
            :[item.valueKey]="formatHandler(item.format, data[key])"
            v-text="formatHandler(item.format, data[key])"
          ></component>
        </template>
        <template v-if="isFilter" #filter>
          <p-inputText
            v-model="filter[key]"
            type="text"
            style="width:100%"
            :placeholder="'Search by ' + item.header"
            @input="onInput(key, filter[key])"
          />
        </template>
      </p-column>
    </template>
  </p-dataTable>
</template>

<script>
import Tags from "./Tags.vue";
import { useDebouncedRef } from "tools/use/useDebouncedRef";

/**
 * @prop {object} page 对象
 *  @prop {number} page.num 页码
 *  @prop {number} page.size 页大小
 * @prop {object} column.[field] 列信息对象,field是某一列的字段名
 *  @prop {enum['text', 'component']} column.[field].type 文本或自定义组件
 *  @prop {string} column.[field].is 组件名
 *  @prop {string} column.[field].header 标题
 *  @prop {string} column.[field].headerStyle 标题样式
 *  @prop {string} column.[field].sortable 是否开启排序
 *  @prop {string} column.[field].textTemplate 字符模板，可以使用*来代替当前字符的内容
 *  @prop {string} column.[field].valueKey Value的key
 *
 * @event onPage(page:object) page.pageNum, page.pageSize
 * @event onOrder(order:object) order.field, order.value
 * @event onRowClick($event)
 */
export default {
  props: {
    data: { default: () => [], type: Array },
    column: { default: () => ({}), type: Object },
    page: {
      default: () => ({ pageNum: 1, pageSize: 5, count: 0 }),
      type: Object,
    },
    dataKey: { default: "id", type: String },
    rowsPerPageOptions: {
      default: () => [10, 30, 50, 100],
      type: Array,
    },
    isLoading: Boolean,
    isLazy: Boolean,
    isFilter: Boolean,
  },
  emits: ["on-page", "on-order", "on-filter", "on-row-click"],
  components: packComponents({ Tags }),
  setup(props, { emit }) {
    const filter = useDebouncedRef({}, 500);
    const onPage = async (event) => {
      const pageNum = event.page + 1;
      const pageSize = event.rows;
      emit("on-page", { pageNum, pageSize });
    };

    const onSort = async (event) => {
      const field = event.sortField;
      const value = event.sortOrder === 1 ? "ASC" : "DESC";
      emit("on-order", { field, value });
    };

    const onInput = async (field, value) => {
      emit("on-filter", { field, value, model: "like" });
    };

    const formatHandler = (format = (v) => v, v) => {
      return format(v);
    };

    return {
      /**State */
      filter,

      /**Methods */
      formatHandler,

      /**Events */
      onPage,
      onSort,
      onInput,
    };
  },
};

function packComponents(components) {
  const prefix = "Tp";
  const comObj = {};
  const keys = Object.keys(components);
  keys.map((key) => {
    const component = components[key];
    component.props.prop = {
      type: Object,
      default: () => ({}),
    };
    component.props.textContent = null;
    comObj[prefix + key] = component;
  });
  return comObj;
}
</script>

<style lang="scss"></style>
