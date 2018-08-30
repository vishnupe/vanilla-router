const routes = {
    '': {
        template: 'Hello</br> <outlet></outlet>',
    },
    a: {
        template: require('./templates/a.html'),
        childs: {
            d: {
                template: require('./templates/d.html')
            },
            e: {
                template: require('./templates/e.html'),
                childs: {
                    f: {
                        template: require('./templates/f.html')
                    }
                }
            }
        }
    },
    b: {
        template: require('./templates/b.html'),
        childs: {
            d: {
                template: require('./templates/d.html')
            },
        }
    },
};

import {
    routeChangeObservable,
    navigateToRoute,
    stripSlash
} from './router.js';

const flatRoutes = {};
const initRouting = (routesConfig, basePath = '') => {
    basePath += '/'
    Object.keys(routesConfig).forEach((item) => {
        flatRoutes[basePath + item] = flatRoutes[stripSlash(basePath)] ? flatRoutes[stripSlash(basePath)].replace('<outlet><\/outlet>', routesConfig[item].template) : routesConfig[item].template;
        let route = routesConfig[item];
        if (route.childs) {
            initRouting(route.childs, basePath + item);
        }
    });
};

initRouting(routes, '');
console.log(flatRoutes);
routeChangeObservable.subscribe((route) => {
    let body = document.getElementById('body');
    body.innerHTML = flatRoutes[route] || require('./templates/404.html');
});