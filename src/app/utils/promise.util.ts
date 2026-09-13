export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  message: string = 'Tempo esgotado. Verifique sua conexão e tente novamente.'
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}
