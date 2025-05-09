import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: {
    awardYear?: number;
    dateAwarded?: string;
    category: {
      en?: string;
    };
    laureates: {
      fullName?: {
        id?: string;
        en?: string;
      };
      orgName?: {
        id?: string;
        en?: string;
      };
    }[];
  };
}

function CardItem({ item }: IProps) {
  console.log({ item });
  return (
    <li className="border border-pink-500 m-2 h-min p-2">
      <p>{item?.awardYear}</p>
      <p>{item?.dateAwarded || "Sem data"}</p>
      <p>{item?.category.en}</p>
      <p>
        {item?.laureates?.length > 1
          ? item?.laureates[0]?.fullName?.en +
            " +" +
            item?.laureates?.length
          : item?.laureates[0]?.fullName?.en
          ? item?.laureates[0]?.fullName?.en
          : item?.laureates[0]?.orgName?.en
          ? item?.laureates[0]?.orgName?.en
          : ""}
      </p>
    </li>
  );
}

export default CardItem;
