function FixedSizeArray<T>(size: number) {
  const array: Array<T> = []

  return {
    push(value: T) {
      if (array.length >= size) array.shift()
      array.push(value)
    },
    [Symbol.iterator]() {
      let index = 0

      return {
        next() {
          if (index == size) return { done: true }
          if (index == array.length) return { done: true }
          return { done: false, value: array[index++] }
        },
      }
    },
  }
}

export default FixedSizeArray
