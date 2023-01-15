export const absLenght = (value:any):number => value.split('')
    .map((item:any) => parseInt(item, 10))
    .filter((item:any) => !Number.isNaN(item))
    .length;
