<template>
  <p-dataTable
    :value="list"
    :lazy="true"
    :paginator="true"
    :rowHover="true"
    :rows="page.size"
    :rowsPerPageOptions="[1, 2, 5, 10, 30, 50, 100]"
    :loading="isLoading"
    :totalRecords="page.count"
    dataKey="id"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    @page="onPage"
    @sort="onSort"
    @row-click="$emit('on-row-click', $event)"
  >
    <!-- <template #header> </template> -->
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

    <p-column field="id" header="ID" :sortable="true" headerStyle="width: 6em">
      <template #body="{data}"> #{{ data.id }} </template>
    </p-column>
    <p-column
      field="type"
      header="Type"
      :sortable="true"
      headerStyle="width: 6em"
    ></p-column>
    <p-column
      field="title"
      header="Title"
      :sortable="true"
      headerStyle="width: 20em"
    ></p-column>
    <p-column field="tags" header="tags" :sortable="true">
      <template #body="{data}">
        <tags :list="data.tags"></tags>
      </template>
    </p-column>
    <p-column
      field="hard"
      header="hard"
      :sortable="true"
      headerStyle="width: 6em"
    ></p-column>
    <p-column
      field="submit_num"
      header="Total"
      :sortable="true"
      headerStyle="width: 6em"
    ></p-column>
    <p-column
      field="ac_num"
      header="AC"
      :sortable="true"
      headerStyle="width: 6em"
    ></p-column>
  </p-dataTable>
</template>

<script>
import Tags from "./Tags.vue";

export default {
  props: {
    list: Array,
    page: Object,
    isLoading: Boolean,
  },
  emits: ["on-change", "on-row-click"],
  components: { Tags },
  setup(props, { emit }) {
    const onPage = (event) => {
      emit("on-change", { pageNum: event.page + 1, pageSize: event.rows });
    };
    const onSort = (event) => {
      emit(
        "on-change",
        {
          pageNum: props.page.num,
          pageSize: props.page.size,
        },
        {
          field: event.sortField,
          value: event.sortOrder === 1 ? "ASC" : "DESC",
        }
      );
    };

    return { onPage, onSort };
  },
};
</script>

<style lang="scss"></style>
