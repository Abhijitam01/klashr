export default function handler(request, response) {
    const values = {
        NODE_ENV: process.env.NODE_ENV,
        API_BASE_URL: process.env.API_BASE_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        TOOL_BASE_URL: process.env.TOOL_BASE_URL,
        MARBLISM_MICHELANGELO_ACTIVE: process.env.MARBLISM_MICHELANGELO_ACTIVE === 'true',
        MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    };
    response.status(200).json(values);
}
