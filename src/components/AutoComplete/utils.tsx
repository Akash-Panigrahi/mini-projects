export function highlight(text: string, query: string) {
  const regex = new RegExp(`(${query})`, "gi");

  return text.split(regex).map((part: string) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      return <mark>{part}</mark>;
    }

    return part;
  });
}
