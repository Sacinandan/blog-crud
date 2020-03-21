
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class LoginInput {
    email: string;
    password: string;
}

export class PostInput {
    title: string;
    body?: string;
}

export class SignUpInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class AuthPayload {
    id: string;
    email: string;
}

export abstract class IMutation {
    abstract signup(signUpInput?: SignUpInput): AuthPayload | Promise<AuthPayload>;

    abstract login(loginInput?: LoginInput): AuthPayload | Promise<AuthPayload>;

    abstract updateUser(id: string, signUpInput?: SignUpInput): User | Promise<User>;

    abstract deleteUser(id: string): User | Promise<User>;

    abstract createPost(postInput?: PostInput): Post | Promise<Post>;

    abstract updatePost(id: string, postInput?: PostInput): Post | Promise<Post>;

    abstract deletePost(id: string): Post | Promise<Post>;
}

export class Post {
    id: string;
    title: string;
    body?: string;
    author: User;
    createdAt: string;
    modifiedAt: string;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;

    abstract posts(): Post[] | Promise<Post[]>;

    abstract post(id: string): Post | Promise<Post>;
}

export class User {
    id: string;
    email: string;
    posts: Post[];
    firstName: string;
    lastName: string;
    access?: string;
    createdAt: string;
    modifiedAt: string;
}
