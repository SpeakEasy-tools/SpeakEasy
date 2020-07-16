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
        }
    `;

    const [cocoAnnotations, setCocoAnnotations] = useState();

    const { data, loading } = useQuery(COCO_ANNOTATIONS, {
        variables: {
            id: imageId
        },
        fetchPolicy: "cache-and-network"
    });

    useEffect(() => {
        if (!data) return;
        setCocoAnnotations(data["coco_annotations"]);
    }, [data]);

    return {
        annotations: cocoAnnotations,
        loading: loading
    };
};
