import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";

export const GetCocoImagesByCategory = ({ category, limit, offset }) => {
    const COCO_IMAGES = gql`
        query getCocoCategories(
            $category: String!
            $limit: Int!
            $offset: Int!
        ) {
            coco_images(
                where: {
                    coco_annotations: {
                        coco_category: { name: { _eq: $category } }
                    }
                }
                limit: $limit
                offset: $offset
                order_by: { id: asc }
            ) {
                id
                metadata
            }
            coco_images_aggregate(
                where: {
                    coco_annotations: {
                        coco_category: { name: { _eq: $category } }
                    }
                }
            ) {
                aggregate {
                    count
                }
            }
        }
    `;

    const [cocoImages, setCocoImages] = useState();
    const [count, setCount] = useState();
    const { data, loading } = useQuery(COCO_IMAGES, {
        variables: {
            category: category,
            limit: limit,
            offset: offset
        },
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!data) return;
        setCocoImages(data["coco_images"]);
        setCount(data["coco_images_aggregate"]["aggregate"]["count"]);
    }, [data]);
    return {
        images: cocoImages,
        count: count,
        loading: loading
    };
};

export const GetNRandomSeedCocoImages = ({ n, seed }) => {
    const COCO_IMAGES = gql`
        query getNRandomSeedImages($n: Int!, $seed: float8!) {
            random_seed_coco_images(args: { sample_limit: $n, seed: $seed }) {
                id
            }
        }
    `;

    const [cocoImages, setCocoImages] = useState();

    const { data, refetch, loading } = useQuery(COCO_IMAGES, {
        variables: {
            n: n,
            seed: seed
        },
        fetchPolicy: "cache-and-network"
    });

    useEffect(() => {
        if (data) {
            console.log(data);
            setCocoImages(data["random_seed_coco_images"]);
        }
    }, [data]);

    return {
        images: cocoImages,
        refetch: refetch,
        loading: loading
    };
};
