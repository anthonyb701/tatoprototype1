export default (value) => {
    const date = new Date(value.toDate())
    return date.toLocaleString(['uk-UA'], {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    })
}