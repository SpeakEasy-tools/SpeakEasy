import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";

export const GetCocoAnnotationsByImageId = ({ imageId }) => {
    const COCO_ANNOTATIONS = gql`
        query getCocoAnnotations($id: Int!) {
            coco_annotations(where: { image_id: { _eq: $id } }) {
                annotation
                coco_category {
                    supercategory
                    name
                    is_thing
                }
            }
            coco_annotations_aggregate(where: { image_id: { _eq: $id } }) {
                aggregate {
                    count
                }
            }
        }
    `;

    const [cocoAnnotations, setCocoAnnotations] = useState();
    const [count, setCount] = useState();

    const { data, loading } = useQuery(COCO_ANNOTATIONS, {
        variables: {
            id: imageId
        },
        fetchPolicy: "cache-and-network"
    });

    useEffect(() => {
        if (!data) return;
        setCocoAnnotations(data["coco_annotations"]);
        setCount(data["coco_annotations_aggregate"]["aggregate"]["count"]);
    }, [data]);

    return {
        annotations: cocoAnnotations,
        loading: loading,
        count: count
    };
};

export const GetNRandomSeedCocoAnnotations = ({ n, seed }) => {
    const COCO_ANNOTATIONS = gql`
        query getNRandomSeedCocoAnnotations($n: Int!, $seed: float8!) {
            random_seed_coco_annotations(
                args: { sample_limit: $n, seed: $seed }
                where: { category_id: { _is_null: false } }
            ) {
                id
                image_id
                category_id
                annotation
                coco_category {
                    supercategory
                    name
                }
            }
        }
    `;

    const [cocoAnnotations, setCocoAnnotations] = useState();

    const { data, refetch, loading } = useQuery(COCO_ANNOTATIONS, {
        variables: {
            n: n,
            seed: seed
        },
        fetchPolicy: "cache-and-network"
    });

    useEffect(() => {
        if (data) {
            console.log(data);
            setCocoAnnotations(data["random_seed_coco_annotations"]);
        }
    }, [data]);

    return {
        annotations: cocoAnnotations,
        refetch: refetch,
        loading: loading
    };
};
