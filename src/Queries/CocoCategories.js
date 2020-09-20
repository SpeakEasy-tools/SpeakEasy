import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

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

export const GetNRandomSeedCocoCategories = (n, seed) => {
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

    const [categories, setCategories] = useState([]);
    const [skipQuery, setSkipQuery] = useState(false);

    let { loading, error, data } = useQuery(COCO_CATEGORIES, {
        variables: {
            n: n,
            seed: seed
        },
        skip: skipQuery
    });

    useEffect(() => {
        if (!skipQuery && n) {
            const onCompleted = () => {};
            const onError = () => {};
            if (onCompleted || onError) {
                if (onCompleted && !loading && !error) {
                    setCategories(
                        data["random_seed_coco_categories"].slice(0, n)
                    );
                    setSkipQuery(true);
                } else if (onError && !loading && error) {
                    setSkipQuery(true);
                }
            }
        }
    }, [loading, data, error, skipQuery, n]);
    return {
        categories: categories
    };
};
