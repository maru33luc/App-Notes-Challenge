// const domain = 'http://localhost:3000/';
const domain = 'https://app-notes-challenge.onrender.com/';

export const environments = {
    production: true,
    // urlBackCategories: '/categories',
    // urlBackNotes: '/notes',
    // urlBackUsers: '/users',

    urlBackCategories: domain + 'categories',
    urlBackNotes: domain + 'notes',
    urlBackUsers: domain + 'users',
    

};
