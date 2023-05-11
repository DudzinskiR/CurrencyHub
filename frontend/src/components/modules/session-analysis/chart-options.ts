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

export const labels = ['Spadek', 'Bez zmian (<0.1%)', 'Wzrost'];

export const timePeriodName = ['Tydzień', '2 Tygodnie', 'Miesiąc', 'Kwartał', '6 Miesięcy', 'Rok'];

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