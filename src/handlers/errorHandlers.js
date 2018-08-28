/**
 * Higher-order function to catch errors.
 *
 * Usage:
 * const [ someData, someError ] = await catchErrors( functionThatReturnsAPromise() );
 * if ( someError ) {
 *  console.log( `An error has occurred. Details: ${someError}` );
 * } else {
 *  // Cool! looks like we can safely work with someData.
 * }
 *
 */
export const catchErrors = promise => promise.then(data => [data]).catch(error => [null, error]);
