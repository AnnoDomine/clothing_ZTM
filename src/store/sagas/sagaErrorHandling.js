export function* sagaErrorHandling(error) {
    yield console.log(error);
}
