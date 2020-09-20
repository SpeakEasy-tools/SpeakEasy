import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

export const GetUsers = () => {
    const USERS = gql`
        query getUsers {
            users {
                id
                name
            }
        }
    `;

    const [users, setUsers] = useState(null);
    const { data, refetch } = useQuery(USERS, {
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!data) return;
        setUsers(data.users);
    }, [data]);

    return [users, refetch];
};
