export const parseArrayToString = (array: Array<string>): string =>
  array.reduce(
    (result, currentValue, currentIndex) =>
      currentIndex === array.length - 1
        ? result.concat(currentValue)
        : result.concat(`${currentValue}, `),
    ""
  )
