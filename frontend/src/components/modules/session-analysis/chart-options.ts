export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
    },
  },
  scales: {
    y: {
      grid: {
        display: false
      },
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}

export const labels = ['Decrease', 'No change (<0.1%)', 'Increase'];

export const timePeriodName = ['Week', '2 Weeks', 'Month', 'Quarter', '6 Months', 'Year'];

export const getData = (data: Number[]) => {
  return {
    labels,
    datasets: [
      {
        label: ``,
        data: data,
        backgroundColor: ['#FA4E4E', '#4EB3FF', '#1DC14E'],
      }
    ],
  }
};