export const fetchData = async (url, options = {}) => {
    const response = await fetch(url, options);
    if(!response.oke) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}