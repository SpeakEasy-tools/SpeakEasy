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
            coco_images_aggregate(distinct_on: file_name) {
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
