export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: ({raw}: any) => `${raw}%`
      }
    }
  },
  scales:{
      y: {
        grid:{
            display: false
        },
        ticks: {
          callback: (value: any) => `${value}%`
        }
      },
      x: {
        grid:{
            display: false
        }
      }       
  },
}

export const timePeriodName = ['Miesiąc', 'Kwartał']

export const getData = (data: Number[], labels: String[]) => {
  return {
    labels,
    datasets: [
      {
        label: ``,
        data: data,
        backgroundColor: 'rgba(0, 129, 251, 0.8)',
      }
    ],
  }
};