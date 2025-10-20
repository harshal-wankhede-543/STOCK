export const WrapAsync = (func) => {
    return function (req, res, next) {
        const result = func(req, res, next);
        if (result && typeof result.catch === 'function') {
            result.catch((e) => next(e));
        }
    }
}