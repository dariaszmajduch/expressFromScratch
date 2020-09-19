/**
 * modules give a mechanism of encapsulation; our own modules could be stored in lib directory
 * packages give a mechanism of storage, versioning and referencing to other projects;
 * info about used packages are stored in node_modules directory
 */

const someCookies = [
    'Cookie 1',
    'Cookie 2',
    'Cookie 3'
];

/**
 * if element should be available outside module we have to use 'exports'
 * it should be imported in other files i.e. require('./lib/cookies')
 * usage of ./ inform that module is not added to node_modules  
 */
exports.getCookie = () => {
    const id = Math.floor(Math.random() * someCookies.length);
    return someCookies[id];
} 
