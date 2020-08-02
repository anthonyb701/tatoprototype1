export default (value) => {
   const date = new Date(value.toDate())
   return date.toLocaleString(['uk-UA'], {
       month: '2-digit',
       day: '2-digit',
       year: 'numeric'
   })
}