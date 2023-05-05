const http = () => {
    const request = async (
        url,
        method = "GET",
        headers = { "Content-Type": "application/json;charset=utf-8" },
        body = null
    ) => {
        const data = await fetch(url, { method, headers, body });

        return await data.json();
    };

    return { request };
};

export default http;
