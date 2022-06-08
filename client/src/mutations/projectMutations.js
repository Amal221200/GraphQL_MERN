import { gql } from "@apollo/client";

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const ADD_PROJECT = gql`
    mutation AddProject($clientId: ID!, $name:String!, $status:ProjectStatus!, $description:String!){
        addProject(clientId: $clientId, name: $name, status: $status, description: $description){
            id,
            name,
            status,
            description,
            client {
                name,
                email,
                phone,
                id
            }
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation updateProject($id: ID!, $name:String!, $status:ProjectStatusUpdate!, $description:String!){
        updateProject(id: $id, name: $name, status: $status, description: $description){
            id,
            name,
            status,
            description
        }
    }
`;

export {
    DELETE_PROJECT,
    ADD_PROJECT,
    UPDATE_PROJECT
}