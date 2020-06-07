import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/react-hooks";

export const GetLanguages = () => {
    const LANGUAGES = gql`
        query getLanguages {
            languages {
                id
                language_code
                language_label
            }
        }
    `;

    const [languages, setLanguages] = useState(null);
    const {data} = useQuery(LANGUAGES, {
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!data) return;
        let ls = {};
        data.languages.forEach(l => ls[l['language_code']] = l['language_label'])
        setLanguages(ls);
    }, [data]);

    return languages
};

export const GetUsedLanguages = () => {
    const LANGUAGES = gql`
        query getLanguages {
            vocabulary(distinct_on: language_id) {
                language {
                    id
                    language_code
                    language_label
                }
            }
        }
    `;

    const [languages, setLanguages] = useState(null);
    const {data, refetch} = useQuery(LANGUAGES, {
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!data) return;
        setLanguages(data.vocabulary.map(v => v.language));
    }, [data]);

    return [languages, refetch]
};
