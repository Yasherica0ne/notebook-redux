const FilterType =
{
    none: 1,
    byTag: 2,
    byTitle: 3
}

function getDate() {
    const date = new Date();
    return date.getDay() + '.' + date.getUTCMonth() + 1 + '.' + date.getFullYear();
}

export default {FilterType, getDate};