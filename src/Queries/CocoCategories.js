import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";

export const GetCocoCategories = () => {
    const COCO_CATEGORIES = gql`
        query getCocoCategories {
            coco_categories {
                id
                supercategory
                name
                is_thing
            }
        }
    `;

    const [cocoCategories, setCocoCategories] = useState(null);
    const { data } = useQuery(COCO_CATEGORIES, {
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!data) return;
        setCocoCategories(data["coco_categories"]);
    }, [data]);

    return cocoCategories;
};
