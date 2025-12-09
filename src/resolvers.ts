import { UserModel, type IUser } from '../models/User.ts';
import { ProjectModel, type IProject } from '../models/Project.ts';
import { TaskModel, type ITask } from '../models/Task.ts';
import mongoose, { type FilterQuery } from 'mongoose';

export const resolvers = {
    RootQuery: {
        users: async (): Promise<IUser[]> => {
            return UserModel.find();
        },
        projects: async (): Promise<IProject[]> => {
            return ProjectModel.find();
        },
        tasks: async (
            _parent: unknown,
            args: { projectId?: string }
        ): Promise<ITask[]> => {

            const query: FilterQuery<ITask> = {};

            if (args.projectId) {
                if (!mongoose.Types.ObjectId.isValid(args.projectId)) {
                    throw new Error('Invalid project ID format');
                }
                query.project = new mongoose.Types.ObjectId(args.projectId);
            }

            return TaskModel.find(query).populate('project creator assignee');
        }
    },

    RootMutation: {
        createUser: async (
            _parent: unknown,
            args: { input: { firstname: string; lastname: string; email: string; projects?: string[] } }
        ): Promise<IUser> => {
            const newUser = new UserModel(args.input);
            await newUser.save();
            return newUser;
        },

        updateUser: async (
            _parent: unknown,
            args: { id: string; input: { firstname?: string; lastname?: string; email?: string; projects?: string[] } }
        ): Promise<IUser | null> => {
            const updateData: Partial<IUser> = { ...args.input } as Partial<IUser>;

            if (args.input.projects) {
                const projectIds = args.input.projects.map(pid => new mongoose.Types.ObjectId(pid));
                const existingProjects = await ProjectModel.find({ _id: { $in: projectIds } });
                if (existingProjects.length !== projectIds.length) throw new Error('Some projects do not exist');
                updateData.projects = projectIds;
            }

            return UserModel.findByIdAndUpdate(args.id, updateData, { new: true }).populate('projects');
        },

        removeUser: async (_parent: unknown, args: { id: string }): Promise<boolean> => {
            const deleted = await UserModel.findByIdAndDelete(args.id);
            return !!deleted;
        },

        createProject: async (
            _parent: unknown,
            args: { input: { title: string; description: string; status: 'PLANNING' | 'ACTIVE' | 'COMPLETED'; owner?: string; tasks?: string[] } }
        ): Promise<IProject> => {
            if (args.input.owner) {
                const ownerExists = await UserModel.findById(args.input.owner);
                if (!ownerExists) throw new Error('Owner not found');
            }

            const newProject = new ProjectModel(args.input);
            await newProject.save();

            if (args.input.owner) {
                await UserModel.findByIdAndUpdate(args.input.owner, { $push: { projects: newProject._id } });
            }

            return newProject;
        },

        updateProject: async (
            _parent: unknown,
            args: {
                id: string;
                input: {
                    title?: string;
                    description?: string;
                    status?: 'PLANNING' | 'ACTIVE' | 'COMPLETED';
                    owner?: string;
                    tasks?: string[];
                };
            }
        ): Promise<IProject | null> => {
            const updateData: Partial<IProject> = {};

            if (args.input.title) updateData.title = args.input.title;
            if (args.input.description) updateData.description = args.input.description;
            if (args.input.status) updateData.status = args.input.status;

            if (args.input.owner) {
                updateData.owner = new mongoose.Types.ObjectId(args.input.owner);
            }

            if (args.input.tasks) {
                updateData.tasks = args.input.tasks.map(id => new mongoose.Types.ObjectId(id));
            }

            return ProjectModel
                .findByIdAndUpdate(args.id, updateData, { new: true })
                .populate('owner tasks');
        },

        removeProject: async (_parent: unknown, args: { id: string }): Promise<boolean> => {
            const deleted = await ProjectModel.findByIdAndDelete(args.id);
            return !!deleted;
        },

        createTask: async (
            _parent: unknown,
            args: {
                input: {
                    title: string;
                    description: string;
                    project: string;
                    status: 'PLANNING' | 'ACTIVE' | 'COMPLETED';
                    priority: 'LOW' | 'MEDIUM' | 'HIGH';
                    creator?: string;
                    assignee?: string[];
                };
            }
        ): Promise<ITask> => {
            if (!mongoose.Types.ObjectId.isValid(args.input.project)) {
                throw new Error('Invalid project ID');
            }
            const projectExists = await ProjectModel.findById(args.input.project);
            if (!projectExists) throw new Error('Project not found');
            const taskData: Partial<ITask> & {
                project: mongoose.Types.ObjectId;
                creator?: mongoose.Types.ObjectId;
                assignee?: mongoose.Types.ObjectId[];
            } = {
                title: args.input.title,
                description: args.input.description,
                status: args.input.status,
                priority: args.input.priority,
                project: new mongoose.Types.ObjectId(args.input.project),
            };
            if (args.input.creator) {
                if (!mongoose.Types.ObjectId.isValid(args.input.creator)) {
                    throw new Error('Invalid creator ID');
                }
                taskData.creator = new mongoose.Types.ObjectId(args.input.creator);
            }
            if (args.input.assignee && args.input.assignee.length > 0) {
                const invalidAssignee = args.input.assignee.find(
                    id => !mongoose.Types.ObjectId.isValid(id)
                );
                if (invalidAssignee) {
                    throw new Error(`Invalid assignee ID: ${invalidAssignee}`);
                }

                taskData.assignee = args.input.assignee.map(
                    id => new mongoose.Types.ObjectId(id)
                );
            }

            const newTask = new TaskModel(taskData);
            await newTask.save();
            await ProjectModel.findByIdAndUpdate(
                args.input.project,
                { $push: { tasks: newTask._id } }
            );
            return TaskModel.findById(newTask._id)
                .populate('project creator assignee')
                .exec() as Promise<ITask>;
        },
        updateTask: async (
            _parent: unknown,
            args: {
                id: string;
                input: {
                    title?: string;
                    description?: string;
                    project?: string;
                    status?: 'PLANNING' | 'ACTIVE' | 'COMPLETED';
                    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
                    creator?: string;
                    assignee?: string[];
                };
            }
        ): Promise<ITask | null> => {
            const updateData: Partial<ITask> = {};

            if (args.input.title) updateData.title = args.input.title;
            if (args.input.description) updateData.description = args.input.description;
            if (args.input.status) updateData.status = args.input.status;
            if (args.input.priority) updateData.priority = args.input.priority;

            if (args.input.project) {
                updateData.project = new mongoose.Types.ObjectId(args.input.project);
            }
            if (args.input.creator) {
                updateData.creator = new mongoose.Types.ObjectId(args.input.creator);
            }
            if (args.input.assignee) {
                updateData.assignee = args.input.assignee.map(
                    uid => new mongoose.Types.ObjectId(uid)
                );
            }
            return TaskModel
                .findByIdAndUpdate(args.id, updateData, { new: true })
                .populate('assignee project creator');
        },
        removeTask: async (
            _parent: unknown,
            args: { id: string }
        ): Promise<boolean> => {
            const result = await TaskModel.findByIdAndDelete(args.id);
            return !!result;
        },

    },
};
