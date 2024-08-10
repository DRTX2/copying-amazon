import { ProductData } from "./Product";

export const concatString = (array: string[], separator = ", "): string => {
  const concatArray: string = array.join(separator);
  return concatArray.substring(0, concatArray.length - 2);
};

const createContentLinks = (array: string[], separator = ", "): string => {
  const copyData = [...array];
  return (
    copyData
      .map((element) => {
        // then the anchor indicate a link by each category
        return `<a href="/product/${element}">${element}</a>`;
      })
      .join(separator) + " > "
  );
};

export const LinksCategorysProduct = (
  product: ProductData,
  separator = ", "
) => {
  const data: string =
    createContentLinks(product.category, separator) +
    product.title;
  return <p dangerouslySetInnerHTML={{ __html: data }}></p>;
};
