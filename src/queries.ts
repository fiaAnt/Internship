import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      description
      status
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstname
      lastname
    }
  }
`;

export const GET_TASKS = gql`
  query GetTasks($projectId: ID!) {
    tasks(projectId: $projectId) {
      id
      title
      description
      status
      priority
      project {
        id
      }
      creator {
        id
        firstname
        lastname
      }
      assignee {
        id
        firstname
        lastname
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($input: TaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
      priority
      project {
        id
      }
      creator {
        id
        firstname
        lastname
      }
      assignee {
        id
        firstname
        lastname
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      status
      title
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    removeTask(id: $id)
  }
`;
