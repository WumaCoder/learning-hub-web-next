import { watchEffect, reactive, unref } from "vue";

export function useStat(chart, labels, data) {
  const stat = reactive({
    labels: labels,
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ["#42A5F5", "#66BB6A"],
        hoverBackgroundColor: ["#64B5F6", "#81C784"],
      },
    ],
  });
  watchEffect(() => {
    unref(data).forEach((item, index) => (stat.datasets[0].data[index] = item));
    if (chart.value) chart.value.refresh();
  });
  return { stat };
}
