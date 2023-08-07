/*
 * @Author: Hong.Zhang
 * @Date: 2023-08-07 11:19:54
 * @Description: 
 */
export function sleep(time = 0) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
