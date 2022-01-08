import { FetchedUser } from "../Interfaces";

export type AvatarURL = string;
export type ColorResolvable = `#${string}`;
export type BackgroundURL = string;
export type MongoURI = string;
export type FetchedGuild = Array<FetchedUser>;
export type SendType = "REPLY" | "SEND";
