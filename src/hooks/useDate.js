function useDate() {
    const dateNow = new Date();

    const currentYear = dateNow.getFullYear();
    const currentMonth = dateNow.getMonth();

    const dateGte = new Date(currentYear, currentMonth, 1).toLocaleDateString(
        "en-US"
    );

    const dateLte = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).toLocaleDateString("en-US");

    return { dateGte, dateLte };
}

export default useDate;
