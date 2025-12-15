export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type Project = {
  __typename?: 'Project';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  owner?: Maybe<User>;
  status?: Maybe<Status>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ProjectInput = {
  description: Scalars['String']['input'];
  owner?: InputMaybe<Scalars['ID']['input']>;
  status: Status;
  tasks?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  title: Scalars['String']['input'];
};

export type RootMutation = {
  __typename?: 'RootMutation';
  createProject?: Maybe<Project>;
  createTask?: Maybe<Task>;
  createUser?: Maybe<User>;
  removeProject?: Maybe<Scalars['Boolean']['output']>;
  removeTask?: Maybe<Scalars['Boolean']['output']>;
  removeUser?: Maybe<Scalars['Boolean']['output']>;
  updateProject?: Maybe<Project>;
  updateTask?: Maybe<Task>;
  updateUser?: Maybe<User>;
};


export type RootMutationCreateProjectArgs = {
  input: ProjectInput;
};


export type RootMutationCreateTaskArgs = {
  input: TaskInput;
};


export type RootMutationCreateUserArgs = {
  input: UserInput;
};


export type RootMutationRemoveProjectArgs = {
  id: Scalars['ID']['input'];
};


export type RootMutationRemoveTaskArgs = {
  id: Scalars['ID']['input'];
};


export type RootMutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type RootMutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProjectInput;
};


export type RootMutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTaskInput;
};


export type RootMutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  projects?: Maybe<Array<Maybe<Project>>>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type RootQueryTasksArgs = {
  projectId?: InputMaybe<Scalars['ID']['input']>;
};

export enum Status {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Planning = 'PLANNING'
}

export type Task = {
  __typename?: 'Task';
  assignee?: Maybe<Array<Maybe<User>>>;
  creator?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  priority?: Maybe<Priority>;
  project?: Maybe<Project>;
  status?: Maybe<Status>;
  title?: Maybe<Scalars['String']['output']>;
};

export type TaskInput = {
  assignee?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  creator?: InputMaybe<Scalars['ID']['input']>;
  description: Scalars['String']['input'];
  priority: Priority;
  project: Scalars['ID']['input'];
  status: Status;
  title: Scalars['String']['input'];
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Status>;
  tasks?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskInput = {
  assignee?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  creator?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Priority>;
  project?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Status>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  projects?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Maybe<Project>>>;
};

export type UserInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  projects?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'RootQuery', projects?: Array<{ __typename?: 'Project', id?: string | null, title?: string | null, description?: string | null, status?: Status | null } | null> | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'RootQuery', users?: Array<{ __typename?: 'User', id?: string | null, firstname?: string | null, lastname?: string | null } | null> | null };

export type GetTasksQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type GetTasksQuery = { __typename?: 'RootQuery', tasks?: Array<{ __typename?: 'Task', id?: string | null, title?: string | null, description?: string | null, status?: Status | null, priority?: Priority | null, project?: { __typename?: 'Project', id?: string | null } | null, creator?: { __typename?: 'User', id?: string | null, firstname?: string | null, lastname?: string | null } | null, assignee?: Array<{ __typename?: 'User', id?: string | null, firstname?: string | null, lastname?: string | null } | null> | null } | null> | null };

export type CreateTaskMutationVariables = Exact<{
  input: TaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'RootMutation', createTask?: { __typename?: 'Task', id?: string | null, title?: string | null, description?: string | null, status?: Status | null, priority?: Priority | null, project?: { __typename?: 'Project', id?: string | null } | null, creator?: { __typename?: 'User', id?: string | null, firstname?: string | null, lastname?: string | null } | null, assignee?: Array<{ __typename?: 'User', id?: string | null, firstname?: string | null, lastname?: string | null } | null> | null } | null };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'RootMutation', updateTask?: { __typename?: 'Task', id?: string | null, status?: Status | null, title?: string | null } | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'RootMutation', removeTask?: boolean | null };
