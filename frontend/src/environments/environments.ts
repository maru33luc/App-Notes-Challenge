// const domain = 'https://app-notes-challenge-server.vercel.app/';
const domain = 'http://localhost:3000/';

export const environments = {

    // urlBackNotes: '/notes',
    // urlBackUsers: '/users',
    // urlBackCategories: '/categories',

    // urlBackNotes: 'http://localhost:3000/notes',
    // urlBackUsers: 'http://localhost:3000/users',
    // urlBackCategories: 'http://localhost:3000/categories',
    
    urlBackCategories: domain + 'categories',
    urlBackNotes: domain + 'notes',
    urlBackUsers: domain + 'users',

};