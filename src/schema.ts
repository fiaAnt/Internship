import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLEnumType,
    GraphQLInputObjectType,
    GraphQLBoolean,
    GraphQLNonNull,
} from 'graphql';
import type { GraphQLFieldConfigMap } from 'graphql';
import { resolvers } from './resolvers.ts';
import type { IUser } from '../models/User.ts';
import type { IProject } from '../models/Project';
import type { ITask } from '../models/Task';

const StatusEnum = new GraphQLEnumType({
    name: 'Status',
    values: {
        PLANNING: { value: 'PLANNING' },
        ACTIVE: { value: 'ACTIVE' },
        COMPLETED: { value: 'COMPLETED' },
    },
});

const PriorityEnum = new GraphQLEnumType({
    name: 'Priority',
    values: {
        LOW: { value: 'LOW' },
        MEDIUM: { value: 'MEDIUM' },
        HIGH: { value: 'HIGH' },
    },
});

const UserType: GraphQLObjectType<IUser, unknown> = new GraphQLObjectType<IUser, unknown>({
    name: 'User',
    fields: (): GraphQLFieldConfigMap<IUser, unknown> => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        projects: { type: new GraphQLList(ProjectType) },
    }),
});

const ProjectType: GraphQLObjectType<IProject, unknown> = new GraphQLObjectType<IProject, unknown>({
    name: 'Project',
    fields: (): GraphQLFieldConfigMap<IProject, unknown> => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: StatusEnum },
        owner: { type: UserType },
        tasks: { type: new GraphQLList(TaskType) },
    }),
});

const TaskType: GraphQLObjectType<ITask, unknown> = new GraphQLObjectType<ITask, unknown>({
    name: 'Task',
    fields: (): GraphQLFieldConfigMap<ITask, unknown> => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        project: { type: ProjectType },
        status: { type: StatusEnum },
        priority: { type: PriorityEnum },
        creator: { type: UserType },
        assignee: { type: new GraphQLList(UserType) },
    }),
});


const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        projects: { type: new GraphQLList(GraphQLID) },
    },
});

const UpdateUserInputType = new GraphQLInputObjectType({
    name: 'UpdateUserInput',
    fields: {
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        projects: { type: new GraphQLList(GraphQLID) },
    },
});

const ProjectInputType = new GraphQLInputObjectType({
    name: 'ProjectInput',
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(StatusEnum) },
        owner: { type: GraphQLID },
        tasks: { type: new GraphQLList(GraphQLID) },
    },
});

const UpdateProjectInputType = new GraphQLInputObjectType({
    name: 'UpdateProjectInput',
    fields: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: StatusEnum },
        owner: { type: GraphQLID },
        tasks: { type: new GraphQLList(GraphQLID) },
    },
});

const TaskInputType = new GraphQLInputObjectType({
    name: 'TaskInput',
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        project: { type: new GraphQLNonNull(GraphQLID) },
        status: { type: new GraphQLNonNull(StatusEnum) },
        priority: { type: new GraphQLNonNull(PriorityEnum) },
        creator: { type: GraphQLID },
        assignee: { type: new GraphQLList(GraphQLID) },
    },
});

const UpdateTaskInputType = new GraphQLInputObjectType({
    name: 'UpdateTaskInput',
    fields: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        project: { type: GraphQLID },
        status: { type: StatusEnum },
        priority: { type: PriorityEnum },
        creator: { type: GraphQLID },
        assignee: { type: new GraphQLList(GraphQLID) },
    },
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        users: { type: new GraphQLList(UserType), resolve: resolvers.RootQuery.users },
        projects: { type: new GraphQLList(ProjectType), resolve: resolvers.RootQuery.projects },
        tasks: {
            type: new GraphQLList(TaskType),
            args: { projectId: { type: GraphQLID } },
            resolve: resolvers.RootQuery.tasks,
        },
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        createUser: { type: UserType, args: { input: { type: new GraphQLNonNull(UserInputType) } }, resolve: resolvers.RootMutation.createUser },
        updateUser: { type: UserType, args: { id: { type: new GraphQLNonNull(GraphQLID) }, input: { type: new GraphQLNonNull(UpdateUserInputType) } }, resolve: resolvers.RootMutation.updateUser },
        removeUser: { type: GraphQLBoolean, args: { id: { type: new GraphQLNonNull(GraphQLID) } }, resolve: resolvers.RootMutation.removeUser },
        createProject: { type: ProjectType, args: { input: { type: new GraphQLNonNull(ProjectInputType) } }, resolve: resolvers.RootMutation.createProject },
        updateProject: { type: ProjectType, args: { id: { type: new GraphQLNonNull(GraphQLID) }, input: { type: new GraphQLNonNull(UpdateProjectInputType) } }, resolve: resolvers.RootMutation.updateProject },
        removeProject: { type: GraphQLBoolean, args: { id: { type: new GraphQLNonNull(GraphQLID) } }, resolve: resolvers.RootMutation.removeProject },
        createTask: { type: TaskType, args: { input: { type: new GraphQLNonNull(TaskInputType) } }, resolve: resolvers.RootMutation.createTask },
        updateTask: { type: TaskType, args: { id: { type: new GraphQLNonNull(GraphQLID) }, input: { type: new GraphQLNonNull(UpdateTaskInputType) } }, resolve: resolvers.RootMutation.updateTask },
        removeTask: { type: GraphQLBoolean, args: { id: { type: new GraphQLNonNull(GraphQLID) } }, resolve: resolvers.RootMutation.removeTask },
    },
});

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
