const sortByField = (field) => {
    return (a, b) => (b[field] > a[field] ? 1 : -1);
};

export default sortByField;
