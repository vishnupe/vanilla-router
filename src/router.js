import {
    fromEvent,
    merge,
    Subject
} from 'rxjs';

import {
    map
} from 'rxjs/operators';

const routes = {
    
};


const navigationSubject = new Subject();

export const routeChangeObservable = merge(fromEvent(window, 'load'), fromEvent(window, 'popstate'), navigationSubject).pipe(map(() => getCurrentRoute()));

export const getCurrentRoute = () => {
    return stripSlash(window.location.pathname);
}

export const navigateToRoute = (path) => {
    history.pushState({}, '', path);
    navigationSubject.next();
    return true;
}

export const navigateBack = () => {
    history.back();
    return true;
}

export const navigateForward = () => {
    history.forward();
    return true;
}

export const stripSlash = (path) => path.lastIndexOf('/') && (path.lastIndexOf('/') === (path.length - 1)) ? path.slice(0, path.length - 1) : path;