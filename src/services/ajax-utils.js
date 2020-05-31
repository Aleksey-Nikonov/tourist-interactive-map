export async function get (url, options = {}) {
    let isLoading = false,
        error = null,
        response = null;

    try
    {
        isLoading = true;

        const res = await fetch(url, options);
        const json = await res.json();
        response = json;
        isLoading = false;

    } catch (err) {
        error = err;
    }

    return { response, error, isLoading };
}