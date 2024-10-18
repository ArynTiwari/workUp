export async function getNewsData() {
    const key = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const res = await fetch(
        `https://newsdata.io/api/1/latest?apikey=${key}&country=in&language=en`
    );

    if (res.ok) {
        const data = await res.json();
        return data.results; // Assuming 'results' contains the array of news articles
    } else {
        return [];
    }
}