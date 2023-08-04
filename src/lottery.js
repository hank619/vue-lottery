/*
 * @Author: Hong.Zhang
 * @Date: 2023-08-04 18:22:44
 * @Description: 
 */
const MAX_LAPS = 10;

export const getRandomParam= () => {
  const round = Math.floor(Math.random()*MAX_LAPS + 1);
  const angel = Math.floor(Math.random()*360+1);
  return {
    round,
    angel,
  };
}