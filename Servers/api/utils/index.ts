export const allUsers = [
    'ADMIN',
    'PROF',
    'DIR',
    'SURV'
  ]

  export const admins = [
    'ADMIN',
    'DIR',
  ]

  export const horror = [
    '6h-7h',
    '7h-8h',
    '8h-9h',
    '9h-10h',
    '10h-11h',
    '11h-12h',
    '12h-13h',
    '13h-14h',
    '14h-15h',
    '15h-16h',
    '16h-17h',
    '17h-18h',
  ]
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  
  export const generateRandomCode = () => {
    return `${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)}`;
  }