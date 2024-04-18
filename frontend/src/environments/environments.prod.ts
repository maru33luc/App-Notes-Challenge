// const domain = 'http://localhost:3000/';
// const domain = 'https://app-notes-challenge.onrender.com/';
const domain = 'https://app-notes-challenge-server.vercel.app/';


export const environments = {
    production: true,
    // urlBackCategories: '/categories',
    // urlBackNotes: '/notes',
    // urlBackUsers: '/users',

    urlBackCategories: domain + 'categories',
    urlBackNotes: domain + 'notes',
    urlBackUsers: domain + 'users',
    

};
