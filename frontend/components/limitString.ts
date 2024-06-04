//limitando as strings
export const limitString = (str: string, limit: number) => {
    if(str.length > limit){
      return str.substring(0, limit) + '...';
    }
    return str;
  }