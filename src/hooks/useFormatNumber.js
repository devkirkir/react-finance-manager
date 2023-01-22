const useFormatNumber = (num) => {
    let newNumber = [];

    num.toString()
        .slice(0, -3)
        .split("")
        .reverse()
        .map((char, index) => {
            if (index % 3 == 0 && index !== 0) {
                newNumber.push(",");
            }

            newNumber.push(char);
        });

    let float = num.toString().slice(-3),
        number = newNumber.reverse().join("");

    return { number, float };
};

export default useFormatNumber;
