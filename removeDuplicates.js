  const uniqueValues = (data: any, key: any) => {
    return [...new Map(data.map((x: any) => [key(x), x])).values()];
  };
