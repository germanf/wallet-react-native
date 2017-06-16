const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

const date = {
  getDateFromMiliseconds: (miliseconds) => {
    let date = new Date(miliseconds)
    return date.getDate() + " " + months[date.getMonth()]
  },
}

export default date
