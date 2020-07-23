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

export const GetNRandomSeedCocoCategories = ({ n, seed }) => {
    const COCO_CATEGORIES = gql`
        query getNRandomSeedCocoCategories($n: Int!, $seed: float8!) {
            random_seed_coco_categories(
                args: { sample_limit: $n, seed: $seed }
                where: { id: { _lte: 90 } }
            ) {
                id
                supercategory
                name
            }
        }
    `;

    const [cocoCategories, setCocoCategories] = useState();

    const { data, refetch, loading } = useQuery(COCO_CATEGORIES, {
        variables: {
            n: n,
            seed: seed
        },
        fetchPolicy: "cache-and-network"
    });

    useEffect(() => {
        if (data) {
            setCocoCategories(data["random_seed_coco_categories"].slice(0, n));
        }
    }, [data, n]);

    return {
        categories: cocoCategories,
        refetch: refetch,
        loading: loading
    };
};
